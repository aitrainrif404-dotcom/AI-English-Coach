/**
 * ==========================================================================
 * PRACTICE MODULE 1: GRAMMAR LESSONS
 * Edit this file to customize:
 * - Grammar subtopic modules (conditionals, passive inversion, connectors, modals)
 * - Questions, target sentence hints & grammar feedback rules
 * ==========================================================================
 */

const grammarPracticeModule = {
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
    ],

    // Specific AI feedback breakdown for Grammar
    generateFeedback(subIdx, userText) {
        const sub = this.subtopics[subIdx] || this.subtopics[0];
        return {
            bandScore: '7.5',
            criteriaLabel: 'Grammatical Range & Accuracy',
            strengths: [
                `Effective structure usage related to "${sub.title}"`,
                'Accurate tense alignment and clause coordination',
                'Demonstrated control over complex grammatical forms'
            ],
            recommendations: [
                { wrong: 'If I knew earlier', correct: 'Had I known earlier', note: 'Higher band inversion' },
                { wrong: 'It is very good because', correct: 'It proves exceptionally advantageous inasmuch as', note: 'Academic register' }
            ],
            proTip: 'Vary sentence length: Combine a compound-complex hypothetical sentence with a punchy conclusion clause.'
        };
    }
};

// Register in global practice registry
window.grammarPracticeModule = grammarPracticeModule;
