
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  where,
  orderBy,
} from "firebase/firestore";
import { getAuth,
   createUserWithEmailAndPassword,
   signOut,
   signInWithEmailAndPassword,
   onAuthStateChanged

 } from "firebase/auth";
 import { getStorage, ref, uploadBytes } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUOz2KLpAKzHXp1WNnP8Sn7X2Y_f8nBXI",
  authDomain: "renderapi-7b268.firebaseapp.com",
  projectId: "renderapi-7b268",
  storageBucket: "renderapi-7b268.appspot.com",
  messagingSenderId: "92202158278",
  appId: "1:92202158278:web:a4ccee7d1ada3ee90b2fc7",
  measurementId: "G-DCJ06N0CCN",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

const auth = getAuth();

const storage = getStorage();

//collection ref

const colRef = collection(db, "books");

//queries
const q = query(colRef, orderBy("createdAt"));

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

const unsubCol = onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});
//adding documents

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

//deleting documents

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//get a single document

const docRef = doc(db, "books", "xM1IzPXOXeRfWK9fQQiX");

const unsubDoc = onSnapshot(docRef, (doc) => {
  // console.log(doc.data(), doc.id);
});

// update a single document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "Updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signing users up

const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("User created:", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// logging in and logout

const logoutForm = document.querySelector('.logout')
logoutForm.addEventListener('click', (e) => {
  e.preventDefault();

  signOut(auth)
  .then(() => {
    // console.log('User logged out')
  })
  .catch((err) => {
    console.log(err.message)
  });
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log('user logged in: ', cred.user)
  })
  .catch((err) => {
    console.log(err.message)
  });
})

// subscribe to  auth changes

const unsubAuth = onAuthStateChanged(auth, (user)=>{
  console.log('User Status changed: ', user)
})

// unsubscribe from auth changes (auth & db)

const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', (e)=>{
  console.log('unsubscribing')
  // unsubCol()
  // unsubDoc()
  // unsubAuth()
})

// uploading files

const uploadImage = document.querySelector('.upload')
const fileInput = document.getElementById('fileInput')

uploadImage.addEventListener('submit', (e) =>{
e.preventDefault()

const file = fileInput.files[0]
if(!file){
  console.log('No file to upload')
  return
}
const storageRef = ref(storage, `images/${file.name}`)

uploadBytes(storageRef, file)
.then((snapshot)=>{
  console.log('Uploaded a blob or file')
})
.catch((error)=>{
  console.log('Upload failed:', error)
});
uploadImage.reset()
})
/*

import { initializeApp } from "firebase/app";

import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCW19yKG07Iy3geHrtaOLidp2c6y5RCRlw",
   authDomain: "men-shop-99d85.firebaseapp.com",
   projectId: "men-shop-99d85",
   storageBucket: "men-shop-99d85.appspot.com",
   messagingSenderId: "464951247881",
   appId: "1:464951247881:web:bc5be4a6e35e68745ca4d8",
   measurementId: "G-W4Q70FC3WV"
 };

 initializeApp(firebaseConfig);

 //service db

 const db = getFirestore()

 // reference to db

 const dbRef = collection(db, 'students')

 // qget data 
onSnapshot(dbRef, (snapshot)=>{
  let students = []
  snapshot.docs.forEach((doc)=>{
    students.push({...doc.data(), id: doc.id})
  })
  console.log(students)
})

//add docs to the form

const addStudentForm = document.querySelector('.add')
addStudentForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  addDoc(dbRef, {
    Name: addStudentForm.Name.value,
    Age: addStudentForm.Age.value,
    Marks: addStudentForm.Marks.value
  })
  .then(()=>{
    addStudentForm.reset()
  })
})

// remove docs from the form

const removeStudentForm = document.querySelector('.remove')
removeStudentForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const docRefId = doc(db, 'students', removeStudentForm.id.value)
  deleteDoc(docRefId)
  .then(()=>{
    removeStudentForm.reset()
  });
});

// //get a single document

const dbRefId = doc(db, 'students', 'Ou3bjVwUXR4LastMlgR2')

onSnapshot(dbRefId, (doc)=>{
  console.log(`The Accessed student is id of ${doc.id}`)
})

const updateStudentForm = document.querySelector('.update')
updateStudentForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const dbRefId = doc(db, 'students', updateStudentForm.id.value)
  updateDoc(dbRefId,{
    Name: 'M-Cyprien',
  })
  .then(()=>{
    updateStudentForm.reset()
  });
})
*/
