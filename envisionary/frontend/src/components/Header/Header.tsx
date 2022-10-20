import { Link } from 'react-router-dom'
import './Header.css'

function Header() {

  return (
    <nav className='header'>
      <ul>
        <li>
          <Link className='link' to="/">Countries</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Header