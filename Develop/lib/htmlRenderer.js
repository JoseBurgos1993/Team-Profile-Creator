const path = require("path");
const fs = require("fs");
const { count } = require("console");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];
  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );

  // I had to change this because an annoying comma would appear on the outputed html page
  let counterArray = [310,0];
  const engList = employees
  .filter(employee => employee.getRole() === "Engineer")
  .map(engineer => renderEngineer(engineer,counterArray));

  const intList = employees
  .filter(employee => employee.getRole() === "Intern")
  .map(intern => renderIntern(intern,counterArray));

  for(let i = 0; i < engList.length; i++){
    html.push(engList[i]);
  }
  for(let i = 0; i < intList.length; i++){
    html.push(intList[i]);
  }
  /*
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );
  */
  console.log(html);
  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = (engineer,counterArray) => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  template = replacePlaceholders(template, "left", counterArray[0]);
  template = replacePlaceholders(template, "top", counterArray[1]);
  if(counterArray[0] == 620){
    counterArray[0] = 0;
    counterArray[1] += 400;
  } else{
    counterArray[0]+=310;
  }
  return template;
};

const renderIntern = (intern,counterArray) => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  template = replacePlaceholders(template, "left", counterArray[0]);
  template = replacePlaceholders(template, "top", counterArray[1]);
  if(counterArray[0] == 620){
    counterArray[0] = 0;
    counterArray[1] += 400;
  } else{
    counterArray[0]+=310;
  }
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
