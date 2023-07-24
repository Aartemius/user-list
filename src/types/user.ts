export enum Color {
  RED = 'RED',
  GREEN = 'GREEN', 
  BLUE = 'BLUE'
}

export interface User {
  color: Color;
  name: string;
  speed: number;
  time: number;
}