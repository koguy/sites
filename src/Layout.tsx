import * as React from 'react';
import { Layout as LayoutAntd, Menu, Icon, Row, Col, Divider } from 'antd';
import {Link} from 'react-router-dom';
import SiderComponent from './components/SiderComponent';
import Search from './components/Search';

export default class Layout extends React.Component {
    
    render():JSX.Element {
        const {Header, Content, Footer} = LayoutAntd;
        const MenuItem = Menu.Item;
        return <LayoutAntd>
            <Header className='header'>
                <Row>
                    <Col offset={4} span={16}>
                        <Link to='/'>
                            <img src="img/logo/logo.png" className='header logo' />
                        </Link>
                        <Menu mode="horizontal" theme='dark' className='header menu'>
                            <MenuItem key='2'><Link to='/about'>О проекте</Link></MenuItem>
                            <MenuItem key='3'><Link to='/contact'>Контакты</Link></MenuItem>
                        </Menu>
                        <Search />
                    </Col>
                </Row>
            </Header>
            <Content>
                <Row>
                    <Col offset={4} span={16}>
                        <LayoutAntd className="content">
                            <SiderComponent />
                            <Content className="content inside-content">
                                {this.props.children}
                            </Content>
                        </LayoutAntd>
                    </Col>
                </Row>
            </Content>
            <Footer style={{height:'50px', textAlign:'center'}}>
                Sites Uz 2019 Created by artem.koguy
            </Footer>
        </LayoutAntd>
    }
}
