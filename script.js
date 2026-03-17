/**
 * QuickTools Hub - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.tool-section');
    const toast = document.getElementById('toast');

    // --- Navigation Logic ---
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolId = btn.id.replace('btn-', '');
            
            // Toggle Buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Sections
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById('tool-' + toolId).classList.add('active');
        });
    });

    // --- Utility: Toast ---
    const showToast = (message) => {
        toast.innerText = message;
        toast.style.opacity = '1';
        setTimeout(() => toast.style.opacity = '0', 2000);
    };

    // --- Utility: Clipboard ---
    const copyToClipboard = (inputElement) => {
        if (!inputElement.value) return;
        inputElement.select();
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    };

    // --- 1. Password Generator ---
    const passOutput = document.getElementById('pass-output');
    const passLength = document.getElementById('pass-length');
    const lenVal = document.getElementById('len-val');
    const genBtn = document.getElementById('gen-btn');
    const copyPassBtn = document.getElementById('copy-pass');

    const generatePassword = () => {
        const length = passLength.value;
        const hasUpper = document.getElementById('pass-upper').checked;
        const hasNumbers = document.getElementById('pass-numbers').checked;
        const hasSymbols = document.getElementById('pass-symbols').checked;
        
        let charset = "abcdefghijklmnopqrstuvwxyz";
        if (hasUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (hasNumbers) charset += "0123456789";
        if (hasSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        passOutput.value = password;
    };

    passLength.addEventListener('input', () => lenVal.innerText = passLength.value);
    genBtn.addEventListener('click', generatePassword);
    copyPassBtn.addEventListener('click', () => copyToClipboard(passOutput));
    
    // Initial Password
    generatePassword();

    // --- 2. Unit Converter ---
    const pxInput = document.getElementById('conv-px');
    const remInput = document.getElementById('conv-rem');
    const cInput = document.getElementById('conv-c');
    const fInput = document.getElementById('conv-f');

    pxInput.addEventListener('input', () => {
        remInput.value = (pxInput.value / 16).toFixed(3);
    });
    remInput.addEventListener('input', () => {
        pxInput.value = (remInput.value * 16).toFixed(0);
    });
    cInput.addEventListener('input', () => {
        fInput.value = ((cInput.value * 9/5) + 32).toFixed(1);
    });
    fInput.addEventListener('input', () => {
        cInput.value = ((fInput.value - 32) * 5/9).toFixed(1);
    });

    // --- 3. Text Analyzer ---
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const readTime = document.getElementById('reading-time');

    textInput.addEventListener('input', () => {
        const text = textInput.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        const time = Math.ceil(words / 200);

        wordCount.innerText = words;
        charCount.innerText = chars;
        readTime.innerText = time;
    });

    document.getElementById('text-upper').onclick = () => {
        textInput.value = textInput.value.toUpperCase();
        textInput.dispatchEvent(new Event('input'));
    };
    document.getElementById('text-lower').onclick = () => {
        textInput.value = textInput.value.toLowerCase();
        textInput.dispatchEvent(new Event('input'));
    };
    document.getElementById('text-clear').onclick = () => {
        textInput.value = '';
        textInput.dispatchEvent(new Event('input'));
    };

    // --- 4. Focus Timer ---
    let timerInterval;
    let timeLeft = 1500;
    let isRunning = false;
    const timerDisplay = document.getElementById('timer-display');
    const timerStartBtn = document.getElementById('timer-start');

    const updateTimerDisplay = () => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        if (isRunning) {
            clearInterval(timerInterval);
            timerStartBtn.innerText = 'Resume';
        } else {
            timerStartBtn.innerText = 'Pause';
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    timerStartBtn.innerText = 'Start';
                    showToast('Time is up!');
                }
            }, 1000);
        }
        isRunning = !isRunning;
    };

    const resetTimer = (minutes = 25) => {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = minutes * 60;
        timerStartBtn.innerText = 'Start';
        updateTimerDisplay();
    };

    timerStartBtn.addEventListener('click', startTimer);
    document.getElementById('timer-reset').onclick = () => resetTimer(25);
    document.getElementById('set-pomodoro').onclick = () => resetTimer(25);
    document.getElementById('set-short').onclick = () => resetTimer(5);

});
