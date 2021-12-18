import React from 'react';
import { Avatar, useChatContext} from 'stream-chat-react';

const TeamChannelPreview = ({channel, type }) => {
const { channel : activeChannel, client} = useChatContext();

//this function will get channel name with multiple users
const ChannelPreview = ( ) => (
    <p className='channel-preview__item'> 
        # {channel?.data?.name || channel?.data?.id}
    </p>
)
[{}]

const DirectPreview = () => {
    // mapping over all users and keeping all the one where user.id is not equal to  client.userID
const members = Object.values(channel.state.members).filter(({ user}) => user.id !== client.userID);

return (
    <div className='channel-preview__item single'>
            <Avatar
            image={members[0]?.user?.image} // question marks before dot will check that the user actually existws
            name={members[0]?.user?.fullName}
            size={24}
            />
            <p> name={members[0]?.user?.fullName}</p>
    </div>
)
}

    return (
        <div className={
            channel?.id === activeChannel?.disableSlowMode
            ? 'channel-preview__wrapper__selected'
            : 'channel-preview__wrapper'
        }
        onClick={() => {
            console.log(channel)
        }}
        >
            {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}
        </div>
    )
}

export default TeamChannelPreview
