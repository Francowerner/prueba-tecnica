"use client"

import React, { useState } from 'react'
import styles from './add-item-dialog.module.css'
import type { ListAction } from '@/app/types'

function AddItemDialog({ dispatch }: { dispatch: React.Dispatch<ListAction> }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim() === '') return; // no permitir vacíos
    dispatch({ type: 'ADD_ITEM', payload: text.trim() });
    setText('');
  };

  return (
    <div className={styles.overlay} onClick={() => dispatch({ type: 'CLOSE_DIALOG' })}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Add item to list</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Type the text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          autoFocus
        />
        <div className={styles.actions}>
          <button className={styles.addButton} onClick={handleAdd}>ADD</button>
          <button className={styles.cancelButton} onClick={() => dispatch({ type: 'CLOSE_DIALOG' })}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}

export default AddItemDialog