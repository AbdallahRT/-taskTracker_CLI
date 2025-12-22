# Task Tracker CLI App

Task Tracker is a command-line application for managing tasks locally.  
Project reference: [Task Tracker Roadmap](https://roadmap.sh/projects/task-tracker)

## Installation

1. Clone this repository.
2. Ensure **npm** is installed.
3. From the repository root, install globally:

```bash
npm install -g .
```

## Usage

After a global install, the CLI is available as `task-cli`. You can also run it locally with `node index.js` from the repo root.

```bash
task-cli --help
```

## Commands

### Add a task

```bash
task-cli add "Write documentation"
```

Creates a new task with status `todo` and timestamps.

### Update a task description

```bash
task-cli update 1 "Write usage examples"
```

Updates the description and `updatedAt` timestamp for the task with the given ID.

### Delete a task

```bash
task-cli delete 1
```

Removes the task with the given ID.

### Mark a task as in progress

```bash
task-cli mark-in-progress 1
```

Sets the task status to `in-progress`.

### Mark a task as done

```bash
task-cli mark-done 1
```

Sets the task status to `done`.

### List tasks

```bash
# List all tasks
task-cli list

# List tasks by status
task-cli list todo
task-cli list in-progress
task-cli list done
```

Displays tasks in a table. Valid status filters are `todo`, `in-progress`, and `done`.

## Data Storage

Tasks are stored in `tasks.json` in the repository root. Each task includes:
- `id` (number)
- `description` (string)
- `status` (`todo`, `in-progress`, `done`)
- `createdAt` (localized timestamp)
- `updatedAt` (localized timestamp)

## Notes

- The CLI creates `tasks.json` if it does not exist.
- Keep task data local; avoid committing personal task lists.

