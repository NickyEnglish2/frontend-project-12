/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */

import { Button, ListGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BiAddToQueue } from 'react-icons/bi';
import { FaEllipsisV } from 'react-icons/fa';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { showModal } from '../../slices/modalsSlice.js';
// import { removeMessage } from '../../utilities/index';

const ChannelsSidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  // const { messages } = useSelector((state) => state.messages);
  const { token } = useSelector((state) => state.auth);

  //const handleDeleteChannel = async (channelId) => {
  // try {
  // const messagesToDelete = messages.filter((msg) => msg.channelId === channelId);

      // await Promise.all(
      //   messagesToDelete.map((msg) => removeMessage(msg.id, token)),
      // );

      // await dispatch(removeChannelAsync({ channelId, token })).unwrap();
      // dispatch(hideModal());
    // } catch (err) {
      // console.error('Ошибка при удалении', err);
    // }
  //};

  const handleShowAddChannel = () => {
    dispatch(showModal({ modalType: 'addChannel' }));
  };

  const handleShowEditChannel = (channel) => {
    dispatch(showModal({
      modalType: 'editChannel',
      modalProps: { channelId: channel.id, channelName: channel.name },
    }));
  };

  const handleShowDeleteChannel = (channelId, channelName) => {
    dispatch(showModal({
      modalType: 'deleteChannel',
      modalProps: { channelId, channelName },
    }));
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{t('mainPage.channels')}</h5>
        <Button
          variant="link"
          onClick={handleShowAddChannel}
          title={t('mainPage.addChannelBtn')}
        >
          <span className="visually-hidden">+</span>
          <BiAddToQueue size={20} />
        </Button>
      </div>
      <ListGroup variant="flush" className="flex-grow-1 mb-3">
        {channels.map((channel) => (
          <ListGroup.Item
            key={channel.id}
            action
            active={channel.id === currentChannelId}
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span># {channel.name}</span>
              {channel.removable && (
                <Dropdown onClick={(e) => e.stopPropagation()}>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-channel-actions"
                    className="p-1 rounded bg-light border-0"
                    style={{
                      backgroundColor: '#a4a4a4',
                      borderRadius: '4px',
                      padding: '4px 8px',
                    }}
                  >
                    <span className="visually-hidden">Управление каналом</span>
                    <FaEllipsisV size={16} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShowEditChannel(channel)}>
                      {t('mainPage.dropDown.edit')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleShowDeleteChannel(channel.id, channel.name)}
                    >
                      {t('mainPage.dropDown.delete')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChannelsSidebar;
