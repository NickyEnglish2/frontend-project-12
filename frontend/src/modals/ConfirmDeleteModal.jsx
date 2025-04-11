/* eslint-disable object-curly-newline */

import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannelAsync } from '../slices/channelsSlice.js';
import { hideModal } from '../slices/modalsSlice.js';

const ConfirmDeleteModal = ({ show, onHide, channelId, channelName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleDeleteChannel = async () => {
    try {
      await dispatch(removeChannelAsync({ channelId, token })).unwrap();
      dispatch(hideModal());
    } catch (err) {
      console.error('Ошибка при удалении', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmDeleteModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('confirmDeleteModal.body', { channelName })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('confirmDeleteModal.btnNo')}
        </Button>
        <Button variant="danger" onClick={handleDeleteChannel}>
          {t('confirmDeleteModal.btnYes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
