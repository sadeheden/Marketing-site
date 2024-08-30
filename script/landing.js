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

function saveLandingPage() {
    alert('Landing page saved!'); // Replace with actual save functionality
}
////fix part of the peview photos
function generateLandingPage() {
    // Hide the edit options and show the preview
    document.getElementById('edit-options').style.display = 'none';
    document.getElementById('preview').style.display = 'block';

    // Get form data
    const layout = document.getElementById('layout-choice').value;
    const logo = document.getElementById('logo-photo').files[0];
    const companyName = document.getElementById('company-name').value;
    const photo = document.getElementById('hero-photo').files[0];
    const title = document.getElementById('hero-title').value;
    const headerColor = document.getElementById('header-color').value;
    const numPhotos = document.getElementById('num-photos').value;
    const bodyText = document.getElementById('body-text').value;
    const bgColor = document.getElementById('bg-color').value;

    let previewContent = `<div style="background-color: ${bgColor}; padding: 20px;">`;

    // Build header content
    previewContent += `<header style="background-color: ${headerColor}; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px;">`;

    if (logo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewContent += `<div class="logo"><img src="${e.target.result}" alt="Company Logo" style="height: 50px;"></div>`;
            finalizePreview();
        };
        reader.readAsDataURL(logo);
    } else {
        finalizePreview();
    }

    function finalizePreview() {
        previewContent += `<div class="company-name">${companyName}</div>
                           <nav>
                               <button>Home</button>
                               <button>About</button>
                               <button>Contact</button>
                           </nav>
                           </header>`;
        
        previewContent += `<section class="hero">
                              <h1>${title}</h1>`;

        if (photo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewContent += `<img src="${e.target.result}" alt="Hero Image" style="width: 100%;"><br>`;
                appendPhotos();
            };
            reader.readAsDataURL(photo);
        } else {
            appendPhotos();
        }
    }

    function appendPhotos() {
        let imagesLoaded = 0;
        previewContent += `<section class="photo-grid layout${layout.slice(-1)}">`;
    
        for (let i = 0; i < numPhotos; i++) {
            const fileInput = document.querySelector(`#body-photo-${i + 1}`);
            if (fileInput && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewContent += `<img src="${e.target.result}" alt="Body Image ${i + 1}" style="max-width: 100%; height: auto; margin: 5px auto;">`;
                    imagesLoaded++;
                    if (imagesLoaded == numPhotos) {
                        finishPreview();
                    }
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        }
    
        function finishPreview() {
            previewContent += `</section>`;
            previewContent += `<p class="body-text" style="clear: both;">${bodyText}</p>`;
    
            // Add the email sign-up section before the back and save buttons
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
    
            // Add the Back and Save buttons with better styling
            previewContent += `<div style="text-align: center; margin-top: 20px;">
                                   <button onclick="goBack()" class="preview-button back-button">Back</button>
                                   <button onclick="saveLandingPage()" class="preview-button save-button">Save</button>
                               </div>`;
    
            document.getElementById('preview-content').innerHTML = previewContent;
        }
    }
    
}
