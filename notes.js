const fs = require('fs')
const chalk = require('chalk')

// Create note
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.greenBright.inverse('New note added!'))
    } else {
        console.log(chalk.redBright.inverse('Note title taken!'))
    }
}

// Remove note
const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase())

    if (newNotes.length !== notes.length) {
        saveNotes(newNotes)
        console.log(chalk.greenBright.inverse('Note removed!'))
    } else {
        console.log(chalk.redBright.inverse('No note with that title'))
    }
}

// Read note
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title.toLowerCase() === title.toLowerCase())

    if (note) {
        console.log(chalk.blueBright.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.redBright.inverse('No note found'))
    }
}

// List notes
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blueBright.inverse('All notes'))
    notes.forEach(note => console.log(chalk.blue(note.title)))
}

// Save notes
const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

// Load notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}