/**
 * ==========================================================================
 * PRACTICE ARENA ENTRYPOINT
 * This file links to the expanded modular practice directory:
 * - UI/js/practice/grammar.js    : Grammar Module (Option 1)
 * - UI/js/practice/vocabulary.js : Vocabulary Module (Option 2)
 * - UI/js/practice/listening.js  : Listening Module (Option 3)
 * - UI/js/practice/writing.js    : Writing Module (Option 4)
 * - UI/js/practice/practiceUI.js : Practice UI controller itself
 * ==========================================================================
 */

// If practiceUI.js is loaded, it provides window.initPractice.
// Otherwise fallback to existing definition if scripts are bundled.
if (typeof window !== 'undefined' && typeof window.initPractice === 'function') {
    // Already defined by practice/practiceUI.js
}
