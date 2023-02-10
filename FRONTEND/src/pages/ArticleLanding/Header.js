import React, {
    useState
} from 'react';
import './Header.css';
import {
    Outlet,
    useNavigate
} from 'react-router-dom';

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const [isActivee, setIsActivee] = useState(false);
    const navigate = useNavigate();
    const click1 = () => {
        navigate('page1');
        setIsActive(true);
        setIsActivee(false);

    }
    const click2 = () => {
        navigate('page2');
        setIsActivee(true);
        setIsActive(false);


    }
    return ( <
        div className = 'myy' >
        <
        div style = {
            {
                backgroundColor: isActive ? '#FFC776' : '',

            }
        }
        onClick = {
            click1
        }
        className = 'my1' >
        <
        div className = 'articles-header' > Articles < /div> <
        /div> <
        div style = {
            {
                backgroundColor: isActivee ? '#FFC776' : '',

            }
        }
        onClick = {
            click2
        }
        className = 'my1' >
        <
        div className = 'articles-header' > Magazines < /div> <
        /div>


        <
        /div>

    )
}
export default Header;