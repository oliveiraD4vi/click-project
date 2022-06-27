import { useState, useEffect } from 'react';
import { Notification } from '../../../../services/utils';

import axios from 'axios';

import './card.scss';

const Card = ({ id }) => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?&apikey=e28771f6&type=movie&i=${id}`
        );
        const { data } = response;
        setMovieData(data);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, [id]);

  return movieData ? (
    <div className="card-container">
      <img src={movieData.Poster} alt="movie poster" />
      <span>{movieData.Title}</span>
    </div>
  ) : null;
};

export default Card;
