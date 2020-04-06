This project partially simulates the game Tetris

An input text file containing shapes and 'x' cooridinates is read in and the output is a text file listing the final row height of blocks corresponding to each input row.

Pre-run steps:
	Ensure that Node that installed. Can be downloaded here: https://nodejs.org/en/
	After installation, ensure that both node and npm are installed by running "node -v" and "npm -v", respectively; in the console window
	Navigate to the root directory of this project
	Run the following command: npm install -- this will ensure that mocha is installed

Testing:
	To test, simply run the following comamnd (after mocha has been installed): "npx mocha app.test.js"
	Outputs will be displayed to the console

Running the app:
	To run the app, simply run the following command: "node tetris <inputfile>.txt <outputfile>.txt
	Ensure that both the input and output files are provided as parameters with .txt extensions


Further enchanements
	The file IO's would be async. Would need additional test frameworks such as chai...
