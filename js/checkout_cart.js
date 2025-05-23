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