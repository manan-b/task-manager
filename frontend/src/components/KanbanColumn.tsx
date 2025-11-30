import React from "react";
import { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  tasks,
  status,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status: status,
    },
  });

  const taskIds = tasks.map((task) => task.id.toString());

  const getColumnStyle = () => {
    switch (status) {
      case "todo":
        return "border-blue-500 dark:border-blue-700";
      case "inProgress":
        return "border-yellow-500 dark:border-yellow-700";
      case "done":
        return "border-green-500 dark:border-green-700";
      default:
        return "border-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-full min-h-[500px] bg-gray-50 dark:bg-gray-900 rounded-lg shadow ${
        isOver ? "ring-2 ring-blue-400 dark:ring-blue-600" : ""
      }`}
    >
      <div className={`px-4 py-3 border-t-4 ${getColumnStyle()} rounded-t-lg`}>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
          <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
            ({tasks.length})
          </span>
        </h3>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No tasks yet
              </p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
