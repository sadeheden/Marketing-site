import { saveBanner } from './functions.js';

document.addEventListener("DOMContentLoaded", () => {
    const sizeSelect = document.getElementById("size");
    const colorInput = document.getElementById("color");
    const textInput = document.getElementById("text");
    const imageUpload = document.getElementById("imageUpload");
    const banner = document.getElementById("banner");

    // Update banner preview on input changes
    sizeSelect.addEventListener("change", updateBanner);
    colorInput.addEventListener("input", updateBanner);
    textInput.addEventListener("input", updateBanner);
    imageUpload.addEventListener("change", updateBanner);

    function updateBanner() {
        // Set banner size
        const size = sizeSelect.value;
        banner.className = `banner ${size}`;

        // Set banner background color
        const color = colorInput.value;
        banner.style.backgroundColor = color;

        // Set banner text
        const text = textInput.value;
        banner.textContent = text;

        // Set banner image
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                banner.style.backgroundImage = `url(${e.target.result})`;
                banner.style.backgroundSize = 'cover';
            };
            reader.readAsDataURL(file);
        } else {
            banner.style.backgroundImage = ''; // Remove image if none selected
        }
    }

    // Updated saveBanner function to save multiple banners
    function saveBanner(event) {
        event.preventDefault(); // Prevent form submission if within a form

        const size = sizeSelect.value;
        const color = colorInput.value;
        const text = textInput.value;
        const file = imageUpload.files[0];

        // Retrieve existing banners from localStorage or initialize an empty array
        const banners = JSON.parse(localStorage.getItem("savedBanners")) || [];

        const reader = new FileReader();
        reader.onloadend = function() {
            const bannerData = {
                size: size, // Save the selected size
                color: color,
                text: text,
                image: reader.result // Use Base64 string for image
            };
            
            // Add the new banner to the banners array
            banners.push(bannerData);

            // Save the updated array back to localStorage
            localStorage.setItem("savedBanners", JSON.stringify(banners));
            window.location.href = "/save.html";
        };
        
        if (file) {
            reader.readAsDataURL(file);
        } else {
            const bannerData = {
                size: size, // Save the selected size
                color: color,
                text: text,
                image: null
            };

            // Add the new banner to the banners array
            banners.push(bannerData);

            // Save the updated array back to localStorage
            localStorage.setItem("savedBanners", JSON.stringify(banners));
            window.location.href = "/save.html";
        }
    }

    // Save button event listener
    document.getElementById("saveButton").addEventListener("click", saveBanner);
});
