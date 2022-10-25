window.addEventListener('DOMContentLoaded', function(){

    //

    const total = this.document.getElementById("total");
    const per = this.document.getElementById("tip-slider");

    var rad = document.getElementsByName("suggested-tip");

    perDisplay = this.document.getElementById("tip-percentage");
    tipDisplay = this.document.getElementById("tip-amount");
    totalDisplay = this.document.getElementById("total-tip");

    //tester = this.document.getElementById("submit");

    function calculateTax(origTotal, percent) {
        tipAmount = origTotal * percent;
        totalWithTip = origTotal + tipAmount;

        tipAmount = tipAmount.toFixed(2);
        totalWithTip = totalWithTip.toFixed(2);

    //  console.log(`tip amount: ${tipAmount},\nnew total: ${totalWithTip}`)
        return [tipAmount, totalWithTip];
    }

    var prev = null;
    for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function() {
            if (this !== prev) {
                prev = this;
            }
            per.value = this.value;
            perDisplay.value = `${per.value}%`;
        })
        rad[i].addEventListener("change", display);
    }

    function display() {
        if (isNaN(total.value)) {
            alert("Please enter a number.");
            total.value = ""
        } else {
            totalValue = parseFloat(total.value);
        }
        
        perDisplay.value = `${per.value}%`;
        perValue = parseInt(per.value) / 100;

        output = calculateTax(totalValue, perValue);

        if (!output.includes(NaN)) {
            tipDisplay.value = Intl.NumberFormat("en-us", {style: "currency", currency: "USD"}).format(output[0]);
            totalDisplay.value = Intl.NumberFormat("en-us", {style: "currency", currency: "USD"}).format(output[1]);
        } 
    }

    function resetRadio() {
        for (var i = 0; i < rad.length; i++) {
            rad[i].checked = false;
        }
    }

    //tester.addEventListener("click", display, false);
    this.window.addEventListener("input", display, false);
    per.addEventListener("input", resetRadio, false);
    total.addEventListener("click", function(){total.value = ""}, false);

}); // End DOMContentLoaded