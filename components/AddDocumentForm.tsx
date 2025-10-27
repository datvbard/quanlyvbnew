
import React, { useState } from 'react';
import { PlusCircleIcon, DocumentTextIcon, ClipboardListIcon, UserCircleIcon, CalendarIcon, PencilAltIcon, ArrowUpTrayIcon, XCircleIcon } from './icons';
import { Document, DocumentType } from '../types';

interface AddDocumentFormProps {
    onAddDocument: (doc: Omit<Document, 'id'>) => void;
    documentTypes: DocumentType[];
}

const initialFormState = {
    name: '',
    type: 'Khác' as DocumentType,
    updatedBy: { name: '' },
    expiryDate: '',
    summary: '',
    file: undefined as File | undefined,
};

export const AddDocumentForm: React.FC<AddDocumentFormProps> = ({ onAddDocument, documentTypes }) => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'updatedBy') {
            setFormData(prev => ({ ...prev, updatedBy: { name: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({ ...prev, file: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.updatedBy.name || !formData.expiryDate) {
            alert('Vui lòng điền đầy đủ các trường bắt buộc.');
            return;
        }
        onAddDocument(formData);
        setFormData(initialFormState);
    };

    const InputField: React.FC<{ id: string; name: string; label: string; placeholder: string; type?: string; value: string; icon: React.ReactNode; required?: boolean }> = ({ id, name, label, placeholder, type = 'text', value, icon, required }) => (
        <div>
            <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                {icon}
                <span className="ml-2">{label}</span>
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-maroon focus:border-brand-maroon"
            />
        </div>
    );
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
                <PlusCircleIcon className="w-6 h-6 text-brand-maroon" />
                <h2 className="text-xl font-bold text-brand-maroon ml-2">Thêm Văn Bản Mới</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField id="name" name="name" label="Tên văn bản / Hợp đồng" placeholder="Ví dụ: Hợp đồng thuê nhà ABC" value={formData.name} icon={<DocumentTextIcon className="w-5 h-5 text-gray-500" />} required />
                    
                    <div>
                        <label htmlFor="type" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <ClipboardListIcon className="w-5 h-5 text-gray-500" />
                            <span className="ml-2">Loại văn bản</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-maroon focus:border-brand-maroon"
                        >
                            {documentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>

                    <InputField id="updatedBy" name="updatedBy" label="Cán bộ cập nhật" placeholder="Nhập tên người cập nhật" value={formData.updatedBy.name} icon={<UserCircleIcon className="w-5 h-5 text-gray-500" />} required />
                    <InputField id="expiryDate" name="expiryDate" label="Ngày hết hạn" placeholder="dd/mm/yyyy" type="date" value={formData.expiryDate} icon={<CalendarIcon className="w-5 h-5 text-gray-500" />} required />
                </div>
                
                <div>
                    <label htmlFor="summary" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <PencilAltIcon className="w-5 h-5 text-gray-500" />
                        <span className="ml-2">Nội dung tóm tắt</span>
                    </label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Nhập tóm tắt nội dung chính của văn bản..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-maroon focus:border-brand-maroon"
                    />
                </div>

                <div>
                    <label htmlFor="file-upload" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
                        <span className="ml-2">Tệp đính kèm</span>
                    </label>
                    <div className="mt-1 flex items-center">
                        <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon">
                            <span>Chọn tệp</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                        {formData.file && (
                            <div className="ml-4 flex items-center space-x-2">
                                <span className="text-sm text-gray-600">{formData.file.name}</span>
                                <button 
                                    type="button" 
                                    onClick={() => setFormData(prev => ({...prev, file: undefined}))}
                                    className="text-gray-400 hover:text-gray-600"
                                    aria-label="Remove file"
                                >
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex justify-start">
                    <button type="submit" className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-maroon hover:bg-brand-maroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon">
                        <PlusCircleIcon className="w-5 h-5 mr-2 -ml-1" />
                        Thêm Văn Bản
                    </button>
                </div>
            </form>
        </div>
    );
};