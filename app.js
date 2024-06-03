#! /usr/bin/env node 
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.bold.green("************ Welcome to Adventure Game *********"));
const intro = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Enter your name:"
    }
]);
class Room {
    description;
    options;
    constructor(description, options) {
        this.description = description;
        this.options = options;
    }
    async enter() {
        console.log(this.description);
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: Object.keys(this.options)
            }
        ]);
        return this.options[answers.action];
    }
}
class Game {
    rooms;
    currentRoom;
    constructor() {
        this.rooms = {};
        this.currentRoom = 'start';
    }
    addRoom(name, room) {
        this.rooms[name] = room;
    }
    async play() {
        while (this.currentRoom !== 'end') {
            const room = this.rooms[this.currentRoom];
            if (!room) {
                console.log('Game over!');
                break;
            }
            this.currentRoom = await room.enter();
        }
        console.log(chalk.bold.blue('Congratulations, you have completed the adventure!'));
    }
}
const game = new Game();
game.addRoom('start', new Room('You are in a dark room. There is a door to the north.', {
    'Go north': 'northRoom',
    'Stay here': 'start'
}));
game.addRoom('northRoom', new Room('You have entered a bright room. There is a treasure chest here.', {
    'Open the chest': 'treasureRoom',
    'Go back south': 'start'
}));
game.addRoom('treasureRoom', new Room('You have found the treasure! You win!', {
    'End game': 'end'
}));
game.play().catch(error => console.error(error));
