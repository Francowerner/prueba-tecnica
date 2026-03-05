"use client";

import React, { useReducer } from "react";
import { listReducer, initialState } from "@/app/reducers/list-reducer";
import AddItemDialog from "../add-item-dialog/add-item-dialog";
import ItemList from "../item-list/item-list";
import styles from "./list-manager.module.css";

function ListManager() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  return (
    <main className={styles.background}>
      <section className={styles.card}>
        <h1 className={styles.title}>This is a technical proof</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
          inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
          hendrerit posuere augue fames dictumst placerat porttitor, dis mi
          pharetra vestibulum venenatis phasellus.
        </p>
        <ItemList
          items={state.items}
          selectedIds={state.selectedIds}
          dispatch={dispatch}
        />
        <div className={styles.actions}>
          <button
            className={styles.undoButton}
            onClick={() => dispatch({ type: "UNDO" })}
            disabled={state.history.length === 0}
            aria-label="Undo last action"
          >
            ↩
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => dispatch({ type: "REMOVE_SELECTED" })}
            disabled={state.selectedIds.length === 0}
          >
            DELETE
          </button>
          <button
            className={styles.addButton}
            onClick={() => dispatch({ type: "OPEN_DIALOG" })}
          >
            ADD
          </button>
        </div>
      </section>
      {state.isDialogOpen && <AddItemDialog dispatch={dispatch} />}
    </main>
  );
}

export default ListManager;
