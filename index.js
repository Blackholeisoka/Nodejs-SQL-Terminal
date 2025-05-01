// Global import
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import mysql from 'mysql2/promise';

let DatabaseNameUse = 'mysql';

// POO Database request / information
class DatabaseManager {
    
    constructor(table) {
        this.connection = null;
        this.databaseSelected = null;
        this.table = table;
    }

    async connect(database = DatabaseNameUse) {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: '****',
            password: '****',
            database: database,
        });
        this.databaseSelected = database;
    }

    async query(sql, params = []) {
        const spinner = createSpinner('Loading...').start();
    
        try {
            const [rows] = await this.connection.execute(sql, params);
    
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            spinner.success({ text: 'Query completed successfully!' });
            
            return rows;
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            
            console.error(chalk.red('SQL Error:'), error.message);
            spinner.error({ text: 'Query failed!' });
            return [];
        }
    }

    getDatabase() {
        return this.databaseSelected || 'none';
    }

    getTable() {
        return this.table || 'none';
    }

    setTable(table) {
        this.table = table;
    }

    async changeDatabase(database) {
        await this.connect(database);
    }
}

const dbManager = new DatabaseManager();

async function RequestSQL(command) {
    if (!command.includes('melsql -r -') && !command.startsWith('getMethod')) {
        return;
    }

    const parts = command.split('-r -');
    let optionRequest = parts[1]?.split(' ')[0]?.trim();

    if (command.startsWith('getMethod')) {
        optionRequest = command.split(' ')[1]?.trim(); 
        if (!optionRequest) {
            console.log(chalk.red('Veuillez fournir une colonne pour getMethod. Exemple: getMethod email'));
            return;
        }
    }

    if (!optionRequest) {
        console.log(chalk.red('Invalid request format.'));
        return;
    }

    let limitClause = '';
    if (command.includes('-l -')) {
        const limitParts = command.split('-l -');
        const optionLimit = limitParts[1]?.trim();

        if (optionLimit && !isNaN(optionLimit)) {
            limitClause = ` LIMIT ${optionLimit}`;
        } else {
            console.log(chalk.red('Invalid limit format.'));
            return;
        }
    }

    try {
        let data;
        let columnName;

        if (command.startsWith('melsql -r -database')) {
            data = await dbManager.query('SHOW DATABASES');
            columnName = 'Database';
        } else if (command.startsWith('melsql -r -tables')) {
            data = await dbManager.query('SHOW TABLES');
            columnName = 'Tables';
        } else if (command.startsWith('getMethod')) {
            const table = dbManager.getTable();
            data = await dbManager.query(`SELECT \`${optionRequest}\` FROM \`${table}\`${limitClause}`);
            columnName = optionRequest;
        } else {
            data = await dbManager.query(`SELECT \`${optionRequest}\` FROM mysql.user${limitClause}`);
            columnName = optionRequest;
        }

        if (data.length === 0) {
            console.log(chalk.yellow('No data found.'));
            return;
        }

        let maxLength = columnName.length;
        data.forEach((row) => {
            const keys = Object.keys(row);
            const realKey = keys[0];
            const value = String(row[realKey] ?? `Unknown ${columnName}`);
            if (value.length > maxLength) {
                maxLength = value.length;
            }
        });

        const border = '+-' + '-'.repeat(maxLength) + '-+';
        const header = '| ' + columnName.padEnd(maxLength) + ' |';

        console.log('');
        console.log(gradient.rainbow(border));
        console.log(gradient.rainbow(header));
        console.log(gradient.rainbow(border));

        data.forEach((row) => {
            const keys = Object.keys(row);
            const realKey = keys[0];
            const value = String(row[realKey] ?? `Unknown ${columnName}`);
            console.log(gradient.rainbow('| ' + value.padEnd(maxLength) + ' |'));
        });

        console.log(gradient.rainbow(border));
        console.log(chalk.yellow(`${data.length} rows in set`));
        console.log('');

    } catch (err) {
        console.log(chalk.red('Failed to execute SQL request.'));
        console.error(err.message);
    }
}


async function displayWelcome() {
    const message = 'melsql';

    return new Promise((resolve, reject) => {
        figlet(message, (err, data) => {
            if (err) {
                console.log('Figlet Error....');
                console.dir(err);
                reject(err);
                return;
            }

            console.log(gradient.rainbow(data));

            const infos = [
                'Version 1.1',
                '[+] Tool Created by Isoka (???)',
                '.:. Write Any Command for your Database .:.',
                '⚠️ No (post and update) implémentation ⚠️',
                '[01] Melsql Start request: melsql -start',
                '[02] Show All Command:     melsql -cmd',
                '[03] Exit Melsql:          melsql -exit',
                '© 2025 Isoka. All rights reserved.'
            ];

            infos.forEach(info => {
                console.log(gradient.rainbow("  " + info));
                console.log('');
            });

            resolve();
        });
    });
}

async function getTablesOfBase() {
    const data = await dbManager.query(`SHOW TABLES`);
    const tables = [];

    data.forEach(row => {
        const tableName = Object.values(row)[0];
        tables.push(tableName);
    });

    return tables;
}

async function getColumnOfBase(table) {
    const columns = await dbManager.query(`SHOW COLUMNS FROM \`${table}\`;`);
    return columns.map(col => col.Field);
}

async function StartRequestOption() {
    const tables = await getTablesOfBase();

    const answersTables = await inquirer.prompt({
        name: 'tables',
        type: 'list',
        message: 'Select your table...',
        choices: tables,
    });

    const selectedTable = answersTables.tables;
    dbManager.setTable(selectedTable);

    const columns = await getColumnOfBase(selectedTable);

    const answersColumn = await inquirer.prompt({
        name: 'column',
        type: 'list',
        message: 'Select your column...',
        choices: columns,
    });

    const selectedColumn = answersColumn.column;

    const answersMethod = await inquirer.prompt({
        name: 'method',
        type: 'list',
        message: 'Select your method...',
        choices: [
            'Get',
            'Delete',
        ],
    });

    if (answersMethod.method === 'Get') {
        const command = `getMethod ${selectedColumn}`;
        await RequestSQL(command);
    } else if (answersMethod.method === 'Delete') {

        const answersId = await inquirer.prompt({
            name: 'id',
            type: 'input',
            message: 'Write the id(number) to delete from table "' + selectedTable + '"...',
            default: '1',
        });

        const deleteValue = answersId.id.trim();

        const deleteQuery = `DELETE FROM \`${selectedTable}\` WHERE ID = ?`;
        const result = await dbManager.query(deleteQuery, [deleteValue]);

        if (result.affectedRows > 0) {
            console.log(chalk.green(`${result.affectedRows} row(s) deleted from "${selectedTable}".`));
        } else {
            console.log(chalk.yellow(`No matching rows found in "${selectedTable}".`));
        }
    }else {
        console.log(chalk.red('Méthode non encore implémentée.'));
    }
}


async function BasicCommandPrompt() {
    await dbManager.connect();

    const commandCheck = [
        '[01] Start Request Interaction       : melsql -start',
        '[02] Show All Available Commands     : melsql -cmd',
        '[03] Exit Melsql Prompt              : melsql -exit',
        '[04] Clear Console Output            : melsql -clear',
        '[05] Show All Databases              : melsql -r -database',
        '[06] Show Tables in Current Database : melsql -r -tables',
        '[07] Switch to Another Database      : melsql -use <database_name>',
        '[08] Read Column From Table          : melsql -r -<column_name> [-l -<limit>]'
    ];

    while (true) {
        const answersInput = await inquirer.prompt({
            name: 'command',
            type: 'input',
            message: `PS C:\\Melsql [(${dbManager.getDatabase()})]>`,
            default: 'command',
        });

        const command = answersInput.command.trim();

        if (command === 'melsql -exit') {
            console.log(gradient.rainbow('Exiting melsql prompt...'));
            process.exit();
        }
        else if (command === 'melsql -clear') {
            console.clear();
            console.log(gradient.rainbow('Console cleared...'));
        } else if (command === 'melsql -start') {
            await StartRequestOption();
        } else if (command === 'melsql -cmd') {
            console.log('');
                commandCheck.forEach(cmd => {
                    console.log(gradient.rainbow(' '.repeat(2) + cmd));
                });
            console.log('');
        }
        else if (command.startsWith('melsql -use ')) {
            const dbName = command.split(' ')[2];
            if (dbName) {
                try {
                    await dbManager.changeDatabase(dbName);
                    console.log(gradient.rainbow(`Switched to database: ${dbName}`));
                } catch (err) {
                    console.log(chalk.red(`Failed to switch database: ${dbName}`));
                }
            } else {
                console.log(chalk.red('Please specify a database name.'));
            }
        }
        else if (command.includes('melsql -r -') || command.startsWith('getMethod')) {
            await RequestSQL(command);
        }
        else {
            console.log(gradient.rainbow('Unknown command... Try again.'));
        }
    }
}

async function main() {
    await displayWelcome();
    await BasicCommandPrompt();
}

main();
