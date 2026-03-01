
let currentLang = 'zh'; // Default language

// 2. Find the "Plate" (The HTML container)
const menuContainer = document.getElementById('menu-container');


// 1. Create a function to display the items
function displayMenuItems(menuList) {
  // Clear the container first so we don't just keep adding more items
  menuContainer.innerHTML = "";

  menuList.forEach(dish => {
    const dishHTML = `
      <div class="dish-card">
        <h3>${dish.name[currentLang]}</h3> <p>${dish.description[currentLang]}</p>
      </div>
    `;
    menuContainer.innerHTML += dishHTML;
  });
}

function updateActiveButton(containerSelector, clickedButton) {
    // 1. Find all buttons inside the specific container (filters or lang-switch)
    const buttons = document.querySelectorAll(`${containerSelector} button`);
    
    // 2. Remove "active" class from all of them
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 3. Add "active" class to the one we clicked
    clickedButton.classList.add('active');
}

function changeLanguage(event, lang) {
const clickedBtn = event.currentTarget;
    updateActiveButton('.lang-switch', clickedBtn);

    currentLang = lang;
    displayMenuItems(myMenu);
}

// 2. Create the Filter Logic
function filterMenu(event, category) {
  
  // Logic for the visual button change
  const clickedBtn = event.currentTarget; // 'event' is a built-in browser tool
  updateActiveButton('.filter-buttons', clickedBtn);

  if (category === 'all') {
    displayMenuItems(myMenu);
  } else {
    // Look through the menu and only keep items that match the category
    const filteredItems = myMenu.filter(dish => dish.category === category);
    displayMenuItems(filteredItems);
  }
  if (category === 'Mains') {
    const filteredItems = myMenu.filter(dish => dish.category === 'Mains');
    displayMenuItems(filteredItems);
  } else if (category === 'Sides') {
    const filteredItems = myMenu.filter(dish => dish.category === 'Sides');
    displayMenuItems(filteredItems);
  } else if (category === 'Desserts') {
    const filteredItems = myMenu.filter(dish => dish.category === 'Desserts');
    displayMenuItems(filteredItems);
  } else if (category === 'Drinks') { 
    const filteredItems = myMenu.filter(dish => dish.category === 'Drinks');
    displayMenuItems(filteredItems);
  }
}

function handleSearch() {
  // 1. Get the text the user typed (and make it lowercase)
  const searchTerm = document.getElementById('menu-search').value.toLowerCase();
  
  const searchedItems = myMenu.filter(dish => {
    // Check English name OR Chinese name
    return dish.name.en.toLowerCase().includes(searchTerm) || 
           dish.name.zh.includes(searchTerm);
  });

  // 3. Display the results!
  displayMenuItems(searchedItems);
}

// 3. Initial call to show all items when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed. Starting the app...");
    displayMenuItems(myMenu); 
    // You can put all your setup logic here
});

console.log("Menu app is ready!");
