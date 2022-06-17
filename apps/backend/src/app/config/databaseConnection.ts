import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/safalzaTask', () => {
  console.log('Connected to MongoDB successfully! 🎉  ');
});
