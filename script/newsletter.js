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

    function convertImageToDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

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

    async function saveNewsletter() {
        const newsletters = JSON.parse(localStorage.getItem('savedNewsletters')) || [];
    
        const bannerImage = document.getElementById('banner-image').files[0] ? await resizeImage(document.getElementById('banner-image').files[0], 800, 600) : null;
        const mainImage = document.getElementById('main-image').files[0] ? await resizeImage(document.getElementById('main-image').files[0], 800, 600) : null;
        const additionalImages = await Promise.all(Array.from(document.querySelectorAll('[id^="additional-image-"]')).map(input => input.files[0] ? resizeImage(input.files[0], 800, 600) : null));
    
        const newsletterData = {
            bannerText: document.getElementById('banner-text').value || '', 
            bannerImage: bannerImage, 
            mainImage: mainImage, 
            footerText: document.getElementById('footer-text').value || '', 
            backgroundColor: document.getElementById('background-color').value || '#ffffff', 
            additionalImages: additionalImages
        };
    
        try {
            newsletters.push(newsletterData);
            localStorage.setItem('savedNewsletters', JSON.stringify(newsletters));
            console.log('Newsletter saved:', newsletterData); // Debugging output
            alert('Newsletter saved successfully!');
            window.location.href = "/save.html";  // Redirect to save.html after saving
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Error saving newsletter: Storage limit exceeded.');
            } else {
                throw e;
            }
        }
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
function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
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
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));  // Reduce quality for smaller size
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}
