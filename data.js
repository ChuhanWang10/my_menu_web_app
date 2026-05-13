export const DEFAULT_LANG = 'zh';

export const categories = [
    { id: 'all', name: { en: 'All', zh: '全部' } },
    { id: 'brunch', name: { en: 'Brunch', zh: '早午餐' } },
    { id: 'dinner', name: { en: 'Dinner', zh: '晚餐' } },
    { id: 'mains', name: { en: 'Mains', zh: '主菜' }, parent: 'dinner' },
    { id: 'sides', name: { en: 'Sides', zh: '配菜' }, parent: 'dinner' },
    { id: 'dessert', name: { en: 'Dessert', zh: '甜点' } },
    { id: 'drinks', name: { en: 'Drinks', zh: '饮品' } },
    { id: 'seasonal', name: { en: 'Seasonal', zh: '时令' } },
];

export const copy = {
    en: {
        brand: 'My Home Restaurant',
        documentTitle: 'My Home Restaurant Menu',
        primaryNavLabel: 'Primary navigation',
        eyebrow: "Tonight's Menu",
        heroTitle: 'My Home Restaurant',
        heroSubtitle: 'Tonight is for familiar dishes, warm plates, and an easy table together.',
        dishCountLabel: 'dishes',
        topPicksLabel: 'top picks',
        menuSummaryLabel: 'Menu summary',
        languageSwitcherLabel: 'Choose language',
        menuControlsLabel: 'Menu search and filters',
        categoryFiltersLabel: 'Filter dishes by category',
        searchLabel: 'Search menu',
        searchPlaceholder: 'Search dishes, ingredients, or tags',
        filterLabel: 'Categories',
        clearFilters: 'Clear filters',
        resultSummary: 'Showing {count} of {total} dishes in {category}',
        resultSummarySearch: 'Showing {count} of {total} dishes in {category} for "{search}"',
        emptyTitle: 'No dishes found',
        emptyText: 'Try another search or clear the current filter.',
        ingredientsLabel: 'Ingredients',
        topPickLabel: 'Top pick',
        ratingLabel: '{rating} out of 3 recommendation stars',
        imageFallbackLabel: 'Dish image unavailable',
        footerText: 'Cooked at home, shared at the table.',
    },
    zh: {
        brand: '我的家庭餐厅',
        documentTitle: '我的家庭餐厅菜单',
        primaryNavLabel: '主导航',
        eyebrow: '今晚菜单',
        heroTitle: '我的家庭餐厅',
        heroSubtitle: '今晚做几道熟悉的菜，热一点、慢一点，一起坐下来吃。',
        dishCountLabel: '道菜',
        topPicksLabel: '推荐',
        menuSummaryLabel: '菜单概览',
        languageSwitcherLabel: '选择语言',
        menuControlsLabel: '菜单搜索和筛选',
        categoryFiltersLabel: '按分类筛选菜品',
        searchLabel: '搜索菜单',
        searchPlaceholder: '搜索菜名、食材或标签',
        filterLabel: '分类',
        clearFilters: '清除筛选',
        resultSummary: '正在显示 {category} 中的 {count} / {total} 道菜',
        resultSummarySearch: '正在显示 {category} 中匹配“{search}”的 {count} / {total} 道菜',
        emptyTitle: '没有找到菜品',
        emptyText: '换个关键词，或者清除当前筛选。',
        ingredientsLabel: '食材',
        topPickLabel: '推荐',
        ratingLabel: '{rating} / 3 颗推荐星',
        imageFallbackLabel: '菜品图片暂不可用',
        footerText: '家里做，桌上分享。',
    },
};

export const myMenu = [
    {
        id: 1,
        slug: 'garlic-shrimp-pasta',
        name: { en: 'Garlic Shrimp Pasta', zh: '蒜香虾仁意面' },
        categories: ['dinner', 'mains'],
        description: {
            en: 'Bright garlic butter pasta with tender shrimp, parsley, and a little parmesan.',
            zh: '蒜香黄油意面配嫩虾仁、欧芹和少量帕马森干酪。',
        },
        ingredients: {
            en: ['shrimp', 'spaghetti', 'garlic', 'parsley', 'parmesan'],
            zh: ['虾仁', '意面', '大蒜', '欧芹', '帕马森干酪'],
        },
        tags: {
            en: ['seafood', 'comforting', 'guest favorite'],
            zh: ['海鲜', '暖心', '客人喜欢'],
        },
        rating: 3,
        image: {
            src: './assets/dishes/garlic-shrimp-pasta.svg',
            alt: {
                en: 'Garlic shrimp pasta in a shallow bowl',
                zh: '浅碗里的蒜香虾仁意面',
            },
        },
    },
    {
        id: 2,
        slug: 'garden-salad',
        name: { en: 'Garden Salad', zh: '田园沙拉' },
        categories: ['dinner', 'sides', 'seasonal'],
        description: {
            en: 'Crisp greens with tomato, cucumber, herbs, and a clean lemon dressing.',
            zh: '脆爽生菜配番茄、黄瓜、香草和清新的柠檬油醋汁。',
        },
        ingredients: {
            en: ['greens', 'tomato', 'cucumber', 'lemon', 'olive oil'],
            zh: ['生菜', '番茄', '黄瓜', '柠檬', '橄榄油'],
        },
        tags: {
            en: ['fresh', 'vegetarian', 'light'],
            zh: ['清爽', '素食', '轻盈'],
        },
        rating: 2,
        image: {
            src: './assets/dishes/garden-salad.svg',
            alt: {
                en: 'Fresh garden salad with tomato and cucumber',
                zh: '配有番茄和黄瓜的新鲜田园沙拉',
            },
        },
    },
    {
        id: 3,
        slug: 'garlic-sausage-mushroom-rice',
        name: { en: 'Garlic Sausage Mushroom Rice', zh: '辣香肠蘑菇烩饭' },
        categories: ['dinner', 'mains'],
        description: {
            en: 'Savory rice with sausage, mushrooms, garlic, and a glossy pan sauce.',
            zh: '香肠、蘑菇和大蒜炒出的咸香烩饭，带一点浓郁锅气。',
        },
        ingredients: {
            en: ['sausage', 'mushrooms', 'rice', 'garlic', 'scallion'],
            zh: ['香肠', '蘑菇', '米饭', '大蒜', '葱'],
        },
        tags: {
            en: ['savory', 'filling', 'one-pan'],
            zh: ['咸香', '饱腹', '一锅出'],
        },
        rating: 3,
        image: {
            src: './assets/dishes/sausage-mushroom-rice.svg',
            alt: {
                en: 'Sausage and mushroom rice served in a dark bowl',
                zh: '深色碗里的香肠蘑菇烩饭',
            },
        },
    },
    {
        id: 4,
        slug: 'curry-rice',
        name: { en: 'Curry Rice', zh: '咖喱饭' },
        categories: ['dinner', 'mains'],
        description: {
            en: 'Gentle curry over steamed rice with carrots, potatoes, and a silky sauce.',
            zh: '柔和咖喱盖在米饭上，配胡萝卜、土豆和顺滑酱汁。',
        },
        ingredients: {
            en: ['rice', 'curry', 'potato', 'carrot', 'onion'],
            zh: ['米饭', '咖喱', '土豆', '胡萝卜', '洋葱'],
        },
        tags: {
            en: ['cozy', 'mild spice', 'classic'],
            zh: ['温暖', '微辣', '经典'],
        },
        rating: 3,
        image: {
            src: './assets/dishes/curry-rice.svg',
            alt: {
                en: 'Curry rice with vegetables on a plate',
                zh: '盘子里的蔬菜咖喱饭',
            },
        },
    },
    {
        id: 5,
        slug: 'scallion-egg-toast',
        name: { en: 'Scallion Egg Toast', zh: '葱香鸡蛋吐司' },
        categories: ['brunch', 'mains'],
        description: {
            en: 'Golden toast topped with soft egg, scallion, sesame, and chili crisp.',
            zh: '金黄吐司配嫩鸡蛋、葱花、芝麻和一点香辣脆油。',
        },
        ingredients: {
            en: ['toast', 'egg', 'scallion', 'sesame', 'chili crisp'],
            zh: ['吐司', '鸡蛋', '葱', '芝麻', '香辣脆油'],
        },
        tags: {
            en: ['brunch', 'quick', 'savory'],
            zh: ['早午餐', '快速', '咸香'],
        },
        rating: 2,
        image: {
            src: './assets/dishes/scallion-egg-toast.svg',
            alt: {
                en: 'Scallion egg toast on a small plate',
                zh: '小盘里的葱香鸡蛋吐司',
            },
        },
    },
    {
        id: 6,
        slug: 'brown-sugar-panna-cotta',
        name: { en: 'Brown Sugar Panna Cotta', zh: '黑糖奶冻' },
        categories: ['dessert', 'seasonal'],
        description: {
            en: 'Silky chilled panna cotta with brown sugar syrup and toasted nuts.',
            zh: '冰凉顺滑的奶冻，配黑糖糖浆和烘香坚果。',
        },
        ingredients: {
            en: ['cream', 'milk', 'brown sugar', 'gelatin', 'nuts'],
            zh: ['奶油', '牛奶', '黑糖', '吉利丁', '坚果'],
        },
        tags: {
            en: ['sweet', 'make-ahead', 'chilled'],
            zh: ['香甜', '可提前准备', '冰凉'],
        },
        rating: 2,
        image: {
            src: './assets/dishes/brown-sugar-panna-cotta.svg',
            alt: {
                en: 'Brown sugar panna cotta in a glass cup',
                zh: '玻璃杯里的黑糖奶冻',
            },
        },
    },
    {
        id: 7,
        slug: 'jasmine-citrus-spritz',
        name: { en: 'Jasmine Citrus Spritz', zh: '茉莉柑橘气泡饮' },
        categories: ['drinks', 'seasonal'],
        description: {
            en: 'Jasmine tea, citrus, bubbles, and ice for a clean finish.',
            zh: '茉莉茶、柑橘、气泡水和冰块，清爽收尾。',
        },
        ingredients: {
            en: ['jasmine tea', 'orange', 'lemon', 'sparkling water', 'ice'],
            zh: ['茉莉茶', '橙子', '柠檬', '气泡水', '冰块'],
        },
        tags: {
            en: ['refreshing', 'non-alcoholic', 'citrus'],
            zh: ['清爽', '无酒精', '柑橘'],
        },
        rating: 2,
        image: {
            src: './assets/dishes/jasmine-citrus-spritz.svg',
            alt: {
                en: 'Jasmine citrus spritz with ice and citrus slices',
                zh: '带冰块和柑橘片的茉莉气泡饮',
            },
        },
    },
];
