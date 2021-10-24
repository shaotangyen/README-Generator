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
            name: 'description',
            message: 'Where is your project description?',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please enter your project installation instructions:',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please enter your project usage information:',
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Please enter your project contribution guidelines:',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please enter your project test instructions:',
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: 'What\'s your github username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Where is your email?',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please choose a license for your project?',
            choices: ['Apache', 'BSD', 'GNU', 'MIT'],
            default: "MIT",
        }
    ]);
}

const getLicenseBadgeText = (license) => {
    if (license == "Apache") {
        return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    } else if (license == "BSD") {
        return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
    } else if (license == "GNU") {
        return '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
    } else if (license == "MIT") {
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    }
}

const getLicenseText = (license, githubUsername) => {
    const thisYear = new Date().getFullYear();
    if (license == "Apache") {
        return `Copyright ${thisYear} ${githubUsername}

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
     
  http://www.apache.org/licenses/LICENSE-2.0
     
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`;

    } else if (license == "BSD") {
        return `Copyright ${thisYear} ${githubUsername}

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;
    } else if (license == "GNU") {
        return `Copyright ${thisYear} ${githubUsername}

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.`;
    } else if (license == "MIT") {
        return `Copyright ${thisYear} ${githubUsername}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
    }
}

const generateHTML = function (answers) {
    var badgeText = getLicenseBadgeText(answers.license);
    var licenseText = getLicenseText(answers.license, answers.githubUsername);
    var readmeText = `${badgeText}

# ${answers.title}

${answers.description}

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributin](#contributing)
4. [Tests](#tests)
5. [Questions](#questions)
6. [License](#license)

<a name="installation"></a>

## Installation

${answers.installation}

<a name="usage"></a>

## Usage

${answers.usage}

<a name="contributing"></a>

## Contributing

${answers.contributing}

<a name="tests"></a>

## Tests

${answers.tests}

<a name="questions"></a>

## Questions

Please visit the Github page for additional info: [@${answers.githubUsername}](https://github.com/${answers.githubUsername})

If you have any additional questions, please reach me at: [${answers.email}](mailto:${answers.email})

<a name="license"></a>

## License

\`\`\`md
${licenseText}
\`\`\``;
    
    return readmeText;
}

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}

// TODO: Create a function to initialize app
function init() {
    console.log(`This is a README.md file generator. Please enter the information required below to generate the file.

Syntax Instruction:
- Use <br> at the end of a line to break a new line
- Use [Display Text](https://URL) to insert an external link
- Use **Display Text** to display a bold text
- Use *Display Text* to display a italicized text
- Use **Dis_play_ Text** to display bold and nested italic text
- Use ***Display Text*** to display all bold and italic text
`);
    
    promptUser()
        .then((answers) => writeFileAsync('README.md', generateHTML(answers)))
        .then(() => console.log("README.md is created."))
        .catch((err) => console.error(err));
}

// Function call to initialize app
init();
