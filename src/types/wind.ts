import { Mode } from "./mode";

export type Wind = "east" | "south" | "west" | "north";

export const windsForMode = {
  4: ["east", "south", "west", "north"],
  3: ["east", "south", "west"],
  2: ["east", "west"],
};

export const windOptions: { label: string; value: Wind }[] = [
  { label: "동", value: "east" },
  { label: "남", value: "south" },
  { label: "서", value: "west" },
  { label: "북", value: "north" },
];

export const translateWind = (
  wind: Wind,
  mode: Mode,
  names = ["동", "남", "서", "북"]
) => names[windsForMode[mode].indexOf(wind)];
