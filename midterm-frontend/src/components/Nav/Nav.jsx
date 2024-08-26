import {Link, NavLink} from 'react-router-dom'
import "./Nav.css"

function Nav() {

  return (
    <nav className='Navbar'>
        <div className="h1-logo">
            <h1>
                Home
            </h1>
        </div>
        <div className="right-side-nav">
            <ul>{ 
                <li>
                  Sign up
                </li>
                } 
                {
                <li>
                    Login
                </li>
  }
            </ul>
        </div>
      </nav>
  )
}

export default Nav