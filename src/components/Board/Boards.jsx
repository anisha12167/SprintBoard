

import { useContext, useMemo, useState } from "react";
import Column from "./Column";
import Toast from "./Toast";
import { KanbanContext } from "../../contexts/KanbanContext";
import { DragDropContext } from "@hello-pangea/dnd";

// Priority ranking used for sorting
const priorityRank = {
  high: 1,
  medium: 2,
  low: 3,
};

const Boards = () => {
  const { state, dispatch } = useContext(KanbanContext);

  // ---------- FORM STATE ----------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tagsInput, setTagsInput] = useState("");

  // ---------- UI STATE ----------
  const [search, setSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // ---------- TOAST + UNDO STATE ----------
  const [showToast, setShowToast] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);

  // ---------- ADD TASK ----------
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now().toString(),
        title,
        description,
        priority,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      },
    });

    // reset form
    setTitle("");
    setDescription("");
    setTagsInput("");
    setPriority("medium");
  };

  // ---------- DELETE WITH UNDO ----------
  const handleDeleteTask = (task, column) => {
    // save deleted task snapshot
    setLastDeleted({ task, column });

    dispatch({
      type: "DELETE_TASK",
      payload: { id: task.id, column },
    });

    setShowToast(true);
  };

  const handleEditTask = (id, column, title, description) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { id, column, title, description },
    });
  };

  // ---------- UNDO DELETE ----------
  const handleUndo = () => {
    if (!lastDeleted) return;

    dispatch({
      type: "ADD_TASK",
      payload: lastDeleted.task,
      column: lastDeleted.column,
    });

    setLastDeleted(null);
    setShowToast(false);
  };

  // ---------- DRAG HANDLING ----------
  const handleDragEnd = (result) => {
    setIsDragging(false);
    if (!result.destination) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        sourceCol: result.source.droppableId,
        destCol: result.destination.droppableId,
        sourceIndex: result.source.index,
        destIndex: result.destination.index,
      },
    });
  };

  // ---------- OPTIMIZED DERIVED STATE ----------
  // Filters by:
  // 1. Title
  // 2. Tags (ANY matching tag)
  // Then sorts by priority (unless dragging)
  const getTasks = (tasks) =>
    useMemo(() => {
      const query = search.toLowerCase().trim();

      // 🔍 SEARCH LOGIC (TITLE + TAGS)
      const filtered = tasks.filter((task) => {
        const titleMatch = task.title
          .toLowerCase()
          .includes(query);

        const tagsMatch = (task.tags || []).some((tag) =>
          tag.toLowerCase().includes(query)
        );

        return titleMatch || tagsMatch;
      });

      // During drag → do not sort (UX safety)
      if (isDragging) return filtered;

      // Priority-based sorting
      return [...filtered].sort(
        (a, b) =>
          priorityRank[a.priority || "medium"] -
          priorityRank[b.priority || "medium"]
      );
    }, [tasks, search, isDragging]);

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div className="px-6 pt-10 pb-6 text-slate-200">
        <div className="flex flex-col items-center gap-4 mb-10">
          <h1 className="text-3xl font-semibold tracking-wide">
            Kanban Board
          </h1>

          {/* SEARCH INPUT (TITLE + TAGS) */}
          <input
            placeholder="Search by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 bg-slate-700 border border-slate-800 px-4 py-2 rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ---------- ADD TASK ---------- */}
        <form
          onSubmit={handleAddTask}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 mb-12 max-w-5xl mx-auto flex gap-3 items-center"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg w-1/5"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg w-1/4"
          />

          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Tags (comma separated)"
            className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg w-1/4"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            disabled={!title.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 transition px-3 py-2 rounded-lg text-sm font-medium"
          >
            Add
          </button>
        </form>

        {/* ---------- BOARD ---------- */}
        <DragDropContext
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <div className="max-w-6xl mx-auto flex gap-6">
            <Column
              title="Todo"
              columnKey="todo"
              tasks={getTasks(state.columns.todo)}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              isSearching={!!search}
            />

            <Column
              title="In Progress"
              columnKey="inProgress"
              tasks={getTasks(state.columns.inProgress)}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              isSearching={!!search}
            />

            <Column
              title="Done"
              columnKey="done"
              tasks={getTasks(state.columns.done)}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              isSearching={!!search}
            />

          </div>
        </DragDropContext>
      </div>

      {/* ---------- TOAST ---------- */}
      {showToast && (
        <Toast
          message="Task deleted"
          actionLabel="Undo"
          onAction={handleUndo}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default Boards;
