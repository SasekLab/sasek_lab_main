export interface Point {
  x: number; // current x position
  y: number; // current y position
  ox: number; // original x position
  oy: number; // original y position
  z: number; // displacement on the z-axis (bulge)
  vz: number; // velocity on the z-axis for springiness
}
