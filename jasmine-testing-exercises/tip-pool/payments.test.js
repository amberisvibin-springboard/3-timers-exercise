describe("Payments test", function() {
    beforeEach(function () {
        let billAmtInput = document.getElementById('billAmt');
        let tipAmtInput = document.getElementById('tipAmt');
        let paymentForm = document.getElementById('paymentForm');
        
        let paymentTbody = document.querySelector('#paymentTable tbody');
        let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

        let allPayments = {};
        let paymentId = 0;
    });
    
    it('should return correct curPayment object (anon) on createCurPayment()', function () {
        billAmtInput.value = 10;
        tipAmtInput.value = 2.5;
        let curPayment = createCurPayment();

        expect(curPayment).toBeInstanceOf(Object);
        expect(curPayment.billAmt).toBe("10");
        expect(curPayment.tipAmt).toBe("2.5");
        expect(curPayment.tipPercent).toBe(25);
    });

    it('should return undefined on createCurPayment() with empty input', function () {
        billAmtInput.value = 0;
        tipAmtInput.value = 0;
        let curPayment = createCurPayment();

        expect(curPayment).toBeUndefined();
    });

    it('should return undefined on createCurPayment() with 0 billAmt', function () {
        billAmtInput.value = 0;
        tipAmtInput.value = 2.5;
        let curPayment = createCurPayment();

        expect(curPayment).toBeUndefined();
    });

    it('should return correct curPayment object (anon) on createCurPayment() with 0 tipAmt and pos billAmt', function () {
        billAmtInput.value = 10;
        tipAmtInput.value = 0;
        let curPayment = createCurPayment();

        expect(curPayment).toBeInstanceOf(Object);
        expect(curPayment.billAmt).toBe("10");
        expect(curPayment.tipAmt).toBe("0");
        expect(curPayment.tipPercent).toBe(0);
    });

    it('should append td to tr via appendTd() on appendPaymentTable()', function () {
        billAmtInput.value = 10;
        tipAmtInput.value = 2.5;
        let curPayment = createCurPayment();
        appendPaymentTable(curPayment);

        expect(document.getElementById("payment0").innerHTML).toBe("<td>$10</td><td>$2.5</td><td>25%</td><td>X</td>");
    });

    it('should append valid data to SummaryTds on updateSummary() with non-0 inputs', function () {
        allPayments = {
            payment1: {
                billAmt: "10",
                tipAmt: "2.5",
                tipPercent: 25,
            }
        };
        updateSummary();

        expect(summaryTds[0].innerHTML).toBe("$10");
        expect(summaryTds[1].innerHTML).toBe("$2.5");
        expect(summaryTds[2].innerHTML).toBe("25%");
    });

    it('should append valid data to SummaryTds on updateSummary() with 0 inputs', function () {
        allPayments = {};
        updateSummary();

        expect(summaryTds[0].innerHTML).toBe("$0");
        expect(summaryTds[1].innerHTML).toBe("$0");
        expect(summaryTds[2].innerHTML).toBe("0%");
    });

    it('should append valid data to shift summary on submitPaymentInfo()', function () {
        billAmtInput.value = 10;
        tipAmtInput.value = 2.5;
        submitPaymentInfo();

        expect(summaryTds[0].innerHTML).toBe("$10");
        expect(summaryTds[1].innerHTML).toBe("$2.5");
        expect(summaryTds[2].innerHTML).toBe("25%");
        expect(document.getElementById("payment1").innerHTML).toBe("<td>$10</td><td>$2.5</td><td>25%</td><td>X</td>");
    });

    afterEach(function() {
        paymentTbody.innerHTML = '';
        billAmtInput.value = "";
        tipAmtInput.value = "";
        allPayments = {};
        paymentId = 0;
        summaryTds[0].remove();
        summaryTds[1].remove();
        summaryTds[2].remove();
    });
});