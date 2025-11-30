import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types";
import TaskDetailsModal from "./TaskDetailsModal";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging = false }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
    over,
  } = useSortable({
    id: task.id.toString(),
    data: {
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
    position: "relative" as const,
  };

  const statusColor = {
    todo: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    inProgress:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
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

  const isBeingDraggedOver = over?.id === task.id.toString();

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`p-4 mb-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${isBeingDraggedOver
            ? "border-blue-500 dark:border-blue-600 shadow-lg"
            : "border-gray-200 dark:border-gray-700"
          } cursor-grab hover:shadow-md transition-shadow group`}
        onClick={() => setIsDetailsModalOpen(true)}
      >
        {isBeingDraggedOver && (
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900 opacity-20 rounded-lg pointer-events-none" />
        )}

        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 flex-1">
            {task.title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${statusColor[task.status]
              }`}
          >
            {formatStatus(task.status)}
          </span>
        </div>

        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center mt-2">
          <button
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailsModalOpen(true);
            }}
          >
            Details
          </button>
        </div>
      </div>

      {isDetailsModalOpen && (
        <TaskDetailsModal
          task={task}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
