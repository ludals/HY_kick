const express = require('express');
const app = express();
const PORT = 5000;
const db = require('./db'); // MySQL 연결 설정이 포함된 모듈

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/teams', (req, res) => {
    db.query('SELECT * FROM teams', (error, results, fields) => {
        if (error) {
            return res.status(500).send('Error occurred: ' + error.message);
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
