const { Tag, Card } = require('../models/index');


const tagController = {
    getTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            if(!tags){
                return res.status(400).json('Ressource not found');
            }

            res.json(tags);
        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    getOneTag: async(req, res) => {
        const tagId = Number(req.params.id);

        try {
            const tag = await Tag.findByPk(tagId);
            if(!tag){
                return res.status(500).json('Ressource not found');
            }

            res.json(tag);
        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    createTag: async(req, res) => {

        try {
            const { name, color } = req.body;
            if(!name){
                return res.status(400).json('Wrong column name')
            }

        const newTag =  Tag.build({
            name,  
            color 
        })

        await newTag.save();
        //render to the front
        res.status(201).json(newTag);

        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    modifyTag: async (req, res) => {
        const tagId = Number(req.params.id);
        const {name, color} = req.body;

        try {
            //Checking first the ID
            const tag = await Tag.findByPk(tagId);
            if(!tag){
                return res.status(400).json('Ressource not found');
            }
            //Then modify properties concerned
            if(name){
                tag.name = name
            }
            if(color){
                tag.color = color
            }
            await tag.save();
            //Render to insomnia
            res.json(tag);
            
        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    createOrModify: async (req, res) => {
        try {
          let tag;
          if (req.params.id) {
            tag = await Tag.findByPk(req.params.id);
          }
          if (tag) {
            await tagController.modifyTag(req, res);
          } else {
            await tagController.createTag(req, res);
          }
        } catch (error) {
          console.trace(error);
          res.status(500).send(error);
        }
      },

    removeTag: async (req, res) => {
        const tagId = Number(req.params.id);

        try {
            const tag = await Tag.findByPk(tagId);
            if(!tag){
                return res.status(400).json('Ressource not found');
            }
            await tag.destroy();
            res.json('tag is succesfully remove');

        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    associateTagToCard: async (req, res) => {
        try {
          console.log(req.body);
          const cardId = req.params.id;
          const tagId = req.body.id;
            console.log(tagId);
          let card = await Card.findByPk(cardId, {
            include: ['tags']
          });
          if (!card) {
            return res.status(404).json('Can not find card with id ' + cardId);
          }
    
          let tag = await Tag.findByPk(tagId);
          if (!tag) {
            return res.status(404).json('Can not find tag with id ' + tagId);
          }
    
          // Sequelize nous crée une methode dans une association ManyToMany
          await card.addTag(tag);
          // malheureusement, les associations de l'instance ne sont pas mises à jour
          // on doit donc refaire un select
          card = await Card.findByPk(cardId, {
            include: ['tags']
          });
          res.json(card);
    
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },

      removeTagFromCard: async (req, res) => {
        try {
          const { cardId, tagId } = req.params;
    
          let card = await Card.findByPk(cardId);
          if (!card) {
            return res.status(404).json('Can not find card with id ' + cardId);
          }
    
          let tag = await Tag.findByPk(tagId);
          if (!tag) {
            return res.status(404).json('Can not find tag with id ' + tagId);
          }
    
          await card.removeTag(tag);
          card = await Card.findByPk(cardId, {
            include: ['tags']
          });
          res.json(card);
    
        } catch (error) {
          console.trace(error);
          res.status(500).json(error);
        }
      }
}







module.exports = tagController;