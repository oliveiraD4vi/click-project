import { useEffect, useState } from 'react';
import { Notification } from '../../services/utils';
import api from '../../services/api';

import { Spin } from 'antd';

import HomeComponent from '../../components/User/Home/home';

const Home = () => {
  const [id, setId] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/voting/list');
        const { data } = response;
        setList(data.votings);
        setId(data.votings[0].id);
      } catch (error) {
        const { data } = error.response;
        Notification('error', data.message);
      }
    }

    fetchData();
  }, []);

  return list && id ? (
    <div
      className="home-page"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <HomeComponent list={list} lastId={id} />
    </div>
  ) : <Spin />;
};

export default Home;
