window.addEventListener('DOMContentLoaded', () => {
  const supabase = window.supabase;
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }

  const form       = document.getElementById('order-form');
  const btn        = document.getElementById('placeOrderBtn');
  const toastEl    = document.getElementById('orderToast');
  const orderToast = new bootstrap.Toast(toastEl, { delay: 3000 });

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!form) return;

    // 1) Read cart from localStorage
    const cart = JSON.parse(localStorage.getItem('myCart') || '{}');
    const itemNames = Object.keys(cart);
    if (itemNames.length === 0) {
      return alert('Your cart is empty!');
    }

    // 2) Collect form data
    const fd = new FormData(form);
    const firstName = (fd.get('fname') || '').trim();
    const lastName  = (fd.get('lname') || '').trim();
    const email     = (fd.get('email') || '').trim();
    const phone     = (fd.get('phone') || '').trim();
    const province  = (fd.get('province') || '').trim();
    const zip       = (fd.get('zip') || '').trim();
    const city      = (fd.get('city') || '').trim();
    const houseAdd  = (fd.get('houseadd') || '').trim();

    // 2a) Validate required fields
    if (!firstName) {
      return alert('Please enter your first name.');
    }
    if (!lastName) {
      return alert('Please enter your last name.');
    }
    if (!email) {
      return alert('Please enter your email.');
    }
    if (!phone) {
      return alert('Please enter your phone number.');
    }
    if (!province) {
      return alert('Please enter your province.');
    }
    if (!zip) {
      return alert('Please enter your ZIP code.');
    }
    if (!city) {
      return alert('Please enter your city.');
    }
    if (!houseAdd) {
      return alert('Please enter your house address.');
    }

    // 2b) Build the order payload
    const order = {
      first_name: firstName,
      last_name:  lastName,
      email:      email,
      phone:      phone,
      province:   province,
      zip:        zip,
      street:     houseAdd,
      apartment:  (fd.get('apartment') || '').trim() || null,
      city:       city,
      state:      (fd.get('state') || '').trim() || null,
      company:    (fd.get('cn') || '').trim() || null,
      payment:    document.querySelector('input[name="payment"]:checked')?.id || null,
    };

    // 3) Fetch official product prices
    const { data: products, error: fetchErr } = await supabase
      .from('products')
      .select('name, price')
      .in('name', itemNames);

    if (fetchErr) {
      console.error('Failed to fetch product prices', fetchErr);
      return alert('Unable to verify prices. Try again later.');
    }

    // 4) Compute line items, subtotal, shipping, and total
    let subtotal = 0;
    const items = products.map(p => {
      const count    = cart[p.name].count;
      const lineCost = p.price * count;
      subtotal += lineCost;
      return { name: p.name, price: p.price, count };
    });
    // If the subtotal is still zero, send the user back to the home page
    if (subtotal === 0) {
      window.location.href = '/index.html';
      return;
    }

    const shipping = subtotal < 50 ? 5 : 0;
    const total    = subtotal + shipping;

    // 5) Attach items and totals to order payload
    order.items    = items;
    order.subtotal = subtotal;
    order.total    = total;

    // 6) Insert order record
    const { error: insertErr } = await supabase
      .from('orders')
      .insert(order);

    if (insertErr) {
      console.error('Insert failed', insertErr);
      return alert('Could not place your order. Try again.');
    }

    // 7) Show confirmation toast
    orderToast.show();

    // 8) After toast hides, clear cart & redirect
    toastEl.addEventListener('hidden.bs.toast', () => {
      localStorage.removeItem('myCart');
      window.location.href = '/index.html';
    }, { once: true });
  });
});