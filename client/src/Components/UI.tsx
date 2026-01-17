import React from 'react';

export const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>
        {children}
    </div>
);

export const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <input
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-800 placeholder:text-slate-400"
            {...props}
        />
    </div>
);

export const Button = ({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }) => {
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20",
        secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
    };

    return (
        <button
            className={`px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const Badge = ({ children, type = "neutral" }: { children: React.ReactNode, type?: "neutral" | "success" | "warning" | "error" }) => {
    const types = {
        neutral: "bg-slate-100 text-slate-600",
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-rose-100 text-rose-700"
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${types[type]}`}>
            {children}
        </span>
    );
};
