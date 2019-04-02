import * as React from 'react';
import './App.css';
import Layout from './Layout';
import { Route } from 'react-router';
import Home from './components/Home';
import 'antd/dist/antd.css';
import './styles/index.css';
import About from './About';
import Contact from './Contact';

class App extends React.Component {
  public render() {
    return <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/contact' component={Contact} />
    </Layout>
  }
}

export default App;
