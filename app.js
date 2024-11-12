const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up a static folder for CSS, JS, and images
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('pages/game');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


