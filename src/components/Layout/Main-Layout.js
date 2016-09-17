import React from 'react';
import { Link } from 'react-router';

// we would put <Link to='/'> routes here if we had any
export default function(props){
	return (
		<div className="app">
          <li><Link to="/company" activeClassName="active">Company Info</Link></li>
          <li><Link to="/journal" activeClassName="active">Journals</Link></li>
          <li><Link to="/reports" activeClassName="active">Reports</Link></li>
	      <main>
	        {props.children}
	      </main>
	    </div>
	);
}