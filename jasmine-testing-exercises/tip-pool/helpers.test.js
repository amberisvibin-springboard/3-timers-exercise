describe("Helpers test", function() {
    it('should append td to tr on appendTd()', function () {
        let newTr = document.createElement('tr');
        newTr.setAttribute('id', "test");
        appendTd(newTr, "test");
  
        expect(newTr.innerHTML).toEqual('<td>test</td>');
    });

    it('should return correct tip percent on calculateTipPercent()', function() {
        let tipPercent = calculateTipPercent(10, 2.5);
        
        expect(tipPercent).toEqual(25);
    })
    
    it('should return correct totals on sumPaymentTotal()', function() {
        billAmtInput.value = '10';
        tipAmtInput.value = '2.5';
        let curPayment = createCurPayment();

        if (curPayment) {
            paymentId += 1;

            allPayments['payment' + paymentId] = curPayment;
        }

        let tips = sumPaymentTotal("tipAmt");
        let bills = sumPaymentTotal("billAmt");
        let tipsPercents = sumPaymentTotal("tipPercent");

        expect(tips).toEqual(2.5);
        expect(bills).toEqual(10);
        expect(tipsPercents).toEqual(25);
    })

    //TODO: implement tests for appendDeleteBtn() and DeleteTr()

    afterEach(function() {
        allPayments = {};
        paymentId = 0;
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });
    
});