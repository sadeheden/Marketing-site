window.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('previewFrame');
    const saveButton = document.getElementById('save-all'); // Ensure this ID matches the button in your HTML
    const backgroundColorInput = document.getElementById('backgroundColor');
    const movieNameInput = document.getElementById('movieName');
    const heroTitleInput = document.getElementById('heroTitle');
    const buttonTextInput = document.getElementById('buttonText');
    const photoUploadInput = document.getElementById('photoUpload');

    iframe.addEventListener('load', function() {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        backgroundColorInput.addEventListener('input', function() {
            iframeDoc.querySelector('.more-movies').style.backgroundColor = this.value;
        });

        movieNameInput.addEventListener('input', function() {
            const h1 = iframeDoc.querySelector('.more-movies h1');
            if (h1 && this.value) {
                h1.textContent = this.value;
            }
        });

        heroTitleInput.addEventListener('input', function() {
            const h1 = iframeDoc.querySelector('.hero-content h1');
            if (h1 && this.value) {
                h1.textContent = this.value;
            }
        });

        buttonTextInput.addEventListener('input', function() {
            const button = iframeDoc.querySelector('.hero-content .cta-button');
            if (button && this.value) {
                button.textContent = this.value;
            }
        });

        photoUploadInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = iframeDoc.querySelector('.hero-background img');
                    if (img) img.src = e.target.result;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    function getBase64(file, callback) {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result);
        reader.readAsDataURL(file);
    }

    saveButton.addEventListener('click', function() {
        const landingPageData = {
            backgroundColor: backgroundColorInput.value,
            movieName: movieNameInput.value,
            heroTitle: heroTitleInput.value,
            buttonText: buttonTextInput.value,
            photoUpload: null,
        };

        if (photoUploadInput.files[0]) {
            getBase64(photoUploadInput.files[0], (result) => {
                landingPageData.photoUpload = result;
                saveLandingPageData(landingPageData);
            });
        } else {
            saveLandingPageData(landingPageData);
        }
    });

    function saveLandingPageData(data) {
        const landingPages = JSON.parse(localStorage.getItem('savedLandingPages')) || [];
        landingPages.push(data);
        localStorage.setItem('savedLandingPages', JSON.stringify(landingPages));
        alert('Landing page saved successfully!');
        window.location.href = "/save.html";  // Redirect to the saved files page after saving
    }
});
