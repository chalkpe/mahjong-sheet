export type Wind = "east" | "south" | "west" | "north";

export type AgariType = "tsumo" | "ron" | "ryuukyoku";

export interface Round {
  ba: Wind;
  kyoku: number;
  honba: number;
  east: number;
  south: number;
  west: number;
  north: number;
  agari: Wind[];
  houjuu?: Wind;
  type: AgariType;
  fu: number[];
  han: number[];
  hai: string[];
}

export const winds = {
  4: ["east", "south", "west", "north"],
  3: ["east", "south", "west"],
  2: ["east", "west"],
};

export const translateWind = (wind: Wind, mode: 2 | 3 | 4, names = ["동", "남", "서", "북"]) =>
  names[winds[mode].indexOf(wind)];

export const translateType = (type: AgariType) =>
  type === "tsumo" ? "쯔모" : type === "ron" ? "론" : "유국";