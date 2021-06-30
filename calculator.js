window.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('calc-form');
	if (form) {
		setupIntialValues();
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			update();
		});
	}
});

function getCurrentUIValues() {
	return {
		amount : +document.getElementById('loan-amount').value,
		years  : +document.getElementById('loan-years').value,
		rate   : +document.getElementById('loan-rate').value
	};
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
	return {
		principle       : function(amount) {
			return amount;
		},
		months          : function(years) {
			return years * 12;
		},
		monthlyRate     : function(rate) {
			return rate / 100 / 12;
		},
		topOperation    : function(p, i) {
			return p * i;
		},
		bottomOperation : function(i, n) {
			return 1 - Math.pow(1 + i, -n);
		}
	};
}
//https://stackoverflow.com/questions/8902687/javascript-storing-function-in-object-bad-practice

// Get the current values from the UI
// Update the monthly payment
function update() {
	let values = getCurrentUIValues();
	let payment = calculateMonthlyPayment(values);
	updateMonthly(payment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
	let p;
	let n;
	let i;
	let topOperation;
	let bottomOperation;
	let payment;
	let convert = setupIntialValues();

	p = convert.principle(values.amount);
	n = convert.months(values.years);
	i = convert.monthlyRate(values.rate);
	topOperation = convert.topOperation(p, i);
	bottomOperation = convert.bottomOperation(i, n);
	payment = '$' + Math.floor(topOperation / bottomOperation * 100) / 100;

	return payment;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
	let displayPayment = document.querySelector('#monthly-payment');
	displayPayment.append(monthly);
}
