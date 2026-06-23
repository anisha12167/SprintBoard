# 🗂️ Kanban Board – Jira-like Task Management App

A modern, feature-rich Kanban board inspired by Jira, built using **React and Tailwind CSS**.  
This project focuses on **real-world UX, performance optimization, and clean state management**, rather than just basic CRUD.

---

## 🚀 Live Features

- 🧱 **Kanban Columns** – Todo, In Progress, Done
- 🖱️ **Drag & Drop** (smooth & conflict-free)
- ✏️ **Create, Edit, Delete Tasks**
- 🔁 **Undo Delete with Toast Notifications**
- 🏷️ **Tags System**
- 🚦 **Priority Levels** (Low, Medium, High)
- 🔍 **Search & Filter Tasks**
- ⚡ **Performance Optimized with `useMemo`**
- 🧠 **Empty & Error States**
- 🎨 **Dark Pastel UI (Eye-friendly)**
- 💾 **Persistent State using Local Storage**

---

## 🧠 Why This Project Is Different

Most todo apps stop at basic CRUD.

This project goes further by focusing on:
- **UX reliability** (Undo delete instead of silent actions)
- **Performance** (Derived state optimization)
- **Product thinking** (Empty states, feedback, smooth interactions)
- **Clean architecture** (Context + Reducer)

---

## 🛠️ Tech Stack

- **React (JavaScript)**
- **Context API + Reducer**
- **Tailwind CSS**
- **@hello-pangea/dnd** (Drag & Drop)
- **Local Storage** (Persistence)

---

## 🧩 Architecture Overview
# 🗂️ Kanban Board – Jira-like Task Management App

A modern, feature-rich Kanban board inspired by Jira, built using **React and Tailwind CSS**.  
This project focuses on **real-world UX, performance optimization, and clean state management**, rather than just basic CRUD.

---

## 🚀 Live Features

- 🧱 **Kanban Columns** – Todo, In Progress, Done
- 🖱️ **Drag & Drop** (smooth & conflict-free)
- ✏️ **Create, Edit, Delete Tasks**
- 🔁 **Undo Delete with Toast Notifications**
- 🏷️ **Tags System**
- 🚦 **Priority Levels** (Low, Medium, High)
- 🔍 **Search & Filter Tasks**
- ⚡ **Performance Optimized with `useMemo`**
- 🧠 **Empty & Error States**
- 🎨 **Dark Pastel UI (Eye-friendly)**
- 💾 **Persistent State using Local Storage**

---

## 🧠 Why This Project Is Different

Most todo apps stop at basic CRUD.

This project goes further by focusing on:
- **UX reliability** (Undo delete instead of silent actions)
- **Performance** (Derived state optimization)
- **Product thinking** (Empty states, feedback, smooth interactions)
- **Clean architecture** (Context + Reducer)

---

## 🛠️ Tech Stack

- **React (JavaScript)**
- **Context API + Reducer**
- **Tailwind CSS**
- **@hello-pangea/dnd** (Drag & Drop)
- **Local Storage** (Persistence)

---

## 🧩 Architecture Overview
# 🗂️ Kanban Board – Jira-like Task Management App

A modern, feature-rich Kanban board inspired by Jira, built using **React and Tailwind CSS**.  
This project focuses on **real-world UX, performance optimization, and clean state management**, rather than just basic CRUD.

---

## 🚀 Live Features

- 🧱 **Kanban Columns** – Todo, In Progress, Done
- 🖱️ **Drag & Drop** (smooth & conflict-free)
- ✏️ **Create, Edit, Delete Tasks**
- 🔁 **Undo Delete with Toast Notifications**
- 🏷️ **Tags System**
- 🚦 **Priority Levels** (Low, Medium, High)
- 🔍 **Search & Filter Tasks**
- ⚡ **Performance Optimized with `useMemo`**
- 🧠 **Empty & Error States**
- 🎨 **Dark Pastel UI (Eye-friendly)**
- 💾 **Persistent State using Local Storage**

---

## 🧠 Why This Project Is Different

Most todo apps stop at basic CRUD.

This project goes further by focusing on:
- **UX reliability** (Undo delete instead of silent actions)
- **Performance** (Derived state optimization)
- **Product thinking** (Empty states, feedback, smooth interactions)
- **Clean architecture** (Context + Reducer)

---

## 🛠️ Tech Stack

- **React (JavaScript)**
- **Context API + Reducer**
- **Tailwind CSS**
- **@hello-pangea/dnd** (Drag & Drop)
- **Local Storage** (Persistence)

---

### 🔹 State Management
- Global state handled via **Context + Reducer**
- All task operations go through reducer actions
- UI uses **derived state**, not duplicated state

---

## ⚡ Performance Optimization

- `useMemo` used for:
  - Filtering tasks
  - Sorting by priority
- Prevents unnecessary recalculations during:
  - Drag & Drop
  - Search typing

---

## 🧪 UX Improvements Implemented

- **Undo Delete**
  - Deleted task can be restored instantly
- **Toast Notifications**
  - User always gets feedback for actions
- **Empty States**
  - No blank or confusing UI
- **Drag Preview**
  - Visual lift and shadow during drag

---

## 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1a0b0fef-728e-4e81-907d-0d7204f5b721" />


---

## 🧑‍💻 How to Run Locally

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board
npm install
npm run dev

