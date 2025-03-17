import { useEffect, useState } from 'react';
import { Button, ListGroup, Form, Row, Col, Container, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { BiAddToQueue } from 'react-icons/bi';
import { FaEllipsisV } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { censorText } from '../utilities/censorText.js';
import fetchChannels from '../utilities/fetchChannels.js';
import sendMessageApi from '../utilities/sendMessageApi.js';
import removeChannelApi from '../utilities/removeChannelApi.js';
import removeMessageApi from '../utilities/removeMessagesApi.js';
import { setCurrentChannel, addChannel, removeChannel, updateChannel } from '../slices/channelsSlice.js';
import { addMessage, removeMessage } from '../slices/messagesSlice.js';
import socket from '../utilities/socket.js';
import AddChannelModal from '../modals/AddChannelModal.jsx';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.jsx';
import EditChannelModal from '../modals/EditChannelModal.jsx';
import Header from './Header.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const { token, username } = useSelector((state) => state.auth);

  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const [channelToEdit, setChannelToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [dispatch, token]);

  const currentMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  const formatMessageCount = (count) => {
    return t('mainPage.messages.messageCount', { count });
  };

  const handleDeleteChannel = async () => {
    if (channelToDelete) {
      try {
        const messagesToDelete = messages.filter((msg) => msg.channelId === channelToDelete);

        await Promise.all(
          messagesToDelete.map((msg) => removeMessageApi(msg.id, token))
        );

        await removeChannelApi(channelToDelete, token);

        dispatch(removeMessage(channelToDelete));

        setShowConfirmDeleteModal(false);
      } catch (err) {
        console.error('Ошибка при удалении', err);
      }
    }
  };

  const handleEditChannel = (channel) => {
    setChannelToEdit(channel);
    setShowEditChannelModal(true);
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.message.trim()) {
        const filteredMessage = censorText(values.message);

        dispatch(sendMessageApi({ body: filteredMessage, channelId: currentChannelId, username }));
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (token) {
      socket.auth = { token };
      socket.connect();

      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });

      socket.on('newChannel', (payload) => {
        dispatch(addChannel(payload));
        toast.success(t('toasters.newChannel'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });

      socket.on('removeChannel', (payload) => {
        dispatch(removeChannel(payload.id));
        toast.error(t('toasters.deletedChannel'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });

      socket.on('renameChannel', (payload) => {
        dispatch(updateChannel(payload));
        toast.warn(t('toasters.editedChannel'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });

      socket.on('connect_error', (err) => {
        console.error('Ошибка подключения:', err.message);
        toast.warn(t('toasters.networkErr'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });

      socket.on('reconnect', () => {
        console.log('Подключение восстановлено');
        toast.success(t('toasters.networkRestored'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
    }

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('connect_error');
      socket.off('reconnect');
    };
  }, [dispatch, token, t]);

  return (
    <>
      <Header showLogoutButton={true} />
      <ToastContainer />
      <Container fluid style={{ height: 'calc(100vh - 56px)' }}>
        <Row className="h-100">
          <Col md={3} className="bg-light border-end p-3 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{t('mainPage.channels')}</h5>
              <Button
                variant="link"
                onClick={() => setShowAddChannelModal(true)}
                className="p-0"
                title={t('mainPage.addChannelBtn')}
              >
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
                            backgroundColor: "#a4a4a4",
                            borderRadius: "4px",
                            padding: "4px 8px",
                          }}
                        >
                          <FaEllipsisV size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleEditChannel(channel)}
                          >
                            {t('mainPage.dropDown.edit')}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setChannelToDelete(channel.id);
                              setShowConfirmDeleteModal(true);
                            }}
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
          </Col>

          <Col md={9} className="d-flex flex-column h-100 p-3">
            <Card className="flex-grow-1 mb-3">
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  # {channels.find((ch) => ch.id === currentChannelId)?.name}{' '}
                  <small className="text-muted">
                    {formatMessageCount(currentMessages.length)}
                  </small>
                </Card.Title>
                <div className="overflow-auto flex-grow-1 mb-3">
                  {currentMessages.map((msg) => (
                    <div key={msg.id} className="mb-2">
                      <strong>{msg.username}: </strong>
                      {msg.body}
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Form onSubmit={formik.handleSubmit} className="mt-auto">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={2}
                  placeholder={t('mainPage.form.placeholder')}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.message && !!formik.errors.message}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="mt-2">
                {t('mainPage.form.sendBtn')}
              </Button>
            </Form>
          </Col>
        </Row>

        <AddChannelModal
          show={showAddChannelModal}
          onHide={() => setShowAddChannelModal(false)}
        />

        <ConfirmDeleteModal
          show={showConfirmDeleteModal}
          onHide={() => setShowConfirmDeleteModal(false)}
          onConfirm={handleDeleteChannel}
          channelName={channels.find((ch) => ch.id === channelToDelete)?.name || ''}
        />

        <EditChannelModal
          show={showEditChannelModal}
          onHide={() => setShowEditChannelModal(false)}
          channel={channelToEdit}
        />
      </Container>
    </>
  );
};

export default MainPage;
