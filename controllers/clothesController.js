const Clothes = require('../models/Clothes');
const logger = require('../utils/logger');

const addClothes = async (req, res) => {
    try {
        const { name, material, price, discount } = req.body;
        const newClothes = await Clothes.create({ name, material, price, discount });

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.status(201).json({ clothes: newClothes });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getClothes = async (req, res) => {
    try {
        const { id } = req.params;
        const clothes = await Clothes.findById(id);

        if (!clothes) {
            return res.status(404).json({ message: 'Clothes not found' });
        }

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.json({ clothes });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteClothes = async (req, res) => {
    try {
        const { id } = req.params;
        const clothes = await Clothes.deleteOne({_id: id});

        if (!clothes) {
            return res.status(404).json({ message: 'Clothes not found' });
        }

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.json({ clothes });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteAllClothes = async (req, res) => {
    try {
        const clothes = await Clothes.deleteMany();

        if (!clothes) {
            return res.status(404).json({ message: 'Clothes not found' });
        }

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.json({ clothes });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const editClothes = async (req, res) => {
    try {
        const { id } = req.params;

        const clothes = await Clothes.findOneAndUpdate({_id: id}, req.body, {new: true});

        if (!clothes) {
            return res.status(404).json({ message: 'Clothes not found' });
        }

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.json({ clothes });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getFinalPriceClothes = async (req, res) => {
    try {
        const { id } = req.params;

        const clothes = await Clothes.findOne({_id: id});

        if (!clothes) {
            return res.status(404).json({ message: 'Clothes not found' });
        }

        const final_price = clothes.price - (clothes.price * (clothes.discount / 100));

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.json({ final_price:  final_price});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = {
    addClothes,
    getClothes,
    deleteClothes,
    deleteAllClothes,
    editClothes,
    getFinalPriceClothes
};
