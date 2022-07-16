<script setup>
const emit = defineEmits(['createShape']);

function createShape(type) {
    emit('createShape', { type });
}
</script>

<template>
    <div class="control-board">
        <div class="shape-box" @click="createShape('rectangle')">
            <img src="icons/rectangle.png" alt="Rectangle" />
        </div>
        <div class="shape-box" @click="createShape('circle')">
            <img src="icons/circle.png" alt="Circle" />
        </div>
        <div class="shape-box" @click="createShape('horizontal-line')">
            <img src="icons/horizontal-line.png" alt="Horizontal Line" />
        </div>
        <div class="shape-box" @click="createShape('vertical-line')">
            <img src="icons/vertical-line.png" alt="Vertical Line" />
        </div>
        <div class="shape-box" @click="createShape('text')">
            <img src="icons/text.png" alt="Text" />
        </div>
    </div>
</template>

<style scoped>
.control-board {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    padding: 20px;
    background-color: #ddd;
    border-radius: 6px;
}

.shape-box {
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
    border: 2px solid #ccc;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
}

.shape-box img {
    width: 30px;
    height: 30px;
}
</style>