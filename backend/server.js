const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

//Json 형태로 오는 요청의 본문을 해석해줄 수 있도록 등록
app.use(bodyParser.json());

db.pool.query(
    "CREATE TABLE LISTS (" +
        "ID INTEGER AUTO_INCREMENT," +
        "VALUE TEXT," +
        "PRIMARY KEY (ID)" +
    ")", (err, results, fields) => {
        console.log("results", results);
    })

app.get('/api/selectValues', async (req, res) => {
    await db.pool.query("SELECT * FROM LISTS;", (err, results, fields) => {
        if(err) return res.status(500).send(err);
        else return res.json(results);
    })
})

app.post('/api/insertValue', async (req, res, next) => {
    await db.pool.query(`INSERT INTO LISTS (value) VALUES ("${req.body.value}")`, (err, results, fields) => {
        if(err) return res.status(500).send(err);
        else return res.json({
            success: true,
            value: req.body.value
        });
    })
})

app.listen(5000, async () => {
    await console.log('Server is Running');
})