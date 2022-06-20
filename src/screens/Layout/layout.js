import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-container" style={{ height: '100vh' }}>
      <Header />
      <div className="main" style={{ width: '100%', height: '85%' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
