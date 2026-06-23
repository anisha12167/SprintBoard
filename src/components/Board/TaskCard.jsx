// ========================== TaskCard.jsx ==========================
// Individual draggable task card with drag preview animation

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

const priorityStyle = {
  low: "bg-green-900 text-green-300",
  medium: "bg-yellow-900 text-yellow-300",
  high: "bg-red-900 text-red-300",
};

const TaskCard = ({ task, columnKey, onDelete, onEdit, index }) => {
  if (!onEdit) {
  console.error("onEdit is missing");
  return;
}

  // Local edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  // Save edited task
  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task.id, columnKey, title, description);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // Drag preview + drop animation
          className={`
            relative rounded-xl p-4 border border-slate-700
            bg-slate-900 transition-all duration-200
            ${snapshot.isDragging ? "scale-105 shadow-xl" : "shadow-sm"}
          `}
        >
          {/* Priority badge */}
          <span
            className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full ${
              priorityStyle[task.priority || "medium"]
            }`}
          >
            {task.priority || "medium"}
          </span>

          {/* Tags */}
          {(task.tags || []).length > 0 && (
            <div className="flex gap-1 flex-wrap mb-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Edit mode */}
          {isEditing ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-800 border border-slate-700 px-2 py-1 w-full mb-2 rounded"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="bg-slate-800 border border-slate-700 px-2 py-1 w-full mb-3 rounded resize-none"
              />
              <button
                onClick={handleSave}
                className="text-sm text-green-400"
              >
                Save
              </button>
            </>
          ) : (
            <>
              {/* Title */}
              <h3 className="font-semibold text-slate-100 mb-1">
                {task.title}
              </h3>

              {/* Description */}
              {task.description && (
                <p className="text-sm text-slate-400 mb-3">
                  {task.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-4 text-sm">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task, columnKey)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
