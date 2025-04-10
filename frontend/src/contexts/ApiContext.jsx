import { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from './AuthContext';
import {
  fetchChannels as fetchChannelsApi,
  addChannel as addChannelApi,
  removeChannel as removeChannelApi,
  editChannel as editChannelApi,
} from '../utilities/api/channelsApi';
import {
  sendMessage as sendMessageApi,
  removeMessage as removeMessageApi,
} from '../utilities/api/messagesApi';

const ApiContext = createContext(null);

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const fetchChannels = () => dispatch(fetchChannelsApi(token));

  const addChannel = async (name) => addChannelApi(name, token);

  const removeChannel = async (channelId) => removeChannelApi(channelId, token);
  
  const editChannel = async (channelId, name) => editChannelApi(channelId, name, token);

  const sendMessage = async (message) => sendMessageApi(message, token);

  const removeMessage = async (messageId) => removeMessageApi(messageId, token);

  const value = useMemo(() => ({
    fetchChannels,
    addChannel,
    removeChannel,
    editChannel,
    sendMessage,
    removeMessage,
  }), [fetchChannels, addChannel, removeChannel, editChannel, sendMessage, removeMessage]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
