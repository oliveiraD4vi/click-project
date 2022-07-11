import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Notification } from '../../../services/utils';
import { ClockCircleOutlined } from '@ant-design/icons';

import api from '../../../services/api';

import './countdown.scss';

const Countdown = ({ targetTime, limitTime }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [status, setStatus] = useState('start');

  const timeBetween = new Date(targetTime) - currentTime;
  let seconds = ('0' + Math.floor((timeBetween / 1000) % 60).toString()).slice(-2);
  let minutes = ('0' + Math.floor((timeBetween / 1000 / 60) % 60).toString()).slice(-2);
  let hours = ('0' + Math.floor((timeBetween / (1000 * 60 * 60)) % 24).toString()).slice(-2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    let limitTimeAux = limitTime / 2;
    let half = targetTime - limitTimeAux;
    let end = targetTime - 1800000;

    if (Date.now() > new Date(half) && !(Date.now() > new Date(end))) {
      setStatus('middle');
    } else if (Date.now() > new Date(end)) {
      setStatus('end');
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [Date.now(), targetTime, limitTime]);

  useEffect(() => {
    async function fetchData() {
      if (Date.now() > new Date(targetTime)) {
        try {
          await api.put('/voting/end?cancel=false');
          document.location.reload(true);
        } catch (error) {
          const { data } = error.response;
          Notification('error', data.message);
        }
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [Date.now(), targetTime]);

  if (timeBetween < 0) {
    minutes = '00';
    hours = '0';
    seconds = '00';
  }

  return (
    <Tooltip title="A votação acaba em">
      <div className={`${status} countdown-container`}>
          <p><ClockCircleOutlined /></p>
        <div className="timer">
          {hours && <span>{hours}:</span>}
          <span>
            {minutes}:{seconds}
          </span>
        </div>
      </div>
    </Tooltip>
  );
};

export default Countdown;
