import React from 'react';
import{ StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';

import { ChannelListContainer, ChannelContainer, Auth } from './components'; //takes care of importing all components

const apiKey = 'g3wnnwwktrr3';

const client = StreamChat.getInstance(apiKey); //passing api key

const authToken = false;

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