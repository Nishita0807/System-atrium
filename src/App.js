




// App.js 
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import './App.css';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Text from "./image/text.jpg";
import person1 from "./image/avatar.jpg";
import person2 from "./image/person2.jpg";
import man from "./image/man.png";
import chat from "./image/chat.png";
import whatsapp from "./image/whatsapp.jpg";
import insta from "./image/insta.jpg";
import original from "./image/original.jpg";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import twitter from "./image/twitter.png";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';




const summarizeConversation = async (conversation) => {
  try {
    const response = await fetch('https://system-atrium-vyk9.vercel.app/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Error summarizing conversation:', error);
    return 'Failed to summarize the conversation';
  }
};




// const users = {
//   inbox: [
//     { name: "Texts", time: "4m", avatar: person1 ,message:Text, conversation: [
//       { type: 'sent', content: 'hey' },
//       { type: 'received', content: 'whats up' },
//       { type: 'sent', content: "you're gonna be on the landing page" },
//       { type: 'received', content: 'am i not already' },
//       { type: 'sent', content: '😄' }
//     ] },
//     { name: "Guillermo Rauch", time: "1h", avatar: man,message:Text, conversation: [
//       { type: 'sent', content: 'hey' },
//       { type: 'received', content: 'whats up' },
//       { type: 'sent', content: "you're gonna be on the landing page" },
//       { type: 'received', content: 'am i not already' },
//       { type: 'sent', content: '😄' }
//     ]  },
//     { name: "Vivek Sodera", time: "2h", avatar: person1,message:Text, conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "Sahil Lavingia", time: "3h", avatar: person1 ,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "Surbhi", time: "4h", avatar: person2,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ]  },
//     { name: "Shriya Nevatia", time: "5h", avatar: person2,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "Dennis", time: "6h", avatar: person1 ,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "ChatGPT", time: "7h", avatar: chat,message:Text, conversation: [
//       { type: 'sent', content: 'hey' },
//       { type: 'received', content: 'whats up' },
//       { type: 'sent', content: "you're gonna be on the landing page" },
//       { type: 'received', content: 'am i not already' },
//       { type: 'sent', content: '😄' }
//     ]  },
//     { name: "ChatGPT", time: "7h", avatar: chat ,message:insta, conversation: [
//       { type: 'sent', content: 'hey' },
//       { type: 'received', content: 'whats up' },
//       { type: 'sent', content: "you're gonna be on the landing page" },
//       { type: 'received', content: 'am i not already' },
//       { type: 'sent', content: '😄' }
//     ] },
//     { name: "ChatGPT", time: "7h", avatar: chat ,message:whatsapp,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "ChatGPT", time: "7h", avatar: chat ,message:twitter,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] }

//   ],
//   archived: [
//     { name: "Sahil Lavingia", time: "3h", avatar: person1 ,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "Surbhi", time: "4h", avatar: person2 ,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//   ],
//   unread: [
//     { name: "Shriya Nevatia", time: "5h", avatar: person2 ,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "Dennis", time: "6h", avatar: man,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ] },
//     { name: "ChatGPT", time: "7h", avatar: chat,message:Text,conversation: [
//       { type: 'sent', content: 'Hello!' },
//       { type: 'received', content: 'Hi, how can I help you?' },
//     ]  }
//   ]
// };
 // State to store fetched data
 
 const App = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('inbox');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch API data
    const fetchData = async () => {
      try {
        const response = await fetch('https://system-atrium-vyk9.vercel.app/api/users'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        console.log("Fetched result:", result[0]); // Log the fetched data
        setUsers(result[0]); // Store the fetched data in state
        setSelectedUser(result[0].inbox[0]); // Set the first user from inbox as the selected user
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading state to false once the fetch is complete
      }
    };

    fetchData();
  }, []); // Empty array means the effect runs once, when the component mounts

  useEffect(() => {
    console.log(users); // This will log the updated `users` state after the component re-renders
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users) {
    return <div>No users available</div>;
  }

  const filteredUsers = users[filter]; // Access the filtered users once data is available

  return (
    <div className="dashboard">
      <Sidebar 
        users={filteredUsers} 
        setSelectedUser={setSelectedUser} 
        selectedUser={selectedUser} 
        filter={filter}
        setFilter={setFilter}
      />
<ChatWindow 
      selectedUser={selectedUser} 
      users={users} 
      setUsers={setUsers} 
      filter={filter}
    />    </div>
  );
};


 
 

const Sidebar = ({ users, setSelectedUser, selectedUser, filter, setFilter }) => {

  // Define mergeUsersWithSameName before using it
  const mergeUsersWithSameName = (users) => {
    const userMap = {};

    users.forEach(user => {
      if (userMap[user.name]) {
        userMap[user.name].message.push(user.message); // Add the new message icon
      } else {
        userMap[user.name] = { ...user, message: [user.message] }; // Initialize message array
      }
    });

    return Object.values(userMap); // Convert the map back to an array
  };

  // Use mergeUsersWithSameName after it's defined
  const mergedUsers = users ? mergeUsersWithSameName(users) : [];

  console.log("users[filter]", users);
  console.log("merged", mergedUsers);
  console.log("filter", filter);
  console.log("users", users);
  console.log("selectedUser", selectedUser);
  const avatarMap = {
    man,
    person1, // Maps 'Person1' string to Person1 image import
    person2, // Maps 'Person2' string to Person2 image import
    Text,
    chat
    // Add other mappings as necessary
  };
  const messageIconMap={
    whatsapp,
    insta,
    twitter,
    Text
  }

  return (
    <div className="sidebar">
      <div className='sidebar-header header'>
        <div className='light'>
          <div className='box-red'></div>
          <div className='box-orange'></div>
          <div className='box-green'></div>
        </div>
        <div className='icon'>
          <div><WidgetsOutlinedIcon/></div>
          <div><AddCircleOutlineOutlinedIcon/></div>
          <div><SearchOutlinedIcon/></div>
        </div>
      </div>
      <div className="sidebar-header">
        <div><MenuIcon /></div>
        <div className="filter-buttons">
          <button className={filter === 'inbox' ? 'active' : ''} onClick={() => setFilter('inbox')}>Inbox</button>
          <button className={filter === 'archived' ? 'active' : ''} onClick={() => setFilter('archived')}>Archived</button>
          <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>Unread</button>
        </div>
      </div>
      <ul className="user-list">
        {mergedUsers.map((user, index) => (
          <li
            key={index}
            className={`user-item ${selectedUser && selectedUser.name === user.name ? 'active' : ''}`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="avatar-container">
            <img src={avatarMap[user.avatar]} className="avatar" alt="avatar" />
            {user.message.map((messageIcon, i) => (
                <img 
                  key={i} 
                  src={messageIconMap[messageIcon]} 
                  alt="message icon" 
                  className="message-channel-icon" 
                  style={{ 
                    position: 'absolute',
                    transform: `rotate(${i * (360 / user.message.length)}deg) translate(20px)`, 
                    transformOrigin: 'center center',
                    left: '20px',
                    top: '15px',
                  }} 
                />
              ))}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="time">{user.time}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className='footer'>
        <img src={original} alt="kishan" className="avatar" />
        <div className="f-info">
          <div>Kishan Bagaria</div>
          <div><KeyboardArrowDownIcon /></div>
        </div>
      </div>
    </div>
  );
};
const ChatWindow = ({ selectedUser = {} ,users,setUsers,filter}) => {
  console.log("chatWindow selectedUser", selectedUser);
  const [summary, setSummary] = useState(null);
  const isInitialMount = useRef(true);
  const avatarMap = {
    man,
    person1, // Maps 'Person1' string to Person1 image import
    person2, // Maps 'Person2' string to Person2 image import
    Text,
    chat
    // Add other mappings as necessary
  };
  const messageIconMap={
    whatsapp,
    insta,
    twitter,
    Text
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (selectedUser.message.length > 1) {
      summarizeConversation(selectedUser.conversation).then(setSummary);
    } else {
      setSummary(null);
    }
  }, [selectedUser]);

  const [inputValue, setInputValue] = useState('');
  const [conversation, setConversation] = useState(selectedUser.conversation );

  const handleSendMessage = async () => {
    const newMessage = { type: 'sent', content: inputValue };
    const updatedConversation = [...conversation, newMessage];
  
    try {
      const response = await axios.post(`https://system-atrium-vyk9.vercel.app/api/users/${selectedUser.name}/send-message`, {
        message: inputValue,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const reply = response.data.reply;
      updatedConversation.push({ type: 'received', content: reply });
  
      // Update the conversation for the selected user only
      const updatedUsers = { ...users };
      const inbox = updatedUsers.inbox;
      inbox.forEach((user) => {
        if (user.name === selectedUser.name) {
          user.conversation = updatedConversation;
        }
      });
  
      setUsers(updatedUsers);
      setConversation(updatedConversation);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  
    setInputValue('');
  };
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-profile">
          <img className="avatar" src={avatarMap[selectedUser.avatar]} alt="avatar" />
          <div className="chat-name">{selectedUser.name}</div>
        </div>
        <div className="chat-icon">
          <div><DoneOutlinedIcon /></div>
          <div><AccessTimeOutlinedIcon /></div>
          <div><NotificationsOutlinedIcon /></div>
          <div><ManageSearchOutlinedIcon /></div>
          <div><MoreHorizOutlinedIcon /></div>
          <div><ErrorOutlineOutlinedIcon /></div>
          {selectedUser.message.length > 0 && (
            <img 
              src={messageIconMap[selectedUser.message[0]]} 
              className="chat-message-box" 
              alt="first message icon" 
            />
          )}
        </div>
      </div>

      <div className="chat-box">
      <div className="chat-body">
        {summary ? (
          <div className="summary">
            <strong>Summary of conversation:</strong> {summary}
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.type === 'sent' ? 'sent' : 'received'}`}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>
      </div>

      <div className="chat-footer">
        <div><AttachFileOutlinedIcon /></div>
        <div><PersonOutlineOutlinedIcon /></div>

        <div className="input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message ${selectedUser.name}`}
          />
          <div><EmojiEmotionsOutlinedIcon /></div>
        </div>

        <button onClick={handleSendMessage}>
          <ArrowUpwardOutlinedIcon />
        </button>
        <div><KeyboardArrowDownIcon /></div>
      </div>
    </div>
  );
};

export default App;
