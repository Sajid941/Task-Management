const getTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return [];
};

const saveTask = (task) => {
    const savedTask = getTasks();
    if (task) {
        savedTask.push(task);
        localStorage.setItem("tasks",JSON.stringify(savedTask))
    }
};

export { getTasks, saveTask };
