import { Link } from 'react-router-dom';
import './Header.css';
import PublicIcon from '@mui/icons-material/Public';


function Header() {

  return (
    <nav className='header'>
        <div id="logoContainer"><Link id='logoLink' to="/">ENVISIONARY</Link></div>
        <div className='linkContainer'>
         <Link className='link' to="/">Countries</Link>
        <Link className='link' to="/give-review">Give review</Link>
        <Link className='link' to="/info-page">Information</Link>
      </div>
    </nav>
  );
}
export default Header