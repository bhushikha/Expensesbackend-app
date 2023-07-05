const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const expenseController = require('./controllers/expenseController');

// const expenseRoutes = require('./routes/expenseRoutes');
// app.use('/expenses', expenseRoutes);

const db = require('./util/database');

db.query('SELECT 1 + 1', (err, result) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware for parsing JSON data
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Expense routes
app.get('/expenses', expenseController.getExpenses);
app.post('/expenses', expenseController.createExpense);
app.delete('/expenses/:id', expenseController.deleteExpense);

// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
