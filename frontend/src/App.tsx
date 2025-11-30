import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <KanbanBoard />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
