import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { useAuth } from '../contexts/AuthContext';
import { Button, Text, TextInput } from 'react-native-paper';

const Login = () => {

	// States for form inputs
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');

	// Login function
	const { onLogin } = useAuth();

	// Function for the button that executes the onLogin function of the useAuth hook
	const login = async () => {
		await onLogin(email, username);
	};

	return (
		<View
			style={styles.container}
		>
			<View
				style={{
					...styles.item,
					alignItems: 'center'
				}}
			>
				<Text
					variant='headlineLarge'
				>
					Welcome
				</Text>
			</View>
			<View
				style={styles.item}
			>
				<TextInput
					label='email'
					value={email}
					onChangeText={((email) => setEmail(email))}
				/>
			</View>
			<View
				style={styles.item}
			>
				<TextInput
					label='username'
					value={username}
					onChangeText={((username) => setUsername(username))}
				/>
			</View>
			<View
				style={styles.item}
			>
				<Button
					mode='contained'
					onPress={login}
				>
					Login
				</Button>
			</View>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 12,
	},
	item: {
		marginVertical: 5,
	},
});

export default Login;