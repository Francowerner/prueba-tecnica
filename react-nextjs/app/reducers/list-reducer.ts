import type { ListState, ListAction } from "../types";

export const initialState: ListState = {
  items: [],
  selectedIds: [],
  isDialogOpen: false,
  history: [],
};

export const listReducer = (
  state: ListState,
  action: ListAction,
): ListState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [
          ...state.items,
          { id: crypto.randomUUID(), text: action.payload },
        ],
        history: [...state.history, state.items],
        isDialogOpen: false,
      };
    case "REMOVE_SELECTED":
      return {
        ...state,
        items: state.items.filter(
          (item) => !state.selectedIds.includes(item.id),
        ),
        selectedIds: [],
        history: [...state.history, state.items],
      };
    case "TOGGLE_SELECT":
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter((id) => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };
    case "OPEN_DIALOG":
      return {
        ...state,
        isDialogOpen: true,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isDialogOpen: false,
      };
    case "UNDO":
      if (state.history.length === 0) return state;
      return {
        ...state,
        items: state.history[state.history.length - 1],
        history: state.history.slice(0, -1),
        selectedIds: [],
      };
    case "REMOVE_ITEM":
      if (!state.items.find((item) => item.id === action.payload)) return state;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        selectedIds: state.selectedIds.filter((id) => id !== action.payload),
        history: [...state.history, state.items],
      };
    default:
      return state;
  }
};
