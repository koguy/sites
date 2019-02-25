import * as React from 'react';
import './App.css';
import Layout from './Layout';
import { Route } from 'react-router';
import Home from './components/Home';
import CategoryView from './components/category/View';
import HeadingView from './components/heading/View';
import 'antd/dist/antd.css';
import './styles/index.css';
import PrivateRoute from './components/PrivateRoute';
import SiteEditor from './components/sites/a-Editor';
import SitesList from './components/sites/a-List';
import Login from './components/Login';

class App extends React.Component {
  public render() {
    return <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/category' component={CategoryView} />
        <Route path='/category/heading' component={HeadingView} />
        <PrivateRoute path='/sites'>
            <SitesList />
        </PrivateRoute>
        <PrivateRoute path='/sites/edit'>
            <SiteEditor />
        </PrivateRoute>
        <Route exact path='/login' component={Login} />
    </Layout>
  }
}

export default App;
