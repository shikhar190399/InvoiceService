// import moment from "moment";

// export const validateInvoices = (invoices) => {
//     const errors = [];
//     const validInvoices = [];
//     const invoiceNumbers = new Set();
  
//     invoices.forEach((invoice, index) => {
//       const rowErrors = [];
//       if (!invoice['Invoice Number']) rowErrors.push('Invoice Number is required');
//       if (!invoice['Date']) rowErrors.push('Date is required');
//       if (!invoice['Date'] || !moment(invoice['Date'], 'YYYY-MM-DD', true).isValid()) rowErrors.push('Invalid Date format');
//       if (!invoice['Customer Name']) rowErrors.push('Customer Name is required');
//       if (!invoice['Total Amount']) rowErrors.push('Total Amount is required');
  
//       if (rowErrors.length > 0) {
//         errors.push({ row: index + 1, errors: rowErrors });
//       } else {
//         if (invoiceNumbers.has(invoice['Invoice Number'])) {
//           errors.push({ row: index + 1, errors: ['Duplicate Invoice Number'] });
//         } else {
//           invoiceNumbers.add(invoice['Invoice Number']);
//           validInvoices.push(invoice);
//         }
//       }
//     });
  
//     return { errors, validInvoices };
//   };
  
import moment from "moment";

export const validateInvoices = (invoices) => {
    const errors = [];
    const validInvoices = [];
    const invoiceNumbers = new Set();

    invoices.forEach((invoice, index) => {
        const rowErrors = [];
        if (!invoice['Invoice Number']) rowErrors.push('Invoice Number is required');
        if (!invoice['Date']) rowErrors.push('Date is required');
        if (!invoice['Date'] || !moment(invoice['Date'], 'DD-MM-YYYY', true).isValid()) rowErrors.push('Invalid Date format');
        if (!invoice['Customer Name']) rowErrors.push('Customer Name is required');
        if (!invoice['Total Amount']) rowErrors.push('Total Amount is required');

        if (rowErrors.length > 0) {
            invoice.Errors = rowErrors.join(', ');
            errors.push({ row: index + 1, errors: rowErrors });
        } else {
            if (invoiceNumbers.has(invoice['Invoice Number'])) {
                invoice.Errors = 'Duplicate Invoice Number';
                errors.push({ row: index + 1, errors: ['Duplicate Invoice Number'] });
            } else {
                invoiceNumbers.add(invoice['Invoice Number']);
                validInvoices.push(invoice);
            }
        }
    });

    return { errors, validInvoices, invoices };
};
