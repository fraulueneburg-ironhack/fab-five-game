let colorsLightArr = ["red", "green", "blue", "white", "grey"];
let colorsDarkArr = ["pink", "neongreen", "cyan", "yellow", "purple"];

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

let shapes = ["chair", "bottle", "book", "ghost", "mouse"];

let itemsLightArr = shapes.map((shape, index) => {
  return {
    shape,
    color: colorsLightArr[index],
    originalColor: colorsLightArr[index],
  };
});

let itemsDarkArr = shapes.map((shape, index) => {
  return {
    shape,
    color: colorsDarkArr[index],
    originalColor: colorsDarkArr[index],
  };
});
