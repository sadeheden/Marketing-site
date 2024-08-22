// newsletter-blue.js

document.addEventListener('DOMContentLoaded', () => {
    const bannerTextInput = document.getElementById('banner-text-blue');
    const saveBannerTextBtn = document.getElementById('save-banner-text-blue');
    const bannerImgInput = document.getElementById('banner-image-blue');
    const saveBannerImgBtn = document.getElementById('save-banner-image-blue');
    const mainImgInput = document.getElementById('main-image-blue');
    const saveMainImgBtn = document.getElementById('save-main-image-blue');
    const footerTextArea = document.getElementById('footer-text-blue');
    const saveFooterTextBtn = document.getElementById('save-footer-text-blue');
    const bgColorInput = document.getElementById('background-color-blue');
    const saveBgColorBtn = document.getElementById('save-background-color-blue');
    
    const previewBannerText = document.getElementById('preview-banner-text-blue');
    const previewBannerImg = document.getElementById('preview-banner-img-blue');
    const previewMainImg = document.getElementById('preview-main-img-blue');
    const previewFooterText = document.getElementById('preview-footer-text-blue');
    const newsletterPreview = document.getElementById('newsletter-preview');

    function updatePreview() {
        newsletterPreview.style.backgroundColor = bgColorInput.value;
        previewBannerText.textContent = bannerTextInput.value;
        
        if (bannerImgInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewBannerImg.src = e.target.result;
            };
            reader.readAsDataURL(bannerImgInput.files[0]);
        }

        if (mainImgInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewMainImg.src = e.target.result;
            };
            reader.readAsDataURL(mainImgInput.files[0]);
        }

        previewFooterText.textContent = footerTextArea.value;
    }

    saveBannerTextBtn.addEventListener('click', () => {
        localStorage.setItem('bannerText', bannerTextInput.value);
        updatePreview();
    });

    saveBannerImgBtn.addEventListener('click', () => {
        if (bannerImgInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem('bannerImg', e.target.result);
                updatePreview();
            };
            reader.readAsDataURL(bannerImgInput.files[0]);
        }
    });

    saveMainImgBtn.addEventListener('click', () => {
        if (mainImgInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem('mainImg', e.target.result);
                updatePreview();
            };
            reader.readAsDataURL(mainImgInput.files[0]);
        }
    });

    saveFooterTextBtn.addEventListener('click', () => {
        localStorage.setItem('footerText', footerTextArea.value);
        updatePreview();
    });

    saveBgColorBtn.addEventListener('click', () => {
        localStorage.setItem('bgColor', bgColorInput.value);
        updatePreview();
    });

    // Load saved values
    bannerTextInput.value = localStorage.getItem('bannerText') || '';
    footerTextArea.value = localStorage.getItem('footerText') || '';
    bgColorInput.value = localStorage.getItem('bgColor') || '#0000ff';

    if (localStorage.getItem('bannerImg')) {
        previewBannerImg.src = localStorage.getItem('bannerImg');
    }

    if (localStorage.getItem('mainImg')) {
        previewMainImg.src = localStorage.getItem('mainImg');
    }

    updatePreview();
});
