// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAUx8OkMys9OcL3L13cd0QWJ1Gf58VUFQw',
    authDomain: 'bordl-firebase.firebaseapp.com',
    projectId: 'bordl-firebase',
    storageBucket: 'bordl-firebase.appspot.com',
    messagingSenderId: '290603925451',
    appId: '1:290603925451:web:9e7e1b11c5bd5474bcc04e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
