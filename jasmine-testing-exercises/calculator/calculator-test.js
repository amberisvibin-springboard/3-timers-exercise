it('should calculate the monthly rate correctly', function () {
  expect(
    calculateMonthlyPayment({
      amount: 10000,
      years: 10,
      rate: .1332,
    })
  ).toEqual(151.20);
});


it("should return a result with 2 decimal places", function() {
  let result = calculateMonthlyPayment({
    amount: 10000,
    years: 10,
    rate: .1332,
  }).toString();
  expect(result[result.length - 2]).toEqual(".");
});