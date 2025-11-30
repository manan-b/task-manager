import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { useTasks } from "../hooks/useTasks";
import { Task, TaskStatus } from "../types";
import ThemeToggle from "./ThemeToggle";

const KanbanBoard: React.FC = () => {
  const { todoTasks, inProgressTasks, doneTasks, moveTask, reorderTasks } =
    useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeData = active.data.current as { task: Task } | undefined;
    if (activeData) {
      setActiveTask(activeData.task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const activeData = active.data.current as { task: Task } | undefined;
    const overData = over.data.current as
      | { task?: Task; status?: TaskStatus }
      | undefined;

    if (!activeData || !activeData.task) return;

    if (overData?.task && active.id !== over.id) {
      const activeStatus = activeData.task.status;
      const overStatus = overData.task.status;

      if (activeStatus === overStatus) {
        let tasksInColumn: Task[];
        switch (activeStatus) {
          case "todo":
            tasksInColumn = todoTasks;
            break;
          case "inProgress":
            tasksInColumn = inProgressTasks;
            break;
          case "done":
            tasksInColumn = doneTasks;
            break;
          default:
            return;
        }

        const activeIndex = tasksInColumn.findIndex(
          (t) => t.id === activeData.task.id
        );
        const overIndex = tasksInColumn.findIndex(
          (t) => overData.task && t.id === overData.task.id
        );

        if (activeIndex !== -1 && overIndex !== -1) {
          const newOrder = arrayMove(tasksInColumn, activeIndex, overIndex);
          reorderTasks(activeStatus, newOrder);
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeData = active.data.current as { task: Task } | undefined;
      const overData = over.data.current as
        | { task?: Task; status?: TaskStatus }
        | undefined;

      if (activeData && activeData.task) {
        if (overData?.task) {
          if (activeData.task.status !== overData.task.status) {
            moveTask({
              task: activeData.task,
              destination: overData.task.status,
            });
          }
        } else if (overData?.status) {
          moveTask({
            task: activeData.task,
            destination: overData.status,
          });
        }
      }
    }

    setActiveTask(null);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Task Management Dashboard
        </h2>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add New Task
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn title="To Do" tasks={todoTasks} status="todo" />
          <KanbanColumn
            title="In Progress"
            tasks={inProgressTasks}
            status="inProgress"
          />
          <KanbanColumn title="Done" tasks={doneTasks} status="done" />
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging={true} /> : null}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
};

export default KanbanBoard;
