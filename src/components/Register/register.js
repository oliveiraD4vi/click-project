import { useState } from 'react';
import { MailOutlined, LockOutlined, UserOutlined, FieldNumberOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Notification } from '../../services/utils';
import api from '../../services/api';

import './register.scss';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { name, email, matricula, password } = values;

    setLoading(true);
    setDisabled(true);

    try {
      const response = await api.post('/register', {
        name,
        email: email.toLowerCase(),
        matricula,
        password,
      });

      const { data } = response;
      Notification('success', data.message);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      const { data } = error.response;
      Notification('error', data.message);
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-box-in">
          <span className="register-description">
            CRIE SUA CONTA CLICK
          </span>

          <Form form={form} className="register-form" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Digite seu nome',
                },
                {
                  min: 10,
                  message: 'Digite seu nome completo',
                },
              ]}
            >
              <Input
                disabled={disabled}
                prefix={<UserOutlined className="icon" />}
                placeholder="Nome"
              />
            </Form.Item>

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
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Digite seu e-mail',
                },
                {
                  type: 'email',
                  message: 'Esse e-mail não é válido',
                },
              ]}
            >
              <Input
                disabled={disabled}
                prefix={<MailOutlined className="icon" />}
                placeholder="Email"
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
                CADASTRAR
              </Button>
            </Form.Item>
          </Form>

          <p className="login-link">
            Já tem uma conta?
            <span onClick={() => navigate('/login')}> Faça login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
