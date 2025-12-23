// #!/usr/bin/env node

const commander = require("commander");
const inquirer = require("inquirer");
const fs = require("node:fs");

const program = new commander.Command();
const pathfile = "./tasks.json";
program.name("task-cli").description("CLI project").version("1.0.0");

{
    program
        .command("add <task>")
        .description("Add New Task")
        .action((task) => {
            fs.readFile(pathfile, "utf-8", (err, data) => {
                let tasks = [];
                if (!err) {
                    tasks = JSON.parse(data);
                }
                const newId = tasks.length
                    ? Math.max(...tasks.map((t) => t.id)) + 1
                    : 1;
                const newTask = {
                    id: newId,
                    description: task,
                    status: "todo",
                    createdAt: new Date().toLocaleString(),
                    updatedAt: new Date().toLocaleString(),
                };
                tasks.push(newTask);
                fs.writeFile(
                    pathfile,
                    JSON.stringify(tasks, null, 2),
                    "utf-8",
                    (err) => {
                        if (err) {
                            console.log("Error", err);
                            process.exit();
                        }
                        console.log(
                            `Task added successfully (ID: ${newTask.id})`
                        );
                    }
                );
            });
        });
}
{
    program
        .command("update <id> <disc>")
        .description("Update Task")
        .action((id, disc) => {
            fs.readFile(pathfile, "utf-8", (err, data) => {
                const tasks = JSON.parse(data);
                const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
                if (taskIndex === -1) {
                    console.log("Task not found!");
                    return;
                }
                tasks[taskIndex].description = disc;
                tasks[taskIndex].updatedAt = new Date().toLocaleString();
                fs.writeFile(
                    pathfile,
                    JSON.stringify(tasks),
                    "utf-8",
                    (err) => {
                        if (err) {
                            console.log("Error", err);
                            process.exit();
                        }
                    }
                );
            });
        });
}
{
    program
        .command("delete <id>")
        .description("Delete Task")
        .action((id) => {
            fs.readFile(pathfile, "utf-8", (err, data) => {
                const tasks = JSON.parse(data);
                const newTasks = tasks.filter((t) => t.id !== parseInt(id));
                fs.writeFile(
                    pathfile,
                    JSON.stringify(newTasks),
                    "utf-8",
                    (err) => {
                        if (err) {
                            console.log("Error", err);
                            process.exit();
                        }
                    }
                );
            });
        });
}
{
    program
        .command("mark-in-progress <id>")
        .description("Mark Task as In-Progress")
        .action((id) => {
            fs.readFile(pathfile, "utf-8", (err, data) => {
                if (err) {
                    console.log("Error", err);
                    process.exit();
                }
                const tasks = JSON.parse(data);
                const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
                if (taskIndex === -1) {
                    console.log("Task not found!");
                    return;
                }
                tasks[taskIndex].status = "in-progress";
                tasks[taskIndex].updatedAt = new Date().toLocaleString();
                fs.writeFile(
                    pathfile,
                    JSON.stringify(tasks),
                    "utf-8",
                    (err) => {
                        if (err) {
                            console.log("Error", err);
                            process.exit();
                        }
                    }
                );
            });
        });
}
{
    program
        .command("mark-done <id>")
        .description("Mark Task as Done")
        .action((id) => {
            fs.readFile(pathfile, "utf-8", (err, data) => {
                if (err) {
                    console.log("Error", err);
                    process.exit();
                }
                const tasks = JSON.parse(data);
                const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
                if (taskIndex === -1) {
                    console.log("Task not found!");
                    return;
                }
                tasks[taskIndex].status = "done";
                tasks[taskIndex].updatedAt = new Date().toLocaleString();
                fs.writeFile(
                    pathfile,
                    JSON.stringify(tasks),
                    "utf-8",
                    (err) => {
                        if (err) {
                            console.log("Error", err);
                            process.exit();
                        }
                    }
                );
            });
        });
}
{
    program
        .command("list [status]")
        .description("List all tasks or tasks by status")
        .action((status) => {
            fs.readFile(pathfile, "utf-8", (err, data) => {
                if (err) {
                    console.log("Error", err);
                    process.exit();
                }

                const tasks = JSON.parse(data);

                let result = tasks;

                if (status) {
                    if (!["todo", "in-progress", "done"].includes(status)) {
                        console.log(
                            "Invalid status! Use 'todo', 'in-progress', or 'done'."
                        );
                        return;
                    }
                    result = tasks.filter((t) => t.status === status);
                }

                console.table(result);
            });
        });
}
program.parse();
