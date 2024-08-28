document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var iframe = document.getElementById('previewFrame');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    if (!iframeDoc) {
        console.error("Could not access iframe document.");
        return;
    }

    // Change background color
    var backgroundColor = document.getElementById('backgroundColor').value;
    console.log("Changing background color to:", backgroundColor);
    iframeDoc.body.style.backgroundColor = backgroundColor;

    // Change movie name
    var movieName = document.getElementById('movieName').value;
    var h1 = iframeDoc.querySelector('.hero-content h1');
    if (h1 && movieName) {
        console.log("Changing movie name to:", movieName);
        h1.textContent = movieName;
    } else {
        console.error("Could not find the movie name element or the input was empty.");
    }

    // Change button text
    var buttonText = document.getElementById('buttonText').value;
    var button = iframeDoc.querySelector('.hero-content .cta-button');
    if (button && buttonText) {
        console.log("Changing button text to:", buttonText);
        button.textContent = buttonText;
    } else {
        console.error("Could not find the button element or the input was empty.");
    }

    // Upload and change hero photo
    var photoUpload = document.getElementById('photoUpload');
    if (photoUpload.files && photoUpload.files[0]) {
        console.log("Changing hero image.");
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = iframeDoc.querySelector('.hero-background img');
            if (img) img.src = e.target.result;
        }
        reader.readAsDataURL(photoUpload.files[0]);
    } else {
        console.error("No file selected for upload.");
    }
});
