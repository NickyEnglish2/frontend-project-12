import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelsSlice';
import addChannelApi from '../utilities/addChannelApi.js';

const AddChannelModal = ({ show, onHide }) => {
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
      .min(3, t('addChannelModal.validation.min'))
      .max(20, t('addChannelModal.validation.max'))
      .required(t('addChannelModal.validation.required'))
      .test('unique', t('addChannelModal.validation.unique'), (value) => {
        return !channels.some((channel) => channel.name === value);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newChannel = await addChannelApi(values.name, token);

        onHide();
        resetForm();

        dispatch(setCurrentChannel(newChannel.id));
      } catch (err) {
        console.error('Ошибка при создании канала', err);
      }
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              placeholder={t('addChannelModal.placeholder')}
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
              {t('addChannelModal.cancelBtn')}
            </Button>
            <Button type="submit" variant="primary">
              {t('addChannelModal.submitBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
