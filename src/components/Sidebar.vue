<script setup>
import { EDITABLE_PROPS } from '../utils/shape-factory';
const props = defineProps(['selectedShape']);
const emit = defineEmits(['changeProp', 'removeShape']);

function handleChange(event, prop) {
  emit('changeProp', { prop, newValue: event.target.value });
}

function isDisabled(prop) {
  return !EDITABLE_PROPS.includes(prop);
}

function handleRemove() {
  const result = confirm("Do you want to delete that shape?");

  if (result) {
    emit('removeShape');
  }
}
</script>

<template>
  <div class="sidebar">
    <h1>Props</h1>

    <div v-if="props.selectedShape" class="info">
      <div class="info-box" v-for="(prop, i) in Object.keys(props.selectedShape)" :key="i">
        <div class="box-label">
          <label>{{ prop }}:</label>
        </div>
        <div class="box-input">
          <input type="text" :value="props.selectedShape[prop]" @input="handleChange($event, prop)"
            :disabled="isDisabled(prop)" />
        </div>
      </div>

      <div class="actions">
        <div class="remove-btn" @click="handleRemove">
          <img src="/icons/remove.png" alt="Remove shape" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 350px;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: #303952;
  color: #fff;
  border-left: 2px solid #333;
}

.info {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
}

.info-box {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-label {
  width: 100%;
  text-align: right;
}

.info-box label {
  font-size: 18px;
  margin-right: 10px;
}

.info-box input {
  font-size: 18px;
  padding: 6px 12px;
}

.actions {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.remove-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}

.remove-btn:hover,
.remove-btn:focus {
  background-color: #c44569;
  border: 2px solid #fff;
  transition: .3s;
}

.remove-btn img {
  width: 30px;
  height: auto;
}
</style>