import { getFirebase } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'

export const getEmailMethod = async (email) => {
  const firebaseAuth = getFirebase().auth()
  const method = await firebaseAuth.fetchSignInMethodsForEmail(email)
  return method
}

export const createUser = async (credential, profile) => {
  const firebaseAuth = getFirebase()
  const create = await firebaseAuth.createUser(
    { ...credential },
    { ...profile }
  )
  return create
}

export const loginFirebase = async (credential) => {
  const firebase = getFirebase()
  await firebase.login({ ...credential })
}

export const logoutFirebase = async () => {
  const firebase = getFirebase()
  await firebase.logout()
}

export const getAuthErrorMessage = (e) => {
  const { message } = e
  if (message.includes('There is no user record corresponding')) {
    return 'Email tidak terdaftar'
  }
  if (message.includes('The password is invalid')) {
    return 'Email atau password salah'
  }
  if (message.includes('The database connection is closing')) {
    return 'Aplikasi memerlukan cookies, mohon refresh halaman'
  }
  return 'Koneksi bermasalah'
}

export const updateValue = async (path, value) => {
  const firebase = getFirebase()
  await firebase.update(path, value)
  return true
}

export const multiUpdate = async (value) => {
  const firebase = getFirebase()
  await firebase.ref().update(value)
  return true
}

export const getValue = async (path) => {
  const firebase = getFirebase()
  const deviceRef = firebase.ref(path)
  const snapshot = await deviceRef.once('value')
  return snapshot.val()
}

export const getValueWhere = async (params) => {
  const { path, key, limit = 10 } = params
  const firebase = getFirebase()
  const deviceRef = firebase.ref(path).orderByChild(key).limitToLast(limit)
  const snapshot = await deviceRef.once('value')
  return snapshot.val()
}

export const getValueBetween = async (params) => {
  const { path, key, start, limit = 2 } = params
  const firebase = getFirebase()
  const deviceRef = firebase
    .ref(path)
    .orderByChild(key)
    // .equalTo(value)
    .startAt(start)
    .limitToLast(limit)
  const snapshot = await deviceRef.once('value')
  return snapshot.val()
}

export const clearValue = async (paths) => {
  const firebase = getFirebase()
  const clearPath = {}
  paths.map((path) => {
    clearPath[path] = null
    return true
  })
  await firebase.ref().update(clearPath)
}

export const getValueWhereFirestore = async (key, value) => {
  const firestore = getFirestore()
  const data = await firestore.collection('users').where(key, '==', value).get()
  return data
}

export const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const a = new FileReader()
    a.onload = function (e) {
      resolve(e.target.result)
    }
    a.onerror = function (e) {
      reject(new Error(`error : ${e}`))
    }
    a.readAsDataURL(blob)
  })
}

export const convertGSToUrl = async (gs) => {
  const firebase = getFirebase()
  const storage = firebase.storage()
  const gsReference = storage.refFromURL(gs)

  const imageUrl = await gsReference.getDownloadURL()
  return imageUrl
}

export default true
