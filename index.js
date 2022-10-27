//Establishes that this JS only works with the 'inquirer' package.
const inquirer = require("inquirer");
//Also needs this little doohickey for the generator to create the actual file.
const fs = require('fs');

//The Inquirer plugin accepts an array as a prompt() to even ask questions to begin with.
const questions = [
    {
        type: "input",
        message: "Welcome to the README generator! Because typing stuff up manually takes forever. \n\n What would you like to title this project?\n",
        name: "title"
    },
    {
        type: "input",
        message: "Interesting title. Next, give a brief description of your project. What does it do?\nIf you wish to add a new line, just type in <br/> in place of pressing enter.\n",
        name: "description"
    },
    {
        type: "input",
        message: "I see, I see. How does one install this program? In terms that an average joe would perhaps understand...\n",
        name: "installation"
    },
    {
        type: "input",
        message: "Right, that's installation out of the way. How do you actually USE this program?\n",
        name: "usage"
    },
    {
        type: "input",
        message: "Intriguing! So how can someone contribute to this project to make it better, if they want to?\n",
        name: "contributing"
    },
    {
        type: "input",
        message: "No program is without its bugs. What sort of tests would you suggest implementing?\n",
        name: "tests"
    },//note to self: there's too many licenses to feasably implement, so a small selection will do for now.
    { //Might come back to this later to make it more... proper in the future.
        type: "list",
        message: "Alright, now for the boring legal bit: pick a preferred license you'd like to use for this project! Why are there so many to choose from, I have no clue...",
        choices: [
            "Apache 2.0",
            "Boost",
            "BSD 3-Clause License",
            "Eclipse",
            "GNU GPL v3",
            "MIT"
        ],
        name: "license"
    },
    {
        type: "input",
        message: "Got a github Username? Enter it exactly right here! It'll also stuff a link to the github profile right here.\n",
        name: "github"
    },
    {
        type: "input",
        message: "Almost done! Last but not least... what is your email address, so interested parties can ask you additional questions?\n",
        name: "email"
    }

];

//Writes the contents of the finished README into the file itself, spitting it out into the same directory as the program.
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
    err ? console.error(`Oh dear, something broke: ${err}`) : console.log('All done! Go ahead and toss the generated .md file into your repo and do as you will with it.')
    );
}

//The whole function that makes the entire thing tick. Prompts questions first, before placing it all inside a template to be processed.
function init() {
    inquirer.prompt(questions)
    .then(response => {
        //Creates a license image based on the chosen license, ready to place around the top of the readme.
        let license = "";
        switch(response.license){
            case "Apache 2.0":
                license = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
                break;
            case "Boost":
                license = `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
                break;
            case "BSD 3-Clause License":
                license = `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
                break;
            case "Eclipse":
                license = `[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`
                break;
            case "GNU GPL v3":
                license = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
                break;
            case "MIT":
                license = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
        }

        const contents = 
`# ${license} ${response.title}

## Description:

${response.description}

## Table of Contents:

- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation:

${response.installation}

## Usage:

${response.usage}

## Contributions:

${response.contributing}

## Tests:

${response.tests}

## License:

This application is covered under the following license: ${response.license}

## Questions:

Link to my Github profile: https://github.com/${response.github}

My email address: ${response.email}
`
        writeToFile("README.md", contents)
    })
}

// Function call to initialize app
init();
