import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ZipChatterIcon from '../assets/zipChatterIcon.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={ZipChatterIcon} alt='ZipChatter' width="30" />
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={LogoutIcon} alt='Logout' width="30" />
            </div>
        </div>

    </div>
)
const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Zip Chatter</p>
    </div>

)


const ChannelListContainer = ({isCreating,setIsCreating,setCreateType,setIsEditing}) => {
    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');
        window.location.reload();

    }

    return (
        //react fragment. it will render anything inside of it
        <>
            <SideBar logout={logout} />
            <div className='channel-list__list__wrapper'>
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => ( //custom TeamChannelList component will get all props from ChannelList
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating ={isCreating}
                            setIsCreating = {setIsCreating}
                            setCreateType= {setCreateType}
                            setIsEditing ={setIsEditing}
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
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating ={isCreating}
                            setIsCreating = {setIsCreating}
                            setCreateType= {setCreateType}
                            setIsEditing ={setIsEditing}
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