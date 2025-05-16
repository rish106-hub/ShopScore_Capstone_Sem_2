import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJiWnY2AaBn-ERveFnTl_lQP4sLqXcqPw",
  authDomain: "shopkart-a383b.firebaseapp.com",
  projectId: "shopkart-a383b",
  storageBucket: "shopkart-a383b.appspot.com",
  messagingSenderId: "992011837246",
  appId: "1:992011837246:web:1287cc4ea9674d6567d66f",
  measurementId: "G-MNS8QKLKG3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;