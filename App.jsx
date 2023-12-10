import { StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack for navigation
const Stack = createNativeStackNavigator();

// Main function
export default function App() {
	return (
		<AuthProvider>
			<Layout></Layout>
		</AuthProvider>
	);
};

// Layout that manages routes and validates authentication
export const Layout = () => {
	
	// Status for authentication and logout function
	const { authState, onLogout } = useAuth();
	
	// Routes
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{
					authState?.authenticated
						? (
							// Routes for authenticated user
							<Stack.Screen
								name='home'
								component={Home}
								options={{
									headerRight: () => {
										return(
											<Button
												icon='logout'
												onPress={onLogout}
											>Logout</Button>
										);
									}
								}}
							></Stack.Screen>
						)
						: (
							// Routes for users without a logged in
							<Stack.Screen
								name='Login'
								component={Login}
							/>
						)
				}
			</Stack.Navigator>
		</NavigationContainer>
	)
};