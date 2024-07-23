// src/firebaseConfig.ts

// Import the `initializeApp` function from the Firebase library to initialize the app
import { FirebaseApp, initializeApp } from "firebase/app";

// Import the `getAuth` function from the Firebase library to get the authentication service
import { getAuth, Auth } from "firebase/auth";

// Define the interface for the Firebase configuration object
interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
}

// Initialize the object that contains Firebase configuration information using environment variables
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize the Firebase app using the configuration object
const app: FirebaseApp = initializeApp(firebaseConfig);

// Get the authentication service from the initialized Firebase app
const auth: Auth = getAuth(app);

// Export the authentication service to use it in other parts of the application
export default auth;
