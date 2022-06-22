import { useState } from 'react';
import { LockOutlined, FieldNumberOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Notification, auth } from '../../services/utils';
import api from '../../services/api';

import './login.scss';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { matricula, password } = values;

    setLoading(true);
    setDisabled(true);

    try {
      const response = await api.post('/login', {
        matricula,
        password,
      });

      const { data } = response;
      auth.login(data.authData);
      
      Notification('success', data.message);
      navigate('/home');
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      const { data } = error.response;
      Notification('error', data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-box-in">
          <Form form={form} className="login-form" onFinish={handleSubmit}>
            <Form.Item
              name="matricula"
              rules={[
                {
                  required: true,
                  message: 'Digite sua matrícula',
                },
                {
                  min: 6,
                  message: 'Essa matrícula não é válida',
                },
                {
                  max: 6,
                  message: 'Essa matrícula não é válida',
                },
              ]}
            >
              <Input
                disabled={disabled}
                prefix={<FieldNumberOutlined className="icon" />}
                placeholder="Matrícula"
              />
            </Form.Item>

            <Form.Item
              name="password"
              className="input-password"
              rules={[
                {
                  required: true,
                  message: 'Digite sua senha',
                },
                {
                  min: 8,
                  message: 'A senha deve ter, no mínimo, 8 caracteres',
                },
              ]}
            >
              <Input
                disabled={disabled}
                placeholder="Senha"
                type="password"
                prefix={<LockOutlined className="icon" />}
              />
            </Form.Item>

            <Form.Item className="btn">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="primary-button"
              >
                ENTRAR
              </Button>
            </Form.Item>
          </Form>

          <Button
            loading={loading}
            type="primary"
            onClick={() => navigate('/register')}
            className="link-button"
          >
            <ArrowLeftOutlined />
            Ainda não tem uma conta? Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
