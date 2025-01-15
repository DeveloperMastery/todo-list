import React, { useEffect } from 'react';
import { account, getSession, login, logout } from '../appwrite/appwrite';
import GoogleButton from 'react-google-button';
import { useSession } from '../store/store';

export default function LoginButton() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const setSession = useSession(state => state.setSession)
    const unsetSession = useSession(state => state.unsetSession)
    const session = useSession(state => state.session)

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const loginSession = await login();
            setSession(loginSession)
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const checkSession = async () => {
        try {
            const fetchedSession = await getSession();
            if (fetchedSession) {
                setSession(fetchedSession);
            }
        } catch (error) {
            console.error('Session check failed:', error);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
            unsetSession();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Check session on component mount
    useEffect(() => {
        checkSession();
    }, []);

    if (session) {
        return (
            <div>
                <GoogleButton
                    type="dark"
                    onClick={handleLogout}
                    disabled={isLoading}
                    label={isLoading ? 'Logging out...' : 'Sign Out'}
                    style={{
                        cursor: isLoading ? 'wait' : 'pointer'
                    }}
                />
            </div>
        );
    }

    return (
        <div>
            <GoogleButton
                type="light"
                onClick={handleLogin}
                disabled={isLoading}
                label={isLoading ? 'Logging in...' : 'Sign in with Google'}
                style={{
                    border: 'none',
                    cursor: isLoading ? 'wait' : 'pointer'
                }}
            />

            {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </p>
            )}
        </div>
    );
}