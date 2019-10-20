import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import { StateProvider } from './hooks/useStateValue';
import SelectUsersScreen from './screens/SelectUsersScreen';
import PlacesToGoScreen from './screens/PlacesToGoScreen';

const App: React.FC = () => {
    return (
    <div>
        <StateProvider initialState={{event: undefined}}>
            <Fragment>
                <Header />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomeScreen />
                        </Route>

                        <Route path="/users">
                           <SelectUsersScreen />
                        </Route>
                        <Route path="/places-to-go">
                            <PlacesToGoScreen />
                        </Route>
                    </Switch>
                </Router>
            </Fragment>
        </StateProvider>
    </div>
  );
}

export default App;
