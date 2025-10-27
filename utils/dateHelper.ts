
import { DocumentStatus } from '../types';

const EXPIRING_SOON_DAYS = 30;

export const getStatusFromDate = (expiryDateStr: string): DocumentStatus => {
    if (expiryDateStr === '9999-01-01') return DocumentStatus.Valid;
    
    const now = new Date();
    const expiryDate = new Date(expiryDateStr);
    
    // Set time to 0 to compare dates only
    now.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return DocumentStatus.Expired;
    }
    if (diffDays <= EXPIRING_SOON_DAYS) {
        return DocumentStatus.ExpiringSoon;
    }
    return DocumentStatus.Valid;
};

export const formatDate = (dateStr: string): string => {
    if (dateStr === '9999-01-01') return 'Vô thời hạn';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
