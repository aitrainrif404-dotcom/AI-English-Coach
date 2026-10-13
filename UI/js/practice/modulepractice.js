/**
 * ==========================================================================
 * MODULE PRACTICE VIEW (modulepractice.js)
 * Drill-down flow for a selected practice level:
 *   levels grid -> modules list -> single module page (level/topic/)
 * Markup lives here; practiceUI.js only passes data + callbacks.
 * Styles: UI/css/practice.css (section 8. MODULE VIEW).
 *
 * Progress (green done / white todo) persists in localStorage.
 *
 * API:
 *   window.ModulePractice.renderLevelModules(container, opts)
 *   window.ModulePractice.renderModuleSingle(container, opts)
 *   window.ModulePractice.getProgress(track, level)
 *   window.ModulePractice.toggleComplete(track, level, moduleId)
 * opts (list): { track, level, title, desc, emoji, count, status,
 *   items: [{ id, title, desc, type, emoji }], game: { type },
 *   onBackLevels(), onSelectModule(item, idx), onPlayGame() }
 * opts (single): { track, level, item, idx, total, game,
 *   onBackModules(), onToggleComplete(item, done) }
 * ==========================================================================
 */
(function () {
    var STORE_KEY = 'aiec-progress-v1';

    function esc(s) {
        if (typeof window.escapeHtml === 'function') return window.escapeHtml(s);
        if (typeof escapeHtml === 'function') return escapeHtml(s);
        const div = document.createElement('div');
        div.textContent = (s == null ? '' : String(s));
        return div.innerHTML;
    }

    function el(tag, className, html) {
        const n = document.createElement(tag);
        if (className) n.className = className;
        if (html != null) n.innerHTML = html;
        return n;
    }

    // ---------------- Progress store (done = green, else white) ----------------
    function loadStore() {
        try {
            return JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
        } catch (e) {
            return {};
        }
    }

    function saveStore(store) {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(store));
        } catch (e) { /* private mode etc — progress just won't persist */ }
    }

    function getProgress(track, level) {
        const store = loadStore();
        const done = store && store[track] && store[track][level] && store[track][level].modules;
        return done || {};
    }

    function isComplete(track, level, moduleId) {
        return !!getProgress(track, level)[moduleId];
    }

    function toggleComplete(track, level, moduleId) {
        const store = loadStore();
        store[track] = store[track] || {};
        store[track][level] = store[track][level] || { modules: {} };
        const mods = store[track][level].modules;
        const done = !mods[moduleId];
        if (done) mods[moduleId] = true;
        else delete mods[moduleId];
        saveStore(store);
        return done;
    }

    function levelDoneCount(track, level, items) {
        let n = 0;
        (items || []).forEach((it) => {
            if (isComplete(track, level, it.id || it.title)) n++;
        });
        return n;
    }

    // ---------------- Modules list ----------------
    function moduleCard(track, level, item, idx, opts) {
        const id = item.id || ('module-' + (idx + 1));
        const done = isComplete(track, level, id);
        const card = el('button', 'module-card' + (done ? ' is-done' : ''));
        card.dataset.module = id;
        card.innerHTML = `
            <span class="module-thumb">${esc(item.emoji || (opts && opts.emoji) || '📝')}</span>
            <span class="module-body">
                <span class="module-title">${esc(item.title || ('Module ' + (idx + 1)))}</span>
                <span class="caption">${esc(item.desc || '')}</span>
            </span>
            ${done ? '<span class="module-done-badge">✓ Done</span>' : '<span class="module-type">' + esc(item.type || 'Lesson') + '</span>'}
        `;
        if (opts && typeof opts.onSelectModule === 'function') {
            card.addEventListener('click', () => opts.onSelectModule(item, idx));
        }
        return card;
    }

    function skeletonCard(idx) {
        const card = el('div', 'module-card is-skeleton');
        card.innerHTML = `
            <span class="module-thumb">📝</span>
            <span class="module-body">
                <span class="module-title">Module lands here</span>
                <span class="caption">Topics from lessons/ fill this slot next.</span>
            </span>
            <span class="module-type">Soon</span>
        `;
        return card;
    }

    function renderLevelModules(container, opts) {
        if (!container) return;
        const o = opts || {};
        const track = o.track || 'grammar';
        const level = o.level || '';
        const items = Array.isArray(o.items) ? o.items : [];
        const game = o.game || { type: 'quiz' };
        const soon = o.status === 'soon';
        const doneCount = levelDoneCount(track, level, items);
        container.innerHTML = '';

        // Header with back-to-levels
        const head = el('div', 'module-view-head');
        head.innerHTML = `
            <button class="link-back" data-act="back-levels">← All levels</button>
            <p class="caption">${esc(track.toUpperCase())} · LEVEL ${esc(level)}</p>
            <h3>${esc(o.emoji || '📐')} ${esc(level)} — ${esc(o.title || '')}</h3>
            <p class="caption">${esc(o.desc || '')}</p>
            <div class="module-view-meta">
                <span class="pill-chip">${soon ? 'Coming soon' : (o.count || items.length || 0) + ' topics'}</span>
                ${items.length ? `<span class="pill-chip green">${doneCount}/${items.length} done</span>` : ''}
                <span class="pill-chip green">🎮 ${esc(game.type || 'quiz')} game</span>
            </div>
        `;
        head.querySelector('[data-act="back-levels"]').addEventListener('click', () => {
            if (typeof o.onBackLevels === 'function') o.onBackLevels();
        });
        container.appendChild(head);

        if (soon) {
            container.appendChild(el('p', 'caption', 'Mastery content is on its way.'));
            return;
        }

        // Modules list (real items, or skeleton placeholders until content lands)
        const grid = el('div', 'module-grid');
        if (items.length) {
            items.forEach((item, idx) => grid.appendChild(moduleCard(track, level, item, idx, o)));
        } else {
            for (let i = 0; i < 3; i++) grid.appendChild(skeletonCard(i));
            grid.appendChild(el('p', 'caption',
                `Modules land here next — ${esc(String(o.count || 0))} topics from lessons/ fill these slots.`));
        }
        container.appendChild(grid);

        // Game banner
        const banner = el('div', 'game-banner');
        banner.innerHTML = `
            <div>
                <h4>🎮 ${esc(level)} Quiz Game</h4>
                <p class="caption">Single-form quiz across this level's topics.</p>
            </div>
        `;
        const play = el('button', 'btn-primary', 'Play Quiz →');
        play.addEventListener('click', () => {
            if (typeof o.onPlayGame === 'function') o.onPlayGame();
        });
        banner.appendChild(play);
        container.appendChild(banner);
    }

    // ---------------- Single module page (level/topic/) ----------------
    function renderModuleSingle(container, opts) {
        if (!container) return;
        const o = opts || {};
        const track = o.track || 'grammar';
        const level = o.level || '';
        const item = o.item || {};
        const id = item.id || ('module-' + ((o.idx || 0) + 1));
        const total = o.total || 0;
        const done = isComplete(track, level, id);
        container.innerHTML = '';

        const page = el('div', 'module-single');
        page.innerHTML = `
            <button class="link-back" data-act="back-modules">← ${esc(level)} modules</button>
            <p class="caption">${esc(track.toUpperCase())} · ${esc(level)} · MODULE ${esc(String((o.idx || 0) + 1))}${total ? ' OF ' + esc(String(total)) : ''}</p>
            <h3>${esc(item.emoji || o.emoji || '📝')} ${esc(item.title || 'Module')}</h3>
            <p class="caption">${esc(item.desc || '')}</p>
            <div class="module-single-body">
                <p class="caption">${esc(item.content || 'Questions from lessons/ land here next.')}</p>
            </div>
            <div class="module-single-actions"></div>
        `;
        page.querySelector('[data-act="back-modules"]').addEventListener('click', () => {
            if (typeof o.onBackModules === 'function') o.onBackModules();
        });

        const actions = page.querySelector('.module-single-actions');
        const toggle = el('button', done ? 'btn-secondary' : 'btn-primary', done ? '✓ Completed — Undo' : 'Mark Complete ✓');
        toggle.addEventListener('click', () => {
            const nowDone = toggleComplete(track, level, id);
            if (typeof o.onToggleComplete === 'function') o.onToggleComplete(item, nowDone);
        });
        actions.appendChild(toggle);
        container.appendChild(page);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.ModulePractice = {
        renderLevelModules,
        renderModuleSingle,
        getProgress,
        toggleComplete,
        isComplete
    };
})();
