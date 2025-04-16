// This is a simplified version of zxcvbn.js
// For full functionality, use the official zxcvbn library
// https://github.com/dropbox/zxcvbn

window.zxcvbn = function(password) {
    const score = calculatePasswordStrength(password);
    return {
        score: score,
        feedback: {
            warning: getWarning(score),
            suggestions: getSuggestions(score)
        }
    };
};

function calculatePasswordStrength(password) {
    if (password.length < 8) return 0;
    if (password.length < 12) return 1;
    
    let score = 2;
    
    // Check for variety of character types
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    // Cap at 4
    return Math.min(score, 4);
}

function getWarning(score) {
    const warnings = [
        "Very predictable password",
        "Predictable password",
        "Moderately secure password",
        "Strong password",
        "Very strong password"
    ];
    return warnings[score];
}

function getSuggestions(score) {
    const suggestions = [
        "Add more characters",
        "Add uppercase letters",
        "Add lowercase letters",
        "Add numbers",
        "Add symbols"
    ];
    return suggestions.slice(0, score);
}
