import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import API from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function TaskManager() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [priority, setPriority] = useState("Medium");

  const [dueDate, setDueDate] = useState("");

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("Newest");
  const [editingTask, setEditingTask] = useState(null);
  const [visibleTasks, setVisibleTasks] = useState(5);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      console.log("TOKEN:", localStorage.getItem("token"));

      const { data } = await API.get("/tasks");

      console.log("FETCHED TASKS:", data);

      setTasks(data);
    } catch (error) {
      console.log("FETCH TASK ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setVisibleTasks(5);
  }, [search, filter, sortBy]);

  useEffect(() => {
  localStorage.setItem(
    "task_backup",
    JSON.stringify(tasks)
  );
}, [tasks]);

useEffect(() => {
  const savedTasks =
    localStorage.getItem(
      "task_backup"
    );

  if (savedTasks) {
    try {
      setTasks(
        JSON.parse(
          savedTasks
        )
      );
    } catch (error) {
      console.log(
        "Backup restore failed"
      );
    }
  }
}, []);

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const { data } = await API.post("/tasks", {
        title,
        priority,
        dueDate,
      });

      if (data && data._id && data.title) {
        setTasks((prevTasks) => [data, ...prevTasks]);
      }
      toast.success("Task added successfully!");
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };

  // =========================
  // TOGGLE TASK
  // =========================
  const toggleTask = async (id) => {
    try {
      const existingTask = tasks.find((task) => task._id === id);

      if (!existingTask) {
        toast.error("Task not found");
        return;
      }

      const { data } = await API.put(`/tasks/${id}`);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task && task._id === id
            ? {
                ...task,
                ...data,
              }
            : task,
        ),
      );

      if (!existingTask.completed && data.completed) {
        toast.success("Task completed! 🎉");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  // update task

  const updateTask = async () => {
    try {
      const { data } = await API.put(`/tasks/${editingTask._id}`, {
        title: editingTask.title,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task && task._id === editingTask._id
            ? {
                ...task,
                ...data,
              }
            : task,
        ),
      );

      // toast.success("Task updated successfully!");

      setEditingTask(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));

      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  // Add “Clear Completed Tasks” Button

  const clearCompletedTasks = async () => {
    try {
      const completed = tasks.filter((task) => task.completed);

      for (const task of completed) {
        await API.delete(`/tasks/${task._id}`);
      }

      setTasks(tasks.filter((task) => !task.completed));

      toast.success("Completed tasks cleared!");
    } catch (error) {
      toast.error("Failed to clear completed tasks");
    }
  };

  // add analytics calculation

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed,
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const motivationMessage =
    completionRate === 100
      ? "Amazing! All tasks completed!"
      : completionRate >= 70
        ? "Great job! You're highly productive!"
        : completionRate >= 40
          ? "Good progress! Keep going!"
          : completionRate > 0
            ? "Nice start! Stay consistent!"
            : "Let’s get started! Add and complete tasks!";

  //  created filtered task logic

  const filteredTasks = [...tasks]
    .filter((task) => {
      // Search Match
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Filter Match
      if (filter === "Completed") return task.completed;

      if (filter === "Pending") return !task.completed;

      if (filter === "Overdue")
        return (
          task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
        );

      return true;
    })

    .sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "Priority") {
        const priorityOrder = {
          High: 3,
          Medium: 2,
          Low: 1,
        };

        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (sortBy === "DueDate") {
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      }

      return 0;
    });

  const getDueDateStatus = (dueDate) => {
    if (!dueDate)
      return {
        text: "No Date",
        color: "text-gray-400",
      };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate < today) {
      return {
        text: "Overdue",
        color: "text-red-400",
      };
    }

    if (taskDate.getTime() === today.getTime()) {
      return {
        text: "Due Today",
        color: "text-yellow-400",
      };
    }

    return {
      text: "Upcoming",
      color: "text-green-400",
    };
  };

  const exportTasks = () => {
    try {
      const dataStr = JSON.stringify(tasks, null, 2);

      const blob = new Blob([dataStr], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "my_tasks.json";

      link.click();

      toast.success("Tasks exported successfully!");
    } catch (error) {
      toast.error("Export failed");
    }
  };

  return (
    <div className="glass p-8 rounded-3xl mt-10">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Task Management</h2>

      {/* task counter summary  */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Total */}
        <div className="bg-slate-900 p-4 rounded-2xl text-center">
          <p className="text-sm text-gray-400">Total</p>
          <h3 className="text-2xl font-bold">{totalTasks}</h3>
        </div>

        {/* Completed */}
        <div className="bg-slate-900 p-4 rounded-2xl text-center">
          <p className="text-sm text-gray-400">Completed</p>
          <h3 className="text-2xl font-bold text-green-400">
            {completedTasks}
          </h3>
        </div>

        {/* Pending */}
        <div className="bg-slate-900 p-4 rounded-2xl text-center">
          <p className="text-sm text-gray-400">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-400">{pendingTasks}</h3>
        </div>

        {/* Overdue */}
        <div className="bg-slate-900 p-4 rounded-2xl text-center">
          <p className="text-sm text-gray-400">Overdue</p>
          <h3 className="text-2xl font-bold text-red-400">{overdueTasks}</h3>
        </div>
      </div>

      {/* progress bar */}

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <p className="text-gray-300 font-medium">Productivity Progress</p>

          <p className="text-cyan-400 font-bold">{completionRate}%</p>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-500"
            style={{
              width: `${completionRate}%`,
            }}
          ></div>
        </div>
      </div>

   

      {/* searchbar */}

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-2xl bg-slate-900 text-white outline-none border border-white/10 mb-6"
      />

      {/* add sort dropdown ui */}

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full p-4 rounded-2xl bg-slate-900 text-white outline-none border border-white/10 mb-6"
      >
        <option value="Newest">Newest First</option>

        <option value="Oldest">Oldest First</option>

        <option value="Priority">Priority High to Low</option>

        <option value="DueDate">Due Date Soonest</option>
      </select>

      {/* add filter buttons ui */}

      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "Completed", "Pending", "Overdue"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl transition ${
              filter === type
                ? "bg-cyan-500 text-white"
                : "bg-slate-900 text-gray-400"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex justify-end gap-3">
        {/* Export Tasks */}
        <button
          onClick={exportTasks}
          className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
        >
          Export Tasks
        </button>

        {/* Clear Completed */}
        {completedTasks > 0 && (
          <button
            onClick={() => {
              const confirmClear = window.confirm(
                "Delete all completed tasks?",
              );

              if (confirmClear) {
                clearCompletedTasks();
              }
            }}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {/* Task Title */}
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          className="p-4 rounded-2xl bg-slate-900 text-white outline-none border border-white/10"
        />

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-4 rounded-2xl bg-slate-900 text-white outline-none border border-white/10"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-4 rounded-2xl bg-slate-900 text-white outline-none border border-white/10"
        />

        {/* Add Button */}
        <button
          onClick={addTask}
          className="btn-premium flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Task
        </button>
      </div>

      {/* create edit task model/form ui */}

      {editingTask && (
        <div className="bg-slate-900 p-6 rounded-2xl mb-8 border border-cyan-500/20">
          <h3 className="text-xl font-bold mb-4">Edit Task</h3>

          {/* Title */}
          <input
            type="text"
            value={editingTask?.title || ""}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                title: e.target.value,
              })
            }
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
          />

          {/* Priority */}
          <select
            value={editingTask?.priority || "Medium"}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                priority: e.target.value,
              })
            }
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            value={
              editingTask.dueDate
                ? new Date(editingTask.dueDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                dueDate: e.target.value,
              })
            }
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
          />

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                updateTask();
                toast.success("Task updated successfully!");
              }}
              className="btn-premium px-6 py-3 rounded-xl"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingTask(null)}
              className="px-6 py-3 rounded-xl bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <p className="text-gray-400">Loading tasks...</p>
      ) : (
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {tasks.length === 0 ? "No Tasks Yet" : "No Matching Tasks"}
              </h3>

              <p className="text-gray-400">
                {tasks.length === 0
                  ? "Start by adding your first productivity task."
                  : "Try changing search or filters."}
              </p>
            </div>
          ) : (
            filteredTasks
              .filter((task) => task && task._id)
              .slice(0, visibleTasks)
              .map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-white/5"
                >
                  {/* Task Title */}
                  <div
                    onClick={() => toggleTask(task._id)}
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task._id);
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                          task.completed
                            ? "bg-cyan-400 border-cyan-400 text-black"
                            : "border-gray-500"
                        }`}
                      >
                        {task.completed && "✓"}
                      </button>

                      {/* Title */}
                      <p
                        onClick={() => toggleTask(task._id)}
                        className={`font-medium cursor-pointer transition ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {task?.title || "Untitled Task"}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                      {/* Priority */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-400"
                            : task.priority === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {task?.priority || "Medium"}
                      </span>

                      <span className="text-gray-400">
                        {task?.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "No Due Date"}
                      </span>

                      <span
                        className={`font-medium ${
                          getDueDateStatus(task.dueDate).color
                        }`}
                      >
                        {getDueDateStatus(task.dueDate).text}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this task?",
                      );

                      if (confirmDelete) {
                        deleteTask(task._id);
                      }
                    }}
                    className="text-red-400 hover:scale-110 transition"
                  >
                    <FaTrash />
                  </button>

                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-cyan-400 hover:scale-110 transition mr-4 ml-4"
                  >
                    <FaEdit />
                  </button>
                </div>
              ))
          )}
        </div>
      )}

      {filteredTasks.length > 5 && (
        <div className="flex justify-center gap-4 mt-8">
          {/* Show More */}
          {visibleTasks < filteredTasks.length && (
            <button
              onClick={() => setVisibleTasks((prev) => prev + 5)}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
            >
              Show More
            </button>
          )}

          {/* Show Less */}
          {visibleTasks > 5 && (
            <button
              onClick={() => setVisibleTasks(5)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskManager;
