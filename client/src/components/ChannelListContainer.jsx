import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ZipChatterIcon from '../assets/zipChatterIcon.png';
import LogoutIcon from '../assets/logout.png';

const SideBar = () => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
           <div className='icon1__inner'>
            <img src={ZipChatterIcon} alt='ZipChatter' width="30"/>
           </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
           <div className='icon1__inner'>
            <img src={LogoutIcon} alt='Logout' width="30"/>
           </div>
        </div>

    </div>
)
const CompanyHeader = () => (
<div className='channel-list__header'>
<p className='channel-list__header__text'>Zip Chatter</p>
</div>

)


 const ChannelListContainer = () => {
    return (
        //react fragment. it will render anything inside of it
        <>
           <SideBar />
           <div className='channel-list__list__wrapper'>
               <CompanyHeader/>
               <ChannelSearch/>
               <ChannelList
               filters={{}}
               channelRenderFilterFn={() => {}}
               List={ (listProps) => ( //custom TeamChannelList component will get all props from ChannelList
                    <TeamChannelList
                    {... listProps}
                    type="team"
                    />
               )}
                 Preview={(previewProps) => (
                <TeamChannelPreview 
                {...previewProps}
                type="team"
                />
               )}   
               />
                <ChannelList // this component will display direct messages
               filters={{}}
               channelRenderFilterFn={() => {}}
               List={ (listProps) => ( 
                    <TeamChannelList
                    {... listProps}
                    type="messaging"
                    />
               )}
               
               Preview={(previewProps) => (
                <TeamChannelPreview 
                {...previewProps}
                type="messaging"
                />
               )}   
               />
               
           </div>
        </>
    );
}

export default ChannelListContainer;