import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User, RegistrationContextType, UserInput } from '../types';
import { API } from '../api/v1';

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState({ totalSeats: 0, usedSeats: 0, remainingSeats: 0 });



    const fetchData = async () => {
        try {
            // Fetch users and stats in parallel
            const [usersData, statsData] = await Promise.all([
                API.getAllUsers(),
                API.getUserStats()
            ]);
            setUsers(usersData);
            setStats(statsData);
        } catch (err) {
            console.error(err);
        }
    };

    // Initial Fetch
    useEffect(() => {
        fetchData();
        // Optional: Polling could go here
    }, []);

    const registerUser = async (userData: UserInput) => {
        try {
            await API.registerUser(userData);
            alert("Registration Successful!");
            fetchData(); // Refresh data
        } catch (err: any) {
            alert(err.message || "Registration Failed");
        }
    };

    const setTotalSeats = async (count: number) => {
        try {
            await API.setTotalSeats(count);
            fetchData(); // Refresh data
        } catch (err: any) {
            alert(err.message || "Failed to set seats");
        }
    };

    const value = useMemo(() => ({
        users,
        totalSeats: stats.totalSeats,
        usedSeats: stats.usedSeats,
        remainingSeats: stats.remainingSeats,
        registerUser,
        setTotalSeats
    }), [users, stats]);

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    );
};

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error('useRegistration must be used within a RegistrationProvider');
    }
    return context;
};
