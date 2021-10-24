// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is your project title?',
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Where is your project description?',
        }
    ]);
}

const generateHTML = (answers) =>
`<img alt="GitHub License" src="https://img.shields.io/apm/l/vim-mode">

# ${answers.title}

${answers.desc}

Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributin](#contributing)
4. [Tests](#tests)
5. [Questions](#questions)
6. [License](#license)

<a name="installation"></a>

## Installation

Installation description

<a name="usage"></a>

## Usage

Usage description

<a name="license"></a>

<a name="contributing"></a>

## Contributing

Contributing description

<a name="tests"></a>

## Tests

Tests description

<a name="questions"></a>

## Questions

Github Link: [Github username](https://github.com/shaotangyen)

Enter an instruction on how to reach me with additional questions. Email address: [abc@example.com](mailto:abc@example.com)

## License

License description`;

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}

// TODO: Create a function to initialize app
function init() {
    promptUser()
        .then((answers) => writeFileAsync('README_FILE.md', generateHTML(answers)))
        .then(() => console.log("README_FILE.md is created."))
        .catch((err) => console.error(err));
}

// Function call to initialize app
init();
