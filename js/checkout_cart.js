    // Attach one listener to handle all copy buttons:
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent.trim();
        navigator.clipboard.writeText(text)
          .then(() => {
            // Optional feedback: change button text briefly
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = original, 1500);
          })
          .catch(err => {
            console.error('Copy failed', err);
          });
      });
    });

  document.addEventListener('DOMContentLoaded', () => {
    // Toggle E-Transfer details
    const etDetails = document.getElementById('eTransferDetails');
    const bankRadio = document.getElementById('paymentBank');
    const codRadio  = document.getElementById('paymentCOD');

    function toggleDetails() {
      if (bankRadio.checked) {
        etDetails.classList.remove('d-none');
      } else {
        etDetails.classList.add('d-none');
      }
    }

    // Initialize visibility
    toggleDetails();

    // Watch for changes
    bankRadio.addEventListener('change', toggleDetails);
    codRadio.addEventListener('change',  toggleDetails);

    // Copy-button logic
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent.trim();
        navigator.clipboard.writeText(text)
          .then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = orig, 1500);
          })
          .catch(console.error);
      });
    });
  });

    document.addEventListener('DOMContentLoaded', () => {
      // 1) Read cart from localStorage
      const cart = JSON.parse(localStorage.getItem('myCart') || '{}');

      // 2) Compute totals & render summary
      const summaryList = document.getElementById('order-summary-list');
      let totalCount = 0;
      let totalCost  = 0;

      // Render each item
      for (const name in cart) {
        const { price, count } = cart[name];
        const itemCost = price * count;
        totalCount += count;
        totalCost  += itemCost;

        const li = document.createElement('li');
        li.className = 'd-flex justify-content-between mb-2';
        li.innerHTML = `
          <span>${name} × ${count}</span>
          <strong>$${itemCost.toFixed(2)}</strong>
        `;
        summaryList.appendChild(li);
      }

      // Subtotal row
      const subLi = document.createElement('li');
      subLi.className = 'd-flex justify-content-between border-top pt-2';
      subLi.innerHTML = `
        <span>Subtotal</span>
        <strong>$${totalCost.toFixed(2)}</strong>
      `;
      summaryList.appendChild(subLi);

      // Shipping row
      const shipLi = document.createElement('li');
      shipLi.className = 'd-flex justify-content-between';
      shipLi.innerHTML = `
        <span>Shipping</span>
        <strong>Free shipping</strong>
      `;
      summaryList.appendChild(shipLi);

      // 3) Toggle E-Transfer details
      const etDetails = document.getElementById('eTransferDetails');
      const bankRadio = document.getElementById('paymentBank');
      const codRadio  = document.getElementById('paymentCOD');
      function toggleDetails() {
        etDetails.classList.toggle('d-none', !bankRadio.checked);
      }
      toggleDetails();
      bankRadio.addEventListener('change', toggleDetails);
      codRadio.addEventListener('change',  toggleDetails);

      // 4) Copy-button logic
      document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.target;
          const text = document.getElementById(targetId).textContent.trim();
          navigator.clipboard.writeText(text).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = orig, 1500);
          });
        });
      });

    });