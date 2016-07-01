import { firebase as config } from '../config'
const { apiKey, authDomain, databaseURL, storageBucket } = config
import Firebase from 'firebase'
// Initialize Firebase
export const getFirebase = () => {
  try {
    Firebase.initializeApp({ apiKey, authDomain, databaseURL, storageBucket })
  } catch (err) { console.warn('Firebase error:', err)}
  // Firebase.database().ref('clients').once('value').then((snap) => {
  //   console.log('data from firebase:', snap.val())
  //   // dispatch(receiveSheets(snap.val()))
  // })
  return Firebase.database()
}
export default { getFirebase }
