export enum Model {
  SeLECT2,
  SeLECT_ASyS,
  SeLECT_EEG,
}

export interface ModelData {
  min: number[][]
  max: number[][]
  value: number[][]
  supportedToMonth?: number[]
}
