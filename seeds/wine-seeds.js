const { Wine } = require('../models');

//attributes: ['id', 'wine_maker', 'wine_year', 'category', 'type', 'price', 'notes', 'created_at']
const wineData = [
    {
        type: 'Syrah',
        wine_maker: 'Keenan',
        wine_year: '2017',
        category: 'Red',
        price: '42',
        notes: 'The nose of the wine offers aromas of black cherry and blackberry along with underlying floral nuances. The texture is soft, yet the wine maintains wonderful structure. This is a versatile wine that will accompany a wide array of dishes.',
        created_at: new Date(),
    },
    {
        type: 'Chardonnay',
        wine_maker: 'Plow & Stars Cellars',
        wine_year: '2017',
        category: 'White',
        price: '35',
        notes: 'This chardonnay opens with rich aromas of white peach, pineapple and lemon zest, complemented by notes of toasted almond and caramel. Pairs well with chicken, seafood and hard cheeses',
        created_at: new Date(),
    },
    {
        type: 'Zinfandel Juvenile',
        wine_maker: 'Turley',
        wine_year: '2019',
        category: 'Red',
        price: '25',
        notes: 'Aromas of red and black berries. The palate is soft and alluring with a wealth of ripe fruit; it finishes long with tons of energy on the palate. Its very approachable.',
        created_at: new Date(),
    },
    {
        type: 'Cabernet Sauvignon',
        wine_maker: 'Martin Ray Vineyards & Winery',
        wine_year: '2018',
        category: 'Red',
        price: '25',
        notes: 'Deep and manicured with blueberry and blackberry aromas and flavors. Full-bodied and tight with super polished tannins and a tight, racy finish.',
        created_at: new Date(),
    },

    {
        wine_maker: 'Black Sears',
        wine_year: '2017',
        category: 'red',
        type: 'Estate Zinfandel',
        price: '75',
        notes: 'Didn’t have this wine yet, but a friend did and recommended it for these notes: crisp, bright yet exceptionally powerful Zin that offers high-toned red and black fruit.', 
        created_at: new Date(),
    },
    
    {
        wine_maker: 'Provenance Vineyards',
        wine_year: '2016',
        category: 'red',
        type: 'Cabernet Sauvignon',
        price: '35',
        notes: 'Balanced, richly textured, opulent dark berry flavors open with chocolate, espresso and spicy black pepper accents, black tea and green olive on the mid-palate.', 
        created_at: new Date(),
    },

    {
        wine_maker: 'Kenwood Vineyards',
        wine_year: '2017',
        category: 'red',
        type: 'Cabernet Sauvignon',
        price: '14',
        notes: 'Intense aromas of black currant, plum and fig; followed by hints of vanilla and pipe tobacco. Full-bodied and smooth with rich tannins, and an excellent finish.', 
        created_at: new Date(),
    }
    

    
    
];

const seedWine = () => Wine.bulkCreate(wineData);

module.exports = seedWine;