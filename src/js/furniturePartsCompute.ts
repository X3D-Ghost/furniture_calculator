import { IFurnitureParameters } from 'src/js/interface/IFurniture';

export const getInnerWidth = (parameters: IFurnitureParameters): number =>
  parameters.width -
  parameters.thickness * 2 -
  parameters.thickness * parameters.impostCount;
export const getInnerDepth = (parameters: IFurnitureParameters): number =>
  parameters.depth - parameters.thickness - parameters.facadeDoorThickness;
export const getInnerHeight = (parameters: IFurnitureParameters): number =>
  parameters.height -
  parameters.thickness * 2 -
  parameters.bottomHeight -
  parameters.tabletopThickness;
