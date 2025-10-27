
import React from 'react';
// Fix: Import ClipboardListIcon to resolve reference error.
import { FilterIcon, SearchIcon, ClipboardListIcon } from './icons';

interface FilterSearchProps {
    filterType: string;
    setFilterType: (type: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    documentTypes: string[];
}

export const FilterSearch: React.FC<FilterSearchProps> = ({ filterType, setFilterType, searchTerm, setSearchTerm, documentTypes }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
                <FilterIcon className="w-6 h-6 text-brand-maroon" />
                <h2 className="text-xl font-bold text-brand-maroon ml-2">Bộ Lọc & Tìm Kiếm</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="filterType" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                       <ClipboardListIcon className="w-5 h-5 text-gray-500" />
                       <span className="ml-2">Lọc theo loại văn bản</span>
                    </label>
                    <select
                        id="filterType"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-maroon focus:border-brand-maroon"
                    >
                        {documentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="search" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <SearchIcon className="w-5 h-5 text-gray-500" />
                        <span className="ml-2">Tìm kiếm nhanh</span>
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm theo tên văn bản, cán bộ..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-maroon focus:border-brand-maroon"
                    />
                </div>
            </div>
        </div>
    );
};