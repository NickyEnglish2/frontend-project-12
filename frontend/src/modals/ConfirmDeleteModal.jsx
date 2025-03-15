import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, onHide, onConfirm, ChannelName }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы точно хотите удалить <strong>{ChannelName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Нет
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Да
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
