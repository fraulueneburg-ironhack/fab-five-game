let colorsLightArray = ["red", "green", "blue", "white", "grey"];
let colorMap = {
  red: "var(--chair-color)",
  green: "var(--bottle-color)",
  blue: "var(--book-color)",
  white: "var(--ghost-color)",
  grey: "var(--mouse-color)",
  pink: "var(--chair-color)",
  neongreen: "var(--bottle-color)",
  cyan: "var(--book-color)",
  yellow: "var(--ghost-color)",
  purple: "var(--mouse-color)",
};

let colorsLightArr = [
  {
    name: "color01",
    alias: "red",
    cssColor: "var(--chair-color)",
  },
  {
    name: "color02",
    alias: "green",
    cssColor: "var(--bottle-color)",
  },
  {
    name: "color03",
    alias: "blue",
    cssColor: "var(--book-color)",
  },
  {
    name: "color04",
    alias: "white",
    cssColor: "var(--ghost-color)",
  },
  {
    name: "color05",
    alias: "grey",
    cssColor: "var(--mouse-color)",
  },
];

let colorsDarkArr = ["pink", "neongreen", "cyan", "yellow", "purple"];

let shapes = ["chair", "bottle", "book", "ghost", "mouse"];
let itemsLightArr = shapes.map((shape, index) => {
  return {
    shape,
    color: colorsLightArr[index],
    originalColor: colorsLightArr[index],
  };
});

// second set items
let itemsDarkArr = [
  {
    name: "chair",
    shape: "chair",
    color: colorsDarkArr[0],
    originalColor: colorsDarkArr[0],
  },
  {
    name: "bottle",
    shape: "bottle",
    color: colorsDarkArr[1],
    originalColor: colorsDarkArr[1],
  },
  {
    name: "book",
    shape: "book",
    color: colorsDarkArr[2],
    originalColor: colorsDarkArr[2],
  },
  {
    name: "ghost",
    shape: "ghost",
    color: colorsDarkArr[3],
    originalColor: colorsDarkArr[3],
  },
  {
    name: "mouse",
    shape: "mouse",
    color: colorsDarkArr[4],
    originalColor: colorsDarkArr[4],
  },
];
