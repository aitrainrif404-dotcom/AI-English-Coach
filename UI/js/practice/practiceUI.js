/**
 * ==========================================================================
 * PRACTICE UI CONTROLLER (practiceUI.js)
 * Coordinates the Practice Arena interface:
 * - 4 Category Cards selection (Grammar, Vocabulary, Listening, Writing)
 * - Step 1 -> Step 2 transitions & back navigation
 * - Subtopic module selection & exercise view
 * - Real-time word counter & AI feedback orchestration
 * ==========================================================================
 */

function initPractice() {
    // Registry of the 4 specialized practice modules
    const modules = {
        grammar: window.grammarPracticeModule,
        vocabulary: window.vocabularyPracticeModule,
        listening: window.listeningPracticeModule,
        writing: window.writingPracticeModule
    };

    // Fallback to practiceData if modules haven't loaded yet
    function getModule(catKey) {
        if (modules[catKey]) return modules[catKey];
        if (window.practiceData && window.practiceData[catKey]) return window.practiceData[catKey];
        return window.grammarPracticeModule || (window.practiceData ? window.practiceData.grammar : null);
    }

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

    // Helper: update Next button text
    function updateNextButtonLabel() {
        if (!practiceNextBtn) return;
        const mod = getModule(selectedCategory);
        if (mod) {
            practiceNextBtn.innerHTML = `Start ${mod.title} (${mod.emoji}) →`;
        }
    }

    // 1. Category Selection Handler
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const isAlreadySelected = card.classList.contains('selected');
            categoryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedCategory = card.dataset.category || 'grammar';
            updateNextButtonLabel();

            // Direct entry on click/double-click if already selected
            if (isAlreadySelected) {
                goToStep2();
            }
        });
    });

    // 2. Next Button -> Transition to Step 2
    function goToStep2() {
        loadCategoryExercise(selectedCategory);
        if (practiceStep1) practiceStep1.classList.add('hidden');
        if (practiceStep2) practiceStep2.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (practiceNextBtn) {
        practiceNextBtn.addEventListener('click', goToStep2);
        updateNextButtonLabel();
    }

    // 3. Back Button -> Return to 4 Big Thumb Options
    if (practiceBackBtn) {
        practiceBackBtn.addEventListener('click', () => {
            if (practiceStep2) practiceStep2.classList.add('hidden');
            if (practiceStep1) practiceStep1.classList.remove('hidden');
            if (feedbackPanel) feedbackPanel.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Load Subtopics & Initial Exercise
    function loadCategoryExercise(catKey) {
        const mod = getModule(catKey);
        if (!mod) return;
        selectedSubtopicIndex = 0;

        if (practiceSelectedCategoryPill) {
            practiceSelectedCategoryPill.textContent = `${mod.emoji} ${mod.title}`;
        }

        renderSubtopics(mod);
        renderExercise(mod, 0);
    }

    function renderSubtopics(mod) {
        if (!practiceSubtopicsList) return;
        practiceSubtopicsList.innerHTML = '';

        mod.subtopics.forEach((sub, idx) => {
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
                renderExercise(mod, idx);
            });
            practiceSubtopicsList.appendChild(btn);
        });
    }

    function renderExercise(mod, subIdx) {
        const sub = mod.subtopics[subIdx];
        if (!sub) return;

        if (currentTopicChip) currentTopicChip.textContent = `📌 ${mod.title}`;
        if (currentQuestionNum) currentQuestionNum.textContent = `Exercise ${subIdx + 1} of ${mod.subtopics.length}`;
        if (practiceQuestionText) practiceQuestionText.textContent = sub.question;
        if (practiceQuestionHint) practiceQuestionHint.innerHTML = `💡 <strong>Hint:</strong> ${escapeHtml(sub.hint)}`;

        if (answerText) {
            answerText.value = '';
            if (wordCountSpan) wordCountSpan.textContent = '0';
        }
        if (feedbackPanel) feedbackPanel.classList.add('hidden');
    }

    // Real-Time Word Count Tracker
    if (answerText && wordCountSpan) {
        answerText.addEventListener('input', () => {
            const words = answerText.value.trim().split(/\s+/).filter(w => w.length > 0).length;
            wordCountSpan.textContent = words;
        });
    }

    // Get AI Feedback Trigger
    if (submitAnswerBtn && feedbackPanel) {
        submitAnswerBtn.addEventListener('click', () => {
            const textValue = answerText ? answerText.value.trim() : '';
            if (!textValue) {
                alert('Please type a response first before asking for AI Feedback!');
                if (answerText) answerText.focus();
                return;
            }

            submitAnswerBtn.innerHTML = '<i data-lucide="loader" class="spin"></i> Analyzing...';
            if (window.lucide) lucide.createIcons();

            setTimeout(() => {
                submitAnswerBtn.innerHTML = '<i data-lucide="sparkles"></i> Get AI Feedback';
                if (window.lucide) lucide.createIcons();
                buildFeedbackContent(selectedCategory, selectedSubtopicIndex, textValue);
                feedbackPanel.classList.remove('hidden');
                feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 800);
        });
    }

    function buildFeedbackContent(catKey, subIdx, userResponse) {
        const mod = getModule(catKey);
        const sub = mod.subtopics[subIdx];
        const feedback = mod.generateFeedback ? mod.generateFeedback(subIdx, userResponse) : {
            bandScore: '7.5',
            criteriaLabel: 'IELTS Assessment Criteria',
            strengths: ['Addressed prompt effectively', 'Sound sentence cadence', 'Good contextual grammar'],
            recommendations: [{ wrong: 'Basic phrasing', correct: 'Academic phrasing', note: 'Register' }],
            proTip: 'Vary sentence length for better rhythm.'
        };

        const strengthsHtml = feedback.strengths.map(s => `<div class="flex-row gap-8"><span>✔️</span> ${escapeHtml(s)}</div>`).join('');
        const recommendationsHtml = feedback.recommendations.map(r => `
            <div class="diff-view">
                <span class="wrong">${escapeHtml(r.wrong)}</span> → <span class="correct">${escapeHtml(r.correct)}</span>
                <span class="suggestion">(${escapeHtml(r.note)})</span>
            </div>
        `).join('');

        feedbackPanel.innerHTML = `
            <div class="feedback-card green-border">
                <div class="space-between">
                    <div>
                        <span class="badge-green">Band ${escapeHtml(feedback.bandScore)}</span>
                        <p class="caption mt-8">Evaluated against ${escapeHtml(feedback.criteriaLabel)}</p>
                    </div>
                    <div class="progress-ring-wrapper" style="padding: 0;">
                        <div class="progress-ring" style="width: 60px; height: 60px;">
                            <span class="score-inner" style="font-size: 18px;">${escapeHtml(feedback.bandScore)}</span>
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
                    ${strengthsHtml}
                </div>
            </div>

            <div class="feedback-card yellow-border">
                <div class="collapsible-header" onclick="toggleCollapse(this)">
                    <h3 style="font-size: 16px;">⚠️ Precision & Nuance Recommendations</h3>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="collapsible-content">
                    ${recommendationsHtml}
                </div>
            </div>

            <div class="feedback-card" style="background: #FFF9E0; border-left-color: #FFD43B;">
                <h3 style="font-size: 16px;">💡 Band 8+ Pro Tip</h3>
                <p style="margin-top: 8px; color: #1A1A1A; font-size: 14px;">${escapeHtml(feedback.proTip)}</p>
            </div>

            <div class="flex-row gap-12 mt-8">
                <button class="btn-secondary" style="flex: 1;" onclick="document.getElementById('answerText').focus()">🔁 Revise & Try Again</button>
                <button class="btn-secondary" style="flex: 1;" onclick="alert('Feedback saved to your practice notebook!')">💾 Save to Notebook</button>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        initCollapsibles();
    }
}

// Collapsible helper
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

// Expose initPractice globally
window.initPractice = initPractice;
