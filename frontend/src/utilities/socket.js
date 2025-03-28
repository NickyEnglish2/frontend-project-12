import { io } from 'socket.io-client';

const createSocket = () => io('/', { autoConnect: false });

export default createSocket;
