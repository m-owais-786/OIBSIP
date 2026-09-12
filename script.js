const form = document.getElementById("converterForm");
const input = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const resultValue = document.getElementById("resultValue");
const message = document.getElementById("message");
const swapBtn = document.getElementById("swapBtn");

const ABS_ZERO = { C: -273.15, F: -459.67, K: 0 };
const symbols = { C: "°C", F: "°F", K: "K" };

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function fromCelsius(celsius, unit) {
  if (unit === "C") return celsius;
  if (unit === "F") return (celsius * 9 / 5) + 32;
  return celsius + 273.15;
}

function isBelowAbsoluteZero(value, unit) {
  return value < ABS_ZERO[unit] - 1e-10;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";
  result.hidden = true;

  const value = Number(input.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (input.value.trim() === "" || !Number.isFinite(value)) {
    message.textContent = "Please enter a valid numeric temperature.";
    return;
  }

  if (isBelowAbsoluteZero(value, from)) {
    message.textContent = `Invalid temperature: ${value} ${symbols[from]} is below absolute zero.`;
    return;
  }

  const converted = fromCelsius(toCelsius(value, from), to);
  resultValue.textContent = `${converted.toFixed(2).replace(/\.00$/, "")} ${symbols[to]}`;
  result.hidden = false;
});

swapBtn.addEventListener("click", () => {
  const oldFrom = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = oldFrom;
  result.hidden = true;
  message.textContent = "";
});
