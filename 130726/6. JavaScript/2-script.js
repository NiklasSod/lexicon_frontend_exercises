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

const productsButton = document.getElementById("btn-show");
const listElement = document.getElementById("product-list");

productsButton.addEventListener("click", function() {
  if(listElement.children.length > 0) return;

  
  produkter.map(p => {
    const productListRow = document.createElement("li");
    productListRow.innerHTML =
      `<div class="product">
        <span class="product-name">Product: ${p.namn}</span>
        <span class="product-price">$${Math.floor(p.pris / 10)}.9</span>
      </div>`
    listElement.appendChild(productListRow);
  })
});