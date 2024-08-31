document.addEventListener("DOMContentLoaded", () => {
    // References to table bodies and popup elements
    const savedBannersBody = document.getElementById("savedBannersBody");
    const savedNewslettersBody = document.getElementById("savedNewslettersBody");
    const savedLandingPagesBody = document.getElementById("savedLandingPagesBody");
    const popupContainer = document.getElementById("popupContainer");
    const popupContent = document.getElementById("popupPreviewContent");
    const closeButton = document.querySelector(".close-button");

    // Retrieve data from localStorage
    let banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    let newsletters = JSON.parse(localStorage.getItem("savedNewsletters")) || [];
    let landingPages = JSON.parse(localStorage.getItem("savedLandingPages")) || [];

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

    // Check if it's a banner
    if (data.image || data.color) {
        if (data.image) {
            content += `<img src="${data.image}" alt="Image" style="max-width:100%; height:auto;">`;
        }
        if (data.text) {
            content += `<p>Text: ${data.text}</p>`;
        }
        if (data.size) {
            content += `<p>Size: ${getSizeDisplayName(data.size)}</p>`;
        }
        if (data.color) {
            content += `<p style="background-color:${data.color}; padding: 10px; color: white;">Color: ${data.color}</p>`;
        }
    }

    // Check if it's a newsletter
    if (data.bannerImage || data.footerText) {
        if (data.bannerImage) {
            content += `<img src="${data.bannerImage}" alt="Banner Image" style="max-width:100%; height:auto;">`;
        }
        if (data.bannerText) {
            content += `<p>Banner Text: ${data.bannerText}</p>`;
        }
        if (data.footerText) {
            content += `<p>Footer Text: ${data.footerText}</p>`;
        }
        if (data.backgroundColor) {
            content += `<p style="background-color:${data.backgroundColor}; padding: 10px; color: white;">Background Color: ${data.backgroundColor}</p>`;
        }
    }

    // Check if it's a landing page
    if (data.logo || data.companyName) {
        if (data.logo) {
            content += `<img src="${data.logo}" alt="Logo" style="max-width:100%; height:auto;">`;
        }
        if (data.companyName) {
            content += `<p>Company Name: ${data.companyName}</p>`;
        }
        if (data.title) {
            content += `<p>Title: ${data.title}</p>`;
        }
        if (data.heroPhoto) {
            content += `<img src="${data.heroPhoto}" alt="Hero Photo" style="max-width:100%; height:auto;">`;
        }
        if (data.headerColor) {
            content += `<p style="background-color:${data.headerColor}; padding: 10px; color: white;">Header Color: ${data.headerColor}</p>`;
        }
    }

    // Add a fallback for unknown data types
    if (!content) {
        content = '<p>No preview available for this content.</p>';
    }

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
            const bannerColorCell = document.createElement("td");
            const savedAtCell = document.createElement("td");


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
            const landingColorCell = document.createElement("td");
            const savedAtCell = document.createElement("td");

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

            // Add click event to open the popup
            row.addEventListener("click", () => {
                const content = createPreviewContent(landingPage);
                openPopup(content);
            });
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
    bannerData.savedAt = new Date().toLocaleString(); // Make sure savedAt is set
    if (bannerData.image) {
        bannerData.image = await fileToBase64(bannerData.image);
    }
    let banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    banners.push(bannerData);
    localStorage.setItem("savedBanners", JSON.stringify(banners));
}


async function saveNewsletterToLocalStorage(newsletterData) {
    // Convert images to base64 if they exist
    if (newsletterData.bannerImage) {
        newsletterData.bannerImage = await fileToBase64(newsletterData.bannerImage);
    }
    if (newsletterData.mainImage) {
        newsletterData.mainImage = await fileToBase64(newsletterData.mainImage);
    }
    if (newsletterData.additionalImages && newsletterData.additionalImages.length > 0) {
        newsletterData.additionalImages = await Promise.all(newsletterData.additionalImages.map(img => fileToBase64(img)));
    }
    // Store in localStorage
    let newsletters = JSON.parse(localStorage.getItem("savedNewsletters")) || [];
    newsletters.push(newsletterData);
    localStorage.setItem("savedNewsletters", JSON.stringify(newsletters));
}


async function saveLandingPageToLocalStorage(landingPageData) {
    if (landingPageData.logo) {
        landingPageData.logo = await fileToBase64(landingPageData.logo);
    }
    landingPageData.savedAt = new Date().toLocaleString(); // Add savedAt property with current date and time

    let landingPages = JSON.parse(localStorage.getItem("savedLandingPages")) || [];
    landingPages.push(landingPageData);
    localStorage.setItem("savedLandingPages", JSON.stringify(landingPages));
}

document.addEventListener("DOMContentLoaded", () => {
    // References to table bodies and popup elements
    const savedBannersBody = document.getElementById("savedBannersBody");
    const savedNewslettersBody = document.getElementById("savedNewslettersBody");
    const savedLandingPagesBody = document.getElementById("savedLandingPagesBody");
    const popupContainer = document.getElementById("popupContainer");
    const popupContent = document.getElementById("popupPreviewContent");
    const closeButton = document.querySelector(".close-button");

    // Retrieve data from localStorage
    let banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
    let newsletters = JSON.parse(localStorage.getItem("savedNewsletters")) || [];
    let landingPages = JSON.parse(localStorage.getItem("savedLandingPages")) || [];

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
        let content = `<span class="close-button">&times;</span>`;
        content += `<p>Saved on: ${data.savedAt || 'Unknown'}</p>`;
    
        // Check if it's a banner
        if (data.image || data.color || data.text || data.size) {
            if (data.image) {
                content += `<img src="${data.image}" alt="Banner Image" style="max-width:100%; height:auto;">`;
            }
            if (data.text) {
                content += `<p>Text: ${data.text}</p>`;
            }
            if (data.size) {
                content += `<p>Size: ${getSizeDisplayName(data.size)}</p>`;
            }
            if (data.color) {
                content += `<p style="background-color:${data.color}; padding: 10px; color: white;">Color: ${data.color}</p>`;
            }
        }
    
        // Check if it's a newsletter
        if (data.bannerImage || data.footerText || data.backgroundColor || data.bannerText) {
            if (data.bannerImage) {
                content += `<img src="${data.bannerImage}" alt="Newsletter Banner Image" style="max-width:100%; height:auto;">`;
            }
            if (data.bannerText) {
                content += `<p>Banner Text: ${data.bannerText}</p>`;
            }
            if (data.footerText) {
                content += `<p>Footer Text: ${data.footerText}</p>`;
            }
            if (data.backgroundColor) {
                content += `<p style="background-color:${data.backgroundColor}; padding: 10px; color: white;">Background Color: ${data.backgroundColor}</p>`;
            }
        }
    
        // Check if it's a landing page
        if (data.logo || data.companyName || data.title || data.heroPhoto || data.headerColor) {
            if (data.logo) {
                content += `<img src="${data.logo}" alt="Landing Page Logo" style="max-width:100%; height:auto;">`;
            }
            if (data.companyName) {
                content += `<p>Company Name: ${data.companyName}</p>`;
            }
            if (data.title) {
                content += `<p>Title: ${data.title}</p>`;
            }
            if (data.heroPhoto) {
                content += `<img src="${data.heroPhoto}" alt="Landing Page Hero Photo" style="max-width:100%; height:auto;">`;
            }
            if (data.headerColor) {
                content += `<p style="background-color:${data.headerColor}; padding: 10px; color: white;">Header Color: ${data.headerColor}</p>`;
            }
        }
    
        // Add a fallback for unknown data types or missing data
        if (content === `<p>Saved on: ${data.savedAt || 'Unknown'}</p>`) {
            content += '<p>No preview available for this content.</p>';
        }
    
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

    // Helper function to populate tables
    function populateTable(dataArray, tableBody, columns) {
        tableBody.innerHTML = ''; // Clear existing rows
        if (dataArray.length > 0) {
            dataArray.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
            dataArray.forEach(data => {
                const row = document.createElement("tr");
    
                columns.forEach(col => {
                    const cell = document.createElement("td");
    
                    if (col === 'bannerImage' || col === 'logo' || col === 'image' || col === 'heroPhoto') {
                        if (data[col]) {
                            const img = document.createElement("img");
                            img.src = data[col];
                            img.style.maxWidth = "100px";
                            img.style.height = "auto";
                            cell.appendChild(img);
                        } else {
                            cell.textContent = 'No Image';
                        }
                    } else if (col === 'backgroundColor' || col === 'headerColor' || col === 'color') {
                        if (data[col]) {
                            cell.style.backgroundColor = data[col];
                            cell.style.color = getContrastingTextColor(data[col]);
                            cell.textContent = data[col];
                        } else {
                            cell.textContent = 'No Color';
                        }
                    } else if (col === 'savedAt') {
                        cell.textContent = data[col] || 'Unknown'; // Access savedAt property
                    } else {
                        cell.textContent = data[col] || 'No Data';
                    }
    
                    row.appendChild(cell);
                });
    
                tableBody.appendChild(row);
    
                row.addEventListener("click", () => {
                    const content = createPreviewContent(data);
                    openPopup(content);
                });
            });
        } else {
            const noDataRow = document.createElement("tr");
            const noDataCell = document.createElement("td");
            noDataCell.colSpan = columns.length;
            noDataCell.textContent = "No data saved.";
            noDataRow.appendChild(noDataCell);
            tableBody.appendChild(noDataRow);
        }
    }
    // Helper function to open a popup with content
function openPopup(content) {
    popupContent.innerHTML = content;
    popupContainer.style.display = "flex";

    // Add event listener to the close button
    const closeButton = popupContent.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            popupContainer.style.display = "none";
        });
    }
}

closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
        popupContainer.style.display = "none";
    }
});

    
    // Optional: Function to determine if text color should be light or dark based on the background color
    function getContrastingTextColor(backgroundColor) {
        // Convert hex color to RGB
        const rgb = parseInt(backgroundColor.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >>  8) & 0xff;
        const b = (rgb >>  0) & 0xff;
    
        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
        // Return black for light backgrounds and white for dark backgrounds
        return luminance > 186 ? '#000000' : '#ffffff';
    }
    
    // Populate the tables with saved data
    populateTable(banners, savedBannersBody, ['image', 'text', 'textSize', 'color', 'savedAt']);
    populateTable(newsletters, savedNewslettersBody, ['bannerImage', 'bannerText', 'footerText', 'backgroundColor', 'savedAt']);
    populateTable(landingPages, savedLandingPagesBody, ['logo', 'companyName', 'title', 'heroPhoto', 'headerColor', 'savedAt']);

});
