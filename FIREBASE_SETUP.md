# Firebase Setup (Quick Guide)

This project supports optional cross-device client authentication using Firebase Authentication and Firestore. Follow these steps to enable it so clients can sign in from any device.

1. Create a Firebase project
   - Go to https://console.firebase.google.com/ and create a new project.

2. Enable Email/Password sign-in
   - In the Firebase console, open **Authentication → Sign-in method** and enable **Email/Password**.

3. Create a Firestore database
   - In **Firestore Database**, create a database in production or test mode.
   - You should add rules that restrict access to authenticated users. Example rule (start secure, then refine):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Add your Firebase config to the project
   - In the Firebase console go to **Project settings → Your apps**, add a Web app if you haven't, and copy the config object.
   - Create a file at `assets/js/firebase-config.js` (next to the provided `firebase-config.example.js`) with content like:

```js
// assets/js/firebase-config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```

5. Enable Firestore and create a `clients` collection
   - When users sign up, the client profile will be saved under `clients/{uid}`. Ensure your Firestore rules allow this only for authenticated users.

6. Test the flow locally
   - Serve the site (for example with `npx http-server .` or any static server) and open `pages/signup.html`.
   - After creating an account, sign out and sign in from another browser or device using the same credentials.

Notes and security
   - The Firebase client config (API key etc.) is safe to embed in client code; however protect your Firestore with security rules.
   - Do not commit `assets/js/firebase-config.js` to a public repo; treat server keys carefully if you add server-side code.

If you want, I can create `assets/js/firebase-config.js` for you after you paste your Firebase config values here, or I can set up a small self-hosted Node.js auth alternative instead.
