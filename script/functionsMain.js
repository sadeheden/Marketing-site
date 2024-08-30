export function showPopup(popup) {
    console.log("Showing popup");
    popup.style.display = "flex";
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
