import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const NotFound = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate("/");
    }

    return (
        <div>
            <h2>您要访问的页面不存在</h2>
            <Button type='link' onClick={handleBackHome}>Click here</Button>to back to the home page...
        </div>
    )
}

export default NotFound