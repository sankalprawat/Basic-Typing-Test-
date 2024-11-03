// Sample paragraphs for typing test
const paragraphs = [
    "Typing is an essential skill in today's digital world. It enhances communication and efficiency in various tasks. The ability to type quickly and accurately can lead to greater productivity and fewer mistakes, making it a valuable asset in both personal and professional settings. In this fast-paced environment, mastering typing is not just an advantage but a necessity for success. Practicing typing regularly can help individuals improve their skills and become more confident in their abilities. As technology continues to evolve, the importance of proficient typing will only increase, making it an essential skill for future generations.",
    "Effective communication skills are crucial in the workplace. They can determine the success of projects, impact relationships with colleagues, and influence overall job satisfaction. Good communication helps in expressing ideas clearly and building strong team dynamics. This skill encompasses verbal, non-verbal, and written communication, and it is essential for collaboration and leadership. Enhancing communication skills can lead to more effective interactions and a better understanding of goals within an organization. As workplaces become more diverse, adapting communication styles to fit various audiences becomes increasingly important.",
    "The importance of time management cannot be overstated in today’s fast-paced world. With numerous responsibilities and distractions, managing one’s time effectively can lead to increased productivity and reduced stress. Prioritizing tasks, setting goals, and establishing routines are essential strategies for effective time management. By mastering these skills, individuals can create more balanced lives, achieve their objectives, and enhance their overall well-being. Time management is not just about getting things done; it’s about making the most of one’s time and living life to the fullest."
];

document.querySelectorAll('.dropdown select').forEach(select => {
    // Add focus animation for label
    select.addEventListener('focus', () => {
        select.parentElement.classList.add('focused');
    });
    
    select.addEventListener('blur', () => {
        select.parentElement.classList.remove('focused');
    });
    
    // Add change animation
    select.addEventListener('change', function() {
        this.classList.add('changed');
        setTimeout(() => this.classList.remove('changed'), 300);
    });
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const heading = document.getElementById("heading");
    heading.classList.toggle("dark-mode"); // This line is correct
}

let currentParagraph = "";
let timer;
let timeLeft = 60; // Initialize timeLeft
let isTesting = false;

// Load paragraph on page load
function loadParagraph() {
    const select = document.getElementById('paragraphs');
    const paragraphDisplay = document.getElementById('paragraph');
    currentParagraph = paragraphs[select.value];
    paragraphDisplay.innerText = currentParagraph;
    document.getElementById('inputBox').value = ""; // Clear input box
    resetStats(); // Reset stats on paragraph change
}

// Start the typing test
function startTest() {
    if (!isTesting) {
        const timeLimitSelect = document.getElementById('timeLimit');
        timeLeft = parseInt(timeLimitSelect.value);
        resetStats(); // Reset stats before starting
        timer = setInterval(updateTimer, 1000);
        isTesting = true;
    }
}

// Update timer function
function updateTimer() {
    timeLeft -= 1;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    }
}

function calculateWPM(inputText, timeElapsed) {
    // Convert timeElapsed from seconds to minutes
    const minutes = timeElapsed / 60;
    
    // Standard word length is considered to be 5 characters
    const standardWordLength = 5;
    
    // Count all typed characters (including spaces)
    const charactersTyped = inputText.length;
    
    // Calculate gross WPM using the standard word length
    const grossWPM = minutes > 0 
        ? Math.round((charactersTyped / standardWordLength) / minutes)
        : 0;
    
    return Math.max(0, grossWPM); // Ensure WPM is never negative
}

// Check user input and calculate stats
// Updated checkInput function
function checkInput() {
    const inputBox = document.getElementById('inputBox');
    const inputText = inputBox.value;

    // Start the test when user starts typing
    if (!isTesting && inputText.length > 0) {
        startTest();
    }

    // Highlight errors
    highlightErrors(inputText);

    // Calculate time elapsed in seconds
    const timeElapsed = parseInt(document.getElementById('timeLimit').value) - timeLeft;
    
    // Calculate WPM using the new method
    const wpm = calculateWPM(inputText, timeElapsed);
    document.getElementById('wpm').innerText = `WPM: ${wpm}`;


    // Calculate accuracy using the new method
    const accuracy = calculateTypingAccuracy(currentParagraph, inputText);
    document.getElementById('accuracy').innerText = `Accuracy: ${accuracy}%`;
}



// End the typing test
function endTest() {
    clearInterval(timer);
    document.getElementById('inputBox').disabled = true; // Disable input
    const finalWPM = document.getElementById('wpm').innerText.split(': ')[1];
    const finalAccuracy = document.getElementById('accuracy').innerText.split(': ')[1];
    document.getElementById('finalWPM').innerText = `WPM: ${finalWPM}`;
    document.getElementById('finalAccuracy').innerText = `Accuracy: ${finalAccuracy}`;
    showPopup();
    isTesting = false;
}

// Reset all stats and UI
function resetStats() {
    const timeLimitSelect = document.getElementById('timeLimit');
    timeLeft = parseInt(timeLimitSelect.value); // Get selected time limit
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
    document.getElementById('wpm').innerText = 'WPM: 0';
    document.getElementById('accuracy').innerText = 'Accuracy: 100%';
    document.getElementById("inputBox").disabled = false;
    clearHighlight();
    clearInterval(timer);
    isTesting = false;
}

function calculateTypingAccuracy(originalText, userInput) {
    // Handle empty input
    if (!userInput) return 100; // Start with 100% accuracy when nothing is typed
    
    let correctChars = 0;
    let totalChars = userInput.length;
    
    // Compare each character
    for (let i = 0; i < totalChars; i++) {
        if (i < originalText.length && userInput[i] === originalText[i]) {
            correctChars++;
        }
    }
    
    // Calculate accuracy as percentage
    const accuracy = (correctChars / totalChars) * 100;
    return Math.round(accuracy);
}

// Highlight errors in the typed input
function highlightErrors(inputText) {
    const paragraphDisplay = document.getElementById('paragraph');
    let highlightedText = '';
    for (let i = 0; i < currentParagraph.length; i++) {
        if (inputText[i] !== currentParagraph[i]) {
            highlightedText += `<span class="error">${currentParagraph[i]}</span>`;
        } else {
            highlightedText += currentParagraph[i];
        }
    }
    paragraphDisplay.innerHTML = highlightedText; // Update paragraph display with highlighted errors
}

// Clear the error highlighting
function clearHighlight() {
    const paragraphDisplay = document.getElementById('paragraph');
    paragraphDisplay.innerHTML = currentParagraph; // Reset paragraph display
}

// Show the results popup at the end of the test
function showPopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    document.getElementById("inputBox").disabled = true; // Disable input when popup is shown
}

// Close the popup and reset the test
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
    resetStats();
    document.getElementById("inputBox").value = ""; // Clear input box when popup is closed
}

// Load paragraph on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadParagraph);
document.getElementById("inputBox").addEventListener("input", checkInput);
