import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from './header';
import Center from './center';
import Footer from './footer';
import {USER_INFO} from 'src/constants';

const Layouts: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '{}');

  useEffect(() => {
    if (!userInfo || !userInfo.userName) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="layout" style={{height: '100%'}}>
      <Header />
      <Center />
      <Footer />
    </div>
  );
};

export default Layouts;
