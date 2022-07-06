import { Radio, Spin, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../../../services/utils';
import { auth } from '../../../../services/utils';
import { CheckOutlined } from '@ant-design/icons';

import Card from '../Card/card';
import api from '../../../../services/api';
import Countdown from '../../Countdown/countdown';
import moment from 'moment';

import './voting.scss';

const Voting = ({ id, date }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState(null);
  const [voted, setVoted] = useState(false);
  const [value, setValue] = useState(null);
  
  let createdDate = Math.floor(+new Date(date));

  const navigate = useNavigate();

  const modalContent = (
    <div className="confirm-modal-content">
      <div className="confirm">
        <div className="box">
          <CheckOutlined />
        </div>
        <h1>Seu voto foi registrado com sucesso!</h1>
      </div>
      <span>Agora é só esperar pelo resultado</span>
    </div>
  );

  const handleSubmit = async () => {
    setLoading(true);

    if (value && auth.getId()) {
      try {
        await api.put(`/voting/vote?userId=${auth.getId()}&filmId=${value}`);
        setVisible(true);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(
          `/voting/films/list?voting_id=${id}`
        );
        const { data } = response;
        setMovieList(data.films);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      if (auth.isAuthenticated()) {
        try {
          const response = await api.get(
            `/voting/check?userId=${auth.getId()}`
          );
          const { data } = response;
          console.log(data);
          setVoted(data.voted);
        } catch (error) {
          const { data } = error.response;
          Notification('error', data.message);
        }
      }
    }

    fetchData();
  }, [movieList]);

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  return movieList ? (
    <div className="voting-container">
      <div className="voting-header">
        <div className="date">
          <h2>{moment(date).format('DD/MM/YYYY')}</h2>
          <div className="line"></div>
        </div>

        <div className="caption">
          <p>
            {voted 
              ? 'Você já votou para essa exibição, aguarde para ver o resultado'
              : 'Qual filme você quer ver no cineEscola?'
            }
          </p>
          <Countdown
            targetTime={7200 * 1000 + createdDate}
            limitTime={7200 * 1000}
          />
        </div>
      </div>

      <Radio.Group
        className="radio-list"
        onChange={onChange}
        value={value}
      >
        {movieList.map((movie) => (
          <Radio
            className={
              !auth.isAuthenticated() || voted
                ? 'not-selectable'
                : null
              }
            value={movie.id}
            key={movie.film_code}
          >
            <Card id={movie.film_code} />
          </Radio>
        ))}
      </Radio.Group>
      
      {voted
        ? null
        : auth.isAuthenticated()
        ? (
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="primary-button"
              onClick={handleSubmit}
              disabled={value ? false : true}
              style={{ width: "20%", marginTop: "50px" }}
            >
              VOTAR
            </Button>
          )
        : <p className="bottom-caption">
            Faça
            <span 
              onClick={() => navigate('/login')}
            > LOGIN </span>
            para votar
          </p>
        }

      <Modal
        title={null}
        footer={null}
        visible={visible}
        centered
        className="confirm-modal"
        onCancel={() => {
          document.location.reload(true);
        }}
      >
        {modalContent}
      </Modal>
    </div>
  ) : (
    <div className="loading">
      <Spin />
    </div>
  );
};

export default Voting;
