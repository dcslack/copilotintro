// Create web server and listen on port 3000
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// Set up the path to static files
app.use(express.static('public'));
// Set up the path to json files
app.use(express.json());

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.send(JSON.parse(data));
    });
});

// Add a new comment
app.post('/comments', (req, res) => {
    if (!req.body.comment) {
        return res.status(400).send('Bad request');
    }
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        const comments = JSON.parse(data);
        comments.push(req.body.comment);
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Server error');
            }
            res.status(201).send('Comment added');
        });
    });
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        const comments = JSON.parse(data);
        const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).send('Comment not found');
        }
        comments.splice(index, 1);
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Server error');
            }
            res.status(200).send('Comment deleted');
        });
    });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    if