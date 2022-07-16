<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { isMouseInsideShape } from '../utils/shape-drag';
import { SHAPE_TYPES } from "../utils/shape-factory";

const props = defineProps(['shapes']);
const emit = defineEmits(['moveShape', 'selectShape']);

const canvas = ref(null);
let context = null;
let currentShapeIndex = null;
let isDragging = false;
let startX = null;
let startY = null;

onMounted(() => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  context = canvas.value.getContext("2d");
  context.font = "30px Arial";
  drawShapes();
});

onUpdated(() => {
  drawShapes();
})

function drawShapes() {
  context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  props.shapes.forEach(shape => {
    if (shape.type === SHAPE_TYPES.rectangle) {
      drawRectangle(shape);
    } else if (shape.type === SHAPE_TYPES.circle) {
      drawCircle(shape);
    } else if (shape.type === SHAPE_TYPES.horizontalLine || shape.type === SHAPE_TYPES.verticalLine) {
      drawLine(shape);
    } else if (shape.type === SHAPE_TYPES.text) {
      drawText(shape);
    } 
  })
}

function drawText(shape) {
  context.fillText(shape.text, shape.x, shape.y);
}

function drawRectangle(shape) {
  // context.value.fillStyle = shape.color;
  context.strokeStyle = "#000000";
  context.strokeRect(shape.x, shape.y, shape.width, shape.height);
}

function drawCircle(shape) {
  context.beginPath();
  context.arc(shape.x, shape.y, shape.r, shape.sAngle, shape.eAngle);
  context.stroke();
}

function drawLine(shape) {
  context.beginPath();
  context.moveTo(shape.x, shape.y);
  context.lineTo(shape.x2, shape.y2);
  context.stroke();
}

function onMouseDown(event) {
  startX = event.clientX;
  startY = event.clientY;

  props.shapes.forEach((shape, i) => {
    if (isMouseInsideShape(startX, startY, shape)) {
      currentShapeIndex = i;
      isDragging = true;
      emit('selectShape', { index: currentShapeIndex });
      return;
    }
  })
}

function stopDragging() {
  if (!isDragging) {
    return;
  }

  isDragging = false;
  currentShapeIndex = null;
  startX = null;
  startY = null;
  emit('selectShape', { index: -1 });
}

function onMouseMove(event) {
  if (!isDragging) {
    return;
  }
  
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const dx = mouseX - startX;
  const dy = mouseY - startY;

  emit('moveShape', { index: currentShapeIndex, dx, dy });

  startX = mouseX;
  startY = mouseY;
}
</script>

<template>
  <canvas
    ref="canvas"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="stopDragging"
    @mouseout="stopDragging"
  ></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #eee;
  cursor: move;
}
</style>