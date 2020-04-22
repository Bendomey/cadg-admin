import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spinner } from 'evergreen-ui';
// component
import { Layout } from './components/shared';
import LoginComponent from './pages/auth/login';
import ClientAppollo from './graphql/client';

function loading() {
  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <ClientAppollo>
        <BrowserRouter>
          <Suspense fallback={loading()}>
            <Switch>
              <Route path={'/login'} render={props => <LoginComponent {...props} />} name={'Login'} exact />
              <Route path={'/'} render={props => <Layout {...props} name={'Dashboard'} />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ClientAppollo>
    </>
  );
}

export default App;
