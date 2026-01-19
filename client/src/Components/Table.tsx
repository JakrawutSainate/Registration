import { useState, useMemo } from 'react';
import { Input, Card } from './UI';
import type { TableProps } from '../types';

export function Table({ data, columns, title, onSearch, onSort, sortConfig }: TableProps) {
    // Internal state for client-side fallback
    const [internalSearchTerm, setInternalSearchTerm] = useState("");
    const [internalSortKey, setInternalSortKey] = useState("");
    const [internalSortDirection, setInternalSortDirection] = useState("asc");

    // Determine values to use
    // Let's keep it simple: If onSearch provided, we assume parent handles data fetching but we can still keep local input state for the UI.
    // Given the prompt "simple code", let's make the Table component handle the INPUT state locally but trigger the callback.

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (onSearch) {
            onSearch(value);
        } else {
            setInternalSearchTerm(value);
        }
    };

    const handleSortClick = (key: string) => {
        if (onSort) {
            const currentDir = sortConfig?.key === key ? sortConfig.direction : 'desc'; // Default to desc if new key? Or whatever.
            const newDir = currentDir === 'asc' ? 'desc' : 'asc';
            onSort(key, newDir);
        } else {
            if (internalSortKey === key) {
                setInternalSortDirection(internalSortDirection === 'asc' ? 'desc' : 'asc');
            } else {
                setInternalSortKey(key);
                setInternalSortDirection('asc');
            }
        }
    };

    const finalData = useMemo(() => {
        // If server-side mode (handlers present), assume data is already processed
        if (onSearch || onSort) return data;

        let processedData = [...data];

        // Client-side Search
        if (internalSearchTerm) {
            processedData = processedData.filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(internalSearchTerm.toLowerCase())
                )
            );
        }

        // Client-side Sort
        if (internalSortKey) {
            processedData.sort((a, b) => {
                if (a[internalSortKey] < b[internalSortKey]) {
                    return internalSortDirection === 'asc' ? -1 : 1;
                }
                if (a[internalSortKey] > b[internalSortKey]) {
                    return internalSortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return processedData;
    }, [data, internalSearchTerm, internalSortKey, internalSortDirection, onSearch, onSort]);

    const activeSortKey = sortConfig ? sortConfig.key : internalSortKey;
    const activeSortDirection = sortConfig ? sortConfig.direction : internalSortDirection;

    return (
        <Card className="overflow-hidden p-0">
            <div className="p-6 border-b border-slate-100 bg-white">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                    <div className="w-full sm:w-72">
                        <Input
                            label=""
                            placeholder="Search..."
                            defaultValue="" // Use defaultValue to avoid controlled/uncontrolled issues if we don't pass value
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            {columns.map((col) => (
                                <th
                                    key={col.accessor}
                                    className="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                                    onClick={() => handleSortClick(col.accessor)}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.header}
                                        {activeSortKey === col.accessor && (
                                            <span>{activeSortDirection === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {finalData.length > 0 ? (
                            finalData.map((row, index) => (
                                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.accessor} className="px-6 py-4 text-sm text-slate-700">
                                            {row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500 italic">
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500 text-right">
                Total {finalData.length} records
            </div>
        </Card>
    );
}
