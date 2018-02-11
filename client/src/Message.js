import React from 'react';

const Message = ({chat, user}) => (
    <li className={`chat ${user === chat.username ? "right" : "left"}`}>
       <p>{user !== chat.username && (<strong>{chat.username}:</strong>)}
       {user !== chat.username &&(<br/>)}
      {chat.content}</p>
    </li>
);

export default Message;