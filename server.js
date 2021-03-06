const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));
app.use(express.static('images'));
// app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controllers/burgersController');

app.use(routes);

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);
