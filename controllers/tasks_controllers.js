const Task = require('../models/tasks_models');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json(error);
    }
}
const getTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOne({_id : taskID});
        if (!task) {
            res.status(404).json({msg: `No task woth such ID: ${taskID}`});
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json(error)
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json(error)
    }
}
const updateTask = (req, res) => {
    res.send('Update task');
}
const deleteTask = (req, res) => {
    res.send('Delete task');
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}