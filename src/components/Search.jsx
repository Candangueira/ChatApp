import { React } from 'react';

export function Search() {
    return (
        <>
        <div className='search'>
            <div className='searchbar'>
                <input type='text' placeholder='Search for friends'/>
            </div>
        </div>
        <div className='userchat'>
            <img src='../src/assets/imgs/cassio.jpg'></img>
            <div className='userchatinfo'>
                <span>Username</span>
            </div>
        </div>
        </>
    )
}