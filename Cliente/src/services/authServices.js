import { useAuth } from '../contexts/authContext';

const useAuthService = () => {
    const { login, logout } = useAuth();

    const loginService = async (username, password) => {
        await login(username, password);
    };

    const logoutService = () => {
        logout();
    };

    return {
        login: loginService,
        logout: logoutService,
    };
};

export default useAuthService;