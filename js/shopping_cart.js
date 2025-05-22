  document.addEventListener("DOMContentLoaded", () => {
    const cartList    = document.getElementById("cart-items");
    const cartBadge   = document.querySelector("#offcanvasCart .badge");
    const clearBtn    = document.getElementById("clear-cart");

    // Load or init cart: { name: { price: number, count: number } }
    let cart = JSON.parse(localStorage.getItem("myCart") || "{}");

    function saveCart() {
      localStorage.setItem("myCart", JSON.stringify(cart));
    }

    function computeTotals() {
      let totalCount = 0, totalCost = 0;
      for (let name in cart) {
        totalCount += cart[name].count;
        totalCost  += cart[name].count * cart[name].price;
      }
      return { totalCount, totalCost };
    }

    function updateCartUI() {
      cartList.innerHTML = "";

      // 1) render each item
      for (let name in cart) {
        const { price, count } = cart[name];
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
          <div>
            <h6 class="my-0">
              ${name}
              <span class="badge bg-secondary rounded-pill ms-2">${count}</span>
            </h6>
          </div>
          <div>
            <span class="text-body-secondary me-3">
              $${(price * count).toFixed(2)}
            </span>
            <button class="btn btn-sm btn-outline-danger remove-one" data-name="${name}">
              &times;
            </button>
          </div>
        `;
        cartList.appendChild(li);
      }

      // 2) total row
      const { totalCount, totalCost } = computeTotals();
      cartBadge.textContent = totalCount;

      const totalLi = document.createElement("li");
      totalLi.className = "list-group-item d-flex justify-content-between";
      totalLi.innerHTML = `
        <span>Total (USD)</span>
        <strong>$${totalCost.toFixed(2)}</strong>
      `;
      cartList.appendChild(totalLi);

      // hook up remove-one buttons
      cartList.querySelectorAll(".remove-one").forEach(btn => {
        btn.addEventListener("click", () => {
          const name = btn.dataset.name;
          cart[name].count--;
          if (cart[name].count <= 0) delete cart[name];
          saveCart();
          updateCartUI();
        });
      });
    }

    // 3) wire up Add-to-Cart links/buttons
    document.querySelectorAll(".add-to-cart").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        const name  = el.dataset.name;
        const price = parseFloat(el.dataset.price);

        if (!cart[name]) {
          cart[name] = { price, count: 0 };
        }
        cart[name].count++;
        saveCart();
        updateCartUI();
      });
    });

    // 4) Clear Cart
    clearBtn.addEventListener("click", () => {
      if (confirm("Empty your cart?")) {
        cart = {};
        saveCart();
        updateCartUI();
      }
    });

    // Initial UI render
    updateCartUI();
  });
