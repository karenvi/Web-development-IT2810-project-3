import { Link } from 'react-router-dom'
import './Header.css'

function Header() {

  return (
    <nav className='header'>
      <ul>
        <li>
          <Link className='link' to="/">Books</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Header