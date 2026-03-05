# Technical Proof — List Manager

Aplicación para gestionar una lista de cadenas de texto, desarrollada en dos versiones: **React (Next.js)** y **Vanilla JS**.

## Cómo instalar y ejecutar

### React (Next.js)

```bash
# Instalar dependencias
pnpm i

# Ejecutar en modo desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Vanilla JS

No requiere instalación. Abrir `vanilla/index.html` directamente en el navegador.

## Decisiones técnicas

### React

- **Next.js con App Router**: Elegido por ser el estándar actual del ecosistema React, con optimización automática de fuentes (Montserrat vía `next/font`) y soporte nativo de CSS Modules.
- **useReducer en lugar de useState**: El estado de la aplicación involucra múltiples acciones interrelacionadas (agregar, eliminar, seleccionar, deshacer). `useReducer` centraliza la lógica de transiciones de estado en un solo lugar, facilitando el mantenimiento, el testing y la trazabilidad de cambios. Es el mismo patrón que usa Redux internamente.
- **Discriminated unions para las acciones**: Cada acción del reducer tiene un tipo literal específico con su propio payload tipado. Esto garantiza type-safety completo: TypeScript detecta en tiempo de compilación si falta manejar una acción o si el payload tiene un tipo incorrecto.
- **CSS Modules**: Permiten estilos aislados por componente sin colisiones de nombres, y facilitan mapear los estilos 1:1 desde el diseño en Adobe XD.
- **Historial de undo como stack de snapshots**: Antes de cada operación que modifica la lista, se guarda una copia del estado anterior en un array. El undo simplemente restaura el último snapshot. Es una implementación simple y predecible del patrón Command/Memento.
- **IDs únicos con `crypto.randomUUID()`**: Cada item tiene un ID generado por el browser (Web Crypto API). Esto evita depender de índices de array, que son frágiles ante reordenamientos o eliminaciones.
- **Componentes con responsabilidad única**: `ListItem` recibe `isSelected` como booleano en lugar del array completo de `selectedIds`. El componente no necesita conocer la estructura del estado global, solo si está seleccionado o no.

### Vanilla JS

- **Mismo modelo de estado que React**: Un objeto `state` con `items`, `selectedIds` e `history`, y una función `render()` que sincroniza el DOM con el estado actual después de cada cambio.
- **Dialog siempre en el DOM, toggle con CSS**: A diferencia de React (donde el componente se monta/desmonta condicionalmente), el dialog siempre existe en el HTML y se muestra/oculta con una clase `.open`. Esto simplifica las animaciones de entrada y salida usando CSS transitions.
- **Event delegation**: Los event listeners de cada item se asignan al momento de crear los elementos en la función `render()`.

## Funcionalidades implementadas

- Añadir entradas de texto (no permite entradas vacías)
- Selección individual y múltiple de items
- Eliminar items seleccionados (botón deshabilitado si no hay selección)
- Eliminar item individual con doble click
- Deshacer último cambio (botón deshabilitado si no hay historial)
- Animación de entrada y salida del dialog
- Diseño responsive fiel al mockup de Adobe XD
