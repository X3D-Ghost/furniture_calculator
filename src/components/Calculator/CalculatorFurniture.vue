<template>
  <div class="furniture">

    <div class="furniture__visual furniture-visual__list">
      <div class="furniture-visual">
        <svg id="furniture-front" xmlns="http://www.w3.org/2000/svg" class="furniture-visual__image" :viewBox="`0 0 ${parameters.width} ${parameters.height}`" preserveAspectRatio="">
          <rect :width="backSideDimensions.width" :height="backSideDimensions.height" :y="`${parameters.tabletopThickness}`" :fill="parameters.backSideColor" :stroke="parameters.strokeColor" />
          <rect :width="parameters.width" :height="parameters.tabletopThickness" x="0" y="0" class="furniture__tabletop" :fill="parameters.tableTopColor" :stroke="parameters.strokeColor" />
          <rect :width="parameters.width" :height="parameters.bottomHeight" :y="`${parameters.height - parameters.bottomHeight}`" class="furniture__plinth" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="parameters.width" :height="parameters.thickness" x="0" :y="`${parameters.height - parameters.bottomHeight - parameters.thickness}`" class="furniture__bottom" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="side.thickness" :height="side.height" x="0" :y="`${parameters.tabletopThickness}`" class="furniture__side" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="side.thickness" :height="side.height" :x="parameters.width - side.thickness" :y="`${parameters.tabletopThickness}`" class="furniture__side" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="innerWidth" :height="parameters.thickness" :x="parameters.thickness" :y="`${parameters.tabletopThickness}`" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <SvgDrawer v-for="(drawer, index) in SvgDrawers" :key="index" :dimensions="drawer" :color="parameters.drawerColor" :stroke="parameters.strokeColor"/>
        </svg>
      </div>
      <div class="furniture-visual">
        <svg id="furniture-side" xmlns="http://www.w3.org/2000/svg" class="furniture-visual__image" :viewBox="`0 0 ${parameters.depth} ${parameters.height}`" preserveAspectRatio="">
          <rect :width="parameters.depth" :height="parameters.tabletopThickness" x="0" y="0" class="furniture__tabletop" :fill="parameters.tableTopColor" :stroke="parameters.strokeColor" />
          <rect :width="parameters.thickness" :height="parameters.bottomHeight" x="50" :y="`${parameters.height - parameters.bottomHeight}`" class="furniture__plinth" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="innerDepth" :height="parameters.thickness" x="20" :y="`${parameters.height - parameters.bottomHeight - parameters.thickness}`" class="furniture__bottom" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="innerDepth" :height="innerHeight" x="20" :y="`${parameters.tabletopThickness}`" class="furniture__side" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect :width="backSideDimensions.thickness" :height="backSideDimensions.height" :x="innerDepth + 20" :y="`${parameters.tabletopThickness}`"  :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect width="100" :height="parameters.thickness" :x="50" :y="`${parameters.tabletopThickness}`" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <rect width="100" :height="parameters.thickness" :x="parameters.depth - 120" :y="`${parameters.tabletopThickness}`" :fill="parameters.color" :stroke="parameters.strokeColor" />
          <SvgDrawer v-for="(drawer, index) in SvgDrawers" :key="index" :dimensions="drawer" :sideView="true" :color="parameters.drawerColor" :stroke="parameters.strokeColor" />
        </svg>
      </div>
    </div>

    <q-form class="q-gutter-md">
      <q-input
        filled
        type="number"
        v-model.number="parameters.width"
        label="Ширина изделия, мм"
        :min="400"
        :max="1200"
      />
      <q-input
        filled
        type="number"
        v-model.number="parameters.height"
        :min="700"
        :max="2500"
        label="Высота изделия, мм"
      />
      <q-input
        filled
        type="number"
        v-model.number="parameters.depth"
        label="Глубина изделия, мм"
        :min="300"
        :max="600"
      />
      <q-input
        filled
        type="number"
        v-model.number="parameters.tabletopThickness"
        label="Толщина столешницы, мм"
        :min="18"
        :max="40"
      />
      <q-input
        filled
        type="number"
        v-model.number="parameters.facadeDoorThickness"
        label="Толщина фасада, мм"
        :min="16"
        :max="32"
      />
      <q-input
        filled
        type="number"
        v-model.number="parameters.bottomHeight"
        label="Высота цоколя, мм"
        :min="0"
        :max="150"
      />
      <q-input
        filled
        type="number"
        v-model.number="parameters.drawersCount"
        :min="0"
        :max="6"
        label="Количество ящиков, шт"
      />
    </q-form>

    <div>
      Список деталей:
      <ul>
        <li v-for="(part, index) in partsFiltered" :key="index">
          <span>{{ part.title }} {{ `${part.dimensions.partWidth}мм x ${part.dimensions.partLength}мм x ${part.dimensions.thickness}мм ${part.count}шт.`}}</span>
        </li>
      </ul>
    </div>
    <div>
      <q-btn href="" color="white" text-color="black" label="Скачать" target="_blank" download @click="downloadImage" />
      <a id="downloadImage" href="" download=""></a>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import SvgDrawer from 'components/Calculator/SvgDrawer.vue';
import { useFurniturePartsStore } from 'stores/furniturePartsStore.js';

import { computeDrawersParts, getDrawers } from 'src/js/shelvesCompute'
import {getInnerWidth, getInnerDepth} from 'src/js/furniturePartsCompute';
import { IDrawer, IFurnitureItem, IFurnitureSvg } from 'src/js/interface/IFurniture';
import { downloadPngFromSvg } from 'src/js/imgConverter';

const partsStore = useFurniturePartsStore()

const itemId = 1

const item = partsStore.getItem(itemId)

const { parameters } = reactive(<IFurnitureItem>item)

const downloadImage = (e: { preventDefault: () => void; }) => {
  e.preventDefault()
  const imageSource = document.getElementById('furniture-front')
  downloadPngFromSvg(imageSource.outerHTML)
}

const parts = computed(():IDrawer[] => {
  const array: IDrawer[] = []
  //top part
  const topPart = {
    type: 'top',
    title: 'ДСП',
    dimensions: {
      thickness: parameters.thickness,
      partWidth: getInnerWidth(parameters),
      partLength: 100
    }
  }
  array.push(topPart);
  array.push(topPart);
  //bottom part
  array.push({
    type: 'bottom',
    title: 'ДСП',
    dimensions: {
      thickness: parameters.thickness,
      partWidth: parameters.width,
      partLength: getInnerDepth(parameters)
    }
  });
  //side parts
  const sideBottom = {
    type: 'side',
    title: 'ДСП',
    dimensions: {
      thickness: parameters.thickness,
      partWidth: parameters.depth,
      partLength: getInnerDepth(parameters)
    }
  }
  array.push(sideBottom)
  array.push(sideBottom)
  //plinth
  array.push({
    type: 'plinth',
    title: 'ДСП',
    dimensions: {
      thickness: parameters.thickness,
      partWidth: parameters.width,
      partLength: parameters.bottomHeight
    }
  });
  //back cover
  array.push({
    type: 'backSide',
    title: 'ДВП',
    dimensions: {
      thickness: 2,
      partWidth: parameters.width,
      partLength: parameters.height - parameters.tabletopThickness - parameters.bottomHeight,
    }
  });
  //tabletop part
  array.push({
    type: 'tabletop',
    title: 'Столешница',
    dimensions: {
      thickness: parameters.tabletopThickness,
      partWidth: parameters.width,
      partLength: parameters.depth
    }
  });
  if (parameters.drawersCount > 0) {
    const drawers = computeDrawersParts(parameters);
    array.push(...drawers);
  } else {
    //facade
    array.push({
      type: 'facade',
      title: 'Фасад',
      dimensions: {
        thickness: parameters.tabletopThickness,
        partWidth: parameters.width - 2,
        partLength: parameters.height - parameters.tabletopThickness - parameters.bottomHeight - 2
      }
    })
  }
  return array
})

const partsFiltered = computed(()=> {
  const resultArray = []
  console.log(parts.value)
  parts.value.forEach((item) => {
    const foundDuplicate = resultArray.find((result) => ((result.dimensions.partWidth === item.dimensions.partWidth) && (item.dimensions.partLength === result.dimensions.partLength)));
    if (foundDuplicate) {
      console.log({ foundDuplicate })
      foundDuplicate.count += 1;
    } else {
      resultArray.push({ ...item, count: 1 })
    }
  })
  return resultArray
})

watch(parts, () => {
  console.log('changed')
  partsStore.updateParts(1, parts)
})

onMounted(()=>partsStore.updateParts(1, parts))

let innerWidth = computed(() => parameters.width - parameters.thickness * 2 - (parameters.thickness * parameters.impostCount) )
let innerHeight = computed(() => parameters.height - parameters.thickness - parameters.bottomHeight - parameters.tabletopThickness )
let innerDepth = computed(() => parameters.depth - parameters.thickness - parameters.facadeDoorThickness )

const side = computed(() => {
  return {
    width: parameters.width,
    thickness: parameters.thickness,
    height: parameters.height - parameters.tabletopThickness - parameters.thickness - parameters.bottomHeight
  }
})

const SvgDrawers = computed(() => {
  const drawers = getDrawers(parameters)
  if (parameters.drawersCount > 0) {
    const items: IFurnitureSvg[] = []
    drawers.forEach((item: IFurnitureSvg, i: number) => {
      items.push({
        ...item,
        thickness: parameters.thickness,
        x: parameters.thickness + 15,
        y: (item.height + 20) * i + parameters.tabletopThickness + parameters.thickness + 20,
        z: parameters.depth - innerDepth.value - parameters.thickness / 2,
      })
    })
    return items
  } else return []
})

const backSideDimensions = computed(() => {
  return {
    width: parameters.width,
    thickness: 2,
    height: parameters.height - parameters.tabletopThickness - parameters.bottomHeight,
    color: 'beige'
  }
})
</script>

<style scoped lang="scss">
  .furniture {
    display: grid;
    grid-template-columns: 3fr 200px;
    grid-gap: 20px;
    margin: 0 auto;
    max-width: 1200px;
    height: 600px;
    padding: 20px 0;
  &__tabletop {
    //fill: #695525;
  }
    &__plinth {
      //fill: gray;
    }
    &__bottom {
      //fill: lightgrey;
    }
    &__side {
      //fill: lightgrey;
    }
  }
  .furniture-visual {
    max-height: 600px;
    &__list {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 20px;
    }
    &__image {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
</style>
