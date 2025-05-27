  // 1) Our product “database”
  const products = {
    "King-Roll(1gx10)": {
      title:       "King-Roll(1g×10)",
      imageUrl:    "images/product-item-4.jpg",
      description: "A premium 1-gram King-Roll pack, perfect for sharing with friends.",
      price:       20.00
    },
    "Queen-Deal(0.5gx20)": {
      title:       "Queen-Deal(0.5g×20)",
      imageUrl:    "images/product-item-5.jpg",
      description: "Twenty 0.5-gram Queen-Deal prerolls—luxury and value combined.",
      price:       20.00
    },
    "Queen-Roll(0.5gx10)": {
      title:       "Queen-Roll(0.5g×10)",
      imageUrl:    "images/product-item-3.jpg",
      description: "Ten 0.5-gram Queen-Rolls with a smooth, floral profile.",
      price:       15.00
    },
    "Broke-King(1gx5)": {
      title:       "Broke-King(1g×5)",
      imageUrl:    "images/product-item-6.jpg",
      description: "Five 1-gram Broke-King joints—premium quality at an entry price.",
      price:       15.00
    }
  };

  // 2) Utility to read ?product=YourKey
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // 3) When DOM is ready...
  document.addEventListener("DOMContentLoaded", () => {
    const key = getQueryParam("product");
    const data = products[key];

    if (!data) {
      // fallback if key is missing/invalid
      document.getElementById("product-detail")
              .innerHTML = "<p>Sorry, product not found.</p>";
      return;
    }

    // 4) Inject into the DOM
    document.getElementById("p-title").textContent       = data.title;
    const img = document.getElementById("p-image");
    img.src = data.imageUrl;
    img.alt = data.title;
    document.getElementById("p-description").textContent = data.description;
    document.getElementById("p-price").textContent       = `$${data.price.toFixed(2)}`;

    // 5) Wire up the Add-to-Cart button
    const atc = document.querySelector(".add-to-cart");
    atc.dataset.name  = data.title;
    atc.dataset.price = data.price;
    // (Reuse your existing cart logic by including shopping_cart.js here)
  });
