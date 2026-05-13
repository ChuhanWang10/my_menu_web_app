import { DEFAULT_LANG, categories, copy, myMenu } from './data.js';

const STORAGE_KEY = 'my-home-restaurant-lang';
const supportedLanguages = Object.keys(copy);
const categoryById = new Map(categories.map((category) => [category.id, category]));

const elements = {
    html: document.documentElement,
    title: document.querySelector('title'),
    translatedText: document.querySelectorAll('[data-i18n]'),
    translatedPlaceholders: document.querySelectorAll('[data-i18n-placeholder]'),
    translatedAria: document.querySelectorAll('[data-i18n-aria]'),
    languageButtons: document.querySelectorAll('.lang-btn'),
    searchInput: document.getElementById('menu-search'),
    filters: document.getElementById('category-filters'),
    menu: document.getElementById('menu-container'),
    resultSummary: document.getElementById('result-summary'),
    clearFilters: document.getElementById('clear-filters'),
    totalDishes: document.getElementById('total-dishes'),
    topPicks: document.getElementById('top-picks'),
};

const state = {
    lang: getInitialLanguage(),
    filter: 'all',
    search: '',
};

function getInitialLanguage() {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    return supportedLanguages.includes(savedLanguage) ? savedLanguage : DEFAULT_LANG;
}

function translate(key, replacements = {}) {
    const value = copy[state.lang][key] ?? copy[DEFAULT_LANG][key] ?? key;
    return value.replace(/\{(\w+)\}/g, (_, token) => replacements[token] ?? '');
}

function localize(value) {
    return value?.[state.lang] ?? value?.[DEFAULT_LANG] ?? '';
}

function normalize(value) {
    return value.toLocaleLowerCase().trim();
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function getSearchText(dish) {
    const searchableParts = [
        dish.name.en,
        dish.name.zh,
        dish.description.en,
        dish.description.zh,
        ...dish.ingredients.en,
        ...dish.ingredients.zh,
        ...dish.tags.en,
        ...dish.tags.zh,
    ];

    return normalize(searchableParts.join(' '));
}

function getFilteredDishes() {
    return myMenu.filter((dish) => {
        const matchesCategory = state.filter === 'all' || dish.categories.includes(state.filter);
        const matchesSearch = !state.search || getSearchText(dish).includes(state.search);
        return matchesCategory && matchesSearch;
    });
}

function getCategoryCount(categoryId) {
    if (categoryId === 'all') {
        return myMenu.length;
    }

    return myMenu.filter((dish) => dish.categories.includes(categoryId)).length;
}

function renderStaticCopy() {
    elements.html.lang = state.lang;
    elements.title.textContent = translate('documentTitle');

    elements.translatedText.forEach((node) => {
        node.textContent = translate(node.dataset.i18n);
    });

    elements.translatedPlaceholders.forEach((node) => {
        node.setAttribute('placeholder', translate(node.dataset.i18nPlaceholder));
    });

    elements.translatedAria.forEach((node) => {
        node.setAttribute('aria-label', translate(node.dataset.i18nAria));
    });

    elements.languageButtons.forEach((button) => {
        const isActive = button.dataset.lang === state.lang;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    elements.totalDishes.textContent = myMenu.length;
    elements.topPicks.textContent = myMenu.filter((dish) => dish.rating === 3).length;
}

function renderFilters() {
    elements.filters.innerHTML = categories.map((category) => {
        const isActive = category.id === state.filter;
        const count = getCategoryCount(category.id);
        const label = localize(category.name);

        return `
            <button
                class="filter-chip${isActive ? ' active' : ''}"
                type="button"
                data-filter="${escapeHtml(category.id)}"
                aria-pressed="${isActive}"
                role="listitem"
            >
                <span>${escapeHtml(label)}</span>
                <span class="filter-count">${count}</span>
            </button>
        `;
    }).join('');
}

function renderResultSummary(filteredDishes) {
    const category = categoryById.get(state.filter) ?? categoryById.get('all');
    const summaryKey = state.search ? 'resultSummarySearch' : 'resultSummary';

    elements.resultSummary.textContent = translate(summaryKey, {
        count: filteredDishes.length,
        total: myMenu.length,
        category: localize(category.name),
        search: state.search,
    });

    const hasActiveControls = state.filter !== 'all' || state.search !== '';
    elements.clearFilters.hidden = !hasActiveControls;
}

function getDishInitials(dish) {
    if (state.lang === 'zh') {
        return localize(dish.name).slice(0, 2);
    }

    return localize(dish.name)
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('');
}

function getRatingHtml(rating) {
    if (!rating) {
        return '';
    }

    return `
        <span class="rating" aria-label="${escapeHtml(translate('ratingLabel', { rating }))}">
            ${'★'.repeat(rating)}
        </span>
    `;
}

function getDishCardHtml(dish) {
    const tags = localize(dish.tags).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    const ingredients = localize(dish.ingredients).map(escapeHtml).join(', ');
    const categoryLabels = dish.categories
        .map((categoryId) => categoryById.get(categoryId))
        .filter(Boolean)
        .map((category) => localize(category.name))
        .slice(0, 3)
        .map((label) => `<span>${escapeHtml(label)}</span>`)
        .join('');

    return `
        <li class="dish-card">
            <article>
                <div class="dish-media">
                    <img
                        src="${escapeHtml(dish.image.src)}"
                        alt="${escapeHtml(localize(dish.image.alt))}"
                        loading="lazy"
                        data-fallback
                    >
                    <span class="image-fallback" hidden>
                        <span>${escapeHtml(getDishInitials(dish))}</span>
                        <small>${escapeHtml(translate('imageFallbackLabel'))}</small>
                    </span>
                </div>

                <div class="dish-content">
                    <div class="dish-topline">
                        <div class="category-pills">${categoryLabels}</div>
                        ${dish.rating === 3 ? `<span class="top-pick">${escapeHtml(translate('topPickLabel'))}</span>` : ''}
                    </div>

                    <div class="dish-heading">
                        <h2>${escapeHtml(localize(dish.name))}</h2>
                        ${getRatingHtml(dish.rating)}
                    </div>

                    <p class="dish-description">${escapeHtml(localize(dish.description))}</p>

                    <p class="ingredients">
                        <strong>${escapeHtml(translate('ingredientsLabel'))}</strong>
                        <span>${ingredients}</span>
                    </p>

                    <div class="tag-list">${tags}</div>
                </div>
            </article>
        </li>
    `;
}

function renderMenu(filteredDishes) {
    if (filteredDishes.length === 0) {
        elements.menu.innerHTML = `
            <li class="empty-state">
                <h2>${escapeHtml(translate('emptyTitle'))}</h2>
                <p>${escapeHtml(translate('emptyText'))}</p>
            </li>
        `;
        return;
    }

    elements.menu.innerHTML = filteredDishes.map(getDishCardHtml).join('');
}

function render() {
    const filteredDishes = getFilteredDishes();

    renderStaticCopy();
    renderFilters();
    renderResultSummary(filteredDishes);
    renderMenu(filteredDishes);
}

function resetTransientControls() {
    state.filter = 'all';
    state.search = '';
    elements.searchInput.value = '';
}

elements.searchInput.addEventListener('input', (event) => {
    state.search = normalize(event.target.value);
    render();
});

elements.filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');

    if (!button) {
        return;
    }

    state.filter = button.dataset.filter;
    render();
});

elements.languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        state.lang = button.dataset.lang;
        localStorage.setItem(STORAGE_KEY, state.lang);
        render();
    });
});

elements.clearFilters.addEventListener('click', () => {
    resetTransientControls();
    render();
    elements.searchInput.focus();
});

elements.menu.addEventListener('error', (event) => {
    const image = event.target.closest?.('img[data-fallback]');

    if (!image) {
        return;
    }

    const media = image.closest('.dish-media');
    const fallback = media.querySelector('.image-fallback');

    image.hidden = true;
    media.classList.add('is-missing');
    fallback.hidden = false;
}, true);

render();
