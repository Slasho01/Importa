// services/authService.js
import { useAuth } from '../contexts/authContext';

export const authService = {
    login: async (username, password) => {
        const { login } = useAuth();
        await login(username, password);
    },
    logout: () => {
        const { logout } = useAuth();
        logout();
    }
};