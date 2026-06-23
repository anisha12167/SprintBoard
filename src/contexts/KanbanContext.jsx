import { createContext, useReducer, useEffect } from "react";
import { kanbanReducer, initialState } from "./kanbanReducer";

export const KanbanContext = createContext();

const STORAGE_KEY="kanban_state";

export const KanbanProvider = ({ children }) => {
    // 🟢 Load from localStorage on start
    const savedState=localStorage.getItem(STORAGE_KEY);
    const parsedState=savedState?JSON.parse(savedState):initialState;

    const [state, dispatch] = useReducer(kanbanReducer, parsedState);

    // 🟢 Save to localStorage whenever state changes
    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    },[state])
    return (
        <KanbanContext.Provider value={{ state, dispatch }}>
            {children}
        </KanbanContext.Provider>
    )
}