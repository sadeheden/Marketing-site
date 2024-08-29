document.addEventListener("DOMContentLoaded", () => {
    const sizeSelect = document.getElementById("size");
    const colorInput = document.getElementById("color");
    const textInput = document.getElementById("text");
    const imageUpload = document.getElementById("imageUpload");
    const banner = document.getElementById("banner");

    // Update banner preview on input changes
    sizeSelect.addEventListener("change", updateBanner);
    colorInput.addEventListener("input", updateBanner);
    textInput.addEventListener("input", updateBanner);
    imageUpload.addEventListener("change", updateBanner);

    function updateBanner() {
        // Set banner size
        const size = sizeSelect.value;
        banner.className = `banner ${size}`;

        // Set banner background color
        const color = colorInput.value;
        banner.style.backgroundColor = color;

        // Set banner text
        const text = textInput.value;
        banner.textContent = text;

        // Set banner image
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                banner.style.backgroundImage = `url(${e.target.result})`;
                banner.style.backgroundSize = 'cover';
            };
            reader.readAsDataURL(file);
        } else {
            banner.style.backgroundImage = ''; // Remove image if none selected
        }
    }

    // Save banner settings to local storage
    window.saveBanner = function() {
        const bannerData = {
            size: sizeSelect.value,
            color: colorInput.value,
            text: textInput.value,
            image: imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : null
        };
        localStorage.setItem("savedBanner", JSON.stringify(bannerData));
        window.location.href = "/save.html";
    };
});
