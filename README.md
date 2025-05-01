Melsql - A MySQL Command Line Interface Tool
Melsql is a simple, interactive MySQL command-line interface (CLI) tool built with Node.js. It allows you to manage your MySQL databases and tables with ease through a series of commands. The tool offers a user-friendly experience with features like querying data, switching databases, and managing records.

Features
Show Databases: List all databases in your MySQL instance.

Show Tables: List all tables in the currently selected database.

Query Data: Select and view data from a specified table and column.

Delete Data: Delete records from a table based on an ID.

Interactive Mode: Easy-to-use interface for selecting databases, tables, and columns.

Console Commands: A variety of console commands to interact with the tool.

Installation
Prerequisites
Before using Melsql, make sure you have the following installed:

Node.js (v12 or higher)

MySQL database server

Required dependencies listed in package.json

Setup
Clone this repository to your local machine:

bash
Copier
Modifier
git clone https://github.com/yourusername/melsql.git
cd melsql
Install dependencies:

bash
Copier
Modifier
npm install
Configure the MySQL connection:

Modify the connection settings in the DatabaseManager class to match your MySQL setup (host, username, password).

Run the tool:

bash
Copier
Modifier
node index.js
Usage
Commands
Here are some of the available commands you can use in the Melsql prompt:

Start Request Interaction: Initiates an interactive mode for querying and deleting records.

bash
Copier
Modifier
melsql -start
Show All Available Commands: Displays a list of available commands.

bash
Copier
Modifier
melsql -cmd
Exit the Tool: Exits the Melsql prompt.

bash
Copier
Modifier
melsql -exit
Clear Console Output: Clears the console screen.

bash
Copier
Modifier
melsql -clear
Show All Databases: Lists all databases in the MySQL instance.

bash
Copier
Modifier
melsql -r -database
Show Tables in Current Database: Lists all tables in the currently selected database.

bash
Copier
Modifier
melsql -r -tables
Switch to Another Database: Switch to another database.

bash
Copier
Modifier
melsql -use <database_name>
Read Column from Table: Retrieve data from a specific column in a table. You can also limit the number of rows returned.

bash
Copier
Modifier
melsql -r -<column_name> [-l -<limit>]
Example Commands
Show all databases:

bash
Copier
Modifier
melsql -r -database
Show all tables in the current database:

bash
Copier
Modifier
melsql -r -tables
Select a column from a table:

bash
Copier
Modifier
melsql -r -email
Delete a row from a table based on ID:

bash
Copier
Modifier
melsql -r -delete
How It Works
Connecting to MySQL: When you start the tool, it connects to the MySQL server using the credentials provided in the DatabaseManager class.

Command Handling: The tool listens for commands entered in the terminal, processes them, and runs SQL queries based on those commands.

Query Execution: For each query, the tool uses the MySQL Node.js client (mysql2/promise) to execute the SQL commands asynchronously.

Interactive Mode: When using commands like melsql -start, the tool will prompt the user to select a database, table, and column, and it will then execute the corresponding query.

Example of Running the Tool
After running node index.js, the following interaction might occur:

pgsql
Copier
Modifier
PS C:\Melsql [()]> melsql -r -database
+----------------------------+
| Database                   |
+----------------------------+
| information_schema         |
| mysql                      |
| performance_schema         |
| sys                        |
+----------------------------+
In this case, the tool has listed all available databases.

Acknowledgments
Node.js for building the backend.

Inquirer.js for the interactive CLI prompts.

Mysql2 for database connectivity.

Figlet for creating the ASCII welcome message.

Gradient-String for adding color gradients to the terminal output.

Nanospinner for spinner animations during query execution.

Happy querying! 🚀
