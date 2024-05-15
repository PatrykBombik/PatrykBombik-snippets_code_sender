const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.render('code-display', { code });
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});