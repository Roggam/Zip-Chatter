import React from 'react';
import{ StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';

import { ChannelListContainer, ChannelContainer, Auth } from './components'; //takes care of importing all components

const cookies = new Cookies();

const apiKey = 'g3wnnwwktrr3';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey); //passing api key

if(authToken){
    client.connectUser({
        id: cookies.get('userId'),
        name : cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
        

    }, authToken);
}

export const App = () => {
if(!authToken) return <Auth />

    return (
        <div className='app__wrapper'>
           <Chat client={client} theme="theme light">
               <ChannelListContainer //component
               
               />
            <ChannelContainer //component
               
               />

           </Chat>
        </div>
    );
}
export default App;