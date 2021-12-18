import React, {useState, useEffect} from 'react';
import { useChatContext } from 'stream-chat-react';
import{ SearchIcon } from '../assets/'

const ChannelSearch = () => {
const [query, setQuery] = useState();

const onSearch = (event) =>{
    event.preventDefault(); //it will stop browser from refreshing
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
