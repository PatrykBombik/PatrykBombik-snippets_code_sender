const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const Document = require('./models/Document');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/snippet-code-sender");

app.get('/', (req, res) => {
    const code = `Welcome to Snippet Code Sender!
    
Use the commands in the top right corner
to send code snippets to your friends!`;

    res.render('code-display', {code, language: "plaintext"});
});

app.get('/new', (req, res) => {
    res.render("new");
});

app.post('/save', async (req, res) => {
    const value = req.body.value;
    try {
        const document = await Document.create({ value });
        res.redirect(`/${document.id}`)
    } catch (err) {
        res.render('new', {value})
    }
});

app.get('/:id/duplicate', async (req, res) => {
  const id = req.params.id;
  try {
        const document = await Document.findById(id);
        res.render('new', { value: document.value });
  } catch (err) {
      res.redirect(`/${id}`);
  }
})

app.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
         const document = await Document.findById(id);

         res.render('code-display', { code: document.value, id });
   } catch (err) {
       res.redirect('/');
   }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});