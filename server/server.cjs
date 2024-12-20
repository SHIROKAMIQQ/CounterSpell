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
                    //console.log(add_subtask_res);
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
                        //console.log(add_subtask_res);
                    }
                });
            });
        }
    })
        
});

function parse_states(backlog, todo, inprogress, done, cancelled, onhold) {
    let ret = [];
    if (backlog == 'true') ret.push(0);
    if (todo == 'true') ret.push(1);
    if (inprogress == 'true') ret.push(2);
    if (done == 'true') ret.push(3);
    if (cancelled == 'true') ret.push(4)
    if (onhold == 'true') ret.push(5);
    
    if (ret.length != 0) {
        return ret;
    } else {
        return [0,1,2,3,4,5];
    }
}

function parse_priorities(none, low, medium, high, urgent) {
    let ret = [];
    if (none == 'true') ret.push(0);
    if (low == 'true') ret.push(1);
    if (medium == 'true') ret.push(2);
    if (high == 'true') ret.push(3);
    if (urgent == 'true') ret.push(4);

    if (ret.length != 0) {
        return ret;
    } else {
        return [0,1,2,3,4];
    }
}

app.get('/fetch_subtasks', (req, res) => {
    var fetch_subtasks_query = "SELECT subtask_id, subtask_name, ritual_name, subtask_state, subtask_priority, subtask_startdate, subtask_deadline FROM subtasks_table WHERE subtask_name LIKE ? AND subtask_state IN (?) AND subtask_priority IN (?)";
    let states = parse_states(req.query.backlog_checked, req.query.todo_checked, req.query.inprogress_checked, req.query.done_checked, req.query.cancelled_checked, req.query.onhold_checked);
    let priorities = parse_priorities(req.query.none_checked, req.query.low_checked, req.query.medium_checked, req.query.high_checked, req.query.urgent_checked);
    let wildcards = ["%"+req.query.searchInput+"%", states, priorities];
    db.query(fetch_subtasks_query, wildcards, (fetch_err, fetch_res) => {
        if (fetch_err) {
            console.log("Error fetching subtasks " + fetch_err);
            return res.json({message: "Error fetching subtasks"});
        }
        //console.log(fetch_res);
        return res.json(fetch_res);
    });
});



app.get('/fetch_singlesubtask', (req, res) => {
    const fetch_subtask_query = "SELECT subtask_name, ritual_name, subtask_state, subtask_priority, subtask_startdate, subtask_deadline FROM subtasks_table WHERE subtask_id = ? LIMIT 1"
    db.query(fetch_subtask_query, [req.query.subtask_id], (fetch_err, fetch_res) => {
        if (fetch_err) {
            console.log("Error fetching subtasks " + fetch_err);
            return res.json({message: "Error fetching single subtask"});
        }
        console.log("SINGLE FETCH" + req.query.subtask_id);
        return res.json(fetch_res);
    });
});

app.put('/edit_subtask', (req, res) => {
    const update_subtask_query = "UPDATE subtasks_table SET `subtask_name` = ?, `ritual_name` = ?, `subtask_state` = ?, `subtask_priority` = ?, `subtask_startdate` = ?, `subtask_deadline` = ? WHERE subtask_id = ? LIMIT 1";
    const values = [req.body[0].subtask_name, req.body[0].ritual_name, req.body[0].subtask_state, req.body[0].subtask_priority, req.body[0].subtask_startdate, req.body[0].subtask_deadline, req.query.subtask_id];
    db.query(update_subtask_query, values, (update_err, update_res) => {
        if (update_err) {
            console.log("Error updating subtask " + update_err);
            return res.json({message: "Error updating subtask"});
        }
        console.log("UPDATE " + req.query.subtask_id);
        return res.json(update_res);
    })
});

app.delete('/delete_subtask', (req, res) => {
    const delete_subtask_query = "DELETE FROM subtasks_table WHERE subtask_id = ? LIMIT 1";
    db.query(delete_subtask_query, [req.query.subtask_id], (delete_err, delete_res) => {
        if (delete_err) {
            console.log("Error deleting subtask " + delete_err);
            return res.json({message: "Error deleting subtask"});
        }
        console.log("DELETE " + req.query.subtask_id);
        return res.json(delete_res);
    });
});

app.listen(port, ()=>{
    console.log('listening')
})