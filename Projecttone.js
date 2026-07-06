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
        // Pop animation
        anime({
            targets: countEl,
            scale: [
                { value: 1.4, duration: 80, easing: 'easeOutQuad' },
                { value: 0.9, duration: 80, easing: 'easeInQuad' },
                { value: 1, duration: 80, easing: 'easeOutQuad' }
            ],
            rotate: [
                { value: '8deg', duration: 80 },
                { value: '-4deg', duration: 80 },
                { value: '0deg', duration: 80 }
            ],
            duration: 240
        });
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

        // Save button celebration
        anime({
            targets: document.getElementById('save-btn'),
            scale: [
                { value: 0.85, duration: 100, easing: 'easeOutQuad' },
                { value: 1.05, duration: 100, easing: 'easeInOutQuad' },
                { value: 1, duration: 100, easing: 'easeOutQuad' }
            ],
            duration: 300
        });
    }

    const incBtn = document.getElementById('increment-btn');
    const savBtn = document.getElementById('save-btn');

    if (incBtn) incBtn.addEventListener('click', increment);
    if (savBtn) savBtn.addEventListener('click', save);

  
  
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const container = document.querySelector('.container');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        setSunIcon();
    }

    function setMoonIcon() {
        themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        `;
    }

    function setSunIcon() {
        themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        `;
    }

    
    function animateIcon(isDark) {
        anime({
            targets: themeIcon,
            opacity: 0,
            scale: 0.2,
            rotate: isDark ? '540deg' : '-540deg',
            duration: 500,
            easing: 'easeOutCubic',
            complete: function () {
                if (isDark) setSunIcon();
                else setMoonIcon();
                anime({
                    targets: themeIcon,
                    opacity: 1,
                    scale: 1,
                    rotate: '0deg',
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
        });
    }

    function animateBloom() {
        container.classList.remove('bloom');
        void container.offsetWidth;
        container.classList.add('bloom');

        // Also float the shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, i) => {
            const delay = i * 100;
            anime({
                targets: shape,
                scale: [
                    { value: 1.3, duration: 300, delay: delay, easing: 'easeOutQuad' },
                    { value: 1, duration: 300, easing: 'easeInQuad' }
                ],
                rotate: [
                    { value: '20deg', duration: 300, delay: delay },
                    { value: '0deg', duration: 300 }
                ],
                duration: 600
            });
        });

        setTimeout(() => {
            container.classList.remove('bloom');
        }, 1200);
    }

    function createRipple() {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            inset: -10px;
            border-radius: 38px;
            border: 3px solid rgba(255, 215, 0, 0.3);
            pointer-events: none;
            z-index: -1;
        `;
        container.appendChild(ripple);

        anime({
            targets: ripple,
            scale: [0.8, 1.6],
            opacity: [0.6, 0],
            duration: 800,
            easing: 'easeOutQuad',
            complete: () => ripple.remove()
        });
    }

    themeToggle.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark-mode');

        animateIcon(isDark);
        animateBloom();
        createRipple();

        // Button bounce
        anime({
            targets: themeToggle,
            scale: [
                { value: 0.8, duration: 100, easing: 'easeOutQuad' },
                { value: 1.2, duration: 150, easing: 'easeOutQuad' },
                { value: 1, duration: 100, easing: 'easeInQuad' }
            ],
            duration: 350
        });

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Initial render
    renderCount();
    renderHistory();
    renderTotal();

    console.log(' People Counter ready!');
});