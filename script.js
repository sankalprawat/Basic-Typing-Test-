// Paragraph selection
const paragraphs = [
    "Typing is an essential skill in today's digital world. It enhances communication and efficiency in various tasks. The ability to type quickly and accurately can lead to greater productivity and fewer mistakes, making it a valuable asset in both personal and professional settings. In this fast-paced environment, mastering typing is not just an advantage but a necessity for success. Practicing typing regularly can help individuals improve their skills and become more confident in their abilities. As technology continues to evolve, the importance of proficient typing will only increase, making it an essential skill for future generations.",
    "Effective communication skills are crucial in the workplace. They can determine the success of projects, impact relationships with colleagues, and influence overall job satisfaction. Good communication helps in expressing ideas clearly and building strong team dynamics. This skill encompasses verbal, non-verbal, and written communication, and it is essential for collaboration and leadership. Enhancing communication skills can lead to more effective interactions and a better understanding of goals within an organization. As workplaces become more diverse, adapting communication styles to fit various audiences becomes increasingly important.",
    "The importance of time management cannot be overstated in today’s fast-paced world. With numerous responsibilities and distractions, managing one’s time effectively can lead to increased productivity and reduced stress. Prioritizing tasks, setting goals, and establishing routines are essential strategies for effective time management. By mastering these skills, individuals can create more balanced lives, achieve their objectives, and enhance their overall well-being. Time management is not just about getting things done; it’s about making the most of one’s time and living life to the fullest."
];

let currentParagraph = "";
let timer;
let timeLeft = 0; // Initialize timeLeft
let isTesting = false;

function loadParagraph() {
    const select = document.getElementById('paragraphs');
    const paragraphDisplay = document.getElementById('paragraph');
    currentParagraph = paragraphs[select.value];
    paragraphDisplay.innerText = currentParagraph;
    document.getElementById('inputBox').value = ""; // Clear input box
    resetStats(); // Reset stats on paragraph change
}

function startTest() {
    if (!isTesting) {
        const timeLimitSelect = document.getElementById('timeLimit');
        timeLeft = parseInt(timeLimitSelect.value);
        resetStats(); // Reset stats before starting
        timer = setInterval(updateTimer, 1000);
        isTesting = true;
    }
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    } else {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
        // Update WPM and accuracy while typing
        checkInput();
    }
}

function checkInput() {
    const inputBox = document.getElementById('inputBox');
    const inputText = inputBox.value;
    const wordsTyped = inputText.split(' ').filter(word => word !== "").length;
    const wpm = Math.round((wordsTyped / (initialTime - timeLeft)) * 60); // Calculate WPM
    document.getElementById('wpm').innerText = `WPM: ${wpm}`;
    
    // Calculate accuracy
    const originalWords = currentParagraph.split(' ').filter(word => word !== "").length;
    const correctWords = inputText.split(' ').filter((word, index) => word === currentParagraph.split(' ')[index]).length;
    const accuracy = Math.round((correctWords / originalWords) * 100);
    document.getElementById('accuracy').innerText = `Accuracy: ${accuracy}%`;
}

function resetStats() {
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
    document.getElementById('wpm').innerText = `WPM: 0`;
    document.getElementById('accuracy').innerText = `Accuracy: 100%`;
}

function endTest() {
    isTesting = false;
    clearInterval(timer); // Clear timer when the test ends
    const inputBox = document.getElementById('inputBox');
    inputBox.disabled = true; // Disable input
    const finalWPM = document.getElementById('finalWPM');
    const finalAccuracy = document.getElementById('finalAccuracy');
    finalWPM.innerText = `WPM: ${document.getElementById('wpm').innerText.split(': ')[1]}`;
    finalAccuracy.innerText = `Accuracy: ${document.getElementById('accuracy').innerText.split(': ')[1]}`;
    const popup = document.getElementById('popup');
    popup.classList.add('show');
}

function closePopup() {
    document.getElementById('popup').classList.remove('show');
    document.getElementById('inputBox').disabled = false; // Re-enable input
}

// Dark Mode Functionality
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

// Load initial paragraph
loadParagraph();
