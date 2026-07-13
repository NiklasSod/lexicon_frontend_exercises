const produkter = [
 { id: 1, namn: "Kodnings-kaffemugg", pris: 149, kategori: 
"Merch" },
 { id: 2, namn: "Mekaniskt Tangentbord", pris: 1299, kategori: 
"Hårdvara" },
 { id: 3, namn: "Ergonomisk Mus", pris: 799, kategori: 
"Hårdvara" },
 { id: 4, namn: "Klistermärke 'JS is King'", pris: 29, 
kategori: "Merch" },
 { id: 5, namn: "Skärmrengöring", pris: 89, kategori: 
"Tillbehör" },
 { id: 6, namn: "4K Webbkamera", pris: 1495, kategori: 
"Hårdvara" },
 { id: 7, namn: "Stilren Musmatta (Stor)", pris: 249, kategori: 
"Tillbehör" },
 { id: 8, namn: "Programmerar-hoodie", pris: 599, kategori: 
"Merch" },
 { id: 9, namn: "USB-C Hub (6-i-1)", pris: 449, kategori: 
"Hårdvara" },
 { id: 10, namn: "Blåljusglasögon", pris: 349, kategori: 
"Tillbehör" }
];

const filteredProducts = produkter.filter(product => product.kategori === "Hårdvara");
console.log(filteredProducts); // products [2, 3, 6, 9]

const productNamesToUpper = produkter.map(product => product.namn.toUpperCase());
console.log(productNamesToUpper); // ["KODNINGS-KAFFEMUGG", ...]

const totalPrice = produkter.reduce((a, c) => a + c.pris, 0);
console.log(totalPrice); // 5506
