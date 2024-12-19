const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "witch_db"
});

app.post('/add_subtask', (req, res) => {
    // Check if ritual already exists. If not, create the ritual first
    const ritual_exists_query = 'SELECT ritual_id FROM rituals_table WHERE ritual_name = ?';
    var ritual_id;
    db.query(ritual_exists_query, [req.body.ritual_name], (search_err, search_res) => {
        if (search_err) return res.json({message: "Error searching for ritual: " + search_err});
        if (search_res != false) {
            ritual_id = search_res[0].ritual_id;
            console.log("T"+ritual_id);
            console.log("A"+ritual_id);
            const add_subtask_query = "INSERT INTO subtasks_table (`ritual_id`, `ritual_name`, `subtask_name`, `subtask_state`, `subtask_priority`, `subtask_startdate`, `subtask_deadline`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const values = [ritual_id, req.body.ritual_name, req.body.subtask_name, req.body.subtask_state, req.body.subtask_priority, req.body.subtask_startdate, req.body.subtask_deadline];
            db.query(add_subtask_query, values, (add_subtask_err, add_subtask_res) => {
                if (add_subtask_err) {
                    console.log(add_subtask_err);
                } else {
                    console.log(add_subtask_res);
                }
            });
        } else {
            const add_ritual_query = 'INSERT INTO rituals_table (ritual_name) VALUES (?)';
            db.query(add_ritual_query, [req.body.ritual_name], (add_ritual_err, add_ritual_res) => {
                if (add_ritual_err) return res.json({message: "Error adding ritual: " + add_ritual_error});
                ritual_id = add_ritual_res.insertId;
                console.log("N"+ritual_id);
                console.log("A"+ritual_id);
                const add_subtask_query = "INSERT INTO subtasks_table (`ritual_id`, `ritual_name`, `subtask_name`, `subtask_state`, `subtask_priority`, `subtask_startdate`, `subtask_deadline`) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const values = [ritual_id, req.body.ritual_name, req.body.subtask_name, req.body.subtask_state, req.body.subtask_priority, req.body.subtask_startdate, req.body.subtask_deadline];
                db.query(add_subtask_query, values, (add_subtask_err, add_subtask_res) => {
                    if (add_subtask_err) {
                        console.log(add_subtask_err);
                    } else {
                        console.log(add_subtask_res);
                    }
                });
            });
        }
    })
        
});


app.listen(port, ()=>{
    console.log('listening')
})