document.addEventListener('DOMContentLoaded', () => {
    // Get elements using querySelector
    const textInput = document.querySelector('#banner-text');  // Select the banner text input field
    const imageUpload = document.querySelector('#banner-image');  // Select the banner image upload field
    const mainImageUpload = document.querySelector('#main-image');  // Select the main image upload field
    const footerTextInput = document.querySelector('#footer-text');  // Select the footer text input field
    const backgroundColorInput = document.querySelector('#background-color');  // Select the background color input
    const previewBannerText = document.querySelector('#preview-banner-text');  // Select the banner text preview area
    const previewBannerImg = document.querySelector('#preview-banner-img');  // Select the banner image preview area
    const previewMainImg = document.querySelector('#preview-main-img');  // Select the main image preview area
    const previewFooterText = document.querySelector('#preview-footer-text');  // Select the footer text preview area
    const previewContainer = document.querySelector('#preview-container');  // Select the entire preview container for styling

    // Select additional images for the grid preview using querySelector
    const previewAdditionalImages = [
        document.querySelector('#preview-additional-image-1'),  // Select additional image preview 1
        document.querySelector('#preview-additional-image-2'),  // Select additional image preview 2
        document.querySelector('#preview-additional-image-3'),  // Select additional image preview 3
        document.querySelector('#preview-additional-image-4')   // Select additional image preview 4
    ];

    const saveButton = document.querySelector('#save-all');  // Select the save button

    // Select additional image upload fields using querySelector
    const additionalImageUploads = [
        document.querySelector('#additional-image-1'),  // Select additional image upload 1
        document.querySelector('#additional-image-2'),  // Select additional image upload 2
        document.querySelector('#additional-image-3'),  // Select additional image upload 3
        document.querySelector('#additional-image-4')   // Select additional image upload 4
    ];

    // Base64 is an encoding scheme used to convert binary data (such as images, files, or other non-text data) into a string format that can be safely transmitted over text-based protocols like email or embedded into HTML or JSON. It represents the binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, and /).
    // Function to convert an image file to a Base64 Data URL
    function convertImageToDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);  // Resolve the promise with the Base64 result
            reader.onerror = error => reject(error);  // Reject the promise if there's an error
            reader.readAsDataURL(file);  // Read the file as a Data URL
        });
    }

    // Function to update the preview in real-time
    function updatePreview() {
        previewBannerText.textContent = textInput.value;  // Update the banner text in the preview

        if (imageUpload.files[0]) {  // Check if a banner image file is selected
            const reader = new FileReader();
            reader.onload = () => {
                previewBannerImg.src = reader.result;  // Update the banner image preview
            };
            reader.readAsDataURL(imageUpload.files[0]);  // Read the selected image as a Data URL
        }

        if (mainImageUpload.files[0]) {  // Check if a main image file is selected
            const reader = new FileReader();
            reader.onload = () => {
                previewMainImg.src = reader.result;  // Update the main image preview
            };
            reader.readAsDataURL(mainImageUpload.files[0]);  // Read the selected image as a Data URL
        }

        // Limit footer text to 50 characters and update the textarea
        const footerText = footerTextInput.value;
        if (footerText.length > 50) {
            footerTextInput.value = footerText.substring(0, 50);  // Truncate if longer than 50 characters
        }
        previewFooterText.textContent = footerTextInput.value;  // Update footer text preview

        // Apply background color to the preview container
        previewContainer.style.backgroundColor = backgroundColorInput.value;

        // Update additional images in the preview grid
        additionalImageUploads.forEach((input, index) => {
            if (input.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    previewAdditionalImages[index].src = reader.result;  // Update the grid image preview
                };
                reader.readAsDataURL(input.files[0]);  // Read the selected image as a Data URL
            }
        });
    }

    // Function to save the newsletter and handle image resizing
    async function saveNewsletter() {
        const newsletters = JSON.parse(localStorage.getItem('savedNewsletters')) || [];  // Get saved newsletters from localStorage

        // Resize the images as necessary
        const bannerImage = document.querySelector('#banner-image').files[0] ? await resizeImage(document.querySelector('#banner-image').files[0], 800, 600) : null;
        const mainImage = document.querySelector('#main-image').files[0] ? await resizeImage(document.querySelector('#main-image').files[0], 800, 600) : null;
        const additionalImages = await Promise.all(Array.from(document.querySelectorAll('[id^="additional-image-"]')).map(input => input.files[0] ? resizeImage(input.files[0], 800, 600) : null));

        // Get the current date and time
        const savedAt = new Date().toLocaleString();  // You can adjust the formatting if needed

        // Collect newsletter data
        const newsletterData = {
            bannerText: document.querySelector('#banner-text').value || '', 
            bannerImage: bannerImage, 
            mainImage: mainImage, 
            footerText: document.querySelector('#footer-text').value || '', 
            backgroundColor: document.querySelector('#background-color').value || '#ffffff', 
            additionalImages: additionalImages,
            savedAt: savedAt,  // Add the saved time property
            color: document.querySelector('#background-color').value || '#ffffff',  // Add the background color property
        };

        try {
            newsletters.push(newsletterData);  // Add the newsletter data to the saved newsletters
            localStorage.setItem('savedNewsletters', JSON.stringify(newsletters));  // Save the updated newsletters to localStorage
            console.log('Newsletter saved:', newsletterData);  // Log the saved data for debugging
            alert('Newsletter saved successfully!');  // Notify the user of the save
            window.location.href = "/save.html";  // Redirect to save.html after saving
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Error saving newsletter: Storage limit exceeded.');  // Handle storage limit errors
            } else {
                throw e;
            }
        }
    }

    // Event listeners for real-time preview updates
    textInput.addEventListener('input', updatePreview);  // Update preview when text changes
    imageUpload.addEventListener('change', updatePreview);  // Update preview when banner image changes
    mainImageUpload.addEventListener('change', updatePreview);  // Update preview when main image changes
    footerTextInput.addEventListener('input', updatePreview);  // Update preview when footer text changes
    backgroundColorInput.addEventListener('input', updatePreview);  // Update preview when background color changes
    additionalImageUploads.forEach(input => input.addEventListener('change', updatePreview));  // Update preview for additional images

    // Save button listener
    saveButton.addEventListener('click', saveNewsletter);  // Save newsletter on button click
});

// Function to resize an image before saving
function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {  // Resize if the image exceeds the max dimensions
                if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);  // Draw resized image on canvas
            resolve(canvas.toDataURL('image/jpeg', 0.7));  // Convert canvas to a Data URL with reduced quality
        };
        img.onerror = reject;  // Handle image load errors
        img.src = URL.createObjectURL(file);  // Create a temporary URL for the image file
    });
}

// Popup management functions
import { showPopup, closePopup, handleFormSubmit } from './functionsMain.js';

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector(".popup-container");  // Select the popup container
    const closeBtn = popup.querySelector(".close-btn");  // Select the close button in the popup
    const form = popup.querySelector("form");  // Select the form inside the popup

    // Show the popup when the page loads
    showPopup(popup);

    // Close the popup when the close button is clicked
    closeBtn.addEventListener("click", function() {
        closePopup(popup);
    });

    // Handle form submission
    form.addEventListener("submit", function(event) {
        handleFormSubmit(event, popup);  // Handle form submit and close the popup
    });
});
