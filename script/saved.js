document.addEventListener("DOMContentLoaded", () => {
    const banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    const newsletters = JSON.parse(localStorage.getItem("savedNewsletters")) || [];
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
        let content = "";

        if (data.image || data.bannerImage) {
            content += `<img src="${data.image || data.bannerImage}" alt="Preview Image">`;
        }
        
        content += `<p>${data.text || data.bannerText}</p>`;
        
        if (data.mainImage) {
            content += `<img src="${data.mainImage}" alt="Main Image">`;
        }

        if (data.additionalImages) {
            content += '<div class="grid">';
            data.additionalImages.forEach((image, index) => {
                if (image) {
                    content += `<div class="grid-item"><img src="${image}" alt="Additional Image ${index + 1}"></div>`;
                }
            });
            content += '</div>';
        }

        content += `<p style="background-color:${data.color || data.backgroundColor};">${data.color || data.backgroundColor}</p>`;
        content += `<p>${data.footerText || ''}</p>`;

        return content;
    }

    if (banners.length > 0) {
        banners.forEach((bannerData) => {
            const row = document.createElement("tr");

            const previewCell = document.createElement("td");
            const sizeCell = document.createElement("td");
            const textCell = document.createElement("td");
            const colorCell = document.createElement("td");

            const preview = document.createElement("div");
            preview.style.backgroundColor = bannerData.color;

            if (bannerData.image) {
                preview.style.backgroundImage = `url(${bannerData.image})`;
            }

            previewCell.appendChild(preview);
            sizeCell.textContent = bannerData.size || 'Default Size';
            textCell.textContent = bannerData.text || 'No Text';
            colorCell.style.backgroundColor = bannerData.color;
            colorCell.textContent = bannerData.color || 'No Color';

            row.appendChild(previewCell);
            row.appendChild(sizeCell);
            row.appendChild(textCell);
            row.appendChild(colorCell);
            savedBannersBody.appendChild(row);

            // Add click event to open the popup
            previewCell.addEventListener("click", () => {
                const content = createPreviewContent(bannerData);
                openPopup(content);
            });
        });
    }

    if (newsletters.length > 0) {
        newsletters.forEach((newsletterData) => {
            const row = document.createElement("tr");

            const previewCell = document.createElement("td");
            const sizeCell = document.createElement("td");
            const textCell = document.createElement("td");
            const colorCell = document.createElement("td");

            const preview = document.createElement("div");
            preview.style.backgroundColor = newsletterData.backgroundColor;

            if (newsletterData.bannerImage) {
                preview.style.backgroundImage = `url(${newsletterData.bannerImage})`;
            }

            previewCell.appendChild(preview);
            sizeCell.textContent = "Newsletter"; // Placeholder as newsletters don't have a size
            textCell.textContent = newsletterData.bannerText || 'No Text';
            colorCell.style.backgroundColor = newsletterData.backgroundColor;
            colorCell.textContent = newsletterData.backgroundColor || 'No Color';

            row.appendChild(previewCell);
            row.appendChild(sizeCell);
            row.appendChild(textCell);
            row.appendChild(colorCell);
            savedBannersBody.appendChild(row);

            // Add click event to open the popup
            previewCell.addEventListener("click", () => {
                const content = createPreviewContent(newsletterData);
                openPopup(content);
            });
        });
    }

    if (banners.length === 0 && newsletters.length === 0) {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 4;
        noDataCell.textContent = "No banners or newsletters saved.";
        noDataRow.appendChild(noDataCell);
        savedBannersBody.appendChild(noDataRow);
    }
});
// Add this function inside your saved.js file

function createPreviewContent(data) {
    let content = "";

    if (data.image || data.bannerImage) {
        content += `<div style="background-image: url(${data.image || data.bannerImage}); background-size: cover; height: 200px; width: 100%; border-radius: 8px; margin-bottom: 15px;"></div>`;
    }
    
    content += `<p style="font-size: 18px; margin: 10px 0;">${data.text || data.bannerText}</p>`;
    
    if (data.mainImage) {
        content += `<img src="${data.mainImage}" alt="Main Image" style="max-width: 100%; border-radius: 8px; margin-bottom: 15px;">`;
    }

    if (data.additionalImages) {
        content += '<div class="grid" style="display: flex; gap: 10px; margin-bottom: 15px;">';
        data.additionalImages.forEach((image, index) => {
            if (image) {
                content += `<div class="grid-item" style="flex: 1;"><img src="${image}" alt="Additional Image ${index + 1}" style="width: 100%; height: auto; border-radius: 8px;"></div>`;
            }
        });
        content += '</div>';
    }

    content += `<p style="background-color:${data.color || data.backgroundColor}; padding: 10px; color: #fff; border-radius: 8px;">${data.color || data.backgroundColor}</p>`;
    content += `<p>${data.footerText || ''}</p>`;

    return content;
}
