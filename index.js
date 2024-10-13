const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const path = require('path');
const exp = require('constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// combine html file
app.use(express.static(path.join(__dirname, 'public')));

// create db connection
const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'url_shortener_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    }
    else {
        console.log('Connected to MySQL database.');
    }
});


app.post('/shorten', (req, res) => {
    const { original_url } = req.body;
    if (!original_url) {
        return res.status(400).send("Original URL is Required");
    }

    const short_code = shortid.generate();
    const query = "INSERT INTO urls (short_code,original_url) VALUES (?,?)";
    db.query(query, [short_code, original_url], (err, result) => {
        if (err) {
            console.log("Error inserting into database: ", err);
            return res.status(400).send("Internal Server Error");
        }
        res.send({
            original_url: original_url,
            short_code: short_code,
            short_url: `http://localhost:3000/${short_code}`
        });
    });
});

// to handle redirect
app.get('/:short_code', (req, res) => {
    const { short_code } = req.params;

    const query = "SELECT original_url from urls WHERE short_code=?";
    db.query(query, [short_code], (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length > 0) {
            const original_url = results[0].original_url;
            return res.redirect(original_url);
        } else {
            return res.status(400).send('URL not found');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
