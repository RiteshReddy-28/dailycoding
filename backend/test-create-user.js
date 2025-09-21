require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
  try {
  await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for test');
    const user = new User({ name: 'Script Test', email: 'scripttest1@dailycoding.com', password: 'password123' });
    await user.save();
    console.log('User saved:', user._id.toString());
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error saving user:', err.stack || err.message);
    if (err.errors) console.error('Validation errors:', err.errors);
    await mongoose.disconnect();
    process.exit(1);
  }
})();
