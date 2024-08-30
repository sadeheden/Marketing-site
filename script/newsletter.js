document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('banner-text');
    const imageUpload = document.getElementById('banner-image');
    const mainImageUpload = document.getElementById('main-image');
    const footerTextInput = document.getElementById('footer-text');
    const backgroundColorInput = document.getElementById('background-color');
    const previewBannerText = document.getElementById('preview-banner-text');
    const previewBannerImg = document.getElementById('preview-banner-img');
    const previewMainImg = document.getElementById('preview-main-img');
    const previewFooterText = document.getElementById('preview-footer-text');
    const previewContainer = document.getElementById('preview-container');
    const previewAdditionalImages = [
        document.getElementById('preview-additional-image-1'),
        document.getElementById('preview-additional-image-2'),
        document.getElementById('preview-additional-image-3'),
        document.getElementById('preview-additional-image-4')
    ];
    const saveButton = document.getElementById('save-all');

    const additionalImageUploads = [
        document.getElementById('additional-image-1'),
        document.getElementById('additional-image-2'),
        document.getElementById('additional-image-3'),
        document.getElementById('additional-image-4')
    ];

    function updatePreview() {
        previewBannerText.textContent = textInput.value;

        if (imageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                previewBannerImg.src = reader.result;
            };
            reader.readAsDataURL(imageUpload.files[0]);
        }

        if (mainImageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                previewMainImg.src = reader.result;
            };
            reader.readAsDataURL(mainImageUpload.files[0]);
        }

        previewFooterText.textContent = footerTextInput.value;

        // Apply background color to preview
        previewContainer.style.backgroundColor = backgroundColorInput.value;

        // Update additional images in the grid
        additionalImageUploads.forEach((input, index) => {
            if (input.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    previewAdditionalImages[index].src = reader.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        });
    }

    function saveNewsletter() {
        const newsletters = JSON.parse(localStorage.getItem('savedNewsletters')) || [];

        const newsletterData = {
            bannerText: textInput.value,
            bannerImage: imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : null,
            mainImage: mainImageUpload.files[0] ? URL.createObjectURL(mainImageUpload.files[0]) : null,
            footerText: footerTextInput.value,
            backgroundColor: backgroundColorInput.value,
            additionalImages: additionalImageUploads.map(input => input.files[0] ? URL.createObjectURL(input.files[0]) : null)
        };

        newsletters.push(newsletterData);
        localStorage.setItem('savedNewsletters', JSON.stringify(newsletters));

        alert('Newsletter saved successfully!');
        window.location.href = "/save.html";
    }

    // Event listeners for real-time preview updates
    textInput.addEventListener('input', updatePreview);
    imageUpload.addEventListener('change', updatePreview);
    mainImageUpload.addEventListener('change', updatePreview);
    footerTextInput.addEventListener('input', updatePreview);
    backgroundColorInput.addEventListener('input', updatePreview);
    additionalImageUploads.forEach(input => input.addEventListener('change', updatePreview));

    // Save button listener
    saveButton.addEventListener('click', saveNewsletter);
});
import { showPopup, closePopup, handleFormSubmit } from './functionsMain.js';

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector(".popup-container");
    const closeBtn = popup.querySelector(".close-btn");
    const form = popup.querySelector("form");

    // Show the popup when the page loads
    showPopup(popup);

    // Close the popup when the close button is clicked
    closeBtn.addEventListener("click", function() {
        closePopup(popup);
    });

    // Handle form submission
    form.addEventListener("submit", function(event) {
        handleFormSubmit(event, popup);
    });
});

