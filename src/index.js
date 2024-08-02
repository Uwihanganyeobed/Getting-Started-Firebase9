

import {initializeApp} from 'firebase/app'
import {
  getFirestore, collection,getDoc, onSnapshot,addDoc,updateDoc, deleteDoc, doc,query,serverTimestamp, where, orderBy
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUOz2KLpAKzHXp1WNnP8Sn7X2Y_f8nBXI",
  authDomain: "renderapi-7b268.firebaseapp.com",
  projectId: "renderapi-7b268",
  storageBucket: "renderapi-7b268.appspot.com",
  messagingSenderId: "92202158278",
  appId: "1:92202158278:web:a4ccee7d1ada3ee90b2fc7",
  measurementId: "G-DCJ06N0CCN"
};

//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//collection ref

const colRef = collection(db, 'books')

//queries
const q = query(colRef,orderBy("createdAt"))

//real-time colllection data

// getDocs(colRef)
// .then((snapshot)=> {
//   let books = []
//   snapshot.docs.forEach((doc)=>{
//     books.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(books)
// })
// .catch((err)=>{
//   console.log(err.message)
// })

onSnapshot(q, (snapshot)=>{
  let books = []
  snapshot.docs.forEach((doc)=>{
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})
//adding documents

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(()=>{
    addBookForm.reset()
  });
})

//deleting documents

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const docRef = doc(db, 'books',deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(()=>{
    deleteBookForm.reset()
  });
})

//get a single document

const docRef = doc(db, 'books', 'xM1IzPXOXeRfWK9fQQiX')

onSnapshot(docRef, (doc)=>{
console.log(doc.data(), doc.id)
})

// update a single document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef,{
    title: 'Updated title',
  })
  .then(()=>{
    updateForm.reset()
  });
})