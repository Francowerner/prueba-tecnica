export interface Item {
  id: string;
  text: string;
}

export interface ListState {
  items: Item[];
  selectedIds: string[];
  isDialogOpen: boolean;
  history: Item[][];
}

export type ListAction =
  | { type: "ADD_ITEM"; payload: string }
  | { type: "REMOVE_SELECTED" }
  | { type: "TOGGLE_SELECT"; payload: string }
  | { type: "OPEN_DIALOG" }
  | { type: "CLOSE_DIALOG" }
  | { type: "UNDO" }
  | { type: "REMOVE_ITEM"; payload: string };
