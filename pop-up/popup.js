document.addEventListener("DOMContentLoaded", function () {
    const buyButton = document.getElementById("buyButton");

    buyButton.addEventListener("click", function () {
        openPopup();
    });

    function openPopup() {
        // Create a popup overlay
        const popupOverlay = document.createElement("div");
        popupOverlay.classList.add("stock-popup-overlay");

        // Create a popup div
        const popup = document.createElement("div");
        popup.classList.add("stock-popup");

        // Create a header with the stock ticker
        const header = document.createElement("h2");
        header.textContent = "Buy Shares";

        // Create a form inside the popup
        const form = document.createElement("form");

        // Create an input field for the number of shares
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Enter the number of shares...";
        form.appendChild(input);

        // Create a submit button
        const submit = document.createElement("button");
        submit.textContent = "Submit Order";
        form.appendChild(submit);

        // Handle the submit action
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const shares = input.value;
            console.log(`Buying ${shares} shares`);

            // Close the popup
            closePopup();
        });

        // Append the form to the popup
        popup.appendChild(header);
        popup.appendChild(form);

        // Append the popup to the overlay
        popupOverlay.appendChild(popup);

        // Append the overlay to the document body
        document.body.appendChild(popupOverlay);
    }

    function closePopup() {
        const popupOverlay = document.querySelector(".stock-popup-overlay");
        if (popupOverlay) {
            popupOverlay.remove();
        }
    }
});
