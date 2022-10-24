window.addEventListener('DOMContentLoaded', function(){
//document.getElementById()

total = this.document.getElementById("total"); //need to add checks for value type
per = this.document.getElementById("tip-slider");

tester = this.document.getElementById("submit");

function calculateTax(origTotal, percent) {
    tipAmount = origTotal * percent;
    totalWithTip = origTotal + tipAmount;

    tipAmount = tipAmount.toFixed(2);
    totalWithTip = totalWithTip.toFixed(2);

    console.log(`tip amount: ${tipAmount},
new total: ${totalWithTip}`)
    return [tipAmount, totalWithTip];
}

function testFunc() {
    totalValue = parseFloat(total.value);
    perValue = parseInt(per.value) / 100;

    calculateTax(totalValue, perValue);
}

var rad = document.getElementsByName("suggested-tip");
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        //(prev) ? console.log(prev.value): null;
        if (this !== prev) {
            prev = this;
        }
        document.getElementById("tip-slider").value = this.value;
    })
}

tester.addEventListener("click", testFunc, false);

}); // End DOMContentLoaded