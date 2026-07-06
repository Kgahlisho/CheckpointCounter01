
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const countEl = document.getElementById('count-el');
    const entriesDisplay = document.getElementById('entries-display');
    const totalDisplay = document.getElementById('total-el').querySelector('#entries-display');

    let count = 0;
    let history = [];
    const MAX_HISTORY = 30;

    function renderCount() {
        countEl.innerText = count;
    }

    function renderHistory() {
        if (history.length === 0) {
            entriesDisplay.innerText = '—';
            return;
        }
        const displayArr = history.slice(-MAX_HISTORY);
        entriesDisplay.innerText = displayArr.join(' · ');
    }

    function renderTotal() {
        const total = history.reduce((sum, num) => sum + num, 0);
        totalDisplay.innerText = total;
    }

    function increment() {
        count += 1;
        renderCount();
    }

    function save() {
        history.push(count);

        count = 0;
        renderCount();

        renderHistory();

        renderTotal();

        if (history.length > MAX_HISTORY * 1.5) {
            history = history.slice(-MAX_HISTORY);
        }
    }

    const incBtn = document.getElementById('increment-btn');
    const savBtn = document.getElementById('save-btn');

    if (incBtn) {
        incBtn.addEventListener('click', increment);
    }
    if (savBtn) {
        savBtn.addEventListener('click', save);
    }

    renderCount();
    renderHistory();
    renderTotal();

    console.log('People Counter ready with total counter');
});