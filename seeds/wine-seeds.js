const { Wine } = require('../models');

//attributes: ['id', 'wine_maker', 'wine_year', 'category', 'type', 'price', 'notes', 'created_at']
const wineData = [
    {
        type: 'Test',
        wine_maker: 'Test',
        wine_year: '2020',
        category: 'soemthing',
        price: '858',
        notes: 'Notes 1Notes 1Notes 1Notes 1Notes 1',
        created_at: new Date(),
    },
    {
        type: 'Test',
        wine_maker: 'Test',
        wine_year: '2020',
        category: 'soemthing',
        price: '858',
        notes: 'Notes 2Notes 2Notes 2Notes 2',
        created_at: new Date(),
    },
    {
        type: 'Test',
        wine_maker: 'Test',
        wine_year: '2020',
        category: 'soemthing',
        price: '858',
        notes: 'Notes 3Notes 3Notes 3',
        created_at: new Date(),
    },
    {
        type: 'Test',
        wine_maker: 'Test',
        wine_year: '2020',
        category: 'soemthing',
        price: '858',
        notes: 'Notes 4Notes 4Notes 4Notes 4Notes 4',
        created_at: new Date(),
    },
    
];

const seedWine = () => Wine.bulkCreate(wineData);

module.exports = seedWine;