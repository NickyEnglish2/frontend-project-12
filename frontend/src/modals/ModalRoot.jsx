import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../slices/modalsSlice';
import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ModalRoot = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps } = useSelector((state) => state.modals);

  const handleHide = () => {
    dispatch(hideModal());
  };

  const MODAL_COMPONENTS = {
    addChannel: AddChannelModal,
    editChannel: EditChannelModal,
    deleteChannel: ConfirmDeleteModal,
  };

  if (!modalType) {
    return null;
  };

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal show onHide={handleHide} {...modalProps} />;
};

export default ModalRoot;
