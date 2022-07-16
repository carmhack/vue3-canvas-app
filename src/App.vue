<script setup>
  import ControlBoard from './components/ControlBoard.vue';
  import Board from './components/Board.vue';
  import Sidebar from './components/Sidebar.vue';
  import { reactive } from '@vue/reactivity';
  import { createShape, SHAPE_TYPES } from './utils/shape-factory';

  const state = reactive({
    shapes: [],
    selectedShape: null,
    selectedShapeIndex: -1,
  });

  function onCreateShape({ type }) {
    state.shapes = [...state.shapes, createShape(type)];
  }

  function onMoveShape({ index, dx, dy }) {
    const shape = state.shapes[index];

    state.shapes = state.shapes.map((item, i) => {
      if (i === index) {
        const newShape = {
          ...shape,
          x: shape.x + dx,
          y: shape.y + dy
        };

        if (
          item.type === SHAPE_TYPES.horizontalLine || 
          item.type === SHAPE_TYPES.verticalLine
        ) {
          newShape.x2 = shape.x2 + dx;
          newShape.y2 = shape.y2 + dy;
        }

        return newShape;
      }
      return item;
    });
  }

  function onSelectShape({ index }) {
    if (index !== -1) {
      state.selectedShape = state.shapes[index];
      state.selectedShapeIndex = index;
    }
  }
  
  function onChangeProp({ prop, newValue }) {
    const shape = state.shapes[state.selectedShapeIndex];
    state.shapes = state.shapes.map((item, i) => {
      if (i === state.selectedShapeIndex) {
        const newShape = {
          ...shape,
          [prop]: newValue,
        };

        return newShape;
      }
      return item;
    });
  }

  function onRemoveShape() {
    if (state.selectedShape) {
      state.shapes = state.shapes.filter((item, i) => i !== state.selectedShapeIndex);
      state.selectedShape = null;
      state.selectedShapeIndex = -1;
    }
  }
</script>

<template>
  <div class="container">
    <Board
      :shapes="state.shapes"
      @moveShape="onMoveShape"
      @selectShape="onSelectShape"
    />

    <ControlBoard
      @createShape="onCreateShape"
    />

    <Sidebar
      :selectedShape="state.selectedShape"
      @changeProp="onChangeProp"
      @removeShape="onRemoveShape"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}
</style>
