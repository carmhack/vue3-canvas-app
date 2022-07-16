## Vue 3 Canvas App
Questa repository contiene un'app realizzata in Vue 3 con la Composition API.
Permette la creazione, la modifica e lo spostamento di alcune forme (rettangolo, cerchio, linea, testo) su una canvas.
**N.B.** l'app ha un utilizzo didattico.

#### Componenti
- **Board**: gestisce la canvas (draw e d&d). 
```js
const props = defineProps(['shapes']);
const emit = defineEmits(['moveShape', 'selectShape']);
```
- **ControlBoard**: gestisce i pulsanti per la creazione delle forme.
```js
const emit = defineEmits(['createShape']);
```
- **Sidebar**: mostra le proprietà della forma selezionata, permettendone la modifica e la cancellazione.
```js
const props = defineProps(['selectedShape']);
const emit = defineEmits(['changeProp', 'removeShape']);
```
- **App**: gestisce lo stato dell'app.
```js
const state = reactive({
  shapes: [],
  selectedShape: null,
  selectedShapeIndex: -1
});
```

#### Utilizzo

```js
npm i
npm run dev
```
