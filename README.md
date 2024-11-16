# DoHub (Task Management)

![site_screenshot](https://i.postimg.cc/j5vzBh1L/Screenshot-20241116-153330.png)

## Technologies Used

- **React.js**
- **React Table**
- **LocalStorage**
- **Tailwind CSS**
- **JavaScript (ES6)**

---

## Functionality

This **Task Management Application** allows users to efficiently manage their tasks with the ability to:

- **Create Tasks**: Users can add tasks with a title, priority, and deadline.
- **Mark Tasks as Completed**: Tasks can be marked as completed by clicking a checkbox. The task's completed status is persisted in `localStorage`.
- **Delete Tasks**: Users can delete tasks from the list. The task will be removed from the table and also deleted from `localStorage`.
- **View Tasks with Pagination**: The task list is displayed in a table with pagination, where each page shows a fixed number of tasks (5 tasks per page).
- **Responsive Design**: The interface adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.

### Key Features:
- **Pagination**: View up to 5 tasks per page with navigation between pages.
- **Priorities**: Assign a priority to each task (Urgent, Normal, High, Low).
- **Task Deadline**: Assign deadlines to tasks and track them.
- **Persistent Storage**: Tasks are stored in the browser using `localStorage`, meaning tasks persist even after a page reload.

---

## The Setup and Launch Process

Follow these steps to set up and launch the application locally:

### Step 1: Clone the repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
```
### Step 2: Install Dependencies
Navigate to the project directory and install the necessary dependencies:


```bash
cd <project-directory>
npm install
```

### Step 3: Run The Application
Start the application by running:

```bash
npm run dev
```
