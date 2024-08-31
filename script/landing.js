function generatePhotoInputs() {
    const numPhotos = document.getElementById('num-photos').value;
    const photoUploadsDiv = document.getElementById('photo-uploads');

    // Clear previous photo inputs
    photoUploadsDiv.innerHTML = '';

    for (let i = 0; i < numPhotos; i++) {
        const photoInput = document.createElement('input');
        photoInput.type = 'file';
        photoInput.name = `body-photo-${i + 1}`;
        photoInput.id = `body-photo-${i + 1}`;
        photoUploadsDiv.appendChild(photoInput);
        photoUploadsDiv.appendChild(document.createElement('br'));
    }
}

function goBack() {
    // Show the edit options and hide the preview
    document.getElementById('edit-options').style.display = 'block';
    document.getElementById('preview').style.display = 'none';
}

async function generateLandingPage() {
    document.getElementById('edit-options').style.display = 'none';
    document.getElementById('preview').style.display = 'block';

    const layout = document.getElementById('layout-choice').value;
    const logoFile = document.getElementById('logo-photo').files[0];
    const companyName = document.getElementById('company-name').value;
    const heroPhotoFile = document.getElementById('hero-photo').files[0];
    const title = document.getElementById('hero-title').value;
    const headerColor = document.getElementById('header-color').value;
    const numPhotos = document.getElementById('num-photos').value;
    const bodyText = document.getElementById('body-text').value;
    const bgColor = document.getElementById('bg-color').value;

    let previewContent = `<div style="background-color: ${bgColor}; padding: 20px;">`;
    previewContent += `<header style="background-color: ${headerColor}; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px;">`;

    // Add the logo image if it exists
    if (logoFile) {
        try {
            const logoImageSrc = await fileToBase64(logoFile);
            previewContent += `<div class="logo"><img src="${logoImageSrc}" alt="Company Logo" style="height: 50px;"></div>`;
        } catch (error) {
            console.error("Error loading logo image:", error);
            previewContent += `<div class="logo">Logo not available</div>`;
        }
    } else {
        console.log("No logo file selected.");
        previewContent += `<div class="logo">No Logo</div>`;
    }

    // Add the company name and basic navigation
    previewContent += `<div class="company-name">${companyName}</div>
                       <nav>
                           <h1>Home</h1>
                           <h1>About</h1>
                           <h1>Contact</h1>
                       </nav>
                       </header>`;
    
    // Add the title to the hero section
    previewContent += `<section class="hero">
                          <h1>${title}</h1>`;
    
    // Load the hero image if it exists
    if (heroPhotoFile) {
        try {
            const heroImageSrc = await fileToBase64(heroPhotoFile);
            previewContent += `<img src="${heroImageSrc}" alt="Hero Image" style="width: 100%;"><br>`;
        } catch (error) {
            console.error("Error loading hero image:", error);
        }
    }

    // Load the body images
    let photoGridContent = `<section class="photo-grid layout${layout.slice(-1)}">`;
    let hasPhotos = false;  // Flag to check if photos are added
    for (let i = 0; i < numPhotos; i++) {
        const fileInput = document.querySelector(`#body-photo-${i + 1}`);
        if (fileInput && fileInput.files[0]) {
            try {
                hasPhotos = true;  // Mark that at least one photo is present
                const bodyImageSrc = await fileToBase64(fileInput.files[0]);
                photoGridContent += `<img src="${bodyImageSrc}" alt="Body Image ${i + 1}" style="max-width: 90%; height: auto; margin: 5px auto;">`;
            } catch (error) {
                console.error(`Error loading body image ${i + 1}:`, error);
            }
        } else {
            console.log(`No photo selected for #body-photo-${i + 1}`);
        }
    }
    photoGridContent += `</section>`;
    
    if (hasPhotos) {
        previewContent += photoGridContent;
    } else {
        previewContent += `<p>No photos available to display.</p>`;
    }

    // Add the body text and signup section
    previewContent += `<p class="body-text" style="clear: both;">${bodyText}</p>`;
    previewContent += `<section id="email-signup-section" style="text-align: center; margin-top: 20px;">
                           <div class="signup-box">
                               <h3>Stay Updated!</h3>
                               <p>Sign up with your email to receive the latest updates and exclusive offers.</p>
                               <form id="email-signup-form">
                                   <input type="email" id="signup-email" placeholder="Enter your email" required>
                                   <button type="submit">Sign Up</button>
                               </form>
                           </div>
                       </section>`;
    
    // Add the preview control buttons
    previewContent += `<div style="text-align: center; margin-top: 20px;">
                           <button onclick="goBack()" class="preview-button back-button">Back</button>
                           <button onclick="saveLandingPage()" class="preview-button save-button">Save</button>
                       </div>`;
    
    // Update the preview content
    document.getElementById('preview-content').innerHTML = previewContent;
}

// This is the end of generateLandingPage function

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions while maintaining the aspect ratio
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

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL(file.type));
        };
        img.onerror = reject;
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

async function saveLandingPage() {
    const landingPages = JSON.parse(localStorage.getItem('savedLandingPages')) || [];

    const layout = document.getElementById('layout-choice').value;
    const logoFile = document.getElementById('logo-photo').files[0];
    const companyName = document.getElementById('company-name').value;
    const heroPhotoFile = document.getElementById('hero-photo').files[0];
    const title = document.getElementById('hero-title').value;
    const headerColor = document.getElementById('header-color').value;
    const numPhotos = document.getElementById('num-photos').value;
    const bodyText = document.getElementById('body-text').value;
    const bgColor = document.getElementById('bg-color').value;

    const bodyPhotos = [];

    // Resize and convert body photos to Base64
    for (let i = 0; i < numPhotos; i++) {
        const fileInput = document.querySelector(`#body-photo-${i + 1}`);
        if (fileInput && fileInput.files[0]) {
            const base64Photo = await resizeImage(fileInput.files[0], 800, 600); // Resize to max 800x600
            bodyPhotos.push(base64Photo);
        }
    }

    // Resize and convert the logo and hero photo to Base64
    const landingPageData = {
        layout,
        logo: logoFile ? await resizeImage(logoFile, 300, 300) : null, // Resize logo to max 300x300
        companyName,
        heroPhoto: heroPhotoFile ? await resizeImage(heroPhotoFile, 800, 600) : null, // Resize hero photo to max 800x600
        title,
        headerColor,
        bodyText,
        bgColor,
        bodyPhotos,
        savedAt: new Date().toLocaleString() // Add the savedAt timestamp here
    };

    landingPages.push(landingPageData);
    localStorage.setItem('savedLandingPages', JSON.stringify(landingPages));

    alert('Landing page saved successfully!');
    window.location.href = "/save.html";  // Redirect to save.html after saving
}
