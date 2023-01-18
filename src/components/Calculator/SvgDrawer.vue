<template>
<!--  Drawer-->
  <rect :width="backSide.width" :height="backSide.height" :x="backSide.x" :y="backSide.y" :fill="props.color" :stroke="props.stroke" />
   <rect :width="leftSide.width" :height="leftSide.height" :x="leftSide.x" :y="leftSide.y" :fill="props.color" :stroke="props.stroke" />
   <rect :width="rightSide.width" :height="rightSide.height" :x="rightSide.x" :y="rightSide.y" :fill="props.color" :stroke="props.stroke" />
   <rect :width="bottomSide.width" :height="bottomSide.height" :x="bottomSide.x" :y="bottomSide.y" :fill="props.color" :stroke="props.stroke" />
  <!--  Drawer-->
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  dimensions: {
    type: Object,
    default() {
      return {
        width: 0,
        height: 0,
        depth: 0,
        thickness: 0,
        x: 0,
        y: 0,
        z: 0,
      }
    },
    required: true,
  },
  sideView: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#fff'
  },
  stroke: {
    type: String,
    default: '#000'
  }
})

const leftSide = computed(() => {
  return {
    width: props.sideView ? props.dimensions?.depth : props.dimensions?.thickness,
    height: props.dimensions?.height,
    x: props.sideView ? props.dimensions?.z : props.dimensions?.x,
    y: props.dimensions?.y,
  }
})
const rightSide = computed(() => {
  return {
    width: props.sideView ? props.dimensions?.depth : props.dimensions?.thickness,
    height: props.dimensions?.height,
    x: props.sideView ? props.dimensions.z : props.dimensions?.x + props.dimensions?.width - props.dimensions?.thickness,
    y: props.dimensions?.y,
  }
})

const backSide = computed(() => {
  return {
    width: props.sideView ? 3 : props.dimensions?.width,
    height: props.dimensions?.height,
    x: props.sideView ? props.dimensions?.z + props.dimensions?.depth : props.dimensions?.x,
    y: props.dimensions?.y,
  }
})
const bottomSide = computed(() => {
  return {
    width: props.sideView ? props.dimensions?.depth : props.dimensions?.width - props.dimensions?.thickness * 2,
    height: props.dimensions?.thickness,
    x: props.sideView ? props.dimensions?.z : props.dimensions?.x + props.dimensions?.thickness,
    y: props.dimensions?.y + props.dimensions?.height - props.dimensions?.thickness,
  }
})
</script>

<style scoped>

</style>
