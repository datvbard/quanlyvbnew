
import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { AddDocumentForm } from './components/AddDocumentForm';
import { FilterSearch } from './components/FilterSearch';
import { DocumentList } from './components/DocumentList';
import { Footer } from './components/Footer';
import { Document, DocumentStatus, DocumentType } from './types';
import { getStatusFromDate, formatDate } from './utils/dateHelper';

const initialDocuments: Document[] = [
    {
        id: '1',
        name: '330/TCT-QLĐT-XD',
        summary: 'TCT v/v hướng dẫn một số công tác trong quản lý đầu tư nội ngành tại Agribank',
        type: 'Nhân sự',
        expiryDate: '2025-07-23',
        updatedBy: { name: 'Phạm Văn A' },
    },
    {
        id: '2',
        name: '1879/QĐ-NHNo-CNTT',
        summary: 'Quy chế an toàn, bảo mật hệ thống CNTT trong hoạt động của Agribank',
        type: 'Khác',
        expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expiring in 20 days
        updatedBy: { name: 'Trần Thị B' },
    },
    {
        id: '3',
        name: '10296/NHNo-PCRT',
        summary: 'Thông báo chính sách cấm vận của ngân hàng Bank of America, Mỹ',
        type: 'Khác',
        expiryDate: '9999-01-01',
        updatedBy: { name: 'Lê Văn C' },
    },
    {
        id: '4',
        name: '18793/NHNo-RRDT',
        summary: 'Kết quả điều tra nhóm nợ theo thông báo của CIC kỳ 30/11/2024',
        type: 'Tín dụng',
        expiryDate: '9999-01-01',
        updatedBy: { name: 'Nguyễn Thị D' },
    },
     {
        id: '5',
        name: 'Hợp đồng lao động - NV E',
        summary: 'Hợp đồng lao động thời hạn 1 năm cho nhân viên mới',
        type: 'Nhân sự',
        expiryDate: '2023-12-31',
        updatedBy: { name: 'Nguyễn Thị D' },
    },
];


const App: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [filterType, setFilterType] = useState<string>('Tất cả');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const addDocument = useCallback((doc: Omit<Document, 'id'>) => {
        const newDoc: Document = {
            ...doc,
            id: crypto.randomUUID(),
        };
        setDocuments(prevDocs => [newDoc, ...prevDocs]);
    }, []);

    const deleteDocument = useCallback((id: string) => {
        setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    }, []);
    
    const editDocument = useCallback((id: string) => {
        alert(`Chức năng sửa cho văn bản ID: ${id} chưa được cài đặt.`);
    }, []);

    const viewDocument = useCallback((id: string) => {
        const doc = documents.find(d => d.id === id);
        if (doc) {
            const fileInfo = doc.file ? `\nTệp đính kèm: ${doc.file.name}` : '\nKhông có tệp đính kèm.';
            alert(`Xem chi tiết văn bản: ${doc.name}\n\nNội dung: ${doc.summary}\nNgười cập nhật: ${doc.updatedBy.name}\nNgày hết hạn: ${formatDate(doc.expiryDate)}${fileInfo}`);
        }
    }, [documents]);

    const documentsWithStatus = useMemo(() => {
        return documents.map(doc => ({
            ...doc,
            status: getStatusFromDate(doc.expiryDate),
            formattedExpiryDate: formatDate(doc.expiryDate),
        }));
    }, [documents]);

    const filteredDocuments = useMemo(() => {
        return documentsWithStatus.filter(doc => {
            const matchesFilter = filterType === 'Tất cả' || doc.type === filterType;
            const matchesSearch = searchTerm === '' ||
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.updatedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [documentsWithStatus, filterType, searchTerm]);

    const stats = useMemo(() => {
        const total = documentsWithStatus.length;
        const valid = documentsWithStatus.filter(d => d.status === DocumentStatus.Valid).length;
        const expiringSoon = documentsWithStatus.filter(d => d.status === DocumentStatus.ExpiringSoon).length;
        const expired = documentsWithStatus.filter(d => d.status === DocumentStatus.Expired).length;
        return { total, valid, expiringSoon, expired };
    }, [documentsWithStatus]);

    const documentTypes = useMemo(() => ['Tất cả', ...Array.from(new Set(documents.map(d => d.type)))], [documents]);

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <main className="container mx-auto p-4 md:p-8">
                <Header stats={stats} />
                <div className="space-y-8 mt-8">
                    <AddDocumentForm onAddDocument={addDocument} documentTypes={documentTypes.filter(t => t !== 'Tất cả') as DocumentType[]} />
                    <FilterSearch 
                        filterType={filterType}
                        setFilterType={setFilterType}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        documentTypes={documentTypes}
                    />
                    <DocumentList 
                        documents={filteredDocuments}
                        onView={viewDocument}
                        onEdit={editDocument}
                        onDelete={deleteDocument}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;