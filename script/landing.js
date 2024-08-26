document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var iframe = document.getElementById('previewFrame');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Change background color
    var backgroundColor = document.getElementById('backgroundColor').value;
    iframeDoc.body.style.backgroundColor = backgroundColor;

    // Change movie name
    var movieName = document.getElementById('movieName').value;
    var h1 = iframeDoc.querySelector('.hero-content h1');
    if (h1 && movieName) h1.textContent = movieName;

    // Change button text
    var buttonText = document.getElementById('buttonText').value;
    var button = iframeDoc.querySelector('.hero-content .cta-button');
    if (button && buttonText) button.textContent = buttonText;

    // Upload and change hero photo
    var photoUpload = document.getElementById('photoUpload');
    if (photoUpload.files && photoUpload.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = iframeDoc.querySelector('.hero-background img');
            if (img) img.src = e.target.result;
        }
        reader.readAsDataURL(photoUpload.files[0]);
    }
});
