const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config(); 

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => { //getting all data from front-end to create user
try {
    const {fullName, username, password, phoneNumber} = req.body;

    const userId = crypto.randomBytes(16).toLocaleString('hex');

    const serverClient = connect(api_key, api_secret, app_id); //I can change keys on .env file once my free trial expires

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber}); // I could get this from front end, but it's more secured this way

} catch (error) {
    console.log(error);

    res.status(500).json({message : error});
    
}
};

const login = async (req, res) =>{
    try {
    const {username, password} = req.body;

    const serverClient = connect(api_key, api_secret, app_id);

    const client = StreamChat.getInstance(api_key, api_secret); // need this to query all users from the database that match specific username

    const {users} = await client.queryUsers({ name : username});

    if(!users.length) return res.status(400).json({message: 'User not found dummy'});

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success){
            res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id  });
        } else{
            res.status(500).json({message: 'Incorrect password'});
        }

    } catch (error) {
        console.log(error);
    
        res.status(500).json({message : error});
        
    }
};

module.exports = { signup, login};