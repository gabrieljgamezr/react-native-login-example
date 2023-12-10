import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'ikn';
export const API_URL = 'https://jsonplaceholder.typicode.com/';
const AuthContext = createContext({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

	const [authState, setAuthState] = useState({
		token: null,
		authenticated: null,
	});

	// Check that a stored session already exists, and then log in
	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log('stored:', token);

			if (token) {
				axios.defaults.headers.common['Authorization'] = `yes`;
				
				setAuthState({
					token,
					authenticated: true,
				});
			}
		}
		loadToken();
	}, []);

	// Register function
	const register = async (email, username) => {
		try {
			console.log(email, username);
		}catch(e) {
			return {
				error: true,
				msg: (e).response.data.msg,
			};
		};
	};

	// Login function
	const login = async (email, username) => {
		try {
			const users = await axios.get(`${API_URL}/users`);
			
			const userFind = users.data?.find((user) => 
				user.email.toLowerCase() === email.toLowerCase() 
				&& 
				user.username.toLowerCase() === username.toLowerCase()
			);

			if(userFind) {
				setAuthState({
					token: 'yes',
					authenticated: true,
				});
	
				axios.defaults.headers.common['Authorization'] = `yes`;
	
				await SecureStore.setItemAsync(TOKEN_KEY, 'yes');
			}else {
				console.log('user not found');
			}

		}catch(e) {
			console.log('AuthContext login error:', e);
		};

		return;
	};

	// Logout function
	const logout = async () => {
		await SecureStore.deleteItemAsync(TOKEN_KEY);

		axios.defaults.headers.common['Authorization'] = '';

		setAuthState({
			token: null,
			authenticated: null,
		})

	};

	// Values that will be sent to the component that will maintain the context
	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		authState,
	};

	// Component that wraps the application in the context
	return (
		<AuthContext.Provider
			value={value}
		>
			{children}
		</AuthContext.Provider>
	)
};