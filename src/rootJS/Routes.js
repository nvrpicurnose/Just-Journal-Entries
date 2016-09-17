import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from '../components/layout/Main-Layout';

// Components
import CompanyContainer from '../components/Company/Company-Container';
import JournalContainer from '../components/Journal/Journal-Container';
import ReportContainer from '../components/Report/Report-Container';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>

        <Route path="/company" component={CompanyContainer} />
        <Route path="/journal" component={JournalContainer} />
        <Route path="/reports" component={ReportContainer} />

    </Route>
  </Router>
);
