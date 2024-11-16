const getTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return [];
};

export { getTasks };
