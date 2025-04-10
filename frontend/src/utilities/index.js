import createSocket from './socket';
import { censorText, addRussianDictionary } from './text/censor';
import { loginApi, signUpApi } from './api/authApi';
import { fetchChannels, addChannel, removeChannel, editChannel } from './api/channelsApi';
import { sendMessage, removeMessage } from './api/messagesApi';

export {
  createSocket,
  censorText,
  addRussianDictionary,
  loginApi,
  signUpApi,
  fetchChannels,
  addChannel,
  removeChannel,
  editChannel,
  sendMessage,
  removeMessage,
};
