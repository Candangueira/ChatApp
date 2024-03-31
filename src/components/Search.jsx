import { React, useState, useContext } from 'react';
import { collection, query, where, doc, setDoc, getDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

export function Search() {
    // the name on the typed 'search user'
    const [username, setUsername] = useState('');
    // if the is a user with this name , retrieves the user that is found
    const [user, setUser ] = useState(null);
    const [error, setError] = useState(false);
    const {currentUser} = useContext(AuthContext);

    async function handleSearch() {
        const q = query(collection(db, "users"), where("displayName", "==", username));

      try {
          // search for users
          const querySnapshot = await getDocs(q);
          // return the user found.
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // set the user found.
          setUser(doc.data())
        });
      } catch(e) {
          setError(e);
          console.log(e);
      }

    };

    function handleKey(e) {
        e.code === "Enter" && handleSearch();
    }

    // handles the selection of the user found on the sidebar.
    async function handleSelect() {
        // check if chats(firestore) exists or not. If not create a new one.
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

             if (!res.exists()) {
            // create a chat in chats collection if chat does not exist.
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            //create userChats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
        //create userChats for the other user.
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
                [combinedId + '.date']: serverTimestamp()
            });

            }
        } catch (err) {
            console.log("Error adding document: ", err);
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
            <img src={user.photoURL}/>
            <div className='userchatinfo'>
                <span>{user.displayName}</span>
            </div>
        </div>}
        </>
    )
}