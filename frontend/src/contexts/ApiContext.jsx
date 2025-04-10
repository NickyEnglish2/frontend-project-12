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

  const value = useMemo(() => ({
    fetchChannels: () => dispatch(fetchChannelsApi(token)),

    addChannel: async (name) => addChannelApi(name, token),

    removeChannel: async (channelId) => removeChannelApi(channelId, token),

    editChannel: async (channelId, name) => editChannelApi(channelId, name, token),

    sendMessage: async (message) => sendMessageApi(message, token),

    removeMessage: async (messageId) => removeMessageApi(messageId, token),
  }), [dispatch, token]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
