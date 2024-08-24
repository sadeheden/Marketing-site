document.addEventListener('DOMContentLoaded', () => {
    const bannerTextInput = document.getElementById('banner-text-blue');
    const bannerImageInput = document.getElementById('banner-image-blue');
    const mainImageInput = document.getElementById('main-image-blue');
    const footerTextInput = document.getElementById('footer-text-blue');
    const backgroundColorInput = document.getElementById('background-color-blue');
    const saveButton = document.getElementById('save-all');

    // Function to update the preview based on current input values
    const updatePreview = () => {
        const bannerText = bannerTextInput.value;
        const footerText = footerTextInput.value;
        const backgroundColor = backgroundColorInput.value;

        document.getElementById('preview-banner-text-blue').innerText = bannerText;
        document.getElementById('preview-footer-text-blue').innerText = footerText;
        document.getElementById('newsletter-preview').style.backgroundColor = backgroundColor;

        if (bannerImageInput.files[0]) {
            document.getElementById('preview-banner-img-blue').src = URL.createObjectURL(bannerImageInput.files[0]);
        }
        if (mainImageInput.files[0]) {
            document.getElementById('preview-main-img-blue').src = URL.createObjectURL(mainImageInput.files[0]);
        }
    };

    // Add event listeners to update preview as user makes changes
    bannerTextInput.addEventListener('input', updatePreview);
    bannerImageInput.addEventListener('change', updatePreview);
    mainImageInput.addEventListener('change', updatePreview);
    footerTextInput.addEventListener('input', updatePreview);
    backgroundColorInput.addEventListener('input', updatePreview);

    // Save all changes to localStorage when save button is clicked
    saveButton.addEventListener('click', () => {
        const bannerText = bannerTextInput.value;
        const footerText = footerTextInput.value;
        const backgroundColor = backgroundColorInput.value;

        localStorage.setItem('bannerTextBlue', bannerText);

        if (bannerImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('bannerImageBlue', e.target.result);
            };
            reader.readAsDataURL(bannerImageInput.files[0]);
        }

        if (mainImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('mainImageBlue', e.target.result);
            };
            reader.readAsDataURL(mainImageInput.files[0]);
        }

        localStorage.setItem('footerTextBlue', footerText);
        localStorage.setItem('backgroundColorBlue', backgroundColor);

        alert('All changes have been saved!');
    });
});
