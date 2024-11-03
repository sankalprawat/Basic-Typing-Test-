// Sample paragraphs for typing test
const paragraphs = [
    "Typing is an essential skill in today's digital world. It enhances communication and efficiency in various tasks. The ability to type quickly and accurately can lead to greater productivity and fewer mistakes, making it a valuable asset in both personal and professional settings. In this fast-paced environment, mastering typing is not just an advantage but a necessity for success. Practicing typing regularly can help individuals improve their skills and become more confident in their abilities. As technology continues to evolve, the importance of proficient typing will only increase, making it an essential skill for future generations.",
    "Effective communication skills are crucial in the workplace. They can determine the success of projects, impact relationships with colleagues, and influence overall job satisfaction. Good communication helps in expressing ideas clearly and building strong team dynamics. This skill encompasses verbal, non-verbal, and written communication, and it is essential for collaboration and leadership. Enhancing communication skills can lead to more effective interactions and a better understanding of goals within an organization. As workplaces become more diverse, adapting communication styles to fit various audiences becomes increasingly important.",
    "The importance of time management cannot be overstated in today’s fast-paced world. With numerous responsibilities and distractions, managing one’s time effectively can lead to increased productivity and reduced stress. Prioritizing tasks, setting goals, and establishing routines are essential strategies for effective time management. By mastering these skills, individuals can create more balanced lives, achieve their objectives, and enhance their overall well-being. Time management is not just about getting things done; it’s about making the most of one’s time and living life to the fullest."
];

let timeLeft = 60;
let timerInterval;
let wpm = 0;
let accuracy = 100;
let charactersTyped = 0;
let errors = 0;
let isTestStarted = false;

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const heading = document.getElementById("heading");
    heading.classList.toggle("dark-mode"); // Toggle dark mode for heading
}

function loadParagraph() {
    const paragraphIndex = document.getElementById("paragraphs").value;
    document.getElementById("paragraph").innerText = paragraphs[paragraphIndex];
    document.getElementById("inputBox").value = ""; // Clear input box
    resetStats();
}

function startTest() {
    if (!isTestStarted) {
        const timeLimit = document.getElementById("timeLimit").value;
        timeLeft = parseInt(timeLimit);
        timerInterval = setInterval(updateTimer, 1000);
        isTestStarted = true;
    }

    const inputBox = document.getElementById("inputBox");
    const paragraph = document.getElementById("paragraph").innerText;
    const inputText = inputBox.value;
    
    // Sync scroll between paragraph and input box
    const scrollRatio = inputBox.scrollTop / inputBox.scrollHeight;
    document.getElementById("paragraph").scrollTop = scrollRatio * document.getElementById("paragraph").scrollHeight;

    charactersTyped = inputText.length;
    errors = calculateErrors(paragraph, inputText);

    updateStats();
}

function updateTimer() {
    timeLeft -= 1;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
        endTest();
    }
}

function endTest() {
    clearInterval(timerInterval);
    calculateFinalStats();
    showPopup();
    isTestStarted = false;
}

function resetStats() {
    timeLeft = 60;
    wpm = 0;
    accuracy = 100;
    charactersTyped = 0;
    errors = 0;
    isTestStarted = false;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    document.getElementById("wpm").innerText = `WPM: 0`;
    document.getElementById("accuracy").innerText = `Accuracy: 100%`;
}

function calculateErrors(paragraph, inputText) {
    let errorCount = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] !== paragraph[i]) {
            errorCount++;
        }
    }
    return errorCount;
}

function updateStats() {
    const wordsTyped = charactersTyped / 5;
    const timeElapsed = (parseInt(document.getElementById("timeLimit").value) - timeLeft) / 60;
    wpm = timeElapsed > 0 ? (wordsTyped / timeElapsed).toFixed(0) : 0;
    accuracy = ((charactersTyped - errors) / charactersTyped * 100).toFixed(0);

    document.getElementById("wpm").innerText = `WPM: ${wpm}`;
    document.getElementById("accuracy").innerText = `Accuracy: ${accuracy}%`;
}

function calculateFinalStats() {
    const finalWPM = wpm;
    const finalAccuracy = accuracy;
    
    document.getElementById("finalWPM").innerText = `WPM: ${finalWPM}`;
    document.getElementById("finalAccuracy").innerText = `Accuracy: ${finalAccuracy}%`;
}

function showPopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    document.getElementById("inputBox").disabled = true; // Disable input when popup is shown
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("show");
    resetStats();
    document.getElementById("inputBox").value = ""; // Clear input box when popup is closed
    document.getElementById("inputBox").disabled = false; // Enable input again
}

// Initialize
document.addEventListener("DOMContentLoaded", loadParagraph);
