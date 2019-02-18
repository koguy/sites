import * as React from 'react';
import {connect} from 'react-redux';
import {IApplicationState} from '../store/index';
import {Actions as sitesActions} from '../store/sites';
import {Actions as categoryActions} from '../store/category';
import {Card, Row, Col, Icon, Divider, List, Carousel} from 'antd';
import ListCard from './sites/ListCard';
import {Link} from 'react-router-dom';
import { Category } from 'src/models/Category';
import {Sites} from '../models/Sites';

interface IHomeState {
    categoryList: Array<Category>,
    siteList: Array<Sites>
}

type Props = IHomeState 
    & typeof sitesActions.actionCreators
    & typeof categoryActions.actionCreators;

interface IState {

}

class Home extends React.Component<Props, IState> {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchList();
        this.props.fetchCategoryList();
    }
    
    render() {
        const categoryData = [];
        this.props.categoryList.forEach(category => {
            categoryData.push({
                category: category,
                path: "/category",
            });
        });
        
        if (this.props.categoryList && this.props.categoryList.length > 0 && this.props.siteList.length > 0) {
            const {Meta} = Card;
            return <div>
                <Row>
                    <Col>
                        <Carousel autoplay >
                            <div>
                                <Row>
                                    <Col offset={4} span={16}>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col offset={4} span={16}>
                                    </Col>
                                </Row>
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                <Row>
                    <Col offset={4} span={16} style={{padding:'15px', backgroundColor: 'white'}}>
                        <List 
                            grid={{
                                gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4,
                            }}
                            dataSource={categoryData}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={{pathname:item.path, state: {category: item.category}}} onClick={() => this.props.setCurrentCategory(item.category)}>
                                        <Card bordered={false} hoverable={true}>
                                            <Meta
                                                avatar={<Icon type="customer-service" style={{ fontSize: '24px'}} />}
                                                title={item.category.name}
                                                description={item.category.description}
                                                />
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                        <Divider>Топ сайты</Divider>
                        <ListCard data={this.props.siteList} />
                    </Col>
                </Row>
            </div>;
        }
        else
            return <div></div>;
    }
}

export default connect(
    (state:IApplicationState): IHomeState => {
        return {
            categoryList: state.categoryList,
            siteList: state.sites
        }
    },
    {
        ...sitesActions.actionCreators,
        ...categoryActions.actionCreators
    }
)(Home)