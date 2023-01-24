import {
  getInnerWidth,
  getInnerDepth,
  getInnerHeight,
} from 'src/js/furniturePartsCompute';

import { IBasicDimensions, IDrawer, IFurnitureParameters } from 'src/js/interface/IFurniture';

export const getDrawers = (parameters: IFurnitureParameters):IBasicDimensions[] => {
  const innerWidth: number = getInnerWidth(parameters);
  const innerDepth: number = getInnerDepth(parameters);
  const innerHeight: number = getInnerHeight(parameters);
  const count: number = parameters.drawersCount;
  const guideGap = <number>15;
  const drawersGap = <number>20;
  const drawers:IBasicDimensions[] = [];
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
  const drawers:IBasicDimensions[] = getDrawers(parameters);
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
    const drawerSide: IDrawer = {
      type: 'drawerSide',
      title: 'ДСП (ящик)',
      dimensions: {
        thickness: parameters.thickness,
        partWidth: item.depth,
        partLength: item.height,
      },
    };
    const drawerFront: IDrawer = {
      type: 'drawerFront',
      title: 'ДСП (ящик)',
      dimensions: {
        thickness: parameters.thickness,
        partWidth: item.width - parameters.thickness * 2,
        partLength: item.height,
      },
    };
    const drawerBack :IDrawer = {
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
