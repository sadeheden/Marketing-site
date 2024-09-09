document.addEventListener("DOMContentLoaded", () => {
    // Select elements that we declared in our html by id
    const sizeSelect = document.querySelector("#size");
    const colorInput = document.querySelector("#color");
    const textInput = document.querySelector("#text");
    const textStyleSelect = document.querySelector("#textStyle");
    const textSizeInput = document.querySelector("#textSize");
    const imageUpload = document.querySelector("#imageUpload");
    const banner = document.querySelector("#banner");
    const saveButton = document.querySelector("#saveButton");

    // Function to update the banner based on user inputs shows it realtime
    function updateBanner() {
        const size = sizeSelect.value;
        banner.className = `banner ${size}`; // Update banner size based on selection changes it in css

        const color = colorInput.value;
        banner.style.backgroundColor = color; // Change banner background color

        const text = textInput.value;
        const textStyle = textStyleSelect.value;
        const textSize = `${textSizeInput.value}px`;//change it in css

        // Apply text style (bold/italic) and font size
        banner.style.fontWeight = textStyle.includes('bold') ? 'bold' : 'normal';
        banner.style.fontStyle = textStyle.includes('italic') ? 'italic' : 'normal';
        banner.style.fontSize = textSize;

        banner.textContent = text; // Set banner text content

        const file = imageUpload.files[0]; // this line retrieves the first file the user has uploaded and stores it in the variable file [0] makes it one singe file of choice not more and if a group is selected it will choose only the first one
        if (file) {
            const reader = new FileReader();//web applications asynchronously read the contents of files
            reader.onload = function(e) {//The onload property is where you define what happens after the file has been fully loaded
                banner.style.backgroundImage = `url(${e.target.result})`; // e- event object and the target-Sets banner background image in css
                banner.style.backgroundSize = 'cover'; // Ensure image covers the banner
            };
            reader.readAsDataURL(file); // Read the uploaded image as a data URL
        } else {
            banner.style.backgroundImage = ''; // Remove image if none is uploaded
        }
    }

    // Function to resize the uploaded image for optimization
    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                let width = img.width;
                let height = img.height;

                // Maintain aspect ratio while resizing the image
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // Create a canvas to draw the resized image
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height); // Draw image to the canvas
                const dataUrl = canvas.toDataURL(file.type); // Convert canvas to data URL
                callback(dataUrl); // Return resized image data
            };
            img.src = event.target.result; // Set image source to the uploaded file
        };
        reader.readAsDataURL(file); // Read file as a data URL
    }

    // Function to save the banner to local storage
    function saveBanner(event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather current banner settings
        const size = sizeSelect.value;
        const color = colorInput.value;
        const text = textInput.value;
        const textStyle = textStyleSelect.value;
        const textSize = `${textSizeInput.value}px`;
        const file = imageUpload.files[0];

        const banners = JSON.parse(localStorage.getItem("savedBanners")) || []; // Get saved banners or create an empty array
        const timestamp = new Date().toLocaleString(); // Generate a timestamp for when the banner is saved

        // If there is an image, resize it before saving
        if (file) {
            resizeImage(file, 300, 300, function(resizedDataUrl) {
                const bannerData = {
                    size: size,
                    color: color,
                    text: text,
                    textStyle: textStyle,
                    textSize: textSize,
                    image: resizedDataUrl, // Use the resized image
                    savedAt: timestamp
                };

                banners.push(bannerData); // Add the new banner to the array
                try {
                    localStorage.setItem("savedBanners", JSON.stringify(banners)); // Save banners to localStorage
                    alert("Banner saved successfully!"); // Notify the user
                    window.location.href = "/save.html"; // Redirect to a save page
                } catch (e) {
                    console.error("Could not save to localStorage", e);
                    alert("Failed to save banner. Storage limit exceeded.");
                }
            });
        } else {
            const bannerData = {
                size: size,
                color: color,
                text: text,
                textStyle: textStyle,
                textSize: textSize,
                image: null, // No image uploaded
                savedAt: timestamp
            };

            banners.push(bannerData); // Add banner data without an image
            try {
                localStorage.setItem("savedBanners", JSON.stringify(banners)); // Save to localStorage
                alert("Banner saved successfully!"); // Notify the user
                window.location.href = "/save.html"; // Redirect
            } catch (e) {
                console.error("Could not save to localStorage", e);
                alert("Failed to save banner. Storage limit exceeded.");
            }
        }
    }

    // Add event listeners to update the banner whenever inputs change
    sizeSelect.addEventListener("change", updateBanner); // Update when banner size changes
    colorInput.addEventListener("input", updateBanner); // Update when background color changes
    textInput.addEventListener("input", updateBanner); // Update when text changes
    textStyleSelect.addEventListener("change", updateBanner); // Update when text style changes
    textSizeInput.addEventListener("input", updateBanner); // Update when text size changes
    imageUpload.addEventListener("change", updateBanner); // Update when an image is uploaded

    // Add event listener to save banner when the save button is clicked
    saveButton.addEventListener("click", saveBanner);
});
