document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("projectPopup");
    const continueButton = document.getElementById("continueButton");
    const newButton = document.getElementById("newButton");

    // Show the popup when the page loads
    popup.style.display = "block";

    // Continue with the previous project
    continueButton.addEventListener("click", function() {
        window.location.href = "save.html";
    });

    // Start a new project
    newButton.addEventListener("click", function() {
        popup.style.display = "none";
    });
});
