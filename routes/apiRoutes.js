// import required modules

const api = require('express').Router();
const fs = require('fs/promises');
const uniqid = require('uniqid');

// async function that reads data from the db.json file

async function readData() {
    var data = await fs.readFile("./db/db.json", "utf-8")
    return JSON.parse(data)
}

// GET route that reads the db.json file and returns all saved notes as JSON

api.get('/notes', async (req, res) => {
    res.json(await readData())
});

// POST route that receives a new note to save on the request body, adds it to the db.json file, and returns the new note to the client

api.post('/notes', async (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        var notes = await readData()
        notes.push(newNote)
        await fs.writeFile("./db/db.json", JSON.stringify(notes))
        res.json({ message: "Wrote your note!" })
    }
    else {
        res.status(400).json({ message: "note not taken" })
    }
});

// DELETE route that reads notes from db.json file, filters out notes with specified ID, writes updated notes back to the file

api.delete('/notes/:id', async (req, res) => {
    var currentNotes = await readData()
    var newNotes = currentNotes.filter(notes => notes.id != req.params.id)
    await fs.writeFile("./db/db.json", JSON.stringify(newNotes))
    res.status(200).json({ message: "notes successfully deleted" })
});

// exports fb

module.exports = api;
