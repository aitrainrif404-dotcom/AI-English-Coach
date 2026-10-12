/**
 * IELTS Speaking Coach · AI Web App
 * Interactive frontend logic: Chat Coach, Practice Arena, and Speaking Test
 */

// ==========================================================================
// 1. PRACTICE ARENA DATA (4 CATEGORIES WITH BIG THUMBS & SUBTOPICS)
// ==========================================================================
const practiceData = {
    grammar: {
        id: 'grammar',
        title: 'Grammar Lessons',
        emoji: '📐',
        badge: 'Band 7+ Focus',
        chipLabel: '📐 Grammar Drill',
        subtopics: [
            {
                id: 'conditionals',
                title: 'Tenses & Hypothetical Conditionals',
                desc: 'Third & Mixed Conditionals for complex scenario answers.',
                question: 'Describe a situation where a past decision changed your life. How would things be different if you had chosen otherwise?',
                hint: 'Aim to use: "If I hadn\'t chosen...", "I would currently be...", "Had I known..."'
            },
            {
                id: 'passive_inversion',
                title: 'Passive Voice & Inversion Structures',
                desc: 'Elevate formal IELTS speaking with academic sentence structures.',
                question: 'Should public transport be completely subsidized by governments? Give your perspective.',
                hint: 'Aim to use: "Not only is it argued that...", "It has been demonstrated that...", "Seldom do we see..."'
            },
            {
                id: 'connectors',
                title: 'Complex Sentence Connectors & Concessions',
                desc: 'Smooth transitions: although, nonetheless, whereas, in spite of.',
                question: 'Compare urban life with rural life in your country. Which one provides better well-being?',
                hint: 'Aim to use: "Whereas urban centers offer...", "Despite the high pace of life...", "Consequently..."'
            },
            {
                id: 'modals_speculation',
                title: 'Modals of Deduction & Speculation',
                desc: 'Must have been, might lead to, could potentially signify.',
                question: 'How do you think artificial intelligence will transform education over the next two decades?',
                hint: 'Aim to use: "It could plausibly replace...", "Students might no longer need to...", "This must inevitably lead to..."'
            }
        ]
    },
    vocabulary: {
        id: 'vocabulary',
        title: 'Vocabulary Lessons',
        emoji: '📚',
        badge: 'Lexical Boost',
        chipLabel: '📚 Lexical Drill',
        subtopics: [
            {
                id: 'environment_collocations',
                title: 'Environment & Sustainability Collocations',
                desc: 'High-band collocations: renewable energy, biodiversity loss, carbon footprint.',
                question: 'Describe an eco-friendly habit you practice regularly and its impact.',
                hint: 'Target vocabulary: "single-use plastics", "depletion of resources", "sustainable alternatives", "circular economy".'
            },
            {
                id: 'idiomatic_phrasing',
                title: 'Natural Idioms & Phrasal Verbs',
                desc: 'Sound native without overusing forced expressions.',
                question: 'Talk about a challenging project or goal you worked hard to achieve.',
                hint: 'Target idioms: "burn the midnight oil", "come up against a brick wall", "in the long run", "bear fruit".'
            },
            {
                id: 'work_technology',
                title: 'Workplace & Advanced Technology Phrasing',
                desc: 'Cutting-edge lexical resources for modern employment & digital tools.',
                question: 'How has remote working impacted professional collaboration in recent times?',
                hint: 'Target vocabulary: "streamline workflows", "telecommuting", "digital nomadism", "hybrid arrangements".'
            },
            {
                id: 'culture_traditions',
                title: 'Culture, Heritage & Traditions',
                desc: 'Nuanced adjectives and heritage descriptors.',
                question: 'Describe a traditional festival or celebration in your culture.',
                hint: 'Target vocabulary: "deeply ingrained", "festive atmosphere", "passed down through generations", "cultural heritage".'
            }
        ]
    },
    listening: {
        id: 'listening',
        title: 'Listening Tests',
        emoji: '🎧',
        badge: 'Audio Drills',
        chipLabel: '🎧 Listening Drill',
        subtopics: [
            {
                id: 'connected_speech',
                title: 'Connected Speech & Fast Native Accents',
                desc: 'Catching elision, assimilation, and weak forms in conversation.',
                question: 'Listen to the conversational prompt and summarize the speaker\'s central objection.',
                hint: 'Focus on identifying transition signals: "mind you", "to be honest", "on the flip side".'
            },
            {
                id: 'numbers_names',
                title: 'Detailed Data, Numbers & Map Navigation',
                desc: 'Precision listening for IELTS Section 1 & Section 2 test formats.',
                question: 'Identify key dates, venue names, and directional instructions mentioned in the prompt.',
                hint: 'Listen carefully for corrections: e.g. "Actually, make that the 15th, not the 14th".'
            },
            {
                id: 'speaker_attitudes',
                title: 'Detecting Speaker Stance & Implied Meaning',
                desc: 'Understanding tone, sarcasm, reluctance, and unspoken consent.',
                question: 'What is the speaker\'s underlying attitude toward the proposed educational reforms?',
                hint: 'Differentiate between enthusiastic agreement versus cautious skepticism.'
            },
            {
                id: 'lecture_notes',
                title: 'Academic Lecture Keynote Summarization',
                desc: 'Extracting main thesis, supporting evidence, and concluding takeaways.',
                question: 'Note down three key arguments presented regarding urban climate resilience.',
                hint: 'Synthesize the arguments concisely using bullet points or structured sentences.'
            }
        ]
    },
    writing: {
        id: 'writing',
        title: 'Writing Lessons',
        emoji: '✍️',
        badge: 'Task 1 & 2',
        chipLabel: '✍️ Writing Drill',
        subtopics: [
            {
                id: 'task2_intro',
                title: 'Task 2: Essay Introduction & Clear Thesis',
                desc: 'Paraphrase prompts and present an unequivocal roadmap in 3 sentences.',
                question: 'Topic: "Some believe technology increases isolation, while others argue it connects communities." Write your introductory paragraph.',
                hint: 'Formula: General context paraphrase + Concession clause + Direct thesis statement.'
            },
            {
                id: 'cohesion_paragraphs',
                title: 'Body Paragraph Cohesion & Topic Sentences',
                desc: 'P.E.E.L method: Point, Explanation, Example, Link back to topic.',
                question: 'Write a body paragraph arguing why arts education deserves equal funding in secondary schools.',
                hint: 'Ensure your topic sentence states the main idea before providing real-world illustrations.'
            },
            {
                id: 'task1_overview',
                title: 'Task 1: The Essential Overview Paragraph',
                desc: 'Summarizing key trends, peaks, troughs, and exceptions without listing raw data.',
                question: 'Draft an overview for a line graph showing carbon emissions across four European nations from 1990 to 2020.',
                hint: 'Key phrasing: "Overall, it is evident that...", "While nation A witnessed a steady ascent, nation B experienced a decline...".'
            },
            {
                id: 'counterarguments',
                title: 'Counterarguments & Decisive Rebuttals',
                desc: 'Demonstrate band 8+ critical thinking by neutralizing opposing views.',
                question: 'Address the opposing view that space exploration is a waste of financial resources.',
                hint: 'Structure: "Advocates of resource austerity argue that... Nonetheless, this overlooks the spin-off technologies that..."'
            }
        ]
    }
};

// ==========================================================================
// 2. SPEAKING TEST TOPIC DATA (24 TOPICS)
// ==========================================================================
const topics = [
    { name: 'Hometown', emoji: '🏠', difficulty: 'easy', prompt: 'Describe your hometown.' },
    { name: 'Work/Study', emoji: '💼', difficulty: 'medium', prompt: 'Describe your job or studies.' },
    { name: 'Hobbies', emoji: '🎨', difficulty: 'easy', prompt: 'Describe a hobby you enjoy.' },
    { name: 'Travel', emoji: '✈️', difficulty: 'medium', prompt: 'Describe a memorable journey.' },
    { name: 'Technology', emoji: '💻', difficulty: 'hard', prompt: 'Describe a piece of technology you use daily.' },
    { name: 'Environment', emoji: '🌍', difficulty: 'hard', prompt: 'Describe a way you help the environment.' },
    { name: 'Agriculture', emoji: '🌾', difficulty: 'medium', prompt: 'Describe a farming practice you know.' },
    { name: 'Education', emoji: '📚', difficulty: 'easy', prompt: 'Describe a teacher who influenced you.' },
    { name: 'Culture', emoji: '🎭', difficulty: 'medium', prompt: 'Describe a cultural tradition in your country.' },
    { name: 'Sports', emoji: '⚽', difficulty: 'easy', prompt: 'Describe a sport you enjoy watching or playing.' },
    { name: 'Food', emoji: '🍜', difficulty: 'easy', prompt: 'Describe a traditional dish from your country.' },
    { name: 'Health', emoji: '🏥', difficulty: 'medium', prompt: 'Describe a healthy habit you have.' },
    { name: 'Music', emoji: '🎵', difficulty: 'easy', prompt: 'Describe a song that means a lot to you.' },
    { name: 'Books', emoji: '📖', difficulty: 'medium', prompt: 'Describe a book that changed your perspective.' },
    { name: 'Movies', emoji: '🎬', difficulty: 'easy', prompt: 'Describe a movie you recently enjoyed.' },
    { name: 'Weather', emoji: '🌤️', difficulty: 'easy', prompt: 'Describe your favourite type of weather.' },
    { name: 'Transport', emoji: '🚌', difficulty: 'medium', prompt: 'Describe how you usually travel to work or school.' },
    { name: 'Shopping', emoji: '🛍️', difficulty: 'easy', prompt: 'Describe a memorable shopping experience.' },
    { name: 'Family', emoji: '👨👩👧', difficulty: 'easy', prompt: 'Describe a family member you admire.' },
    { name: 'Friendship', emoji: '🤝', difficulty: 'medium', prompt: 'Describe a close friend and why they matter.' },
    { name: 'City Life', emoji: '🏙️', difficulty: 'medium', prompt: 'Describe what you like about city life.' },
    { name: 'Rural Life', emoji: '🌻', difficulty: 'hard', prompt: 'Describe the advantages of living in the countryside.' },
    { name: 'Volunteering', emoji: '🤲', difficulty: 'hard', prompt: 'Describe a volunteering experience you had.' },
    { name: 'Future Plans', emoji: '🌟', difficulty: 'medium', prompt: 'Describe a goal you want to achieve in the future.' }
];

// ==========================================================================
// 3. APP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initNavigation();
    initChat();
    initPractice();
    initSpeakingTest();
});

function initIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ==========================================================================
// 4. NAVIGATION (SIDEBAR TABS & BOTTOM MOBILE NAV)
// ==========================================================================
function initNavigation() {
    const pages = {
        chat: document.getElementById('pageChat'),
        practice: document.getElementById('pagePractice'),
        test: document.getElementById('pageTest')
    };

    const sideTabs = document.querySelectorAll('.side-tab');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

    function switchPage(pageName) {
        if (!pages[pageName]) return;

        Object.values(pages).forEach(p => p.classList.remove('active'));
        pages[pageName].classList.add('active');

        sideTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.page === pageName));
        bottomNavItems.forEach(tab => tab.classList.toggle('active', tab.dataset.page === pageName));

        if (pageName !== 'test') {
            const step1 = document.getElementById('testStep1');
            const step2 = document.getElementById('testStep2');
            const step3 = document.getElementById('testStep3');
            if (step1) step1.classList.remove('hidden');
            if (step2) step2.classList.add('hidden');
            if (step3) step3.classList.add('hidden');
        }
    }

    sideTabs.forEach(tab => {
        tab.addEventListener('click', () => switchPage(tab.dataset.page));
    });

    bottomNavItems.forEach(tab => {
        tab.addEventListener('click', () => switchPage(tab.dataset.page));
    });
}

// ==========================================================================
// 5. CHAT COACH LOGIC
// ==========================================================================
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    if (!chatInput || !sendBtn || !chatMessages || !typingIndicator) return;

    setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 2000);

    function addUserMessage(text) {
        const row = document.createElement('div');
        row.className = 'message-row user';
        row.innerHTML = `<div class="bubble user">${escapeHtml(text)}</div>`;
        chatMessages.insertBefore(row, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addAIMessage(text, showCorrection = false) {
        const row = document.createElement('div');
        row.className = 'message-row ai';
        const correctionHtml = showCorrection ? `
            <div class="inline-feedback">
                <div>✏️ <span class="wrong">I want to practice</span> → <span class="correction">I'd like to practise</span></div>
                <div style="margin-top: 4px;">💡 <span class="suggestion">Try: "I'm keen to practise..."</span></div>
            </div>
        ` : '';

        row.innerHTML = `
            <div class="ai-avatar">🌿</div>
            <div class="bubble ai">
                <div class="ai-message-content">
                    <span>${escapeHtml(text)}</span>
                    ${correctionHtml}
                </div>
            </div>
        `;
        chatMessages.insertBefore(row, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        chatInput.value = '';

        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            if (text.toLowerCase().includes('grammar') || text.toLowerCase().includes('correct')) {
                addAIMessage("You wrote: 'I want to practice'. Here's a more natural version 👇", true);
            } else {
                addAIMessage("That's a good start! Try expanding with a reason or example. I'll help you improve. 😊");
            }
        }, 1200);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });

    document.querySelectorAll('.quick-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.textContent;
            chatInput.focus();
        });
    });
}

// ==========================================================================
// 6. PRACTICE ARENA: 4 OPTIONS (BIG THUMBS), NEXT BUTTON & SUBTOPICS
// ==========================================================================
function initPractice() {
    let selectedCategory = 'grammar';
    let selectedSubtopicIndex = 0;

    const categoryCards = document.querySelectorAll('.practice-category-card');
    const practiceNextBtn = document.getElementById('practiceNextBtn');
    const practiceStep1 = document.getElementById('practiceStep1');
    const practiceStep2 = document.getElementById('practiceStep2');
    const practiceBackBtn = document.getElementById('practiceBackBtn');
    const practiceSubtopicsList = document.getElementById('practiceSubtopicsList');
    const currentTopicChip = document.getElementById('currentTopicChip');
    const currentQuestionNum = document.getElementById('currentQuestionNum');
    const practiceQuestionText = document.getElementById('practiceQuestionText');
    const practiceQuestionHint = document.getElementById('practiceQuestionHint');
    const practiceSelectedCategoryPill = document.getElementById('practiceSelectedCategoryPill');
    const answerText = document.getElementById('answerText');
    const wordCountSpan = document.getElementById('wordCount');
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    const feedbackPanel = document.getElementById('feedbackPanel');

    // 1. Category Selection
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            categoryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedCategory = card.dataset.category || 'grammar';
        });
    });

    // 2. Next Button -> Transition to Step 2
    if (practiceNextBtn) {
        practiceNextBtn.addEventListener('click', () => {
            loadCategoryExercise(selectedCategory);
            practiceStep1.classList.add('hidden');
            practiceStep2.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Back Button -> Return to 4 Big Thumb Options
    if (practiceBackBtn) {
        practiceBackBtn.addEventListener('click', () => {
            practiceStep2.classList.add('hidden');
            practiceStep1.classList.remove('hidden');
            if (feedbackPanel) feedbackPanel.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Load Subtopics & Initial Exercise
    function loadCategoryExercise(catKey) {
        const cat = practiceData[catKey] || practiceData.grammar;
        selectedSubtopicIndex = 0;

        if (practiceSelectedCategoryPill) {
            practiceSelectedCategoryPill.textContent = `${cat.emoji} ${cat.title}`;
        }

        renderSubtopics(cat);
        renderExercise(cat, 0);
    }

    function renderSubtopics(cat) {
        if (!practiceSubtopicsList) return;
        practiceSubtopicsList.innerHTML = '';

        cat.subtopics.forEach((sub, idx) => {
            const btn = document.createElement('button');
            btn.className = 'subtopic-btn' + (idx === selectedSubtopicIndex ? ' selected' : '');
            btn.innerHTML = `
                <span class="title">${escapeHtml(sub.title)}</span>
                <span class="desc">${escapeHtml(sub.desc)}</span>
            `;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.subtopic-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSubtopicIndex = idx;
                renderExercise(cat, idx);
            });
            practiceSubtopicsList.appendChild(btn);
        });
    }

    function renderExercise(cat, subIdx) {
        const sub = cat.subtopics[subIdx];
        if (!sub) return;

        if (currentTopicChip) currentTopicChip.textContent = `📌 ${cat.title}`;
        if (currentQuestionNum) currentQuestionNum.textContent = `Exercise ${subIdx + 1} of ${cat.subtopics.length}`;
        if (practiceQuestionText) practiceQuestionText.textContent = sub.question;
        if (practiceQuestionHint) practiceQuestionHint.innerHTML = `💡 <strong>Hint:</strong> ${escapeHtml(sub.hint)}`;

        if (answerText) {
            answerText.value = '';
            if (wordCountSpan) wordCountSpan.textContent = '0';
        }
        if (feedbackPanel) feedbackPanel.classList.add('hidden');
    }

    // Word Count
    if (answerText && wordCountSpan) {
        answerText.addEventListener('input', () => {
            const words = answerText.value.trim().split(/\s+/).filter(w => w.length > 0).length;
            wordCountSpan.textContent = words;
        });
    }

    // Get AI Feedback
    if (submitAnswerBtn && feedbackPanel) {
        submitAnswerBtn.addEventListener('click', () => {
            submitAnswerBtn.innerHTML = '<i data-lucide="loader" class="spin"></i> Analyzing...';
            initIcons();

            setTimeout(() => {
                submitAnswerBtn.innerHTML = '<i data-lucide="sparkles"></i> Get AI Feedback';
                initIcons();
                buildFeedbackContent(selectedCategory, selectedSubtopicIndex);
                feedbackPanel.classList.remove('hidden');
                feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1000);
        });
    }

    function buildFeedbackContent(catKey, subIdx) {
        const cat = practiceData[catKey] || practiceData.grammar;
        const sub = cat.subtopics[subIdx];
        const userWords = (answerText ? answerText.value.trim() : '') || 'Your submitted response';

        feedbackPanel.innerHTML = `
            <div class="feedback-card green-border">
                <div class="space-between">
                    <div>
                        <span class="badge-green">Band 7.5</span>
                        <p class="caption mt-8">Evaluated against IELTS ${escapeHtml(cat.title)} criteria</p>
                    </div>
                    <div class="progress-ring-wrapper" style="padding: 0;">
                        <div class="progress-ring" style="width: 60px; height: 60px;">
                            <span class="score-inner" style="font-size: 18px;">7.5</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="feedback-card green-border">
                <div class="collapsible-header" onclick="toggleCollapse(this)">
                    <h3 style="font-size: 16px;">✅ Key Strengths</h3>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="collapsible-content">
                    <div class="flex-row gap-8"><span>✔️</span> Effectively addressed prompt: "${escapeHtml(sub.title)}"</div>
                    <div class="flex-row gap-8"><span>✔️</span> Sound sentence cadence and coherent structure</div>
                    <div class="flex-row gap-8"><span>✔️</span> Strong contextual application of targeted structures</div>
                </div>
            </div>

            <div class="feedback-card yellow-border">
                <div class="collapsible-header" onclick="toggleCollapse(this)">
                    <h3 style="font-size: 16px;">⚠️ Precision & Nuance Recommendations</h3>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="collapsible-content">
                    <div class="diff-view">
                        <span class="wrong">Basic phrasing</span> → <span class="correct">Academic alternative</span>
                        <span class="suggestion">(improves formal band score)</span>
                    </div>
                    <div class="diff-view">
                        <span class="wrong">General statement</span> → <span class="correct">Nuanced qualification</span>
                        <span class="suggestion">(avoids absolute overgeneralization)</span>
                    </div>
                </div>
            </div>

            <div class="feedback-card" style="background: #FFF9E0; border-left-color: #FFD43B;">
                <h3 style="font-size: 16px;">💡 Band 8+ Pro Tip</h3>
                <ul style="padding-left: 20px; margin-top: 8px; color: #1A1A1A;">
                    <li>Integrate high-register modal verbs (e.g. "would plausibly suffice").</li>
                    <li>Vary sentence length: Follow a compound-complex structure with a crisp, punchy concluding clause.</li>
                </ul>
            </div>

            <div class="flex-row gap-12 mt-8">
                <button class="btn-secondary" style="flex: 1;" onclick="document.getElementById('answerText').focus()">🔁 Revise & Try Again</button>
                <button class="btn-secondary" style="flex: 1;" onclick="alert('Feedback saved to your practice notebook!')">💾 Save to Notebook</button>
            </div>
        `;
        initIcons();
        initCollapsibles();
    }
}

// ==========================================================================
// 7. COLLAPSIBLE ACCORDIONS
// ==========================================================================
function initCollapsibles() {
    document.querySelectorAll('.collapsible-content').forEach(content => {
        content.style.display = 'flex';
    });
}

function toggleCollapse(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('svg, i');
    if (!content) return;

    if (content.style.display === 'none') {
        content.style.display = 'flex';
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        if (icon) icon.style.transform = 'rotate(-90deg)';
    }
}
window.toggleCollapse = toggleCollapse;

// ==========================================================================
// 8. FULL SPEAKING TEST SIMULATION
// ==========================================================================
function initSpeakingTest() {
    const topicGrid = document.getElementById('topicGrid');
    if (!topicGrid) return;

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

    const topicCards = document.querySelectorAll('.topic-card');
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

    topicCards.forEach(card => {
        card.addEventListener('click', () => updateTopicSelection(card));
    });

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            const allCards = document.querySelectorAll('.topic-card');
            if (!allCards.length) return;
            const randomIndex = Math.floor(Math.random() * allCards.length);
            updateTopicSelection(allCards[randomIndex]);
        });
    }

    function updateTimerDisplay() {
        if (!timerText || !timerRing) return;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        const deg = Math.min((seconds / 300) * 360, 360);
        timerRing.style.background = `conic-gradient(#FFD43B 0deg ${deg}deg, #F0F0F0 ${deg}deg 360deg)`;
    }

    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', () => {
            testStep1.classList.add('hidden');
            testStep2.classList.remove('hidden');
            if (promptText) promptText.textContent = `"${selectedPrompt}"`;
            seconds = 0;
            updateTimerDisplay();
        });
    }

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

// ==========================================================================
// 9. HELPER UTILITIES
// ==========================================================================
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
