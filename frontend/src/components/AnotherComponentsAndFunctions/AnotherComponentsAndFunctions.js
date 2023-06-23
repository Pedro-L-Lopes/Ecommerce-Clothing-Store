export const allCategories = [
  "T-shirt",
  "Cropped",
  "Short",
  "Moleton",
  "Blusas",
  "Camisetas",
  "Vestidos",
  "Saias",
  "Calças",
  "Jeans",
  "Shorts",
  "Casacos",
  "Jaquetas",
  "Roupas de banho",
  "Roupas íntimas",
  "Pijamas",
  "Bolsas",
  "Acessórios",
  "Joias",
  "Óculos de sol",
  "Chapéus",
  "Cintos",
  "Meias",
  "Lenços",
  "Moda fitness",
];

export const sizes = ["PP", "P", "M", "G", "GG", "EXG"];

export const formatPrice = (price) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};
