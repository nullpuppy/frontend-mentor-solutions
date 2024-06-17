let inputs = document.querySelectorAll('input');
let resetButton = document.getElementById('calc-reset');
let tipButtons = document.querySelectorAll('.tip-amount li');

resetButton.addEventListener('click', resetForm);

tipButtons.forEach((el) => {
    el.addEventListener('click', selectTipPercentage);
    el.addEventListener('click', calculateSplit);
});

inputs.forEach((el) => {
    el.addEventListener('input', validateInput)
    el.addEventListener('input', calculateSplit);
});

function calculateSplit() {
    let billTotal = +inputs[0].value;
    let numPeople = +inputs[2].value;
    let tipAmount = getSelectedTipAmount();

    let tipTotal = billTotal * (tipAmount/100);
    let tipPerPerson = tipTotal / numPeople;
    let totalPerPerson = (billTotal + tipTotal) / numPeople;

    let tipPerPersonEl = document.getElementById('tip-per-person');
    let totalPerPersonEl = document.getElementById('total-per-person');

    if (!billTotal || !numPeople) {
        return;
    }

    tipPerPersonEl.textContent = tipPerPerson.toFixed(2);
    totalPerPersonEl.textContent = totalPerPerson.toFixed(2);
}

function getSelectedTipAmount() {
    let tipEl = Array.from(tipButtons).find((el) => {
        if (el.classList.contains('selected')) {
            return true;
        }
        return false;
    });

    let tipAmount = tipEl?.attributes.getNamedItem('data-amount').value;
    if (tipAmount == 'custom') {
        tipAmount = +inputs[1].value;
    }

    if (tipAmount) {
        return tipAmount;
    }
    return 0;
}

function resetForm(el) {
    el.preventDefault(el);
    inputs.forEach((input) => {
        input.value = '';
        input.classList.remove('error')
    });

    tipButtons.forEach((el) => {
        el.classList.remove('selected');
    });

    document.querySelectorAll('span.error').forEach((el) => {
        el.textContent = '';
    });
}

function selectTipPercentage(el) {
    tipButtons.forEach((e) => {
        e.classList.remove('selected');
    });

    el.currentTarget.classList.add('selected');

}

function validateInput(el) {
    if (el.target.pattern) {
        let re = new RegExp('^' + el.target.pattern + '$');
        let errorMsg = '';
        if (el.target.value == 0 && !el.target.attributes.getNamedItem('data-amount')) {
            errorMsg = 'Can\'t be zero';
        } else if (!re.test(el.target.value)) {
            errorMsg = 'Must be a number';
        }

        if (errorMsg) {
            el.target.classList.add('error');
        } else {
            el.target.classList.remove('error');
        }

        el.target.previousElementSibling.textContent = errorMsg;
        return !!errorMsg;
    }

    return true;
}
