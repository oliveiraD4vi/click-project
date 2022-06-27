import { Radio, Spin, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Notification } from '../../../../services/utils';
import { auth } from '../../../../services/utils';

import Card from '../Card/card';
import api from '../../../../services/api';

import './voting.scss';

const Voting = ({ id, date }) => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState(null);
  const [voted, setVoted] = useState(false);
  const [value, setValue] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api.put('/voting/vote', {
        film_id: value,
        user_id: auth.getId()
      });
      const { data } = response;      
      Notification('success', data.message);
      document.location.reload(true);
    } catch (error) {
      setLoading(false);

      const { data } = error.response;
      Notification('error', data.message);
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
      try {
        const response = await api.get(
          `/voting/check?userId=${auth.getId()}`
        );
        const { data } = response;
        setVoted(data.voted);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
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
          <h2>{date}</h2>
          <div className="line"></div>
        </div>
        <p>
          {voted 
            ? 'Você já votou para essa exibição, aguarde o encerramento para ver o resultado'
            : 'Qual filme você quer ver no cineEscola?'
          }
        </p>
      </div>

      <Radio.Group
        className="radio-list"
        onChange={onChange}
        disabled={voted}
        value={value}
      >
        {movieList.map((movie) => (
          <Radio value={movie.id} key={movie.film_code}>
            <Card id={movie.film_code} />
          </Radio>
        ))}
      </Radio.Group>
      
      {voted 
        ? null
        : (
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
        )}
    </div>
  ) : <Spin />
};

export default Voting;
