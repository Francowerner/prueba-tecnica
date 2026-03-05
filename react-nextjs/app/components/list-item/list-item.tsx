"use client";

import React from "react";
import styles from "./list-item.module.css";
import type { Item, ListAction } from "@/app/types";

function ListItem({
  item,
  isSelected,
  dispatch,
}: {
  item: Item;
  isSelected: boolean;
  dispatch: React.Dispatch<ListAction>;
}) {
  return (
    <li
      className={`${styles.item} ${isSelected ? styles.selected : ""}`}
      onClick={() => dispatch({ type: "TOGGLE_SELECT", payload: item.id })}
      onDoubleClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
      role="option"
      aria-selected={isSelected}
    >
      {item.text}
    </li>
  );
}

export default ListItem;
