import HomeComponent from '../../../components/User/Home/home';

const Home = () => {
  return (
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
      <HomeComponent />
    </div>
  );
}

export default Home;
