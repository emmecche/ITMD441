window.addEventListener('DOMContentLoaded', function(){
//document.getElementById()

total = this.document.getElementById("total"); //need to add checks for value type
per = this.document.getElementById("tip-slider");

perDisplay = this.document.getElementById("tip-percentage");

tipDisplay = this.document.getElementById("tip-amount");
totalDisplay = this.document.getElementById("total-tip");

//tester = this.document.getElementById("submit");

function calculateTax(origTotal, percent) {
    tipAmount = origTotal * percent;
    totalWithTip = origTotal + tipAmount;

    tipAmount = tipAmount.toFixed(2);
    totalWithTip = totalWithTip.toFixed(2);

/*    console.log(`tip amount: ${tipAmount},
new total: ${totalWithTip}`)*/
    return [tipAmount, totalWithTip];
}

var rad = document.getElementsByName("suggested-tip");
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        //(prev) ? console.log(prev.value): null;
        if (this !== prev) {
            prev = this;
        }
        per.value = this.value;
        perDisplay.value = `${per.value}%`;
    })
    rad[i].addEventListener("change", display);
}

function display() {
    if (total !== null) {
        if (isNaN(total.value)) {
            alert("Please enter a number.");
            total.value = ""
        } else {
            totalValue = parseFloat(total.value);
        }
    } else {
        totalValue = 0;
    }
    
    perDisplay.value = `${per.value}%`;
    perValue = parseInt(per.value) / 100;

    output = calculateTax(totalValue, perValue);

    if (output.includes(NaN)) {
    } else {
    tipDisplay.value = output[0];
    totalDisplay.value = output[1];
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

}); // End DOMContentLoaded