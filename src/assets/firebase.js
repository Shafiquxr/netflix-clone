import { initializeApp } from "firebase/app";
import{createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyALccAMM7nsq2L1rv1wXNKVt3SsODEPyUc",
  authDomain: "netflix-clone-efb7e.firebaseapp.com",
  projectId: "netflix-clone-efb7e",
  storageBucket: "netflix-clone-efb7e.firebasestorage.app",
  messagingSenderId: "660993079038",
  appId: "1:660993079038:web:a6b8c51fafcf6f330017af",
  measurementId: "G-D8GM587Y2E"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);
const signup=async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login= async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout};