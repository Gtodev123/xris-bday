import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBmj2pGmH2xxYPprL05K9XY6CB2kEI-2Yw",
    authDomain: "diablo-2items.firebaseapp.com",
    projectId: "diablo-2items",
    storageBucket: "diablo-2items.appspot.com",
    messagingSenderId: "986982294935",
    appId: "1:986982294935:web:12350375b055dbae1c50d2",
    measurementId: "G-0ZFZQGLK1C"
  };


  const app = initializeApp(firebaseConfig)
  export const db = getFirestore(app)