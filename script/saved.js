document.addEventListener("DOMContentLoaded", () => {
    let banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    const savedBannersBody = document.getElementById("savedBannersBody");
    const popupContainer = document.getElementById("popupContainer");
    const popupContent = document.getElementById("popupPreviewContent");
    const closeButton = document.querySelector(".close-button");

    let newsletters = JSON.parse(localStorage.getItem("savedNewsletters")) || [];
    const savedNewslettersBody = document.getElementById("savedNewslettersBody");

    let landingPages = JSON.parse(localStorage.getItem("savedLandingPages")) || [];
    const savedLandingPagesBody = document.getElementById("savedLandingPagesBody");

    // Helper function to open a popup with content
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

    // Helper function to create preview content
    function createPreviewContent(data) {
        let content = `<p>Saved on: ${data.savedAt}</p>`;

        if (data.image) {
            content += `<img src="${data.image}" alt="Banner Image" style="max-width:100%; height:auto;">`;
        }

        content += `<p>Text: ${data.text}</p>`;
        content += `<p>Size: ${getSizeDisplayName(data.size)}</p>`;
        content += `<p>Text Style: ${data.textStyle}</p>`;
        content += `<p>Text Size: ${data.textSize}</p>`;
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

    // Sort and display banners
    banners.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

    if (banners.length > 0) {
        banners.forEach((bannerData) => {
            const row = document.createElement("tr");

            const previewCell = document.createElement("td");
            const sizeCell = document.createElement("td");
            const textCell = document.createElement("td");
            const styleCell = document.createElement("td");
            const textSizeCell = document.createElement("td");
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
            styleCell.textContent = bannerData.textStyle || 'Normal';
            textSizeCell.textContent = bannerData.textSize || 'Default Size';
            colorCell.style.backgroundColor = bannerData.color;
            colorCell.textContent = bannerData.color || 'No Color';
            savedAtCell.textContent = bannerData.savedAt || 'Unknown';

            row.appendChild(previewCell);
            row.appendChild(sizeCell);
            row.appendChild(textCell);
            row.appendChild(styleCell);
            row.appendChild(textSizeCell);
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
        noDataCell.colSpan = 7;
        noDataCell.textContent = "No banners saved.";
        noDataRow.appendChild(noDataCell);
        savedBannersBody.appendChild(noDataRow);
    }

    // Display saved newsletters
    if (newsletters.length > 0) {
        newsletters.forEach(newsletter => {
            const row = document.createElement("tr");

            const previewCell = document.createElement("td");
            const bannerTextCell = document.createElement("td");
            const footerTextCell = document.createElement("td");

            console.log('Retrieved banner image URL:', newsletter.bannerImage); // Debugging output

            if (newsletter.bannerImage) {
                previewCell.innerHTML = `<img src="${newsletter.bannerImage}" style="max-width: 100px; height: auto;">`;
            } else {
                previewCell.textContent = 'No Image';
            }

            bannerTextCell.textContent = newsletter.bannerText || 'No Text';
            footerTextCell.textContent = newsletter.footerText || 'No Text';

            row.appendChild(previewCell);
            row.appendChild(bannerTextCell);
            row.appendChild(footerTextCell);

            savedNewslettersBody.appendChild(row);
        });
    } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 3; // Adjusted for the columns in newsletters
        noDataCell.textContent = "No newsletters saved.";
        noDataRow.appendChild(noDataCell);
        savedNewslettersBody.appendChild(noDataRow);
    }

    // Display saved landing pages
    if (landingPages.length > 0) {
        landingPages.forEach(landingPage => {
            const row = document.createElement("tr");

            const previewCell = document.createElement("td");
            const companyNameCell = document.createElement("td");
            const titleCell = document.createElement("td");

            if (landingPage.logo) {
                previewCell.innerHTML = `<img src="${landingPage.logo}" style="max-width: 100px; height: auto;">`;
            } else {
                previewCell.textContent = 'No Image';
            }
            

            companyNameCell.textContent = landingPage.companyName || 'No Company Name';
            titleCell.textContent = landingPage.title || 'No Title';

            row.appendChild(previewCell);
            row.appendChild(companyNameCell);
            row.appendChild(titleCell);

            savedLandingPagesBody.appendChild(row);
        });
    } else {
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 3; // Adjusted for the columns in landing pages
        noDataCell.textContent = "No landing pages saved.";
        noDataRow.appendChild(noDataCell);
        savedLandingPagesBody.appendChild(noDataRow);
    }
});
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function saveBannerToLocalStorage(bannerData) {
    if (bannerData.image) {
        bannerData.image = await fileToBase64(bannerData.image);
    }
    let banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    banners.push(bannerData);
    localStorage.setItem("savedBanners", JSON.stringify(banners));
}
