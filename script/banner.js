document.addEventListener("DOMContentLoaded", () => {
    const sizeSelect = document.getElementById("size");
    const colorInput = document.getElementById("color");
    const textInput = document.getElementById("text");
    const textStyleSelect = document.getElementById("textStyle");
    const textSizeInput = document.getElementById("textSize");
    const imageUpload = document.getElementById("imageUpload");
    const banner = document.getElementById("banner");
    const saveButton = document.getElementById("saveButton");

    function updateBanner() {
        const size = sizeSelect.value;
        banner.className = `banner ${size}`;

        const color = colorInput.value;
        banner.style.backgroundColor = color;

        const text = textInput.value;
        const textStyle = textStyleSelect.value;
        const textSize = `${textSizeInput.value}px`;

        // Apply text style
        banner.style.fontWeight = textStyle.includes('bold') ? 'bold' : 'normal';
        banner.style.fontStyle = textStyle.includes('italic') ? 'italic' : 'normal';
        banner.style.fontSize = textSize;

        banner.textContent = text;

        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                banner.style.backgroundImage = `url(${e.target.result})`;
                banner.style.backgroundSize = 'cover';
            };
            reader.readAsDataURL(file);
        } else {
            banner.style.backgroundImage = '';
        }
    }

    // Function to resize the image
    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                let width = img.width;
                let height = img.height;

                // Calculate the new dimensions
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

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL(file.type);
                callback(dataUrl);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Function to save the banner
    function saveBanner(event) {
        event.preventDefault();

        const size = sizeSelect.value;
        const color = colorInput.value;
        const text = textInput.value;
        const textStyle = textStyleSelect.value;
        const textSize = `${textSizeInput.value}px`;
        const file = imageUpload.files[0];

        const banners = JSON.parse(localStorage.getItem("savedBanners")) || [];
        const timestamp = new Date().toLocaleString();

        if (file) {
            resizeImage(file, 300, 300, function(resizedDataUrl) {
                const bannerData = {
                    size: size,
                    color: color,
                    text: text,
                    textStyle: textStyle,
                    textSize: textSize,
                    image: resizedDataUrl, // Use resized image
                    savedAt: timestamp
                };

                banners.push(bannerData);
                try {
                    localStorage.setItem("savedBanners", JSON.stringify(banners));
                    alert("Banner saved successfully!");
                    window.location.href = "/save.html";
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
                image: null,
                savedAt: timestamp
            };

            banners.push(bannerData);
            try {
                localStorage.setItem("savedBanners", JSON.stringify(banners));
                alert("Banner saved successfully!");
                window.location.href = "/save.html";
            } catch (e) {
                console.error("Could not save to localStorage", e);
                alert("Failed to save banner. Storage limit exceeded.");
            }
        }
    }

    sizeSelect.addEventListener("change", updateBanner);
    colorInput.addEventListener("input", updateBanner);
    textInput.addEventListener("input", updateBanner);
    textStyleSelect.addEventListener("change", updateBanner);
    textSizeInput.addEventListener("input", updateBanner);
    imageUpload.addEventListener("change", updateBanner);

    saveButton.addEventListener("click", saveBanner);
});
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
