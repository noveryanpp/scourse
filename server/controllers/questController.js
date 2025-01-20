import mongoose from "mongoose";
import Quest from "../models/Quest";

export const getQuests = async (req, res) => {
  try {
    const quests = await Quest.find({});
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestById = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    res.json(quest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuest = async (req, res) => {
  try {
    const quest = new Quest({
      ...req.body,
    });

    const newQuest = await quest.save();
    res.json(newQuest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuest = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json(quest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
