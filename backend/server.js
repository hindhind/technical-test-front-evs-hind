const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [
  {
    id: 1,
    candidateName: 'Franziska.S',
    location: 'Martigues-B',
    date: '2025-06-16',
    time: '14:00',
    status: 'confirmed'
  },
  {
    id: 2,
    candidateName: 'Lucas.R',
    location: 'Martigues-B',
    date: '2025-06-21',
    time: '17:00',
    status: 'to organize'
  },
  {
    id: 3,
    candidateName: 'Léo.C',
    location: 'Martigues-B',
    date: '2025-05-26',
    time: '13:30',
    status: 'cancelled'
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