Node.js Invoice Processing Application
This project sets up a Node.js application using Express.js to handle file uploads and process invoice data from CSV or Excel files.

Features
File Upload Endpoint: Accepts both CSV and Excel files.
File Parsing Module: Reads and parses uploaded CSV or Excel files.
Data Validation: Ensures invoice data meets the following criteria:
Required fields are present.
Dates are in the correct format.
Numeric values are valid.
Invoice numbers are unique.
Error Reporting: Adds an "Errors" column to the file for any issues found.
JSON Structure: Creates a JSON structure for valid invoices, supporting multiple line items per invoice.
Mock Service Call: Simulates invoice creation with console.log.
Error Handling: Provides robust error handling throughout the process.
Usage
Start the Server: Run npm start


API Endpoints

Endpoint: /app/upload
Method: POST
Description: Uploads CSV or XLSX file to the server and adds error if they exist and returns errors with complete invoice details and json formatting
