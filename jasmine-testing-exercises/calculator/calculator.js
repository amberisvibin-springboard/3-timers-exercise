window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getUIElements() {
  return {
    amount: document.getElementById("loan-amount"),
    years: document.getElementById("loan-years"),
    rate: document.getElementById("loan-rate"),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let values = getUIElements();
  values.amount.value = 10000;
  values.years.value = 10;
  values.rate.value = .1332;
  updateMonthly(calculateMonthlyPayment({
    amount: values.amount.value,
    years: values.years.value,
    rate: values.rate.value,
  }));
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getUIElements();
  updateMonthly(calculateMonthlyPayment({
    amount: values.amount.value,
    years: values.years.value,
    rate: values.rate.value,
  }));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  //monthly payment = (P x i) / (1 - (1 + i) ^ -n)
  let periodic = values.rate / 12;
  let monthly = values.amount * periodic;
  monthly = monthly / (1 - Math.pow(1 + periodic, values.years * -12));
  return +monthly.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.innerText = monthly.toFixed(2);
}
