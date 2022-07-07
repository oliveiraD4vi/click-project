import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Notification, auth } from '../../../services/utils';

import api from '../../../services/api';

import './suggestion.scss';

const Suggestion = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { TextArea } = Input;
  const [form] = Form.useForm();

  const handleSubmit = async (value) => {
    const { text } = value;

    setLoading(true);
    setDisabled(true);

    try {
      const response = await api.post('/suggestion', {
        user_id: auth.getId(),
        suggestion: text,
      });

      const { data } = response;
      Notification('success', data.message);

      setLoading(false);
      setDisabled(false);
      form.setFieldsValue({ text: '' });
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      const { data } = error.response;
      Notification('error', data.message);
    }
  };

  return (
    <div className="suggestion-container">
      <h1>Sugira um filme para ser exibido</h1>

      <Form form={form} className="suggestion-form" onFinish={handleSubmit}>
        <Form.Item
          name="text"
          rules={[
            {
              required: true,
              message: 'Digite sua sugestão',
            },
            {
              min: 4,
              message: 'Digite um pouco mais...',
            },
            {
              max: 80,
              message: 'Digite um pouco menos...',
            },
          ]}
        >
          <TextArea
            rows={4}
            maxLength={80}
            disabled={disabled}
            autoSize={{ minRows: 1, maxRows: 1 }}
            placeholder="Digite até 80 caracteres"
          />
        </Form.Item>

        <Form.Item className="btn">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={disabled}
            className="primary-button"
          >
            ENVIAR SUGESTÃO
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Suggestion;
