import { Card } from './UI';
import type { TableProps } from '../types';

export function Table({ data, columns, title, onSort, sortConfig, action }: TableProps) {
    return (
        <Card className="overflow-hidden p-0">
            <div className="p-6 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                {action && <div className="w-full sm:w-auto">{action}</div>}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            {columns.map((col) => (
                                <th
                                    key={col.accessor}
                                    className="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                                    onClick={() => onSort && onSort(col.accessor)}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.header}
                                        {sortConfig?.key === col.accessor && (
                                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.length > 0 ? (
                            data.map((row, index) => (
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
                Total {data.length} records
            </div>
        </Card>
    );
}
