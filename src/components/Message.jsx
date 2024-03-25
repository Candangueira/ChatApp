import { React } from 'react';

export function Message() {
    return (
        <>
        <div className='message owner'>
            <div className='messageinfo'>
                <img src='../src/assets/imgs/cassio.jpg'></img>
                <span>just now</span>
            </div>
            <div className='messagecontent'>
                <p>message</p>
                {/* <img src='../src/assets/imgs/cassio.jpg' className="image-message"></img> */}
            </div>
        </div>
        </>
    )
}