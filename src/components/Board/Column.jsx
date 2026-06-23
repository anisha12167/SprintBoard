// ========================== Column.jsx ==========================
// Column with empty & error states and drag-over feedback

import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, columnKey, onDelete, onEdit, isSearching }) => {
  return (
    <Droppable droppableId={columnKey}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            flex flex-col w-1/3 min-h-[320px] p-4 rounded-xl
            bg-slate-800 border border-slate-700
            transition
            ${snapshot.isDraggingOver ? "ring-2 ring-blue-500" : ""}
          `}
        >
          {/* Column header */}
          <div className="text-center text-lg font-medium mb-4 ">
            {title}
          </div>
            
          {/* Task list */}
          <div className="flex flex-col gap-4 flex-grow">
            {tasks.length === 0 ? (
              // Empty / error state
              <p className="text-sm text-slate-500 text-center mt-10">
                {isSearching ? "No matching tasks" : "No tasks here"}
              </p>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  columnKey={columnKey}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
