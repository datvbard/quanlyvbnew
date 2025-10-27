
import React from 'react';
import { ChartBarIcon } from './icons';

interface HeaderProps {
    stats: {
        total: number;
        valid: number;
        expiringSoon: number;
        expired: number;
    };
}

const StatCard: React.FC<{ title: string; value: number; colorClass: string }> = ({ title, value, colorClass }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4 relative">
        <div className={`w-1.5 h-12 rounded-full ${colorClass}`}></div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


export const Header: React.FC<HeaderProps> = ({ stats }) => {
    return (
        <header>
            <div className="flex items-center space-x-3 mb-6">
                <ChartBarIcon className="w-8 h-8 text-brand-maroon" />
                <h1 className="text-2xl md:text-3xl font-bold text-brand-maroon tracking-tight">
                    SỔ TAY THỜI HẠN HIỆU LỰC CỦA VĂN BẢN
                </h1>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="TỔNG VĂN BẢN" value={stats.total} colorClass="bg-brand-maroon" />
                <StatCard title="CÒN HẠN" value={stats.valid} colorClass="bg-green-500" />
                <StatCard title="SẮP HẾT HẠN" value={stats.expiringSoon} colorClass="bg-yellow-400" />
                <StatCard title="ĐÃ QUÁ HẠN" value={stats.expired} colorClass="bg-red-500" />
            </div>
        </header>
    );
};
