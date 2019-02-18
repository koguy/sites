import * as React from 'react';
import './App.css';
import Layout from './Layout';
import { Route } from 'react-router';
import Home from './components/Home';
import CategoryView from './components/category/View';
import HeadingView from './components/heading/View';
import 'antd/dist/antd.css';
import './styles/index.css';

class App extends React.Component {
  public render() {
    return <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/category' component={CategoryView} />
        <Route path='/category/heading' component={HeadingView} />
    </Layout>
  }
}

export default App;
