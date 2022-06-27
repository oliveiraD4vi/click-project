import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Notification } from '../../../services/utils';

import moment from 'moment';
import Voting from './Voting/voting';
import api from '../../../services/api';

import './home.scss';

const Home = () => {
  const [votingData, setVotingData] = useState(null);

  const noVoting = (
    <span>no on going voting</span>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/voting/last');
        const { data } = response;
        setVotingData(data.voting);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, []);
  
  return votingData ? (
    <div className="home-container">
      {votingData.current
          ? <Voting
              id={votingData.id}
              date={moment(
                votingData.createdAt
              ).format('DD/MM/YYYY')}
            />
          : noVoting
        }
    </div>
  ) : <Spin />;
};

export default Home;
