const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// --------------------------------------------------
// SQLite Database Setup
// --------------------------------------------------
const db = new sqlite3.Database("./smak_and_tradition.db", (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log("Connected to the SQLite DB")
});

db.serialize(() => {
    db.run(`
       CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            message TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
       ) 
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerName TEXT,
            customerAddress TEXT,
            customerPhone TEXT,
            instructions TEXT,
            dish TEXT,
            quantity INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        ) 
    `);
});


//---------------------------------------------
// Middleware Setup
//---------------------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend')));


//------------------------------------------------
// API Endpoints
//------------------------------------------------

// Serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


// Contact Form Submission
app.post('/contact', (req, res) => {
    const {name, email, message} = req.body;
    const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
    db.run(query, [name, email, message], function(err){
        if(err) {
            return res.status(500).send('Error submitting contact request. Please try again.');
        }
        res.redirect('/contact-success.html');
    })

});

// Order Form Submission
app.post('/order', (req, res) => {
    const {customerName, customerPhone, customerAddress, instructions, quantity, dish} = req.body;
    const query = `INSERT INTO orders (customerName, customerPhone, customerAddress, instructions, quantity, dish) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [customerName, customerPhone, customerAddress, instructions, quantity, dish], function(err){
        if(err) {
            return res.status(500).send('Error submitting order request. Please try again.');
        }
        res.redirect('/order-success.html');
    })

});


//--------------------------------------
// Start the Server
//--------------------------------------
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server is running on - http://localhost:${PORT}`);
});
