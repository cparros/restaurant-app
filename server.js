const express = require('express')
const path = require('path')

const app = express()


const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = [
  {
  name: 'Clint Smith',
  Phone: 1231231231,
  Email: 'Clint Smith@aol.com',
  UniqueId: 12345
  },
  {
    name: 'John Johnson',
    Phone: 1231231231,
    Email: 'Jjohnson@aol.com',
    UniqueId: 12345123
  },
  
]



app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/home.html')));
app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, '/reservation.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, '/tables.html')));

app.get('/api/reservations', (req, res) => res.json(reservations));

app.post('/api/reservations', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
  console.log(newReservation);

  reservations.push(newReservation);
  res.json(newReservation);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))