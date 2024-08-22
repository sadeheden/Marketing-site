// newsletter.js

document.addEventListener('DOMContentLoaded', () => {
    const bannerTextInput = document.getElementById('banner-text');
    const bannerImageInput = document.getElementById('banner-image');
    const mainImageInput = document.getElementById('main-image');
    const footerTextInput = document.getElementById('footer-text');
    const previewBannerText = document.getElementById('preview-banner-text');
    const previewBannerImg = document.getElementById('preview-banner-img');
    const previewMainImg = document.getElementById('preview-main-img');
    const previewFooterText = document.getElementById('preview-footer-text');
    const saveBannerTextBtn = document.getElementById('save-banner-text');
    const saveBannerImageBtn = document.getElementById('save-banner-image');
    const saveMainImageBtn = document.getElementById('save-main-image');
    const saveFooterTextBtn = document.getElementById('save-footer-text');

    function updatePreview() {
        previewBannerText.textContent = bannerTextInput.value;

        if (bannerImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                previewBannerImg.src = reader.result;
            };
            reader.readAsDataURL(bannerImageInput.files[0]);
        }

        if (mainImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                previewMainImg.src = reader.result;
            };
            reader.readAsDataURL(mainImageInput.files[0]);
        }

        previewFooterText.textContent = footerTextInput.value;
    }

    function saveNewsletterData() {
        const newsletterData = {
            bannerText: bannerTextInput.value,
            bannerImage: bannerImageInput.files[0] ? URL.createObjectURL(bannerImageInput.files[0]) : null,
            mainImage: mainImageInput.files[0] ? URL.createObjectURL(mainImageInput.files[0]) : null,
            footerText: footerTextInput.value
        };

        localStorage.setItem('newsletterData', JSON.stringify(newsletterData));
        alert('Newsletter saved successfully!');
    }

    bannerTextInput.addEventListener('input', updatePreview);
    bannerImageInput.addEventListener('change', updatePreview);
    mainImageInput.addEventListener('change', updatePreview);
    footerTextInput.addEventListener('input', updatePreview);

    saveBannerTextBtn.addEventListener('click', saveNewsletterData);
    saveBannerImageBtn.addEventListener('click', saveNewsletterData);
    saveMainImageBtn.addEventListener('click', saveNewsletterData);
    saveFooterTextBtn.addEventListener('click', saveNewsletterData);
});
