import { React, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export function Search() {
    const [username, setUsername] = useState('');
    const [user, setUser ] = useState(null);
    const [error, setError] = useState(false);

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
      }
    };

    function handleKey(e) {
        e.code === "Enter" && handleSearch();
    }
    return (
        <>
        <div className='search'>
            <div className='searchbar'>
                <input type='text' placeholder='Search for friends' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
            </div>
        </div>
        {error && <span className='error'>User not found</span>}
        {user && <div className='userchat'>
            <img src={user.photoURL}></img>
            <div className='userchatinfo'>
                <span>{user.displayName}</span>
            </div>
        </div>}
        </>
    )
}