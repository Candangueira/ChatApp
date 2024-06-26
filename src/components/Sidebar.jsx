import { React } from 'react';
import { Navbar } from './Navbar';
import { Search } from '../components/Search'
import { Chats } from '../components/Chats'

export function Sidebar() {
    return (
        <>
            <div className='sidebar'>
                <Navbar/>
                <Search/>
                <Chats/>
            </div>
        </>
    )
}