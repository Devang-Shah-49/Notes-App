const fs = require('fs') //npm packages
const chalk = require('chalk')

const getNotes = () => {
    return '*******Your Notes********'
}

//func to load current notes.json file contents
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json') //reading a file genrates buffer numerical values(machine readable)
        const dataJSON = dataBuffer.toString(); //buffer toString(human readable strings)
        return JSON.parse(dataJSON) //parsing to convert it to objcet so as to access it properties and use it
    } catch (e) {
        return []
        //console.log(e.message) gives the reason for error
    }
    // try-catch : used for unforeseeable error handling.
    // The try statement allows you to define a block of code to be tested for errors while it is being executed.
    // The catch statement allows you to define a block of code to be executed, if an error occurs in the try block.
}

//func to write notes to notes.json file after converting JS value to JSON string
const saveNotes = (notes) => {
    const dataToWrite = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataToWrite)
}

const addNote = (title, body) => {
    const notes = loadNotes();
    //if we find a note with same title n body, we dont need to add it again 
    const duplicateNotes = notes.filter ((note) => ((note.title === title) && (note.body === body)))
    
    // const duplicateNotes = notes.filter (function (note){ //filter helps to traverse notes one-by-one
    //     if ((note.title === title) && (note.body === body)){
    //         return true
    //     } else {
    //         return false
    //     }
    // })

    // if entered note is not a duplicate add it else print error message
    if (duplicateNotes.length === 0){
        notes.push({ //pushes new values to cuurent notes object i.e. append
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log('Unable to add note. Identical note already exists!')
    }
}

const removeNote = (title, body) => {
    const notes = loadNotes();
    //use filter to traverse each note then remove the one that matches
    const notesToKeep = notes.filter (function (note){
        if ((note.title === title) && (note.body === body)){
            // console.log('Note removed')
            return false
        } else {
            // console.log('No such note exists!')
            return true
        }
    })
    // if initial notes length is greater than length after calling remove func. it means note is removed. else not
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'))
    } else {
        console.log(chalk.red.inverse('No such note found'))
    }
    saveNotes(notesToKeep)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}