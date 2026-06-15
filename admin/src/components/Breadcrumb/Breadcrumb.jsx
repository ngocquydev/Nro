import React from 'react';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Breadcrumb({ nameParent, nameChild, isChild }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href="#"
            className="text-body hover:text-fg-brand inline-flex items-center text-sm font-medium"
          >
            <FaHome size={20} className="me-1.5 h-4 w-4" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center space-x-1.5">
            <FaChevronRight className="text-body mr-2 h-3.5 w-3.5 opacity-50 rtl:rotate-180" />

            {nameParent}
          </div>
        </li>
        {isChild && (
          <li>
            <div className="flex items-center space-x-1.5">
              <FaChevronRight className="text-body mr-2 h-3.5 w-3.5 opacity-50 rtl:rotate-180" />
              {nameChild}
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
