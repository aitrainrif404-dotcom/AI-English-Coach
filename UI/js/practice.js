/**
 * ==========================================================================
 * PRACTICE ARENA LOGIC
 * Edit this file when changing:
 * - 4 Category Cards selection (Grammar, Vocabulary, Listening, Writing)
 * - "Next: Choose Topic" button transition
 * - Subtopic module selection & exercise loading
 * - Answer input & word count tracking
 * - AI Feedback generation & collapsible cards
 * ==========================================================================
 */

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
            if (practiceStep1) practiceStep1.classList.add('hidden');
            if (practiceStep2) practiceStep2.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
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
            if (window.lucide) lucide.createIcons();

            setTimeout(() => {
                submitAnswerBtn.innerHTML = '<i data-lucide="sparkles"></i> Get AI Feedback';
                if (window.lucide) lucide.createIcons();
                buildFeedbackContent(selectedCategory, selectedSubtopicIndex);
                feedbackPanel.classList.remove('hidden');
                feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1000);
        });
    }

    function buildFeedbackContent(catKey, subIdx) {
        const cat = practiceData[catKey] || practiceData.grammar;
        const sub = cat.subtopics[subIdx];

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
