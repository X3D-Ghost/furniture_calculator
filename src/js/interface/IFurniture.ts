export interface IBasicDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface IFurnitureParameters extends IBasicDimensions {
  impostCount: number;
  thickness: number;
  tabletopThickness: number;
  facadeDoorThickness: number;
  bottomHeight: number;
  drawersCount: number;
}

export interface IFurnitureItem {
  id: number;
  parameters: IFurnitureParameters;
  parts: IFurnitureItemPart[]
  // items: any[];
}

export interface IFurnitureItemPart {
  thickness: number;
  partWidth: number;
  partLength: number;
}

export interface IDrawerDimensions {
  thickness: number;
  partWidth: number;
  partLength: number;
}

export interface IDrawer {
  type: string;
  title: string;
  dimensions: IDrawerDimensions;
}

export interface IFurnitureSvg extends IBasicDimensions{
  thickness: number,
  x: number,
  y: number,
  z: number
}
