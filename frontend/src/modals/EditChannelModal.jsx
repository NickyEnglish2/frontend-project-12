import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import editChannelApi from '../utilities/editChannelApi';
import { updateChannel } from '../slices/channelsSlice';

const EditChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);
  const { token } = useSelector((state) => state.auth);
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Новое название не менее 3 символов')
      .max(20, 'Новое название не более 20 символов')
      .required('Обязательное поле')
      .test('unique', 'Канал с таким именем уже существует', (value) => {
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
        <Modal.Title>Редактирование канала # {channel?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              placeholder="Введите новое название канала"
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
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Сохранить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
