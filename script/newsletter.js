document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('banner-text');
    const imageUpload = document.getElementById('banner-image');
    const mainImageUpload = document.getElementById('main-image');
    const footerTextInput = document.getElementById('footer-text');
    const backgroundColorInput = document.getElementById('background-color'); // Added for background color
    const previewBannerText = document.getElementById('preview-banner-text');
    const previewBannerImg = document.getElementById('preview-banner-img');
    const previewMainImg = document.getElementById('preview-main-img');
    const previewFooterText = document.getElementById('preview-footer-text');
    const previewContainer = document.getElementById('preview-container'); // Container for preview
    const previewAdditionalImage1 = document.getElementById('preview-additional-image-1');
    const previewAdditionalImage2 = document.getElementById('preview-additional-image-2');
    const previewAdditionalImage3 = document.getElementById('preview-additional-image-3');
    const previewAdditionalImage4 = document.getElementById('preview-additional-image-4');
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
                    switch (index) {
                        case 0:
                            previewAdditionalImage1.src = reader.result;
                            break;
                        case 1:
                            previewAdditionalImage2.src = reader.result;
                            break;
                        case 2:
                            previewAdditionalImage3.src = reader.result;
                            break;
                        case 3:
                            previewAdditionalImage4.src = reader.result;
                            break;
                    }
                };
                reader.readAsDataURL(input.files[0]);
            }
        });
    }

    textInput.addEventListener('input', updatePreview);
    imageUpload.addEventListener('change', updatePreview);
    mainImageUpload.addEventListener('change', updatePreview);
    footerTextInput.addEventListener('input', updatePreview);
    backgroundColorInput.addEventListener('input', updatePreview); // Event listener for background color

    additionalImageUploads.forEach(input => input.addEventListener('change', updatePreview));

    saveButton.addEventListener('click', () => {
        const newsletterData = {
            bannerText: textInput.value,
            bannerImage: imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : null,
            mainImage: mainImageUpload.files[0] ? URL.createObjectURL(mainImageUpload.files[0]) : null,
            footerText: footerTextInput.value,
            backgroundColor: backgroundColorInput.value, // Save background color
            additionalImages: additionalImageUploads.map(input => input.files[0] ? URL.createObjectURL(input.files[0]) : null)
        };

        localStorage.setItem('newsletterData', JSON.stringify(newsletterData));

        alert('Newsletter saved successfully!');
    });
});
