const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [
  {
    id: 1,
    title: 'Examen de mathématiques',
    date: '2025-06-30',
    duration: 120
  },
  {
    id: 2,
    title: 'Examen de physique',
    date: '2025-07-02',
    duration: 90
  }
];

app.get('/api/exams', (req, res) => {
  res.json(items);
});

app.post('/api/exams', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});