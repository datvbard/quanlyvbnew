
export enum DocumentStatus {
    Valid = 'Còn hạn',
    ExpiringSoon = 'Sắp hết hạn',
    Expired = 'Đã hết hạn',
}

export type DocumentType = 'Nhân sự' | 'Tín dụng' | 'Khác';

export interface Document {
    id: string;
    name: string;
    summary: string;
    type: DocumentType;
    expiryDate: string; // YYYY-MM-DD format
    updatedBy: {
        name: string;
    };
    file?: File;
}

export interface DocumentWithStatus extends Document {
    status: DocumentStatus;
    formattedExpiryDate: string;
}