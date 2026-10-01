export const productTypesByCategory = {
  Men: [
    "Shirts",
    "T-Shirts",
    "Polo",
    "Cord Set",
    "Drop Shoulder",
    "Linen Trousers",
    "Baggy Jeans",
    "Jorts",
    "Shorts",
  ],
  Women: ["Tops", "Dresses", "Cord Set", "Trousers", "Jeans", "Skirts", "Shorts"],
  Accessories: ["Bags", "Belts", "Caps", "Jewellery", "Other"],
} as const;

export const shopCategories = Object.keys(productTypesByCategory) as Array<keyof typeof productTypesByCategory>;

export function categoryKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}
