// Character sets
const CHARACTER_SETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    ambiguous: 'l1I0Oo'
};

// DOM Elements
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const generatedPassword = document.getElementById('generatedPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const themeToggle = document.getElementById('themeToggle');

// Initialize
initializeApp();

// Event Listeners
generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyToClipboard);
themeToggle.addEventListener('click', toggleTheme);

// Form validation
document.getElementById('passwordGenerator').addEventListener('change', validateForm);

// Initialize app
function initializeApp() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    
    // Initialize strength meter
    updateStrengthMeter('');
    
    // Initialize validation
    validateForm();
}

// Generate password
function generatePassword() {
    const options = {
        lowercase: document.querySelector('input[name="lowercase"]').checked,
        uppercase: document.querySelector('input[name="uppercase"]').checked,
        numbers: document.querySelector('input[name="numbers"]').checked,
        symbols: document.querySelector('input[name="symbols"]').checked,
        excludeAmbiguous: document.querySelector('input[name="excludeAmbiguous"]').checked,
        length: parseInt(document.getElementById('length').value),
        minNumbers: parseInt(document.getElementById('minNumbers').value),
        minSymbols: parseInt(document.getElementById('minSymbols').value)
    };

    // Validate options
    if (!validateOptions(options)) {
        alert('Invalid configuration. Please check your settings.');
        return;
    }

    // Build character pool
    let pool = '';
    if (options.lowercase) pool += CHARACTER_SETS.lowercase;
    if (options.uppercase) pool += CHARACTER_SETS.uppercase;
    if (options.numbers) pool += CHARACTER_SETS.numbers;
    if (options.symbols) pool += CHARACTER_SETS.symbols;

    // Remove ambiguous characters if selected
    if (options.excludeAmbiguous) {
        pool = pool.split('').filter(char => !CHARACTER_SETS.ambiguous.includes(char)).join('');
    }

    // Generate password
    let password = '';
    
    // Add required numbers
    for (let i = 0; i < options.minNumbers; i++) {
        password += getRandomChar(CHARACTER_SETS.numbers);
    }
    
    // Add required symbols
    for (let i = 0; i < options.minSymbols; i++) {
        password += getRandomChar(CHARACTER_SETS.symbols);
    }
    
    // Fill remaining length
    const remainingLength = options.length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        password += getRandomChar(pool);
    }
    
    // Shuffle password
    password = shuffleString(password);
    
    // Update UI
    generatedPassword.value = password;
    updateStrengthMeter(password);
}

// Copy to clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(generatedPassword.value);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    themeToggle.querySelector('span').textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Validate form options
function validateForm() {
    const options = {
        length: parseInt(document.getElementById('length').value),
        minNumbers: parseInt(document.getElementById('minNumbers').value),
        minSymbols: parseInt(document.getElementById('minSymbols').value)
    };

    const isValid = validateOptions(options);
    generateButton.disabled = !isValid;
}

// Validate options
function validateOptions(options) {
    // Check if any character type is selected
    const hasSelectedType = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
    
    // Check if total minimums don't exceed length
    const totalMinimums = options.minNumbers + options.minSymbols;
    const isValidLength = options.length >= totalMinimums;
    
    return hasSelectedType && isValidLength;
}

// Update strength meter
function updateStrengthMeter(password) {
    const zxcvbn = window.zxcvbn;
    if (!zxcvbn) return;

    const result = zxcvbn(password);
    const score = result.score;
    const strengthTexts = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    
    // Update text
    strengthText.textContent = `Strength: ${strengthTexts[score]}`;
    
    // Update bar
    const barWidth = (score / 4) * 100;
    strengthBar.style.setProperty('--bar-width', `${barWidth}%`);
}

// Helper functions
function getRandomChar(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
}

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

// Update slider values
const sliders = document.querySelectorAll('input[type="range"]');
sliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
        const valueElement = document.getElementById(`${e.target.id}Value`);
        valueElement.textContent = e.target.value;
        validateForm();
    });
});
