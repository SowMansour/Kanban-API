const { Card, List } = require('../models/index');
const { associations } = require('../models/list');

const cardController = {
    
    getCardInList: async(req, res) => {
        const listId = req.params.id;
        try {
        const cardFromList = await Card.findAll({
            
            WHERE:{ list_id: listId },
            include: 'tags',
            order: [
                ['position', 'ASC']
            ]
        });
        if (!cardFromList) {
            res.status(404).json(`Card with list_id ${listId} not found`);
          } else {
            res.json(cardFromList);
          }
        } catch (e) {
        console.trace(e)
        res.status(500).json('Server Error'); 
      }
    },
    
    
    
    
    
    getCards: async (req, res) => {
        try {
          const cards = await Card.findAll();

          if(!cards){
            return res.status(400).json('Ressource not found');
        }
          res.json(cards);  
        } catch (e) {
          console.trace(e)
          res.status(500).json('Server Error'); 
        }
    },

    getOneCard: async (req, res) => {
        const cardId = Number(req.params.id);
        try {
            const card = await Card.findByPk(cardId);
            if(!card){
                return res.status(400).json('Ressource not found');
            }
            res.json(card);
        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    createCard: async (req, res) => {
        try {
          const { content, color, list_id } = req.body;
    
          let bodyErrors = [];
          if (!content) {
            bodyErrors.push(`content can not be empty`);
          }
          if (!list_id) {
            bodyErrors.push(`list_id can not be empty`);
          }
    
          if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
          } else {
            let newCard = Card.build({ content, list_id });
            if (color) {
              newCard.color = color;
            }
            await newCard.save();
            res.json(newCard);
          }
    
        } catch (error) {
          console.trace(error);
          res.status(500).json(error);
        }
      },

    modifyCard: async (req, res) => {
         //retrieve Id
         const cardId = Number(req.params.id);
         const { title, position, color, content, list_id } = req.body;
 
         try {
             //Checking first the ID
             const card = await Card.findByPk(cardId);
             if(!card){
                 return res.status(400).json('Ressource not found');
             }
             //Then modify properties concerned
             if(title){
                 card.title = title
             }
             if(position){
                 card.position = position
             }
             if(color){
                card.color = color
            }
            if(content){
                card.content = content
            }
            if(list_id){
                card.list_id = list_id
            }
             await card.save();
             //Render to insomnia
             res.json(card);
             
         } catch (e) {
             console.trace(e)
             res.status(500).json('Server Error');
         }
    },

    createOrModify: async (req, res) => {
        try {
          let card;
          if (req.params.id) {
            card = await Card.findByPk(req.params.id);
          }
          if (card) {
            await cardController.modifyCard(req, res);
          } else {
            await cardController.createCard(req, res);
          }
        } catch (error) {
          console.trace(error);
          res.status(500).send(error);
        }
      },

    removeCard: async(req, res) => {
        const cardId = Number(req.params.id);

        try {
            const card = await Card.findByPk(cardId);
            if(!card){
                return res.status(400).json('Ressource not found');
            }
            await card.destroy();
            res.json('card is succesfully remove');

        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }

    }
}






module.exports = cardController;