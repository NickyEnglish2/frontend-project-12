/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */

import { Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { censorText, sendMessage } from '../../utilities/index';

const ChatArea = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const currentMessages = useSelector((state) => (
    state.messages.messages.filter((msg) => msg.channelId === currentChannelId)
  ));
  const { username } = useSelector((state) => state.auth);

  const formatMessageCount = (count) => t('mainPage.messages.messageCount', { count });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.message.trim()) {
        const filteredMessage = censorText(values.message);
        dispatch(sendMessage({ body: filteredMessage, channelId: currentChannelId, username }));
        resetForm();
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
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
            placeholder={t('mainPage.form.placeholder')}
            rows={2}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formik.handleSubmit();
              }
            }}
            isInvalid={formik.touched.message && !!formik.errors.message}
            required
            aria-label="Новое сообщение"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="mt-2">
          {t('mainPage.form.sendBtn')}
        </Button>
      </Form>
    </div>
  );
};

export default ChatArea;
