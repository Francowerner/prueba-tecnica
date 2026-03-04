"use client"

import React from 'react'
import styles from './item-list.module.css'
import ListItem from '../list-item/list-item'
import type { Item, ListAction } from '@/app/types'

function ItemList({ items, selectedIds, dispatch }: {
  items: Item[];
  selectedIds: string[];
  dispatch: React.Dispatch<ListAction>;
}) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          isSelected={selectedIds.includes(item.id)}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default ItemList