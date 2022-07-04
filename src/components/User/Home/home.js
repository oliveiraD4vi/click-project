import { Spin, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { Notification } from '../../../services/utils';

import moment from 'moment';
import Voting from './Voting/voting';
import api from '../../../services/api';

import './home.scss';
import axios from 'axios';

const Home = ({ list, lastId }) => {
  const [value, setValue] = useState(lastId);
  const [votingData, setVotingData] = useState(null);
  const [movieData, setMovieData] = useState(null);

  const noVoting = movieData ? (
    <div className="no-voting">
      <div className="voting-header">
        <div className="date">
          <h2>{moment(votingData.updatedAt).format('DD/MM/YYYY')}</h2>
          <div className="line"></div>
        </div>
        <p>
          Filme vencedor com
          <span> {votingData.percent}% </span>
          dos votos
        </p>
      </div>

      <div className="movie-container">
        <img src={movieData.Poster} alt="movie poster" />

        <div className="info-container">
          <h1>{movieData.Title}</h1>
          <p>{movieData.Year}</p>

          <div className="info">
            <h3>{movieData.Plot}</h3>
          </div>

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
              <p>DIRETORES</p>
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
        </div>
      </div>

      <div className="rodape">
        <p>A próxima votação será lançada logo!</p>
        <span>Aproveite o filme</span>
      </div>
    </div>
  ) : null;

  useEffect(() => {
    async function fetchData() {
      if (votingData && votingData.result) {
        try {
          const response = await axios.get(
            `http://www.omdbapi.com/?&apikey=e28771f6&type=movie&i=${votingData.result}`
          );
          const { data } = response;
          setMovieData(data);
        } catch (error) {
          const { data } = error.response;
          Notification('error', data.message);
        }
      }
    }

    fetchData();
  }, [votingData]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/voting?id=${value}`);
        const { data } = response;
        setVotingData(data.voting);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, [value]);

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };
  
  return votingData ? (
    <div className="home-container">
      <Radio.Group
        className="radio-voting-list"
        onChange={onChange}
        value={value}
      >
        {list.map((voting) => voting.percent || voting.id === lastId ? (
          <Radio value={voting.id} key={voting.id}>
            {moment(voting.updatedAt).format('DD/MM/YYYY')}
          </Radio>
        ) : null)}
      </Radio.Group>

      {votingData.current
        ? <Voting
            id={votingData.id}
            date={votingData.createdAt}
          />
        : noVoting
      }
    </div>
  ) : <Spin />;
};

export default Home;
