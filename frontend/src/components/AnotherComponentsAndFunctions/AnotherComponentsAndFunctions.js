export const allCategories = [
  "Calças",
  "Camisetas",
  "Casacos",
  "Chapéus",
  "Cintos",
  "Cropped",
  "Jaquetas",
  "Jeans",
  "Joias",
  "Lenços",
  "Meias",
  "Moda fitness",
  "Moleton",
  "Pijamas",
  "Roupas íntimas",
  "Saias",
  "Short",
  "Shorts",
  "T-shirt",
  "Vestidos",
];

export const sizes = ["PP", "P", "M", "G", "GG", "EXG"];

export const formatPrice = (price) => {
  if (price !== undefined) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  } else {
    return "";
  }
};

export const PageColor = (color) => {
  document.body.style.backgroundColor = color;
  return () => {
    document.body.style.backgroundColor = "";
  };
};

export const estadosBrasil = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
