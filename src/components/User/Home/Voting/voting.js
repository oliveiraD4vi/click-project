import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Notification } from '../../../../services/utils';

import api from '../../../../services/api';
import Card from '../Card/card';

import './voting.scss';

const Voting = ({ id }) => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(
          `/voting/films/list?voting_id=${id}`
        );
        const { data } = response;
        setMovieData(data.films);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, [id]);

  return movieData ? (
    <div className="voting-container">
      {movieData.map((movie) => (
        <Card key={movie.film_code} id={movie.film_code} />
      ))}
    </div>
  ) : <Spin />;
};

export default Voting;
