import React, { useState } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import './GroupDashboard.css';

const MessageBoard = ({ messages, currentUser, onSend }) => {
  const [message, setMessage] = useState('');
  const [activeThread, setActiveThread] = useState('group');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: currentUser.name,
        senderId: currentUser.id,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        isCurrentUser: true,
        thread: activeThread
      };
      onSend(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="message-board">
      <div className="message-header">
        <h3>Messagerie</h3>
        <div className="message-tabs">
          <button
            className={`tab-btn ${activeThread === 'group' ? 'active' : ''}`}
            onClick={() => setActiveThread('group')}
          >
            Groupe
          </button>
          <button
            className={`tab-btn ${activeThread === 'professor' ? 'active' : ''}`}
            onClick={() => setActiveThread('professor')}
          >
            Professeur
          </button>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.filter(m => m.thread === activeThread).length === 0 ? (
          <div className="empty-message">
            <p>Aucun message dans cette conversation</p>
            {activeThread === 'professor' && (
              <p>Envoyez un message au professeur pour des questions privées</p>
            )}
          </div>
        ) : (
          messages
            .filter(m => m.thread === activeThread)
            .map(msg => (
              <div 
                key={msg.id} 
                className={`message ${msg.isCurrentUser ? 'sent' : 'received'}`}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <div className={`avatar ${msg.isCurrentUser ? 'you' : ''}`}>
                      {msg.sender.charAt(0)}
                    </div>
                    <div>
                      <span className="sender-name">{msg.sender}</span>
                      <span className="message-time">{msg.time} • {msg.date}</span>
                    </div>
                  </div>
                </div>
                <div className="message-content">{msg.text}</div>
              </div>
            ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <div className="form-group">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Écrire un message ${activeThread === 'group' ? 'au groupe' : 'au professeur'}...`}
            required
            rows="2"
          />
          <button type="submit" className="btn-primary send-btn">
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageBoard;