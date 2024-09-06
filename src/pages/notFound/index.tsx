import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'antd';

export async function loader() {
  return null;
}

export default function NotFound() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div style={{color: '#000'}}>
      <h2>您要访问的页面不存在</h2>
      <Button type="link" onClick={handleBackHome}>
        Click here
      </Button>
      to back to the home page...
    </div>
  );
}
