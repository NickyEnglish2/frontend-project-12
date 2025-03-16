import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ConfirmDeleteModal = ({ show, onHide, onConfirm, channelName }) => {
  const { t } = useTranslation();

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
        <Button variant="primary" onClick={onConfirm}>
        {t('confirmDeleteModal.btnYes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
