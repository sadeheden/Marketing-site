document.addEventListener("DOMContentLoaded", () => {
    const savedBanner = document.getElementById("savedBanner");

    // Retrieve saved banner from local storage
    const bannerData = JSON.parse(localStorage.getItem("savedBanner"));
    if (bannerData) {
        // Set banner size
        savedBanner.className = `banner ${bannerData.size}`;

        // Set banner background color
        savedBanner.style.backgroundColor = bannerData.color;

        // Set banner text
        savedBanner.textContent = bannerData.text;

        // Set banner image if available
        if (bannerData.image) {
            savedBanner.style.backgroundImage = `url(${bannerData.image})`;
            savedBanner.style.backgroundSize = 'cover';
        }
    }
});
