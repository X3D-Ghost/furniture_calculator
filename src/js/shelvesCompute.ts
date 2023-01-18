import {
  getInnerWidth,
  getInnerDepth,
  getInnerHeight,
} from 'src/js/furniturePartsCompute';

import { IDrawer, IFurnitureParameters } from 'src/js/interface/IFurniture';

export const getDrawers = (parameters: IFurnitureParameters) => {
  const innerWidth: number = getInnerWidth(parameters);
  const innerDepth: number = getInnerDepth(parameters);
  const innerHeight: number = getInnerHeight(parameters);
  const count: number = parameters.drawersCount;
  const guideGap = 15;
  const drawersGap = 20;
  const drawers = [];
  for (let i = 0; i < count; i++) {
    drawers.push({
      width: innerWidth - guideGap * 2,
      height: Math.floor((innerHeight - drawersGap) / count) - drawersGap,
      depth: innerDepth - 10,
    });
  }
  return drawers;
};

export const computeDrawersParts = (
  parameters: IFurnitureParameters
): IDrawer[] => {
  const drawers = getDrawers(parameters);
  const drawersArray: IDrawer[] = [];

  drawers.forEach((item) => {
    drawersArray.push({
      type: 'drawerBottom',
      title: 'ДСП (ящик)',
      dimensions: {
        thickness: parameters.thickness,
        partWidth: item.width,
        partLength: item.depth - parameters.thickness * 2,
      },
    });
    const drawerSide = {
      type: 'drawerSide',
      title: 'ДСП (ящик)',
      dimensions: {
        thickness: parameters.thickness,
        partWidth: item.depth,
        partLength: item.height,
      },
    };
    const drawerFront = {
      type: 'drawerFront',
      title: 'ДСП (ящик)',
      dimensions: {
        thickness: parameters.thickness,
        partWidth: item.width - parameters.thickness * 2,
        partLength: item.height,
      },
    };
    const drawerBack = {
      ...drawerFront,
      type: 'drawerBack',
    };
    drawersArray.push(<IDrawer>drawerSide);
    drawersArray.push(<IDrawer>drawerSide);
    drawersArray.push(<IDrawer>drawerFront);
    drawersArray.push(<IDrawer>drawerBack);
  });
  return drawersArray;
};
