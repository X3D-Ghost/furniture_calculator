import { defineStore } from 'pinia';
import { IFurnitureItem, IFurnitureItemPart, IFurnitureParameters } from 'src/js/interface/IFurniture';

export const useFurniturePartsStore = defineStore('furnitureParts', {
  state: () => ({
    items: [
      {
        id: 1,
        parameters: {
          width: 800,
          height: 880,
          depth: 400,
          impostCount: 0,
          thickness: 16,
          tabletopThickness: 28,
          facadeDoorThickness: 16,
          bottomHeight: 100,
          drawersCount: 2,
          tableTopColor: '#695525',
          facadeColor: '#ffffff',
          color: '#cbcbcb',
          drawerColor: 'rgba(255,255,255,0.75)',
          backSideColor: 'beige',
          strokeColor: '#757575'
        },
        parts: []
      }
    ]
  }),
  getters: {
    getAll: (state):IFurnitureItem[] => state.items,
    getItem: (state):IFurnitureItem => (id: number) => state.items.find((storeItem) => storeItem.id === id)
  },
  actions: {
    addItem(item: IFurnitureParameters) {
      this.items.push(item);
    },
    updateItem(id: number, data: IFurnitureItem) {
      const target = this.items[id];
      Object.assign(target, data);
    },
    updateParts(id: number, data: IFurnitureItemPart) {
      const target = this.items.find((storeItem) => storeItem.id === id);
      if (target) {
        target.parts = data;
      }
    }
  }
});
