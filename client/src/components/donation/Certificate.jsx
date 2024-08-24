// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import img1 from './images/certificateedit.jpg';
// import jsPDF from 'jspdf';
// import './css/certificate.css';

// const Certificate = () => {
//     const location = useLocation();
//     const { name, address, donationType, amount } = location.state || {};

//     useEffect(() => {
//         const generatePDF = async () => {
//             const doc = new jsPDF();

//             // Load the image as a base64 string
//             const imgData = await fetch(img1).then(res => res.blob()).then(blob => {
//                 return new Promise((resolve) => {
//                     const reader = new FileReader();
//                     reader.onloadend = () => resolve(reader.result);
//                     reader.readAsDataURL(blob);
//                 });
//             });

//             // Add the background image
//             doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Adjust dimensions to fit the page

//             // Add title with improved styling
//             doc.setFontSize(24);
//             doc.setFont('helvetica', 'bold');
//             doc.setTextColor(0, 0, 255); // Blue color for the title
//             doc.text('Donation Certificate', 105, 40, null, null, 'center'); // Move title down to 40

//             // Add content with improved styling and centered text
//             doc.setFontSize(25);
           
// doc.setFont('helvetica', 'bold');
// doc.setTextColor(0, 128, 0); // Green color (RGB value)
// doc.text(`${name}`, 105, 130, null, null, 'center');

//             // doc.text(`Address: ${address}`, 105, 145, null, null, 'center'); 
//             // doc.text(`Donation Type: ${donationType}`, 105, 120, null, null, 'center'); 
//             // doc.text(`Amount: $${amount}`, 105, 125, null, null, 'center'); 

//             // const currentDate = new Date().toLocaleDateString();
//             // doc.text(`Date: ${currentDate}`, 105, 110, null, null, 'center'); // Move down to 110

//             // Save the generated PDF
//             doc.setFontSize(10);
//             doc.setFont('helvetica', 'normal');
//             doc.setTextColor(0, 0, 0); // Black color for the paragraph
//             const paragraph = `Dear ${name},\n\nThank you for your generous donation. Your contribution is greatly appreciated and will help support our cause. We are grateful for your support and commitment.\n\nBest regards,\nThe Team`;
            
//             // Add the paragraph text
//             doc.text(paragraph, 10, 160);
//             doc.save('donation_certificate.pdf');
//         };

//         generatePDF();
//     }, [name, address, donationType, amount]);

//     return (
//         <div className="certificate">
//             <h2>{name}</h2>
//             <p>{address}</p>
//         </div>
//     );
// };

// export default Certificate;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import img1 from './images/certificateedit.jpg';
import jsPDF from 'jspdf';
import './css/certificate.css';

const Certificate = () => {
    const location = useLocation();
    const { name, address, donationType, amount } = location.state || {};

    useEffect(() => {
        const generatePDF = async () => {
            const doc = new jsPDF();

            // Load the image as a base64 string
            const imgData = await fetch(img1).then(res => res.blob()).then(blob => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            });

            // Add the background image
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Adjust dimensions to fit the page

            // Add title with improved styling
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 255); // Blue color for the title
            doc.text('Donation Certificate', 105, 40, null, null, 'center');

            // Add content with improved styling and centered text
            doc.setFontSize(25);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 128, 0); // Green color (RGB value)
            doc.text(`${name}`, 105, 130, null, null, 'center');

            // Add a paragraph with margins
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0); // Black color for the paragraph

            const leftMargin = 30; // Left margin
            const rightMargin = 20; // Right margin
            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = pageWidth - leftMargin - rightMargin;
            const currentDate = new Date().toLocaleDateString();
          
            const paragraph = `Dear ${name},\n\nThank you for your generous donation. In recognition of your support towards wildlife protection and conservation.\n\n      your contribution of ${amount} rs on ${currentDate} from ${address} as a ${donationType} donation has made a significant impact in our efforts to safeguard endangered species and preserve their natural habitats.`;


            // Split paragraph into lines that fit within the margins
            const lines = doc.splitTextToSize(paragraph, textWidth);

            // Add the paragraph text with margins
            doc.text(lines, leftMargin, 145); // Adjust y-coordinate as needed

            // Save the generated PDF
            doc.save('donation_certificate.pdf');
        };

        generatePDF();
    }, [name, address, donationType, amount]);

    return (
        <div className="certificate">
            <p>Page are downloaded.Thank you for your contribution</p>
        </div>
    );
};

export default Certificate;











