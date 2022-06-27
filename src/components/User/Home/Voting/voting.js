import { Spin, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Notification } from '../../../../services/utils';
// import { auth } from '../../../../services/utils';

import Card from '../Card/card';
import api from '../../../../services/api';

import './voting.scss';

const Voting = ({ id, date }) => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState(null);

  const handleSubmit = async () => {
    // setLoading(true);

    // try {
    //   const response = await api.post('/voting/vote', {
    //     film_id: 12,
    //     user_id: auth.getId();
    //   });
    //   const { data } = response;      
    //   Notification('success', data.message);
    // } catch (error) {
    //   setLoading(false);

    //   const { data } = error.response;
    //   Notification('error', data.message);
    // }
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

  return movieList ? (
    <div className="voting-container">
      <div className="voting-header">
        <div className="date">
          <h2>{date}</h2>
          <div className="line"></div>
        </div>
        <p>
          Qual filme você quer que passe no cineEscola?
        </p>
      </div>

      <div className="movies-list">
        {movieList.map((movie) => (
          <Card id={movie.film_code} key={movie.film_code} />
        ))}
      </div>

      <Button
        loading={loading}
        type="primary"
        htmlType="submit"
        className="primary-button"
        onClick={handleSubmit}
      >
        VOTAR
      </Button>
    </div>
  ) : <Spin />;
};

export default Voting;
