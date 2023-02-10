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
    return(
        <div className='myy'>
            <ul className='my1'>
                 <li className='menu-item '>
						<a className='nav-linkk' href='/articles/page1'>
									Articles
						</a>
				</li>
				<li className='menu-item '>
						<a className='nav-linkk' href='/articles/page2'>
									Magazines
						</a>
				</li>
				<li className='menu-item '>
						<a className='nav-linkk' href='/articles/page3'>
									Newsletters
						</a>
				</li>
				<li className='menu-item '>
						<a className='nav-linkk' href='/articles/page4'>
                        The Crazy Digest
						</a>
				</li>

            </ul>
            <Outlet/>


        </div>
    )
}
export default Header;