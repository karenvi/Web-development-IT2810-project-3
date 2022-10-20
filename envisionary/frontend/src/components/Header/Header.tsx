import { Link } from 'react-router-dom'
import './Header.css'

function Header() {

  return (
    <nav className='header'>
      <div className='linkContainer'>
        <Link className='link' to="/">Countries</Link>
        <Link className='link' to="/give-review">Give review</Link>
      </div>
    </nav>
  );
}
export default Header