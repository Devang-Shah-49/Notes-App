const validator = require('validator'); //npm package
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');
// const { argv } = require('yargs');

//customise yargs version from 1.0.0(default at start)
yargs.version('1.1.0'); 

// create yargs add command
yargs.command({
    command: 'add', //name of cmd
    describe: 'Add a new note', //description of cmd
    builder:{ //options to set up cmd. the args which can be passed while running CLI cmd
        title:{ //option 1 - title
            describe: 'Note title', //description of arg
            demandOption: true, //is it compulsory to parse arg or not? true=compulsory
            type: 'string' //d-type of value to be passed 
        },
        body:{
            describe: 'Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
        // console.log('Title: ' + argv.title + '\nBody: ' + argv.body) //code to run(vvvv imp)
    }
})
//create yargs remove command
yargs.command({
    command: 'remove', //name of cmd
    describe: 'remove a note', //description of cmd
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title, argv.body);
        // console.log('removing a note') //code to run(vvvv imp)
    }
})
//create yargs list command
yargs.command({
    command: 'list', //name of cmd
    describe: 'list a note', //description of cmd
    handler() {
        console.log(notes.listNote());
        // console.log('listing a note') //code to run(vvvv imp)
    }
})
//create yargs read command //node app.js read
yargs.command({
    command: 'read', //name of cmd
    describe: 'read a note', //description of cmd
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Content',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('reading a note') //code to run(vvvv imp)
        notes.readNote(argv.title);
    }
})

/*console.log(validator.isEmail('dev1@gmail.com'));
console.log(validator.isURL('djacm.com'));
console.log(chalk.green.inverse.bold('Success!'));
console.log(chalk.bgRed.bold('Failure!'));*/

//working with command line arguments. arg vector
/*console.log(process.argv);*/ //array
/*const command = process.argv[2];
console.log(command);*/
// console.log(yargs.argv); //object

// imp to call and evoke yargs
yargs.parse(); //healthy alternative for yargs.argv on console
