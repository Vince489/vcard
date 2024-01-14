function scanBusinessCard() {
  const fileInput = document.getElementById('fileInput');
  const resultDiv = document.getElementById('result');
  const downloadLink = document.getElementById('downloadLink');

  const file = fileInput.files[0];

  if (file) {
      // Perform OCR and extract information (you may use OCR libraries or APIs)

      // Simulate extracted information for demonstration
      const cardInfo = {
          name: 'John Doe',
          jobTitle: 'Web Developer',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
      };

      // Display the scanned information
      resultDiv.innerHTML = `
          <p>Name: ${cardInfo.name}</p>
          <p>Job Title: ${cardInfo.jobTitle}</p>
          <p>Email: ${cardInfo.email}</p>
          <p>Phone: ${cardInfo.phone}</p>
      `;

      // Generate and download VCF file
      const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:${cardInfo.name}
ORG:${cardInfo.jobTitle}
EMAIL:${cardInfo.email}
TEL:${cardInfo.phone}
END:VCARD`;

      const blob = new Blob([vcfContent], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.download = 'contact.vcf';
      downloadLink.style.display = 'block';
  } else {
      alert('Please select a file.');
  }
}
