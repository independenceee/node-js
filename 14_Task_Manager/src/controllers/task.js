const Task = require("../models/task");

class TaskController {
  async getAllTasks(request, response) {
    try {
      const tasks = await Task.find({});
      response.status(200).json(tasks);
    } catch (error) {
      response.status().json({
        message: error,
      });
    }
  }

  async createTask(request, response) {
    try {
      const task = await Task.create(request.body);
      response.status(201).json(task);
    } catch (error) {
      response.status().json({
        message: error,
      });
    }
  }

  async getTask(request, response) {
    try {
      const { id: taskId } = request.params;
      const task = await Task.findOne({ _id: taskId });
      response.status(200).json(task);
    } catch (error) {
      response.status().json({
        message: error,
      });
    }
  }

  async updateTask(request, response) {
    try {
      const { id: taskID } = request.params;

      const task = await Task.findOneAndUpdate({ _id: taskID }, request.body, {
        new: true,
        runValidators: true,
      });

      response.status(200).json(task);
    } catch (error) {
      response.status().json({
        message: error,
      });
    }
  }

  async deleteTask(request, response) {
    try {
      const { id: taskID } = request.params;
      const task = await Task.findOneAndDelete({ _id: taskID });
      response.status(200).json(task);
    } catch (error) {
      response.status().json({
        message: error,
      });
    }
  }
}

module.exports = new TaskController();
