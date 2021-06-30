it('should calculate the monthly rate correctly', function() {
	expect(calculateMonthlyPayment({ amount: 10000, years: 5, rate: 4.5 })).toEqual('186.43');
	expect(calculateMonthlyPayment({ amount: 100000, years: 5, rate: 4.5 })).toEqual('1864.30');
});

it('should return a result with 2 decimal places', function() {
	let str;
	let decimal;

	str = calculateMonthlyPayment({ amount: 10000, years: 5, rate: 4.5 });
	decimal = str.split('.')[1];
	expect(decimal.length).toEqual(2);

	str = calculateMonthlyPayment({ amount: 100000, years: 5, rate: 4.5 });
	decimal = str.split('.')[1];
	expect(decimal.length).toEqual(2);
});
//https://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number

it('should return a string', function() {
	expect(typeof calculateMonthlyPayment({ amount: 10000, years: 5, rate: 4.5 })).toBe('string');
});
