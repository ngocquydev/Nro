import React from 'react';
import { Link } from 'react-router-dom';

function Button({ name, bg, bgHover, href, textColor = 'text-white' }) {
  return (
    <div>
      <Link
        to={href}
        className={`rounded-lg ${bg} block px-5 py-2 text-center text-sm font-semibold ${textColor} shadow-sm transition-colors hover:${bgHover}`}
      >
        {name}
      </Link>
    </div>
  );
}

export default Button;
