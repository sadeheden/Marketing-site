export function showPopup(popup) {
    const screenWidth = window.innerWidth;

    if (screenWidth > 900) {
        console.log("Showing popup");
        popup.style.display = "flex";
    } else {
        console.log("Popup not shown on small screens");
        popup.style.display = "none"; // Ensures it's hidden on smaller screens
    }
}

export function closePopup(popup) {
    console.log("Closing popup");
    popup.style.display = "none";
}

export function handleFormSubmit(event, popup) {
    event.preventDefault();
    const emailInput = popup.querySelector("input[type='email']");
    const email = emailInput.value;
    alert("Thank you for subscribing, " + email + "!");
    closePopup(popup);
}

// Automatically close the popup if the screen size is smaller than 900px
function handleResize() {
    const popup = document.querySelector(".popup-container");
    if (window.innerWidth < 900) {
        closePopup(popup);
    }
}

// Listen for window resize events
window.addEventListener('resize', handleResize);

// Close the popup on page load if the screen is already smaller than 900px
document.addEventListener('DOMContentLoaded', handleResize);
