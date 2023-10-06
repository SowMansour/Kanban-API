const { List, Card, Tag } = require('../models/index');

const mainController = {

    homePage: (req, res) => {
        res.json('Hello');
    },

    getLists: async (req, res) => {
        try {
            //retrieve all lists
            const lists = await List.findAll({
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [
                    ['position', 'ASC'],
                    ['cards', 'position', 'ASC'],
                ]
            });
            //render data to the front (here insomnia)
            res.status(200).json(lists);

            //Handling Error
        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    getOneList: async (req, res) => {
        //retrieve Id
        const listId = Number(req.params.id);
        try {
            const list = await List.findByPk(listId, {
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [
                    ['cards', 'position', 'ASC'],
                ]
            });

            if (!list) {
                res.status(400).json(`Ressource not found`);
                return
            };

            //render the front
            res.status(200).json(list);

        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    },

    createList: async (req, res) => {
        try {
        //retieve data
        const {name, position} = req.body;
        
        if(!name){
            return res.status(400).json('Wrong column name')
        }
        // Create lists
        const newList =  List.build({
            name,
            position
        })

        await newList.save();
        //render to the front
        res.status(201).json(newList);

        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }

    },

    modifyList: async (req, res) => {
        //retrieve Id
        const listId = Number(req.params.id);
        const {name, position} = req.body;

        try {
            //Checking first the ID
            const list = await List.findByPk(listId);
            if(!list){
                return res.status(400).json('Ressource not found');
            }
            //Then modify properties concerned
            if(name){
                list.name = name
            }
            if(position){
                list.position = position
            }
            await list.save();
            //Render to insomnia
            res.json(list);
            
        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }

    },

    createOrModify: async (req, res) => {
        try {
          let list;
          if (req.params.id) {
            list = await List.findByPk(req.params.id);
          }
          if (list) {
            await mainController.modifyList(req, res);
          } else {
            await mainController.createList(req, res);
          }
        } catch (error) {
          console.trace(error);
          res.status(500).json(error.toString());
        }
    },

    removeList: async (req, res) => {
        //retrieve Id
        const listId = Number(req.params.id);

        try {
            const list = await List.findByPk(listId);
            if(!list){
                return res.status(400).json('Ressource not found');
            }
            await list.destroy();
            res.json('List is succesfully remove');

        } catch (e) {
            console.trace(e)
            res.status(500).json('Server Error');
        }
    }
}
module.exports = mainController;