import mongoose from 'mongoose';
import Item from '../models/Item.js';

export const getItems = async (req, res) => {
    try {
      const items = await Item.find({})
        .select("-attribute")
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
      const items = await Item.findById(req.params.id)
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const createItem = async (req, res) => {
    try {
        const item = new Item({
            ...req.body,
          });
        const newItem = await item.save();
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateItem = async (req, res) => {
    try{
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
  
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    
        res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
    
        if (!item) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        await item.deleteOne();
        res.json({ message: "Item removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}