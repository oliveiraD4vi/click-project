import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-container" style={{ height: '100vh' }}>
      <Header />
      <div className="main">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
