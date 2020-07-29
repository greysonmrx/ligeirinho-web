import React from 'react';
import { Switch } from 'react-router-dom';

import Signin from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import CreateDelivery from '../pages/CreateDelivery';
import EditDelivery from '../pages/EditDelivery';
import Deliverymen from '../pages/Deliverymen';
import CreateDeliveryMan from '../pages/CreateDeliveryMan';
import EditDeliveryMan from '../pages/EditDeliveryMan';
import Recipients from '../pages/Recipients';
import CreateRecipient from '../pages/CreateRecipient';
import EditRecipient from '../pages/EditRecipient';
import Problems from '../pages/Problems';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/create"
        exact
        component={CreateDelivery}
        isPrivate
      />
      <Route path="/deliveries/edit" exact component={EditDelivery} isPrivate />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/create"
        exact
        component={CreateDeliveryMan}
        isPrivate
      />
      <Route
        path="/deliverymen/edit"
        exact
        component={EditDeliveryMan}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/create"
        exact
        component={CreateRecipient}
        isPrivate
      />
      <Route
        path="/recipients/edit"
        exact
        component={EditRecipient}
        isPrivate
      />

      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
};

export default Routes;
