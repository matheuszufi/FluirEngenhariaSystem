import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyD8N8apC7uB4e6B-RXDwWHodHRDQAlP7QM',
  authDomain: 'fluirengenhariasystem.firebaseapp.com',
  projectId: 'fluirengenhariasystem',
  storageBucket: 'fluirengenhariasystem.firebasestorage.app',
  messagingSenderId: '496456205631',
  appId: '1:496456205631:web:199ce5ef1029bca9c97f8a',
  measurementId: 'G-VZB2E9GXR6',
  databaseURL: 'https://fluirengenhariasystem-default-rtdb.firebaseio.com',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
