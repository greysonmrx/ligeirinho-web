import React from 'react';
import { Switch } from 'react-router-dom';

import Signin from '../pages/SignIn';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
    </Switch>
  );
};

export default Routes;
