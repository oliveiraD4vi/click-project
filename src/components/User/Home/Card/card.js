import { Checkbox } from 'antd';
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
        console.log(data);
        setMovieData(data.films);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="card-container">
      {/* <div className="poster">
        <img src={poster} alt="movie poster" />
      </div> */}
      <div className="checkbox-container">
        <Checkbox onChange={onChange}>
          titulo
        </Checkbox>
      </div>
    </div>
  );
};

export default Card;
