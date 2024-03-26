import { React, useState, useContext } from 'react';
import { collection, query, where, doc, setDoc, getDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

export function Search() {
    const [username, setUsername] = useState('');
    const [user, setUser ] = useState(null);
    const [error, setError] = useState(false);
    const {currentUser} = useContext(AuthContext);

    async function handleSearch() {
        const q = query(collection(db, "users"), where("displayName", "==", username));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data())
        });
      } catch(error) {
        setError(error);
        console.log(error);
      }
    };

    function handleKey(e) {
        e.code === "Enter" && handleSearch();
    }

    async function handleSelect() {
        // check if chat exists or not. If not create a new one.
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

             if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
                [combinedId + '.date']: serverTimestamp()
            });

            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }

    setUser(null);
    setUsername('');
    };
    
    return (
        <>
        <div className='search'>
            <div className='searchbar'>
                <input type='text' placeholder='Search for friends' onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} value={username}/>
            </div>
        </div>
        {error && <span className='error'>User not found</span>}
        {user && <div className='userchat' onClick={handleSelect}>
            <img src={user.photoURL}></img>
            <div className='userchatinfo'>
                <span>{user.displayName}</span>
            </div>
        </div>}
        </>
    )
}