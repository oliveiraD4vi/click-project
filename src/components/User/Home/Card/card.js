import { Modal } from 'antd';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Notification } from '../../../../services/utils';

import axios from 'axios';

import './card.scss';

const Card = ({ id }) => {
  const [visible, setVisible] = useState(false);
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
      
      <div className="bottom-container">
        <div className="checkbox-container">
          <div className="checkbox">
            <CheckOutlined />
          </div>
        </div>
        
        <div className="info">
          <h1>{movieData.Title}</h1>
          <span>{movieData.Year}</span>
        </div>

        <div className="details">
          <span onClick={() => setVisible(true)}>
            <ArrowRightOutlined />
          </span>
        </div>
      </div>

      <Modal
        title={null}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </div>
  ) : null;
};

export default Card;
