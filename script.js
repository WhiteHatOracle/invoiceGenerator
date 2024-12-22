function generateInvoice(){
    //get input values
    const companyName = document.getElementById('companyName').value;
    const firstBandRange = document.getElementById('firstBandRange').value.split('-').map(number);
    const secondBandRange = document.getElementById('secondBandRange').value.split('-').map(number);
    const thirdBandRange = document.getElementById('thirdBandRange').value.split('-').map(number);
    const firstBandPrice = parseFloat(document.getElementById('firstBandPrice').value);
    const secondBandPrice = parseFloat(document.getElementById('secondBandPrice').value);
    const thirdBandPrice = parseFloat(document.getElementById('thirdBandPrice').value);
    const weights = document.getElementById('weights').value.split('-').map(Number);

    //initialize variables
    let totalWeight = 0;
    let averageWeight = 0;
    let firstPrice = 0, secondPrice = 0, thirdPrice = 0;
    let firstWeight = 0, secondWeight = 0, thirdWeight = 0;
    let numOfPigs_FirstBand = 0, numOfPigs_SecondBand = 0, numOfPigs_ThirdBand = 0; 

    //Calculate weight bands and costs
    weights.forEach(weight => {
        totalWeight += weight;

        if (weight >= firstBandRange[0] && weight <= firstBandRange[1]){
            const price = weight * firstBandPrice;
            firstPrice += price;
            firstWeight += weight;
            numOfPigs_FirstBand++;
        }

        if (weight >= secondBandPrice[0] && weight <= secondBandRange[1]){
            const price = weight * secondBandCost;
            secondPrice += price;
            secondWeight += weight;
            numOfPigs_SecondBand++;
        }

        if (weight >= thirdBandPrice[0] && secondWeightPrice[1]){
            const price = weight * thirdBandCost;
            secondPrice += price;
            thirdWeight += weight;
            numOfPigs_ThirdBand++
        }
    });

    // Calculate the average weight
    const totalPigs = numOfPigs_FirstBand + numOfPigs_SecondBand + numOfPigs_ThirdBand;
    averageWeight = totalWeight/totalPigs;

    // Total Price
    const totalPrice = firstPrice + secondPrice + thirdPrice;
    
    // Generate Invoice Output
    const output = `
      <h2>Invoice for ${companyName}</h2>
      <p><strong>Total Weight:</strong> ${totalWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p><strong>Average Weight:</strong> ${averageWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      
      <h3>Price Breakdown:</h3>
      <p><strong>First Band (${firstBandRange[0]}-${firstBandRange[1]} kg @ K${firstBandCost}/kg):</strong></p>
      <p>Number of pigs: ${numOfPigs_FirstBand}</p>
      <p>Total weight: ${firstWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p>Price: K${firstPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
      
      <p><strong>Second Band (${secondBandRange[0]}-${secondBandRange[1]} kg @ K${secondBandCost}/kg):</strong></p>
      <p>Number of pigs: ${numOfPigs_SecondBand}</p>
      <p>Total weight: ${secondWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p>Price: K${secondPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
      
      <p><strong>Third Band (${thirdBandRange[0]}-${thirdBandRange[1]} kg @ K${thirdBandCost}/kg):</strong></p>
      <p>Number of pigs: ${numOfPigs_ThirdBand}</p>
      <p>Total weight: ${thirdWeight.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} kg</p>
      <p>Price: K${thirdPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
      
      <p><strong>Total Price:</strong> K${totalPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
    `;

    document.getElementById('Invoice').innerHTML = output
};