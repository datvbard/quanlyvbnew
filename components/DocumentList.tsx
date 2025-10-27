
import React, { useState, useRef, useEffect } from 'react';
import { DocumentWithStatus, DocumentStatus } from '../types';
import { 
    ListIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, UsersIcon, CreditCardIcon, 
    DocumentIcon, XCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, UserCircleIcon, 
    PencilIcon, TrashIcon, EyeIcon, Cog6ToothIcon, PaperClipIcon
} from './icons';

interface DocumentListProps {
    documents: DocumentWithStatus[];
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const statusStyles: Record<DocumentStatus, { bg: string; text: string; icon: React.ReactNode }> = {
    [DocumentStatus.Expired]: { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircleIcon className="w-4 h-4" /> },
    [DocumentStatus.ExpiringSoon]: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <ExclamationTriangleIcon className="w-4 h-4" /> },
    [DocumentStatus.Valid]: { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircleIcon className="w-4 h-4" /> },
};

const typeIcons: Record<string, React.ReactNode> = {
    'Nhân sự': <UsersIcon className="w-6 h-6 text-brand-maroon" />,
    'Tín dụng': <CreditCardIcon className="w-6 h-6 text-gray-600" />,
    'Khác': <DocumentIcon className="w-6 h-6 text-blue-600" />,
};

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onView, onEdit, onDelete }) => {
    const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        type: true,
        expiryDate: true,
        status: true,
        updatedBy: true,
    });

    const columnPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (columnPickerRef.current && !columnPickerRef.current.contains(event.target as Node)) {
                setIsColumnPickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleColumn = (column: keyof typeof visibleColumns) => {
        setVisibleColumns(prev => ({...prev, [column]: !prev[column]}));
    };
    
    const columnLabels: Record<keyof typeof visibleColumns, string> = {
        type: 'Loại Văn Bản',
        expiryDate: 'Ngày Hết Hạn',
        status: 'Trạng Thái',
        updatedBy: 'Cán Bộ Cập Nhật',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <ListIcon className="w-6 h-6 text-brand-maroon" />
                    <h2 className="text-xl font-bold text-brand-maroon ml-2">Danh Sách Văn Bản</h2>
                </div>
                <div className="flex space-x-2">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                        Xuất File
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                        Nhập File
                    </button>
                    <div className="relative" ref={columnPickerRef}>
                        <button 
                            onClick={() => setIsColumnPickerOpen(prev => !prev)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon"
                        >
                            <Cog6ToothIcon className="w-5 h-5 mr-2" />
                            Tuỳ chỉnh
                        </button>
                        {isColumnPickerOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <div className="px-4 py-2 text-sm font-semibold text-gray-800 border-b">Hiển thị cột</div>
                                    {(Object.keys(visibleColumns) as Array<keyof typeof visibleColumns>).map((key) => (
                                        <label key={key} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            <span>{columnLabels[key]}</span>
                                            <input
                                                type="checkbox"
                                                checked={visibleColumns[key]}
                                                onChange={() => toggleColumn(key)}
                                                className="rounded text-brand-maroon focus:ring-brand-maroon"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Văn Bản</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội Dung Tóm Tắt</th>
                            {visibleColumns.type && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại Văn Bản</th>}
                            {visibleColumns.expiryDate && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Hết Hạn</th>}
                            {visibleColumns.status && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>}
                            {visibleColumns.updatedBy && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cán Bộ Cập Nhật</th>}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map((doc) => (
                            <tr key={doc.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div className="flex items-center">
                                        <span>{doc.name}</span>
                                        {doc.file && <PaperClipIcon className="w-4 h-4 ml-2 text-gray-500" title={`File: ${doc.file.name}`} />}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">{doc.summary}</td>
                                {visibleColumns.type && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            {typeIcons[doc.type] || <DocumentIcon className="w-6 h-6 text-gray-400" />}
                                            <span>{doc.type}</span>
                                        </div>
                                    </td>
                                )}
                                {visibleColumns.expiryDate && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.formattedExpiryDate}</td>}
                                {visibleColumns.status && (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[doc.status].bg} ${statusStyles[doc.status].text}`}>
                                            {statusStyles[doc.status].icon}
                                            <span className="ml-1.5">{doc.status}</span>
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.updatedBy && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <UserCircleIcon className="w-5 h-5 text-gray-400 mr-2" />
                                            {doc.updatedBy.name}
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                     <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onView(doc.id)}
                                            className="p-2 rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            aria-label="Xem"
                                            title="Xem"
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(doc.id)}
                                            className="p-2 rounded text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            aria-label="Sửa"
                                            title="Sửa"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(doc.id)}
                                            className="p-2 rounded text-white bg-brand-maroon hover:bg-brand-maroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon"
                                            aria-label="Xoá"
                                            title="Xoá"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {documents.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    <p>Không tìm thấy văn bản nào.</p>
                </div>
            )}
        </div>
    );
};