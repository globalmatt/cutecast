import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {

  return(
    <div className="footer">
      <nav>
        <ul>
          <li><Link to="/">Current</Link></li>
          <li><Link to="/forecast">Forecast</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  )
}