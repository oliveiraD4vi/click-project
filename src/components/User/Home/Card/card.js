import { Modal, Radio } from 'antd';
import {
  InfoCircleOutlined,
  CheckOutlined,
  EditOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Notification } from '../../../../services/utils';

import axios from 'axios';

import './card.scss';

const Card = ({ id }) => {
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [modalComponent, setModalComponent] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?&apikey=e28771f6&type=movie&i=${id}`
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

  const plot = movieData ? (
    <>{movieData.Plot}</>
  ) : null;
    
  const tecno = movieData ? (
    <div className="tecno-info">
      <div className="info">
        <p>LANÇAMENTO</p>
        <span>{movieData.Released}</span>
      </div>

      <div className="info">
        <p>DURAÇÃO</p>
        <span>{movieData.Runtime}</span>
      </div>

      <div className="info">
        <p>GÊNERO</p>
        <span>{movieData.Genre}</span>
      </div>

      <div className="info">
        <p>DIREÇÃO</p>
        <span>{movieData.Director}</span>
      </div>

      <div className="info">
        <p>PAÍS</p>
        <span>{movieData.Country}</span>
      </div>

      <div className="info">
        <p>LINGUAGEM</p>
        <span>{movieData.Language}</span>
      </div>
    </div>
  ) : null;

  const onChange = ({ target: { value } }) => {
    setValue(value);
    switch (value) {
      case "PLOT": setModalComponent(plot); break;
      case "TECN": setModalComponent(tecno); break;
      default: break;
    }
  };

  const modalContent = movieData ? (
    <div className="modal-content">
      <div className="modal-header">
        <h1>{movieData.Title}</h1>
      </div>

      <div className="modal-info">
        <img src={movieData.Poster} alt="movie poster" />
        <div className="content">
          <div className="navigation">
            <Radio.Group
              className="radio-navigation"
              onChange={onChange}
              value={value}
              defaultValue={'PLOT'}
            >
              <Radio value="PLOT">
                <EditOutlined /> Sinopse
              </Radio>
              <Radio value="TECN">
                <ProfileOutlined /> Ficha técnica
              </Radio>
            </Radio.Group>
          </div>

          <div className="content-info">
            {modalComponent
              ? modalComponent
              : plot
            }
          </div>
        </div>
      </div>
    </div>
  ) : null;

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
            <InfoCircleOutlined />
          </span>
        </div>
      </div>

      <Modal
        title={null}
        footer={null}
        visible={visible}
        centered
        className="info-modal"
        onCancel={() => setVisible(false)}
      >
        {modalContent}
      </Modal>
    </div>
  ) : null;
};

export default Card;
