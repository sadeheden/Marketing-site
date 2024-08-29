window.addEventListener('DOMContentLoaded', function() {
    var iframe = document.getElementById('previewFrame');

    iframe.addEventListener('load', function() {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Change background color
        var backgroundColorInput = document.getElementById('backgroundColor');
        if (backgroundColorInput) {
            backgroundColorInput.addEventListener('input', function() {
                iframeDoc.querySelector('.more-movies').style.backgroundColor = this.value;
            });
        }

        // Change movie name (inside .more-movies)
        var movieNameInput = document.getElementById('movieName');
        if (movieNameInput) {
            movieNameInput.addEventListener('input', function() {
                var h1 = iframeDoc.querySelector('.more-movies h1');
                if (h1 && this.value) {
                    h1.textContent = this.value;
                }
            });
        }

        // Change hero title
        var heroTitleInput = document.getElementById('heroTitle');
        if (heroTitleInput) {
            heroTitleInput.addEventListener('input', function() {
                var h1 = iframeDoc.querySelector('.hero-content h1');
                if (h1 && this.value) {
                    h1.textContent = this.value;
                }
            });
        }

        // Change button text
        var buttonTextInput = document.getElementById('buttonText');
        if (buttonTextInput) {
            buttonTextInput.addEventListener('input', function() {
                var button = iframeDoc.querySelector('.hero-content .cta-button');
                if (button && this.value) {
                    button.textContent = this.value;
                }
            });
        }

        // Upload and change hero photo
        var photoUploadInput = document.getElementById('photoUpload');
        if (photoUploadInput) {
            photoUploadInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var img = iframeDoc.querySelector('.hero-background img');
                        if (img) img.src = e.target.result;
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
    });
});
