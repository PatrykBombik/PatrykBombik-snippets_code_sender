const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/snippet-code-sender");

app.get('/', (req, res) => {
    const code = `Welcome to Snippet Code Sender!
    
Use the commands in the top right corner
to send code snippets to your friends!`;

    res.render('code-display', {code});
});

app.get('/new', (req, res) => {
    res.render("new");
});

app.post('/save', (req, res) => {
    const value = req.body.value;
    console.log(value)
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});