import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/index.css';

import './App.css';

import { ChannelListContainer, ChannelContainer, Auth } from './components'; //takes care of importing all components

const cookies = new Cookies();

const apiKey = 'hace8jwnpqsu';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey); //passing api key

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),


    }, authToken);
}



export const App = () => {
    const [createType, setCreateType] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!authToken) return <Auth />

    return (
        <div className='app__wrapper'>
            <Chat client={client} theme="theme light">
                <ChannelListContainer //component
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer //component
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />

            </Chat>
        </div>
    );
}
export default App;