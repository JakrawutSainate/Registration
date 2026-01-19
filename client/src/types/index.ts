export interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    timestamp: number;
}

export interface UserInput {
    firstName: string;
    lastName: string;
    phone: string;
}

export interface RegistrationContextType {
    users: User[];
    totalSeats: number;
    usedSeats: number;
    remainingSeats: number;
    registerUser: (user: UserInput) => void;
    setTotalSeats: (count: number) => void;
    fetchUsers: (params?: { search?: string; sortBy?: string; sortOrder?: string }) => void;
}

export interface Column {
    header: string;
    accessor: string;
}

export interface TableProps {
    data: any[];
    columns: Column[];
    title: string;
    onSearch?: (term: string) => void;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
    sortConfig?: { key: string; direction: 'asc' | 'desc' };
}
