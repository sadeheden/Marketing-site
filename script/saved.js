document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    const savedBannerContainer = document.createElement('div');
    savedBannerContainer.id = "saved-banner";
    savedBannerContainer.className = "banner";

    // Retrieve the saved banner data from local storage
    const bannerData = JSON.parse(localStorage.getItem("savedBanner"));

    if (bannerData) {
        // Apply the saved size class
        savedBannerContainer.className += ` ${bannerData.size}`;

        // Apply the saved background color
        savedBannerContainer.style.backgroundColor = bannerData.color;

        // Apply the saved banner text
        savedBannerContainer.textContent = bannerData.text;

        // Apply the saved background image
        if (bannerData.image) {
            savedBannerContainer.style.backgroundImage = `url(${bannerData.image})`;
            savedBannerContainer.style.backgroundSize = 'cover';
        }

        // Append the banner to the body or a specific container in your HTML
        document.body.appendChild(savedBannerContainer);
    } else {
        // If no banner is saved, display a message
        const noBannerMessage = document.createElement('p');
        noBannerMessage.textContent = "No banner saved.";
        document.body.appendChild(noBannerMessage);
=======
    // Retrieve the saved banners array from localStorage
    const banners = JSON.parse(localStorage.getItem("savedBanners")) || [];

    const savedBannersBody = document.getElementById("savedBannersBody");

    if (banners.length > 0) {
        banners.forEach((bannerData) => {
            // Create a new row for each saved banner
            const row = document.createElement("tr");

            // Create cells for the preview, size, text, and color
            const previewCell = document.createElement("td");
            const sizeCell = document.createElement("td");
            const textCell = document.createElement("td");
            const colorCell = document.createElement("td");

            // Set up the preview image or background color
            const preview = document.createElement("div");
            preview.style.backgroundColor = bannerData.color;

            if (bannerData.image) {
                preview.style.backgroundImage = `url(${bannerData.image})`;
            }

            previewCell.appendChild(preview);

            // Fill in the other cells
            sizeCell.textContent = bannerData.size || 'Default Size';
            textCell.textContent = bannerData.text || 'No Text';
            colorCell.style.backgroundColor = bannerData.color;
            colorCell.textContent = bannerData.color || 'No Color';  // This shows the color code or a fallback text

            // Append cells to the row
            row.appendChild(previewCell);
            row.appendChild(sizeCell);
            row.appendChild(textCell);
            row.appendChild(colorCell);

            // Append the row to the table body
            savedBannersBody.appendChild(row);
        });
    } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 4;
        noDataCell.textContent = "No banners saved.";
        noDataRow.appendChild(noDataCell);
        savedBannersBody.appendChild(noDataRow);
>>>>>>> parent of 23bf9a8 (/)
    }
});
