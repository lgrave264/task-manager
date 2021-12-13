const Task = require('../models/task')

const getAllTasks = async (req,res) => {
    try{
        const task = await Task.find({})
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const getTask = async (req,res) => {
    try{
        const task = await Task.findOne({completed: true}).exec();
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const updateTask = async (req,res) => {
    try{
        const task = await Task.updateOne({ completed: 'false' }, { completed: 'true' });
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const deleteTask = async (req,res) => {
    try{
        const task = await Task.deleteOne({});
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const createTask = async (req,res) => {
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllTasks,updateTask,deleteTask,createTask,getTask
}