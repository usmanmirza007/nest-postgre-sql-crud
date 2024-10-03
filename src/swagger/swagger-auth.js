document.addEventListener('DOMContentLoaded', function () {
    const authButton = document.querySelector('.authorize');
    
    if (authButton) {
      authButton.addEventListener('click', () => {
        // Fetch the token from login response or store it after successful login
        const token = localStorage.getItem('jwt_token');  // Assume token is stored here
  
        if (token) {
          // Automatically set the Authorization header with Bearer token
          const bearerToken = `Bearer ${token}`;
          const authForm = document.querySelector('.auth-wrapper input[type="text"]');
          if (authForm) {
            authForm.value = bearerToken;  // Fill token in Swagger UI
            document.querySelector('.auth-btn-wrapper button').click();  // Click to authorize
          }
        }
      });
    }
  });
  