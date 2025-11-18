import type { User, UserRole } from '../types';

const USERS_KEY = 'skillmatch_users';
const SESSION_KEY = 'skillmatch_session';

// Helper to get users from localStorage
const getUsers = (): User[] => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/**
 * Signs up a new user and stores them in localStorage.
 * @throws an error if the email is already taken.
 */
export const signup = (name: string, email: string, password: string, role: UserRole): User => {
    const users = getUsers();
    if (users.find(user => user.email === email)) {
        throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
        role,
    };

    users.push(newUser);
    saveUsers(users);
    
    // Automatically log in the user after signup
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

    return newUser;
};

/**
 * Logs in a user by checking credentials against localStorage.
 * @throws an error if credentials are invalid.
 */
export const login = (email: string, password: string): User => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
};

/**
 * Logs out the current user by clearing the session from localStorage.
 */
export const logout = (): void => {
    localStorage.removeItem(SESSION_KEY);
};

/**
 * Retrieves the currently logged-in user from the session.
 * @returns The user object or null if not logged in.
 */
export const getCurrentUser = (): User | null => {
    const sessionJson = localStorage.getItem(SESSION_KEY);
    if (!sessionJson) {
        return null;
    }

    try {
        const user = JSON.parse(sessionJson);
        // Validate the parsed user object to ensure it's not corrupted
        if (user && typeof user === 'object' && user.id && user.email && user.role && user.name) {
            return user;
        }
        // If data is malformed, clear the session and return null
        logout();
        return null;
    } catch (error) {
        console.error("Failed to parse user session, clearing session:", error);
        // If parsing fails, clear the session and return null
        logout();
        return null;
    }
};