const User = require('../models/User');
const UserProgress = require('../models/UserProgress');

User.schema.post('save', async function (doc) {
  try {
    const userProgress = new UserProgress({
      user: doc._id,
    });
    await userProgress.save();
    console.log('UserProgress document created:', userProgress);
  } catch (error) {
    console.error('Error creating UserProgress document:', error);
  };
});