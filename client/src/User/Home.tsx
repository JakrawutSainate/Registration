import { useState } from 'react';
import { useRegistration } from '../Context/RegistrationContext';
import { Table } from '../Components/Table';
import { Card, Button, Input, Badge } from '../Components/UI';

export default function Home() {
    const { users, remainingSeats, registerUser } = useRegistration();

    const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (form.firstName && form.lastName && form.phone) {
            registerUser(form);
            setForm({ firstName: '', lastName: '', phone: '' });
        }
    };

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Registration Form */}
                <Card className="md:col-span-1 h-fit">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Register</h2>
                        {remainingSeats > 0 ? (
                            <Badge type="success">Available</Badge>
                        ) : (
                            <Badge type="error">Full</Badge>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="First Name"
                            value={form.firstName}
                            onChange={e => setForm({ ...form, firstName: e.target.value })}
                            required
                        />
                        <Input
                            label="Last Name"
                            value={form.lastName}
                            onChange={e => setForm({ ...form, lastName: e.target.value })}
                            required
                        />
                        <Input
                            label="Phone Number"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            required
                        />

                        <div className="pt-2">
                            <div className="mb-4 text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-slate-500 text-sm">Seats Remaining: </span>
                                <span className="text-lg font-bold text-slate-800">{remainingSeats}</span>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={remainingSeats <= 0}
                            >
                                {remainingSeats > 0 ? 'Confirm Registration' : 'Registration Closed'}
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Public List */}
                <div className="md:col-span-2">
                    <Table
                        title="Registered Participants"
                        data={users}
                        columns={[
                            { header: 'First Name', accessor: 'firstName' },
                            { header: 'Last Name', accessor: 'lastName' },
                            { header: 'Phone', accessor: 'phone' }, // Requirement 2 says user sees "Name, Surname, Phone" list as well
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}