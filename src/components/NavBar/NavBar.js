import React, { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
const FixedNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect(()=> {
        let user = window.localStorage.getItem('user');
        if(user){
            let parsed = JSON.parse(user);
            setUser(parsed);

        }
    } , [])
    const Logout = () => {
        window.localStorage.setItem('user' , '');
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: 'grey',height: '55px', padding: '10px' }}>
      <div  className='nav-parent'>
        <div style={{display:"flex"}}>
            <p className='nav-p'>{user.name}</p>
            <p>-</p>
            <p className='nav-p'>{user.group}</p>

        </div>
        <div>
            <button className='logoutbtn' onClick={Logout}>Logout</button>
        </div>

      </div>
    </nav>
  );
};

export default FixedNavbar;
