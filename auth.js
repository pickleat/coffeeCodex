// Auth0 Authorization Logic


window.addEventListener('load', function() {
    var idToken;
    var accessToken;
    var expiresAt;

    var webAuth = new auth0.WebAuth({
      domain: 'coffeecodex.auth0.com',
      clientID: 'FmQdIDzy0-WQRvefiZu7gsBx7YpKDBBe',
      responseType: 'token id_token',
      scope: 'openid profile',
      redirectUri: window.location.href
    });
    // 
    // ...
    var loginStatus = document.querySelector('h4');
    var loginView = document.getElementById('login-view');
    var homeView = document.getElementById('home-view');

    // buttons and event listeners
    var homeViewBtn = document.getElementById('btn-home-view');
    var loginBtn = document.getElementById('btn-login');
    var logoutBtn = document.getElementById('btn-logout');


    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewTokens();
    } else {
      handleAuthentication();
    }


    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });

    homeViewBtn.addEventListener('click', function() {
        homeView.style.display = 'inline-block';
        loginView.style.display = 'none';
      });
    
    logoutBtn.addEventListener('click', logout);
    
      function handleAuthentication() {
        var name; 
        webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
          if (authResult && authResult.accessToken && authResult.idToken) {
            webAuth.client.userInfo(authResult.accessToken, function(err, user) {
              console.log(user);
              name = user.name;
            });
            window.location.hash = '';
            localLogin(authResult);
            loginBtn.style.display = 'none';
            homeView.style.display = 'inline-block';
          } else if (err) {
            homeView.style.display = 'inline-block';
            console.log(err);
            alert(
              'Error: ' + err.error + '. Check the console for further details.'
            );
          }
          displayButtons(name);
        });
      }
    
      function localLogin(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Set the time that the Access Token will expire at
        expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        accessToken = authResult.accessToken;
        idToken = authResult.idToken;
      }

      function renewTokens() {
        console.log('made it to renewTokens, checkingSession')
        webAuth.checkSession({}, function(err, authResult) {
          console.log('session should be checked')
          console.log(authResult);
          // console.log(authResult.accessToken);
          // console.log(authResult.idToken);
          if (authResult && authResult.accessToken && authResult.idToken) {
            localLogin(authResult);
          } else if (err) {
            alert(
                'Could not get a new token '  + err.error + ':' + err.error_description + '.'
            );
            logout();
          }
          displayButtons();
        });
      }
    
      function logout() {
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        // Remove tokens and expiry time
        accessToken = '';
        idToken = '';
        expiresAt = 0;
        displayButtons();
      }
    
      function isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        var expiration = parseInt(expiresAt) || 0;
        return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
      }
    
      function displayButtons(name) {
        if (isAuthenticated()) {
          loginBtn.style.display = 'none';
          logoutBtn.style.display = 'inline-block';
          if(name){
            console.log(name);
            loginStatus.innerHTML = `Welcome ${name}`;
          }
          else {'You are logged in!';}
        } else {
          loginBtn.style.display = 'inline-block';
          logoutBtn.style.display = 'none';
          loginStatus.innerHTML =
            'You are not logged in! Please log in to continue.';
        }
      }
  
  });