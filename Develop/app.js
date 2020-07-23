const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

inquirer.prompt(
    {
        type: "list",
        message: "What type of employee are you?",
        name: "role",
        choices: ["Team Manager", "Engineer", "Intern"]
    }
).then(function(response){
    switch(response.role){
        case "Team Manager": queryManager(); break;
        case "Engineer": queryEngineer(); break;
        case "Intern": queryIntern(); break;
        default: console.log("ERROR");
    }
});

async const queryManager = () => {
    try{
        const { name } = await inquirer.prompt({
            message: "What is the team manager's name?",
            name: "name"
        });
        const { email } = await inquirer.prompt({
            message: "What is the team manager's email?",
            name: "email"
        });
        const { id } = await inquirer.prompt({
            message: "What is the team manager's id number?",
            name: "id"
        });
        const {officeNumber } = await inquirer.prompt({
            message: "What is the team manager's office number?",
            name: "officeNumber"
        });
        return new Manager(name,email,id,officeNumber);
    } catch(err){
        console.log(err);
    }
}

async const queryEngineer = () => {
    try{
        const { name } = await inquirer.prompt({
            message: "What is this engineer's name?",
            name: "name"
        });
        const { email } = await inquirer.prompt({
            message: "What is this engineer's email?",
            name: "email"
        });
        const { id } = await inquirer.prompt({
            message: "What is this engineer's id number?",
            name: "id"
        });
        const {github } = await inquirer.prompt({
            message: "What is this engineer's github username?",
            name: "github"
        });
        return new Engineer(name,email,id,github);
    } catch(err){
        console.log(err);
    }
}

async const queryIntern = () => {
    try{
        const { name } = await inquirer.prompt({
            message: "What is this intern's name?",
            name: "name"
        });
        const { email } = await inquirer.prompt({
            message: "What is this intern's email?",
            name: "email"
        });
        const { id } = await inquirer.prompt({
            message: "What is this intern's id number?",
            name: "id"
        });
        const {school } = await inquirer.prompt({
            message: "What school did this intern go to?",
            name: "school"
        });
        return new Intern(name,email,id,school);
    } catch(err){
        console.log(err);
    }
}