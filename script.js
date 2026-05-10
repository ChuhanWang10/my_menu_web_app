// 1. Data Import (Assuming you switched index.html to type="module")
// If not using modules yet, 'myMenu' will be available globally from data.js
import { myMenu } from './data.js'; 

/**
 * 2. Centralized Application State
 * Keeping everything in one object makes it easier to track and debug.
 */
const state = {
    lang: 'zh',
    parent: 'all',
    sub: 'all',
    search: '',
};

// 3. Cache DOM Elements (Performance: Find them once, use many times)
const menuContainer = document.getElementById('menu-container');
const searchInput = document.getElementById('menu-search');
const langButtons = document.querySelectorAll('.lang-switch button');
const filterButtons = document.querySelectorAll('.filter-buttons button');


/**
 * 4. The "Single Source of Truth" Render Function
 * This function handles ALL drawing logic based on the current state.
 */

/**
 * Helper to generate star HTML based on rating number.
 * @param {number} count - 1, 2, or 3
 * @returns {string} HTML string of stars
 */
const getStarsHTML = (count) => {
    if (!count) return ''; // Return empty string if no rating
    
    // Create an array of length 'count' and fill it with star symbols
    // .repeat() is a clean modern JS way to do this
    return `<div class="rating-stars">${'★'.repeat(count)}</div>`;
};

const render = () => {
    // A. Filter Logic (Declarative style)
    const filteredList = myMenu.filter(dish => {
        const matchesFilter = state.filter === 'all' || dish.categories.includes(state.filter);
        const matchesSearch = 
            dish.name.en.toLowerCase().includes(state.search) || 
            dish.name.zh.includes(state.search);
        
        return matchesFilter && matchesSearch;
    });

    // B. Handle Empty State
    if (filteredList.length === 0) {
        menuContainer.innerHTML = `
            <div class="no-results">
                <p>Sorry, no dishes found! / 抱歉，未找到相关菜品。</p>
            </div>
        `;
        return;
    }

    // C. Render Items (Best Practice: String mapping is faster than innerHTML += in a loop)
    menuContainer.innerHTML = filteredList.map(dish => `
        <div class="dish-card">
        <div class="dish-header">
            <h3>${dish.name[state.lang]}</h3>
            ${getStarsHTML(dish.rating)} </div>
            <p>${dish.description[state.lang]}</p>
        </div>
    `).join('');
};

/**
 * 5. Event Listeners (Separation of Concerns)
 * We attach logic here instead of inside the HTML tags.
 */

// Search Logic
searchInput.addEventListener('input', (e) => {
    state.search = e.target.value.toLowerCase();
    render();
});

// Category Filter Logic (Using Data Attributes)
// NOTE: For this to work, update your HTML buttons to have data-parent and data-sub

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update State
        state.filter = e.currentTarget.dataset.filter;

        // Update UI Visuals
        filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        render();
    });
});

// Language Logic
langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.lang;
        state.lang = lang;

        langButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        render();
    });
});

// 6. Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log("App initialized.");
    render();
});
