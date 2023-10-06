const { Tag } = require('../models/index');


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
    }
}







module.exports = tagController;