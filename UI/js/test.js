/**
 * ==========================================================================
 * SPEAKING TEST LOGIC
 * Edit this file when changing:
 * - 24 topic cards rendering & selection
 * - "🎲 Surprise me" random topic selector
 * - Microphone recording button & pulse animation
 * - 5-minute countdown timer ring
 * - Step transitions (Step 1: Topics -> Step 2: Record -> Step 3: Scores)
 * - Retake test & score submission
 * ==========================================================================
 */

function initSpeakingTest() {
    const topicGrid = document.getElementById('topicGrid');
    if (!topicGrid) return;

    // Render topics from data.js
    topicGrid.innerHTML = '';
    topics.forEach((topic, index) => {
        const card = document.createElement('div');
        card.className = 'topic-card' + (index === 0 ? ' selected' : '');
        card.dataset.topic = topic.name;
        card.dataset.prompt = topic.prompt;
        card.dataset.difficulty = topic.difficulty;

        const diffClass = topic.difficulty;
        const diffLabel = topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1);

        card.innerHTML = `
            <span class="emoji">${topic.emoji}</span>
            <span class="topic-name">${topic.name}</span>
            <span class="difficulty ${diffClass}">${diffLabel}</span>
        `;
        topicGrid.appendChild(card);
    });

    const surpriseBtn = document.getElementById('surpriseBtn');
    const startRecordingBtn = document.getElementById('startRecordingBtn');
    const testStep1 = document.getElementById('testStep1');
    const testStep2 = document.getElementById('testStep2');
    const testStep3 = document.getElementById('testStep3');
    const recordBtn = document.getElementById('recordBtn');
    const timerText = document.getElementById('timerText');
    const timerRing = document.getElementById('timerRing');
    const stopSubmitBtn = document.getElementById('stopSubmitBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const retakeTestBtn = document.getElementById('retakeTestBtn');
    const promptText = document.getElementById('promptText');

    let selectedTopic = 'Hometown';
    let selectedPrompt = 'Describe your hometown.';
    let timerInterval = null;
    let seconds = 0;
    let isRecording = false;

    function updateTopicSelection(card) {
        document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedTopic = card.dataset.topic;
        selectedPrompt = card.dataset.prompt;
        if (promptText) promptText.textContent = `"${selectedPrompt}"`;
    }

    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => updateTopicSelection(card));
    });

    // 🎲 Surprise me button
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            const allCards = document.querySelectorAll('.topic-card');
            if (!allCards.length) return;
            const randomIndex = Math.floor(Math.random() * allCards.length);
            updateTopicSelection(allCards[randomIndex]);
        });
    }

    // Timer display update
    function updateTimerDisplay() {
        if (!timerText || !timerRing) return;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        const deg = Math.min((seconds / 300) * 360, 360);
        timerRing.style.background = `conic-gradient(#FFD43B 0deg ${deg}deg, #F0F0F0 ${deg}deg 360deg)`;
    }

    // Step 1 -> Step 2
    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', () => {
            testStep1.classList.add('hidden');
            testStep2.classList.remove('hidden');
            if (promptText) promptText.textContent = `"${selectedPrompt}"`;
            seconds = 0;
            updateTimerDisplay();
        });
    }

    // Mic button recording toggle
    if (recordBtn) {
        recordBtn.addEventListener('click', () => {
            if (!isRecording) {
                isRecording = true;
                recordBtn.classList.add('active');
                recordBtn.textContent = '⏸';
                timerInterval = setInterval(() => {
                    seconds++;
                    updateTimerDisplay();
                    if (seconds >= 300) {
                        clearInterval(timerInterval);
                        isRecording = false;
                        recordBtn.classList.remove('active');
                        recordBtn.textContent = '🎤';
                    }
                }, 1000);
            } else {
                isRecording = false;
                recordBtn.classList.remove('active');
                recordBtn.textContent = '🎤';
                clearInterval(timerInterval);
            }
        });
    }

    // Stop & Submit -> Step 3
    if (stopSubmitBtn) {
        stopSubmitBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            isRecording = false;
            if (recordBtn) {
                recordBtn.classList.remove('active');
                recordBtn.textContent = '🎤';
            }
            testStep2.classList.add('hidden');
            testStep3.classList.remove('hidden');
        });
    }

    // Pause recording
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (isRecording) {
                isRecording = false;
                if (recordBtn) {
                    recordBtn.classList.remove('active');
                    recordBtn.textContent = '🎤';
                }
                clearInterval(timerInterval);
            }
        });
    }

    // Retake Test -> Step 1
    if (retakeTestBtn) {
        retakeTestBtn.addEventListener('click', () => {
            testStep3.classList.add('hidden');
            testStep1.classList.remove('hidden');
            clearInterval(timerInterval);
            seconds = 0;
            updateTimerDisplay();
        });
    }
}
