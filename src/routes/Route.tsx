import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRouter,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { user } = useAuth();

  return (
    <ReactDOMRouter
      {...rest}
      render={({ location }) =>
        isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/deliveries',
                state: { from: location },
              }}
            />
          )}
    />
  );
};

export default Route;
