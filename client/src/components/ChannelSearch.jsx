import React, {useState, useEffect} from 'react';
import { useChatContext, useShouldForceScrollToBottom } from 'stream-chat-react';
import{ SearchIcon } from '../assets/'

const ChannelSearch = () => {
const {client, setActiveChannel} = useChatContext();
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);
const [teamChannels, setTeamChannels] = useState([]);
const [directChannels, setDirectChannels] = useState([]);

const getChannels = async (text) => {
try {
 //TODO : fetch channels  
 const channelResponse = client.queryChannels({// $in finds channels where user logged in is in
   type: 'team', 
   name: {$autocomplete: text},
    members: {$in: [client.userID]}
 });
 
 const userResponse = client.queryUsers({ // $ne excludes account logged in from finding it self when searching
        id: {$ne: client.userID},
        name: {$autocomplete: text}
 });

 const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

 if(channels.length){
setTeamChannels(channels);
}
 if(users.length){
    setDirectChannels(users);
     }

} catch (error) {
    setQuery('');
}
}


const onSearch = (event) =>{
    event.preventDefault(); //it will stop browser from refreshing

    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
}

    return (
        <div className='channel-search__container'>
            <div className='channel-search__input__wrapper'>
                <div className='channel-search__input__icon'>
                  <SearchIcon />
                </div>
                <input className='channel-search__input__text'
                 placeholder='Search'
                 type='text' 
                 value={query}
                 onChange={onSearch}
                 />
            </div>
        </div>
    )
}

export default ChannelSearch
