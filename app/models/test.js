require('dotenv').config();
const {List, Card, Tag} = require('./');

async function test(){
    const lists = await List.findAll({
        include: [
            {
                association: 'cards',
                include: [
                    {
                    association: 'tags',
                }
                ]
            }
        ]
    });
    console.log(lists);

    // const cards = await Card.findAll();
    // console.log(cards);

    // const tags = await Tag.findAll();
    // console.log(tags);


    process.exit();
};

test();