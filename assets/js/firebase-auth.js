// Firebase helper for Auth + Firestore (compat mode). Uses `firebaseConfig` from firebase-config.js
// This script exposes: signUpClient(profile), loginClient(email,password,remember), logoutClient(), initFirebaseAuth(onUser)

(function(){
  // If firebaseConfig is not provided, we will not attempt network auth and caller should fallback to localStorage
  const hasConfig = typeof firebaseConfig !== 'undefined' && firebaseConfig;

  if (!hasConfig) {
    console.warn('Firebase config not found. Firebase auth disabled — falling back to localStorage.');
    window.signUpClient = function(profile){
      return new Promise((resolve)=>{
        // store in localStorage as fallback
        let clients = JSON.parse(localStorage.getItem('clients')) || [];
        // simple unique id
        profile.id = Date.now();
        clients.push(profile);
        localStorage.setItem('clients', JSON.stringify(clients));
        // set session
        sessionStorage.setItem('clientLoggedIn','true');
        sessionStorage.setItem('clientEmail', profile.email);
        sessionStorage.setItem('clientName', profile.firstName + ' ' + profile.lastName);
        resolve({ok: true, provider: 'local'});
      });
    };

    window.loginClient = function(email,password,remember){
      return new Promise((resolve,reject)=>{
        const signups = JSON.parse(localStorage.getItem('signups')) || [];
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        const client = [...clients, ...signups].find(c => c.email === email && c.password === password);
        if (client) {
          sessionStorage.setItem('clientLoggedIn','true');
          sessionStorage.setItem('clientEmail', email);
          sessionStorage.setItem('clientName', client.firstName + ' ' + client.lastName);
          if (remember) localStorage.setItem('clientEmail', email);
          resolve({ok: true, provider: 'local'});
        } else {
          reject(new Error('Invalid credentials'));
        }
      });
    };

    window.logoutClient = function(){
      sessionStorage.removeItem('clientLoggedIn');
      sessionStorage.removeItem('clientEmail');
      sessionStorage.removeItem('clientName');
    };

    window.initFirebaseAuth = function(onUser){
      // no-op fallback — call onUser with null (not authenticated) so pages can redirect or fallback
      onUser(null);
    };

    return;
  }

  // Load compat Firebase SDKs (app, auth, firestore)
  const scripts = [
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js'
  ];

  function loadScript(src){
    return new Promise((res,rej)=>{
      const s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  Promise.all(scripts.map(loadScript)).then(()=>{
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    window.signUpClient = function(profile){
      // expects profile.password to exist
      return auth.createUserWithEmailAndPassword(profile.email, profile.password)
        .then(userCred => {
          const uid = userCred.user.uid;
          // remove plaintext password before saving profile
          const saveProfile = Object.assign({}, profile);
          delete saveProfile.password;
          saveProfile.createdAt = firebase.firestore.FieldValue.serverTimestamp();
          return db.collection('clients').doc(uid).set(saveProfile).then(()=>{
            // set session via Firebase; also set sessionStorage for UI use
            sessionStorage.setItem('clientLoggedIn','true');
            sessionStorage.setItem('clientEmail', profile.email);
            sessionStorage.setItem('clientName', profile.firstName + ' ' + profile.lastName);
            return {ok:true, provider:'firebase', uid};
          });
        });
    };

    window.loginClient = function(email,password,remember){
      return auth.signInWithEmailAndPassword(email,password).then(userCred=>{
        const u = userCred.user;
        sessionStorage.setItem('clientLoggedIn','true');
        sessionStorage.setItem('clientEmail', u.email);
        // try to load name from Firestore
        return db.collection('clients').doc(u.uid).get().then(doc=>{
          if (doc.exists) {
            const data = doc.data();
            sessionStorage.setItem('clientName', (data.firstName||'') + ' ' + (data.lastName||''));
          }
          if (remember) localStorage.setItem('clientEmail', email);
          return {ok:true, provider:'firebase', uid: u.uid};
        });
      });
    };

    window.logoutClient = function(){
      return auth.signOut().then(()=>{
        sessionStorage.removeItem('clientLoggedIn');
        sessionStorage.removeItem('clientEmail');
        sessionStorage.removeItem('clientName');
      });
    };

    window.initFirebaseAuth = function(onUser){
      auth.onAuthStateChanged(function(user){
        onUser(user);
      });
    };

  }).catch(err=>{
    console.error('Failed to load Firebase SDKs', err);
  });

})();
