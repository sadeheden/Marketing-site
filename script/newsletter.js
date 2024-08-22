// newsletter.js

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('banner-text');
    const imageUpload = document.getElementById('banner-image');
    const mainImageUpload = document.getElementById('main-image');
    const footerTextInput = document.getElementById('footer-text');
    const previewBannerText = document.getElementById('preview-banner-text');
    const previewBannerImg = document.getElementById('preview-banner-img');
    const previewMainImg = document.getElementById('preview-main-img');
    const previewFooterText = document.getElementById('preview-footer-text');
    const saveButton = document.getElementById('save-button');

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
    }

    textInput.addEventListener('input', updatePreview);
    imageUpload.addEventListener('change', updatePreview);
    mainImageUpload.addEventListener('change', updatePreview);
    footerTextInput.addEventListener('input', updatePreview);

    saveButton.addEventListener('click', () => {
        const newsletterData = {
            bannerText: textInput.value,
            bannerImage: imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : null,
            mainImage: mainImageUpload.files[0] ? URL.createObjectURL(mainImageUpload.files[0]) : null,
            footerText: footerTextInput.value
        };

        localStorage.setItem('newsletterData', JSON.stringify(newsletterData));

        alert('Newsletter saved successfully!');
    });
});
