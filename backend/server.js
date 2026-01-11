const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { ok } = require('assert');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ask', (req, res) => {
  res.status(200).json({ ok: true });
});
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
