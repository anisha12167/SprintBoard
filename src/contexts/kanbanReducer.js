export const initialState = {
    columns: {
        todo: [
            {
                id: "1",
                title: "Setup project",
                description: "Initialize Vite + React",
            },
        ],
        inProgress: [],
        done: [],
    },
};

export const kanbanReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                // ...state means we are copying the existing state
                ...state,
                columns: {
                    ...state.columns,
                    todo: [...state.columns.todo, action.payload]
                }
            };
        case "DELETE_TASK":
            return {
                // ...state se purani state copy kar raha hai
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.column]:
                        state.columns[action.payload.column]
                            .filter((task) => task.id !== action.payload.id),
                },
            };
        case "EDIT_TASK":
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.column]: state.columns[action.payload.column]
                        .map(task =>
                            task.id === action.payload.id ? {
                                ...task,
                                title: action.payload.title,
                                description: action.payload.description,
                            }
                                : task
                        )
                }
            }
        case "MOVE_TASK": {
            const { sourceCol, destCol, sourceIndex, destIndex } = action.payload;

            // safety guard
            if (!state.columns[sourceCol] || !state.columns[destCol]) {
                console.error("Invalid column:", sourceCol, destCol);
                return state;
            }

            // SAME COLUMN MOVE
            if (sourceCol === destCol) {
                const updated = [...state.columns[sourceCol]];
                const [moved] = updated.splice(sourceIndex, 1);
                updated.splice(destIndex, 0, moved);

                return {
                    ...state,
                    columns: {
                        ...state.columns,
                        [sourceCol]: updated,
                    },
                };
            }

            // CROSS COLUMN MOVE
            const sourceTasks = [...state.columns[sourceCol]];
            const destTasks = [...state.columns[destCol]];

            const [movedTask] = sourceTasks.splice(sourceIndex, 1);
            destTasks.splice(destIndex, 0, movedTask);

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceCol]: sourceTasks,
                    [destCol]: destTasks,
                },
            };
        }
        default: return state
    }
}   