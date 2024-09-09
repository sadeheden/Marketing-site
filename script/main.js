//this file is athe first part of the popup that appers in the newsletter 
//the secod part is functionMain
document.addEventListener("DOMContentLoaded", function() {
    // Select the popup element using querySelector by its ID
    const popup = document.querySelector("#projectPopup");
    // Select the 'Continue' button using querySelector by its ID
    const continueButton = document.querySelector("#continueButton");
    // Select the 'New Project' button using querySelector by its ID
    const newButton = document.querySelector("#newButton");

    // Show the popup when the page loads
    popup.style.display = "block";

    // Event listener for the 'Continue' button
    continueButton.addEventListener("click", function() {
        // Redirect to save.html to continue with the previous project
        window.location.href = "save.html";
    });

    // Event listener for the 'New Project' button
    newButton.addEventListener("click", function() {
        // Hide the popup when starting a new project
        popup.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Select the popup element using querySelector by its ID
    const popup = document.querySelector("#projectPopup");
    // Select the 'Continue' button using querySelector by its ID
    const continueButton = document.querySelector("#continueButton");
    // Select the 'New Project' button using querySelector by its ID
    const newButton = document.querySelector("#newButton");

    // Show the popup and apply a dimmed background effect to the body when the page loads
    popup.style.display = "block";
    document.body.classList.add("dimmed");

    // Event listener for the 'Continue' button
    continueButton.addEventListener("click", function() {
        // Redirect to save.html to continue with the previous project
        window.location.href = "save.html";
    });

    // Event listener for the 'New Project' button
    newButton.addEventListener("click", function() {
        // Hide the popup when starting a new project
        popup.style.display = "none";
        // Remove the dimmed effect from the body
        document.body.classList.remove("dimmed");
    });
});
