interface InvoiceItem {
    id: number;
    serviceId: number;
    description: string;
    quantity: number;
    unitPrice: number;
    iva: number; // IVA percentage
}

interface Invoice {
    id: number;
    clientId: number;
    date: string; // ISO date string
    invoiceNumber: string; // e.g., "2025-001"
    items: InvoiceItem[];
    totalBase: number; // Total before tax
    totalIva: number; // Total IVA amount
    total: number; // Total amount including tax
    pdfUrl?: string; // Optional URL for the PDF in Google Drive
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}