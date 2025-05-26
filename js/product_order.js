// Ensure supabase is initialized
window.addEventListener('DOMContentLoaded', () => {
  // Reference supabase from window
  const supabase = window.supabase;
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }

  const form = document.getElementById('order-form');
  const btn  = document.getElementById('placeOrderBtn');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!form) return;

    const fd = new FormData(form);
    const order = {
      first_name: fd.get('fname'),
      last_name:  fd.get('lname'),
      email:      fd.get('email'),
      phone:      fd.get('phone'),
      province:   fd.get('province'),
      zip:        fd.get('zip'),
      street:     fd.get('houseadd'),
      apartment:  fd.get('apartment') || null,
      city:       fd.get('city'),
      state:      fd.get('state'),
      company:    fd.get('cn') || null,
      payment:    document.querySelector('input[name="payment"]:checked')?.id,
    };

    const cart = JSON.parse(localStorage.getItem('myCart') || '{}');
    order.items = Object.entries(cart).map(
      ([name, { price, count }]) => ({ name, price, count })
    );

    const { error } = await supabase.from('orders').insert(order);
    if (error) {
      console.error('Insert failed', error);
      alert('Could not place your order. Try again.');
      return;
    }

    localStorage.removeItem('myCart');
    alert('Thank you! Your order is confirmed.');
    window.location.href = '/order-confirmation.html';
  });
});