document.addEventListener("DOMContentLoaded", () => {
    const banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    const savedBannersBody = document.getElementById("savedBannersBody");
    const popupContainer = document.getElementById("popupContainer");
    const popupContent = document.getElementById("popupPreviewContent");
    const closeButton = document.querySelector(".close-button");

    function openPopup(content) {
        popupContent.innerHTML = content;
        popupContainer.style.display = "flex";
    }

    closeButton.addEventListener("click", () => {
        popupContainer.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = "none";
        }
    });

    function createPreviewContent(data) {
        let content = `<p>Saved on: ${data.savedAt}</p>`;

        if (data.image) {
            content += `<img src="${data.image}" alt="Banner Image" style="max-width:100%; height:auto;">`;
        }

        content += `<p>Text: ${data.text}</p>`;
        content += `<p>Size: ${getSizeDisplayName(data.size)}</p>`;
        content += `<p style="background-color:${data.color}; padding: 10px; color: white;">Color: ${data.color}</p>`;

        return content;
    }

    // Helper function to get display name for sizes
    function getSizeDisplayName(size) {
        switch (size) {
            case 'small':
                return 'Banner: Small (250x250)';
            case 'large':
                return 'Banner: Long (120x600)';
            default:
                return 'Unknown Size';
        }
    }

    if (banners.length > 0) {
        banners.forEach((bannerData) => {
            const row = document.createElement("tr");

            const previewCell = document.createElement("td");
            const sizeCell = document.createElement("td");
            const textCell = document.createElement("td");
            const colorCell = document.createElement("td");
            const savedAtCell = document.createElement("td");

            const preview = document.createElement("div");
            preview.style.width = "100px";
            preview.style.height = "100px";
            preview.style.backgroundColor = bannerData.color;
            preview.style.cursor = "pointer";

            if (bannerData.image) {
                preview.style.backgroundImage = `url(${bannerData.image})`;
                preview.style.backgroundSize = "cover";
                preview.style.backgroundRepeat = "no-repeat";
            }

            previewCell.appendChild(preview);
            sizeCell.textContent = getSizeDisplayName(bannerData.size);
            textCell.textContent = bannerData.text || 'No Text';
            colorCell.style.backgroundColor = bannerData.color;
            colorCell.textContent = bannerData.color || 'No Color';
            savedAtCell.textContent = bannerData.savedAt || 'Unknown';

            row.appendChild(previewCell);
            row.appendChild(sizeCell);
            row.appendChild(textCell);
            row.appendChild(colorCell);
            row.appendChild(savedAtCell);
            savedBannersBody.appendChild(row);

            // Add click event to open the popup
            previewCell.addEventListener("click", () => {
                const content = createPreviewContent(bannerData);
                openPopup(content);
            });
        });
    } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 5; // Adjusted for the new column
        noDataCell.textContent = "No banners saved.";
        noDataRow.appendChild(noDataCell);
        savedBannersBody.appendChild(noDataRow);
    }
});
