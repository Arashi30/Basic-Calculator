let currentOperand = '';
let previousOperand = '';
let operation = null;
let audioIndex = 0;

const audioFiles = ['audio_tacwm.mp3', 'audio_full.mp3'];

function appendNumber(number) {
    if (currentOperand === 'Hi, crush!') return;
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === 'Hi, crush!') return;
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculateResult();
    }
    operation = op; 
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculateResult() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    currentOperand = 'Hi, crush!';
    updateDisplay();

    const audio = document.getElementById('audio');
    audio.src = audioFiles[audioIndex];
    audio.play();
    audio.addEventListener('ended', function() {
        audioIndex = (audioIndex + 1) % audioFiles.length;
        audio.src = audioFiles[audioIndex];
        audio.play();
    });
}

function clearResult() {
    if (currentOperand === 'Hi, crush!') return;
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('result').value = currentOperand;
}
