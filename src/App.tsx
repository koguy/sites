import * as React from 'react';
import './App.css';
import Layout from './Layout';
import { Route } from 'react-router';
import Home from './components/Home';
import SitesList from './components/SitesList';
import SiteEditor from './components/SiteEditor';
import 'antd/dist/antd.css';

class App extends React.Component {
  public render() {
    return <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/sites' component={SitesList} />
        <Route path='/site/create' component={SiteEditor} />
        <Route path='/site/edit' component={SiteEditor}/>
        <Route path='/site/view' />
    </Layout>
  }
}

export default App;
