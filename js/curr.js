const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");
const amountInput = document.querySelector("form input");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        select.append(option);

        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            option.selected = true;
        }
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

// Update flag
function updateFlag(element) {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Button click
btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amount = amountInput.value;
    if (amount === "" || amount < 1) {
        amount = 1;
        amountInput.value = "1";
    }

    const result = await convertCurrency(
        fromSelect.value,
        toSelect.value,
        amount
    );

    msg.innerText = `${amount} ${fromSelect.value} = ${result.toFixed(2)} ${toSelect.value}`;
});

// Currency conversion
async function convertCurrency(from, to, amount) {
    const URL = `${BASE_URL}/${from.toLowerCase()}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data[from.toLowerCase()][to.toLowerCase()];
    return amount * rate;
}
