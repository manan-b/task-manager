import React, { useState } from "react";
import { Task, TaskStatus, UpdateTaskPayload } from "../types";
import { useTasks } from "../hooks/useTasks";
import { IoClose, MdEdit } from "./Icons/Icons";
import { FaTrash } from "react-icons/fa";

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  onClose,
}) => {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteConfirming(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTask(task.id);
      onClose();
    } catch (error) {
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirming(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedTask: UpdateTaskPayload = {
      id: task.id,
      title,
      description,
      status,
    };
    try {
      await updateTask(updatedTask);
      setIsEditing(false);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatStatus = (status: string): string => {
    switch (status) {
      case "todo":
        return "To Do";
      case "inProgress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? "Edit Task" : "Task Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Close"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {task.description}
              </p>
            </div>
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:{" "}
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {formatStatus(task.status)}
              </span>
            </div>
            <div className="flex justify-end space-x-3">
              {isDeleteConfirming ? (
                <>
                  <span className="flex items-center text-sm text-red-600 font-medium mr-2">
                    Are you sure?
                  </span>
                  <button
                    onClick={handleCancelDelete}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    Yes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDeleteClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 flex items-center gap-2"
                  >
                    {(FaTrash as any)({ className: "w-4 h-4" })}
                    Delete
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center gap-2"
                  >
                    <MdEdit className="w-4 h-4" />
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal;
