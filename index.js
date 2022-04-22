let submitButton = document.querySelector(".form-button");
let numberInput = document.querySelector("#phone-number");
let userData = document.querySelectorAll(".input-elements");
let userChoice = document.querySelectorAll("select");
let invalidInputs = ["+", "-", "e"];
let errorClass = document.querySelector(".errorClass")
let formElement = document.querySelector(".form-element")
let checkBox = document.querySelectorAll(".checkbox")


//to prevent character "e" being typed to number field
numberInput.addEventListener("keydown", function (event) {
    if (invalidInputs.includes(event.key)) {
        event.preventDefault();
    }
});


//adding validation on input change
(function validateOnInputChange() {
    for (let item of userData) {
        item.addEventListener("input", (event) => {
            event.target.value.length === 0 ? showError(item, "This is a required field") : inputFieldCondition(item)
        })
    }
})();


//adding validation on choice change
(function validateOnChoiceChange() {
    for (let item of userChoice) {
        item.addEventListener("input", (event) => {
            if (event.target.value === "") {
                showError(event.target, "Please select one of the choices");
            } else {
                removeError(item)
            }
        });
    }
})();


//adding validation on submit
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    inputValidation();
    checkBoxValidation();
})


//displaying user data
function onSubmit() {
    displayUserData();
    displayUserChoices();
}


function displayUserData() {
    for (let item of userData) {
        console.log(item.name + " : " + item.value);
    }
}


function displayUserChoices() {
    for (let item of userChoice) {
        let value = item.options[item.selectedIndex].text;
        console.log(value);
    }
}


//validation of input and select fields
function inputValidation() {
    for (let item of userData) {
        item.value.length === 0 ? showError(item, "This is a required field") : inputFieldCondition(item)
    }
    for (let item of userChoice) {
        if (item.value === "") {
            showError(item, "Please select one of the choices");
        }
    }
}


//validating the conditions of input fields
function inputFieldCondition(element) {
    switch (element.type) {
        case "text": if (element.value.length <= 3) {
            showError(element, `${element.placeholder} should be minimum 4 character length`)
        } else {
            removeError(element)
        } break;
        case "email": if (!element.value.includes("@" && ".")) {
            showError(element, "Please enter a valid email address.")
        } else {
            removeError(element)
        } break;
        case "number": if (element.value.length !== 10) {
            showError(element, `Please enter a valid ${element.placeholder}`)
        } else {
            removeError(element)
        }
        default: onSubmit();
    }
}


//showing error messages and adding red border
function showError(element, message) {
    let errorElement = element.nextElementSibling;
    errorElement.classList.remove("hidden");
    errorElement.classList.add("error-message");
    errorElement.innerHTML = message;
    element.classList.add("error")
}


//removing error messages and red border
function removeError(element) {
    element.nextElementSibling.classList.add("hidden");
    element.classList.remove("error")
}


//validating the checkbox
function checkBoxValidation() {
    for (let item of checkBox) {
        if (item.checked !== true) {
            item.nextElementSibling.style.color = "red"
        }
        item.addEventListener("input", (e) => {
            if (item.checked !== true) {
                e.target.nextElementSibling.style.color = "red"
            } else {
                e.target.nextElementSibling.style.color = "black"
            }
        })
    }
}


