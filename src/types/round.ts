import { AgariType, RyuukyokuType } from "./agari";
import { Wind } from "./wind";

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
  ryuukyokuType?: RyuukyokuType;
  fu: number[];
  han: number[];
  kazoe?: boolean[];
  hai: string[];
}
