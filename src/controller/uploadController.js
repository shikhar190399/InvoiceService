import fs from 'fs';
import { parseFile } from "../service/parseFile.js";
import { validateInvoices } from "../service/validateInvoices.js";
import { createObjectCsvWriter } from 'csv-writer';
import xlsx from 'xlsx';

// Group invoices by 'Invoice Number' to create JSON structure
const groupInvoicesByNumber = (invoices) => {
    const groupedInvoices = invoices.reduce((acc, invoice) => {
        const invoiceNumber = invoice['Invoice Number'];
        if (!acc[invoiceNumber]) {
            acc[invoiceNumber] = {
                invoiceNumber,
                customerName: invoice['Customer Name'],
                date: invoice['Date'],
                totalAmount: invoice['Total Amount'],
                lineItems: []
            };
        }
        acc[invoiceNumber].lineItems.push({
            description: invoice['Description'],
            quantity: invoice['Quantity'],
            unitPrice: invoice['Unit Price'],
            lineTotal: invoice['Line Total']
        });
        return acc;
    }, {});
    return Object.values(groupedInvoices);
};

export const handleFileUpload = async (req, res) => {
    try {
        const filePath = req.file.path;
        const invoices = await parseFile(filePath);
        const validationResult = validateInvoices(invoices);

        // Simulate creating invoices and log success or failure
        validationResult.validInvoices.forEach(invoice => {
            try {
                console.log('Creating invoice:', invoice);
                // Simulate service call to create an invoice
                // Example: await createInvoiceService(invoice); 
                console.log('Invoice created successfully');
            } catch (err) {
                console.error('Failed to create invoice:', invoice, err);
            }
        });

        // Add errors column to invoices
        const updatedInvoices = invoices.map((invoice, index) => {
            const error = validationResult.errors.find(err => err.row === index + 1);
            return { ...invoice, Errors: error ? error.errors.join(', ') : '' };
        });

        // Save the updated invoices back to a file
        if (filePath.endsWith('.csv')) {
            const csvWriter = createObjectCsvWriter({
                path: filePath,
                header: Object.keys(updatedInvoices[0]).map(key => ({ id: key, title: key }))
            });
            await csvWriter.writeRecords(updatedInvoices);
        } else if (filePath.endsWith('.xlsx')) {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = xlsx.utils.json_to_sheet(updatedInvoices);
            workbook.Sheets[sheetName] = sheet;
            xlsx.writeFile(workbook, filePath);
        }

        // Group valid invoices into a JSON structure
        const groupedInvoices = groupInvoicesByNumber(validationResult.validInvoices);
        const jsonInvoices = groupedInvoices.map(invoice => ({
            invoiceNumber: invoice.invoiceNumber,
            customerName: invoice.customerName,
            date: invoice.date,
            totalAmount: invoice.totalAmount,
            lineItems: invoice.lineItems
        }));

        res.status(200).json({
            errors: validationResult.errors,
            validInvoices: validationResult.validInvoices,
            jsonInvoices
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
