
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