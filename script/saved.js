document.addEventListener("DOMContentLoaded", () => {
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
    }
});
