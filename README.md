# Melsql - A Nostalgic MySQL Command Line Interface Tool 🌌

Welcome to **Melsql**, a retro-styled, interactive MySQL Command Line Interface (CLI) tool built with Node.js. Dive into a world where managing your databases feels like an adventure with vibrant visuals and intuitive commands.

![Image](https://github.com/user-attachments/assets/77082945-e100-4f48-bb97-f65268ca5567)

---

## 🌟 Features
- 🔗 **Effortless Connections**: Quickly connect to your MySQL databases.
- 🧭 **Interactive Exploration**: Browse databases and tables with ease.
- 🛠️ **Dynamic Queries**: Execute SQL commands with real-time feedback.
- 🎨 **Retro Vibes**: Enjoy a nostalgic terminal experience with colorful gradients and ASCII art.
- 🕒 **Command History**: Access previous commands for faster workflows.

---

## 🔧 Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Version 14 or newer)
- [MySQL](https://www.mysql.com/) (Version 5.7 or newer)

---

## 🚀 Getting Started

### **1. Installation**
Clone the repository and install dependencies:
```bash
git clone https://github.com/Blackholeisoka/nodejs-sql-terminal.git
cd nodejs-sql-terminal
npm install
```

### **2. Run the Tool**
Start the CLI tool with:
```bash
  melsql
```

---

## 📜 Commands Overview

Here are the main commands you can use in **Melsql**. Each command is designed to help you navigate and interact with your databases smoothly:

![Image](https://github.com/user-attachments/assets/4e795255-21d4-4ff7-97f3-0e2e4697ae93)

```shell
# Start interactive mode to manage tables and columns
melsql -start
```

![Image](https://github.com/user-attachments/assets/ef5184dd-4fb9-424d-a9bd-82aae136dd8e)

```shell
# Show all available commands
melsql -cmd
```

```shell
# Switch to another database
melsql -use <database_name>
```

![Image](https://github.com/user-attachments/assets/d3acb2c7-1a37-471d-94b1-f408b09eef84)

```shell
# Display all databases
melsql -r -database
```

```shell
# List tables in the current database
melsql -r -tables
```

```shell
# Read a specific column with an optional limit
melsql -r -<column_name> [-l -<limit>]
```

```shell
# Exit the CLI tool
melsql -exit
```

---

## ✨ Nostalgia in Action

When you launch **Melsql**, you’ll be greeted by a retro-style welcome screen, complete with ASCII art and vibrant gradients! Here's an example of what you might see when executing commands:

<pre style="background-color: #2d2d2d; color: #00ffcc; padding: 1em; border-radius: 0.5em;">
PS C:\Melsql [(mysql)]> melsql -start
Select your table...
> users
Select your column...
> email
Select your method...
> Get
+-------------------+
| email             |
+-------------------+
| john@example.com  |
| jane@example.com  |
+-------------------+
2 rows in set
</pre>

---

## 🛠️ Technical Details

- **Database Management**: Supports switching databases and listing tables/columns.
- **Query Execution**: Handles `SELECT` and `DELETE` commands with error handling.
- **Dynamic UI**: Features colorful outputs using `chalk`, `gradient-string`, and `figlet`.
- **Interactive Prompts**: Uses `inquirer` for dynamic user interaction.

---

## 🤔 FAQ

### Why doesn’t Melsql support `INSERT` or `UPDATE` commands?
For now, Melsql is focused on read and delete operations to ensure simplicity and prevent unintended data changes. Future versions might include extended functionality.

### Can I use Melsql with other database systems?
Currently, Melsql is designed exclusively for MySQL. Support for additional databases may be explored in future updates.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 🎉 Thank You!

Thank you for using **Melsql**! If you have suggestions, feedback, or encounter any issues, feel free to open an issue on the GitHub repository.

✨ *"Because databases deserve a splash of nostalgia!"* ✨
