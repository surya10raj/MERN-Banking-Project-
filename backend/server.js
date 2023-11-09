const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kutta4748:kutta4748@cluster0.4pp09v8.mongodb.net/MITBANK?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  balance: Number,
  isActive: Boolean,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Modify your registration route in server.js
app.post('/register', async (req, res) => {
  try {
    // Check if the user is registering as an admin
    const isAdmin = req.body.email === 'kowsick@gmail.com';

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      gender: req.body.gender,
      balance: req.body.balance,
      isActive: req.body.isActive,
      role: isAdmin ? 'admin' : 'user', // Set the role as admin or user
    });

    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/deposit', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid deposit amount' });
    }

    user.balance += amount;
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// server.js (continued)

app.post('/withdraw', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0 || amount > user.balance) {
      return res.status(400).json({ error: 'Invalid withdrawal amount' });
    }

    user.balance -= amount;
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
