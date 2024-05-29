// const ExcelJS = require('exceljs');
import ExcelJS from "exceljs";

// const workbook = new ExcelJS.Workbook();


// workbook.creator = 'Me';
// workbook.lastModifiedBy = 'Her';
// workbook.created = new Date(1985, 8, 30);
// workbook.modified = new Date();
// workbook.lastPrinted = new Date(2016, 9, 27);

// workbook.properties.date1904 = true;

// workbook.calcProperties.fullCalcOnLoad = true;
// // force tge no of view workbook
// workbook.views = [
//   {
//     x: 0, y: 0, width: 10000, height: 20000,
//     firstSheet: 0, activeTab: 1, visibility: 'visible'
//   }
// ]

// // add a worksheet
// // create a sheet with red tab colour
// const sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

export async function excelDownload(data){
  console.log(data, "Dadadjadj")
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Invoices');
  
  // Define the columns
  worksheet.columns = [
      { header: 'Control Unit Invoice Number', key: 'controlUnitInvoiceNumber', width: 30 },
      { header: 'Invoice Date', key: 'invoiceDate', width: 15 },
      { header: 'Total Taxable Amount', key: 'totalTaxableAmount', width: 20 },
      { header: 'Total Tax Amount', key: 'totalTaxAmount', width: 20 },
      { header: 'Total Invoice Amount', key: 'totalInvoiceAmount', width: 20 },
      { header: 'Supplier Name', key: 'supplierName', width: 25 }
  ];
  
  // Add rows to the worksheet
  data.forEach((item) => {
      worksheet.addRow({
          controlUnitInvoiceNumber: item["Control Unit Invoice Number"],
          invoiceDate: item["Invoice Date"],
          totalTaxableAmount: item["Total Taxable Amount"],
          totalTaxAmount: item["Total Tax Amount"],
          totalInvoiceAmount: item["Total Invoice Amount"],
          supplierName: item["Supplier Name"]
      });
  });

  const buffer =  await workbook.xlsx.writeBuffer();

      // Create a blob from the buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Invoices.xlsx';


      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);

}