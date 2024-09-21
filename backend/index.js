const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // Default to 3001 if PORT is not defined


const API_KEY = process.env.HUGGING_FACE;
const MODEL_NAME = 'facebook/bart-large-cnn'; // Replace with your desired model

app.use(cors({
    origin: "https://system-atrium.vercel.app",
    methods: ['POST'],
    credentials: true,
}));

app.use(express.json());
// Define Mongoose schemas and models (make sure you have the required schema files)
const Users = require('./models/Users'); // Path to your Users model
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send('Failed to fetch users');
  }
});

app.post('/api/summarize', async (req, res) => {
  const { conversation } = req.body;
  const messages = conversation.map(msg => msg.content).join(' ');

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
      { inputs: messages },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const summary = response.data[0].summary_text.trim();
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing conversation:', error.message);
    res.status(500).send('Failed to summarize the conversation');
  }
});
app.post('/api/users/:name/send-message', async (req, res) => {
  const { name } = req.params;
  const { message } = req.body;
  const user = await Users.findOne({ 'inbox.name': name });

  if (!user) {
    return res.status(404).send('User not found');
  }

  const inbox = user.inbox;
  const selectedIndex = inbox.findIndex((conversation) => conversation.name === name);
  if (selectedIndex !== -1) {
    const conversation = inbox[selectedIndex].conversation || [];
    console.log("conversatuion",conversation);

    conversation.push({ type: 'sent', content: message });

    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
        { inputs: message },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const reply = response.data[0].summary_text.trim();
      conversation.push({ type: 'received', content: reply });

      inbox[selectedIndex].conversation = conversation;
      await user.save();

      res.json({ reply }); // Send the reply back to the client
    } catch (error) {
      console.error('Error sending message:', error.message);
      res.status(500).send('Failed to send message');
    }
  } else {
    res.status(404).send('Conversation not found');
  }
});

app.get('/',(req,res)=>{
    res.status(200).send("hello from server");
})
// Start server
app.listen(port, () => console.log(`Server running on port ${PORT}`));