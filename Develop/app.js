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

async function queryManager(){
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
        return new Manager(name,id,email,officeNumber);
    } catch(err){
        console.log(err);
    }
}

async function queryEngineer(){
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
        return new Engineer(name,id,email,github);
    } catch(err){
        console.log(err);
    }
}

async function queryIntern(){
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
        return new Intern(name,id,email,school);
    } catch(err){
        console.log(err);
    }
}

async function init(){
    var employees = [];
    console.log("Thank you for using Team Creator. To create mini profiles for each team member, please answer the following questions.");
    //employees.push(queryManager());
    const manager = await queryManager();
    employees.push(manager);
    try{
        let good = false;
        let value = 0;
        while(!good){
            const { engCount } = await inquirer.prompt({
                message: "How many engineers are in part of this team?",
                name: "engCount"
            });
            if(Number.isInteger(Number(engCount)) && Number(engCount) >= 0){
                value = parseInt(engCount);
                good = true;
            } else{
                console.log("Input must be an integer that is at least equal to 0 (zero).")
            }
        }
        for(let i = 0; i < value; i++){
            const obj = await queryEngineer();
            employees.push(obj);
            if(value - 1 != i){
                console.log("Next person: ");
            }
        }
        good = false;
        value = 0;
        while(!good){
            const { intCount } = await inquirer.prompt({
                message: "How many interns are in part of this team?",
                name: "intCount"
            });
            if(Number.isInteger(Number(intCount)) && Number(intCount) >= 0){
                value = parseInt(intCount);
                good = true;
            } else{
                console.log("Input must be an integer that is at least equal to 0 (zero).")
            }
        }
        for(let i = 0; i < value; i++){
            const obj = await queryIntern();
            employees.push(obj);
            if(value - 1 != i){
                console.log("Next person: ");
            }
        }
        console.log("-------------------");
        console.log(employees);
        console.log("-------------------");



    } catch(err){
        console.log(err);
    }
}
init();
