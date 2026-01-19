import { useState, useEffect } from 'react';
import { useRegistration } from '../Context/RegistrationContext';
import { API } from '../api/v1';
import { Table } from '../Components/Table';
import { Card, Button, Input } from '../Components/UI';
import type { User } from '../types';

export default function AdminDashboard() {
    const { setTotalSeats, totalSeats, remainingSeats, usedSeats } = useRegistration(); // Don't use global users
    const [seatInput, setSeatInput] = useState(String(totalSeats));

    // Local State
    const [localUsers, setLocalUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });

    // Fetch Data
    useEffect(() => {
        fetchData();
    }, [search, sortConfig]); // Auto-fetch on change

    const fetchData = async () => {
        try {
            const data = await API.getAllUsers({
                search: search,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.direction
            });
            setLocalUsers(data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        }
    };

    const handleUpdateKey = () => {
        const num = parseInt(seatInput, 10);
        if (!isNaN(num) && num >= 0) {
            setTotalSeats(num);
        }
    };

    const handleSort = (key: string) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Settings Card */}
                <Card className="flex-1">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Settings</h2>
                    <div className="flex items-end gap-3">
                        <Input
                            label="Total Seats"
                            type="number"
                            min="0"
                            value={seatInput}
                            onChange={(e) => setSeatInput(e.target.value)}
                        />
                        <Button onClick={handleUpdateKey} className="mb-[1px]">Update</Button>
                    </div>
                </Card>

                {/* Stats Card */}
                <Card className="flex-1 flex items-center justify-around">
                    <div className="text-center">
                        <p className="text-sm text-slate-500 font-medium mb-1">Total Seats</p>
                        <p className="text-3xl font-black text-slate-800">{totalSeats}</p>
                    </div>
                    <div className="w-px h-12 bg-slate-100"></div>
                    <div className="text-center">
                        <p className="text-sm text-slate-500 font-medium mb-1">Registered</p>
                        <p className="text-3xl font-black text-indigo-600">{usedSeats}</p>
                    </div>
                    <div className="w-px h-12 bg-slate-100"></div>
                    <div className="text-center">
                        <p className="text-sm text-slate-500 font-medium mb-1">Remaining</p>
                        <p className="text-3xl font-black text-emerald-600">{remainingSeats}</p>
                    </div>
                </Card>
            </div>

            <Table
                title="Registered Users (Admin View)"
                data={localUsers}
                columns={[
                    { header: 'First Name', accessor: 'firstName' },
                    { header: 'Last Name', accessor: 'lastName' },
                    { header: 'Phone Number', accessor: 'phone' },
                ]}
                onSort={handleSort}
                sortConfig={sortConfig}
                action={
                    <div className="w-full sm:w-72">
                        <Input
                            label=""
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                }
            />
        </div>
    );
}
