// Function to generate a simple PDF with "Hello, World!"
function generateHelloWorldPDF() {
    const { jsPDF } = window.jspdf; // Import jsPDF from the library
    const pdf = new jsPDF(); // Create a new PDF instance

    // Add text to the PDF
    pdf.text("Hello, World!", 10, 10); // Text content and position (x=10, y=10)

    // Save the generated PDF
    pdf.save("hello_world.pdf");
}
