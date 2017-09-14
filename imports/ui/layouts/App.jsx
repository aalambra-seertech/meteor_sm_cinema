import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import ChooseMovie from '../pages/ChooseMovie';
import ChooseSchedule from '../pages/ChooseSchedule';
import Checkout from '../pages/Checkout';
import PageNotFound from '../pages/PageNotFound';

const App = appProps => (
  <Router>
    <div className="App">
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={ChooseMovie} />
          <Route exact path="/movies/:movie_id" component={ChooseSchedule} />
          <Route exact path="/reserve/:schedule_id/seats/:seats" component={Checkout} />
          <Route component={PageNotFound} />
        </Switch>
      </Grid>
    </div>
  </Router>
);

export default App;
