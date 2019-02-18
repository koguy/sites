import * as React from 'react';
import { Layout as LayoutAntd, Menu, Row, Col } from 'antd';
import {Link} from 'react-router-dom';

export default class Layout extends React.Component {
    
    render():JSX.Element {
        const {Header, Content, Footer} = LayoutAntd;
        const MenuItem = Menu.Item;
        return <LayoutAntd>
            <Header>
                <Row>
                    <Col offset={4} span={16}>
                        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['1']}>
                            <MenuItem key="1"><Link to='/'>Main</Link></MenuItem>
                            <MenuItem key='2'><Link to='/sites'>Sites</Link></MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <Content style={{backgroundColor:'white'}}>
                {this.props.children}
            </Content>
            <Footer style={{height:'50px', textAlign:'center', backgroundColor:'white'}}>
                Sites Uz 2019 Created by artem.koguy
            </Footer>
        </LayoutAntd>
    }
}
