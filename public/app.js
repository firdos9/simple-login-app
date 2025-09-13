document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');
  const msg = document.getElementById('message');

  // Helper to set message text and CSS class
  function setMessage(text, cls = '') {
    msg.className = cls;
    msg.textContent = text;
  }

  // Click handler for the login button
  loginBtn.addEventListener('click', async function () {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Clear previous messages
    setMessage('', '');

    // Client-side validation (message matches server wording)
    if (!username || !password) {
      // Show the same client message as server's 400 response
      setMessage('Please enter both username and password', 'message-warning');
      return;
}

try {
      // Call backend API
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      // Parse JSON body from server (works for 200 and error codes with JSON body)
      const body = await res.json();

      // Display server message exactly (this ensures Cypress UI message === server message)
      setMessage(body.message || 'Unknown response', res.ok ? 'message-success' : 'message-error');

      if (res.ok) {
        // On success optionally clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
      }
    } catch (err) {
      // Network or other unexpected error
      setMessage('Network error', 'message-error');
    }
  });
// Allow form submission with Enter key inside password field
  document.getElementById('password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      loginBtn.click();
    }
