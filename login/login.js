document.getElementById('loginForm')?.addEventListener('submit', async (event)=> {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Simulate an API call for login
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const { data } = await response.json();
            // Store received token for future requests
            localStorage.setItem('accessToken', data.accessToken);
            alert('Login successful.');
            window.location.href = 'index.html'; // Redirect to main page
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error.response);
        alert('An error occurred during login. Please try again.');
    }
});