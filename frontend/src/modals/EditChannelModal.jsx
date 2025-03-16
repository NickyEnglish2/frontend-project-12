import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import editChannelApi from '../utilities/editChannelApi';
import { updateChannel } from '../slices/channelsSlice';

const EditChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);
  const { token } = useSelector((state) => state.auth);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('editChannelModal.validation.min'))
      .max(20, t('editChannelModal.validation.max'))
      .required(t('editChannelModal.validation.required'))
      .test('unique', t('editChannelModal.validation.unique'), (value) => {
        return !channels.some((ch) => ch.name === value && ch.id !== channel.id);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: channel?.name || '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const editedChannel = await editChannelApi(channel.id, values.name, token);
        dispatch(updateChannel(editedChannel));
        onHide();
        resetForm();
      } catch (err) {
        console.error('Ошибка при редактировании канала:', err);
      }
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('editChannelModal.title', { channelName: channel?.name })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              placeholder={t('editChannelModal.placeholder')}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && !!formik.errors.name}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onHide} className="me-2">
              {t('editChannelModal.cancelBtn')}
            </Button>
            <Button type="submit" variant="primary">
              {t('editChannelModal.saveBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
