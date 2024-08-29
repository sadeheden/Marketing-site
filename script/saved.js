document.addEventListener("DOMContentLoaded", () => {
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
    }
});
