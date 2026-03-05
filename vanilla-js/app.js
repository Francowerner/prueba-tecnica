const itemListEl = document.getElementById("itemList");
const undoBtn = document.getElementById("undoBtn");
const deleteBtn = document.getElementById("deleteBtn");
const addBtn = document.getElementById("addBtn");
const overlay = document.getElementById("overlay");
const dialogInput = document.getElementById("dialogInput");
const dialogAddBtn = document.getElementById("dialogAddBtn");
const dialogCancelBtn = document.getElementById("dialogCancelBtn");

const state = {
  items: [],
  selectedIds: [],
  history: [],
};

function generateId() {
  return crypto.randomUUID();
}

function render() {
  itemListEl.innerHTML = "";

  state.items.forEach((item) => {
    const itemEl = document.createElement("li");
    itemEl.classList.add("item");
    itemEl.textContent = item.text;
    itemEl.setAttribute("role", "option");
    itemEl.setAttribute("aria-selected", state.selectedIds.includes(item.id));

    if (state.selectedIds.includes(item.id)) {
      itemEl.classList.add("selected");
    }

    itemEl.addEventListener("click", () => {
      toggleSelect(item.id);
    });

    itemEl.addEventListener("dblclick", () => {
      removeItem(item.id);
    });

    itemListEl.appendChild(itemEl);
  });

  deleteBtn.disabled = state.selectedIds.length === 0;
  undoBtn.disabled = state.history.length === 0;
}

function addItem(text) {
  if (text.trim() === "") return;

  state.history.push([...state.items]);
  state.items.push({
    id: generateId(),
    text: text.trim(),
  });

  render();
}

function removeSelected() {
  if (state.selectedIds.length === 0) return;

  state.history.push([...state.items]);
  state.items = state.items.filter(
    (item) => !state.selectedIds.includes(item.id),
  );
  state.selectedIds = [];

  render();
}

function removeItem(id) {
  state.history.push([...state.items]);
  state.items = state.items.filter((item) => item.id !== id);
  state.selectedIds = state.selectedIds.filter(
    (selectedId) => selectedId !== id,
  );

  render();
}

function toggleSelect(id) {
  if (state.selectedIds.includes(id)) {
    state.selectedIds = state.selectedIds.filter(
      (selectedId) => selectedId !== id,
    );
  } else {
    state.selectedIds.push(id);
  }

  render();
}

function undo() {
  if (state.history.length === 0) return;

  state.items = state.history.pop();
  state.selectedIds = [];

  render();
}

function openDialog() {
  dialogInput.value = "";
  overlay.classList.add("open");
  setTimeout(() => dialogInput.focus(), 100);
}

function closeDialog() {
  overlay.classList.remove("open");
}

addBtn.addEventListener("click", openDialog);
deleteBtn.addEventListener("click", removeSelected);
undoBtn.addEventListener("click", undo);

dialogAddBtn.addEventListener("click", () => {
  addItem(dialogInput.value);
  closeDialog();
});
//
dialogCancelBtn.addEventListener("click", closeDialog);

dialogInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem(dialogInput.value);
    closeDialog();
  }
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeDialog();
  }
});

render();
