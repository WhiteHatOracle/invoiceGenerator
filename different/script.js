function generateInvoice() {
    // Get input values
    const companyName = document.getElementById('companyName').value;
    const firstBandRange = document.getElementById('firstBandRange').value.split('-').map(Number);
    const secondBandRange = document.getElementById('secondBandRange').value.split('-').map(Number);
    const thirdBandRange = document.getElementById('thirdBandRange').value.split('-').map(Number);
    const firstBandCost = parseFloat(document.getElementById('firstBandCost').value);
    const secondBandCost = parseFloat(document.getElementById('secondBandCost').value);
    const thirdBandCost = parseFloat(document.getElementById('thirdBandCost').value);
    const weights = document.getElementById('weights').value.split(',').map(Number);

    // Initialize variables
    let totalWeight = 0;
    let averageWeight = 0;
    let firstPrice = 0, secondPrice = 0, thirdPrice = 0;
    let fweight = 0, sweight = 0, tweight = 0;
    let numOfPigsInFirstBand = 0, numOfPigsInSecondBand = 0, numOfPigsInThirdBand = 0;

    // Calculate weight bands and costs
    weights.forEach(weight => {
        totalWeight += weight;

        if (weight >= firstBandRange[0] && weight <= firstBandRange[1]) {
            const price = weight * firstBandCost;
            firstPrice += price;
            fweight += weight;
            numOfPigsInFirstBand++;
        }

        if (weight >= secondBandRange[0] && weight <= secondBandRange[1]) {
            const price = weight * secondBandCost;
            secondPrice += price;
            sweight += weight;
            numOfPigsInSecondBand++;
        }

        if (weight >= thirdBandRange[0] && weight <= thirdBandRange[1]) {
            const price = weight * thirdBandCost;
            thirdPrice += price;
            tweight += weight;
            numOfPigsInThirdBand++;
        }
    });

    // Calculate average weight
    const totalPigs = numOfPigsInFirstBand + numOfPigsInSecondBand + numOfPigsInThirdBand;
    averageWeight = totalWeight / totalPigs;

    // Total Price
    const totalPrice = firstPrice + secondPrice + thirdPrice;

    // Generate Invoice Output
    const output = `
      <h2>Invoice for ${companyName}</h2>
      <p><strong>Total Weight:</strong> ${totalWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p><strong>Average Weight:</strong> ${averageWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      
      <h3>Price Breakdown:</h3>
      <p><strong>First Band (${firstBandRange[0]}-${firstBandRange[1]} kg @ K${firstBandCost}/kg):</strong></p>
      <p>Number of pigs: ${numOfPigsInFirstBand}</p>
      <p>Total weight: ${fweight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p>Price: K${firstPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
      
      <p><strong>Second Band (${secondBandRange[0]}-${secondBandRange[1]} kg @ K${secondBandCost}/kg):</strong></p>
      <p>Number of pigs: ${numOfPigsInSecondBand}</p>
      <p>Total weight: ${sweight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p>Price: K${secondPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
      
      <p><strong>Third Band (${thirdBandRange[0]}-${thirdBandRange[1]} kg @ K${thirdBandCost}/kg):</strong></p>
      <p>Number of pigs: ${numOfPigsInThirdBand}</p>
      <p>Total weight: ${tweight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p>Price: K${thirdPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
      
      <p><strong>Total Price:</strong> K${totalPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
    `;

    document.getElementById('invoiceOutput').innerHTML = output;
}


// function downloadPDF() {
//     try {
//         const companyName = document.getElementById('companyName').value || "Unknown Company";
//         const date = new Date().toISOString().slice(0, 10); // Current date

//         console.log("Company Name: ", companyName);

//         const { jsPDF } = window.jspdf;

//         // Initialize jsPDF
//         const doc = new jsPDF();

//         // Title
//         doc.setFontSize(16);
//         doc.text(companyName, 10, 20);
//         doc.setFontSize(12);
//         doc.text(`Date: ${date}`, 10, 30);

//         // Placeholder table
//         const rows = [["56.7 kg", "K65.00", "K3685.50"], ["Total", "", "K3685.50"]];
//         doc.autoTable({
//             startY: 40,
//             head: [["Weight", "Unit Price", "Total Price"]],
//             body: rows,
//         });

//         // Save PDF
//         doc.save(`${companyName}_${date}.pdf`);
//     } catch (error) {
//         console.error("Error generating PDF:", error);
//         alert("Failed to generate the PDF. Check console for details.");
//     }
// }

// 

function downloadPDF() {
    try {
        const companyName = document.getElementById('companyName').value || "Unknown Company";
        const date = new Date().toISOString().slice(0, 10); // Current date

        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text(`Invoice for ${companyName}`, 10, 20);
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 10, 30);

        // Safely retrieve values
        const getPrice = (id) => {
            const el = document.getElementById(id);
            return el ? parseFloat(el.textContent) : 0;
        };

        const firstPrice = getPrice('firstPrice');
        const secondPrice = getPrice('secondPrice');
        const thirdPrice = getPrice('thirdPrice');
        const totalPrice = firstPrice + secondPrice + thirdPrice;

        // Prepare table data
        const rows = [
            ["First Band", `K${firstPrice.toFixed(2)}`],
            ["Second Band", `K${secondPrice.toFixed(2)}`],
            ["Third Band", `K${thirdPrice.toFixed(2)}`],
            ["Total", `K${totalPrice.toFixed(2)}`],
        ];

        // Add table
        doc.autoTable({
            startY: 40,
            head: [["Description", "Price"]],
            body: rows,
        });

        // Save PDF
        doc.save(`${companyName}_Invoice_${date}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate the PDF. Check the console for details.");
    }
}
