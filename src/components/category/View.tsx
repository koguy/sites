import * as React from 'react';
import {connect} from 'react-redux';
import {Actions as headingActions} from '../../store/heading';
import {Card, Row, Col, List, Divider, Breadcrumb, Icon} from 'antd';
import { Category } from 'src/models/Category';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';
import {IApplicationState} from '../../store/index';

type Props = RouteComponentProps 
    & {categoryId: number}
    & typeof headingActions.actionCreators;

interface IState {
    category: Category
}

class CategoryView extends React.Component<Props, IState> {
    constructor(props) {
        super(props);

        let existingLocationState = this.props.location.state && this.props.location.state.category;

        this.state = {
            category: existingLocationState ? this.props.location.state.category : new Category()
        }
    }

    componentDidMount() {
        if (this.state.category.id == 0) {
            if (this.props.categoryId == 0) 
                this.props.history.push('/');
            else if (this.props.categoryId > 0) {
                fetch("http://localhost:5000/api/category/" + this.props.categoryId, {
                method: "GET"
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        if (data)
                            this.setState({category: data})
                    })
                    .catch(error =>
                        console.error("An error occured while FETCH"));
            }
        }
    }

    render() {
        if (this.state.category.id == 0)
            return <div></div>;
        else {
            const headingList = this.state.category.headings;
            const data = [];
            headingList.forEach(heading => {
                data.push({
                    heading: heading
                });
            });
            return <div>
                <Row>
                    <Col className="img-on-page" />
                </Row>
                <Row>
                    <Col offset={4} span={16} style={{padding:'15px'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider>
                            <Card bordered={false}>
                                <Card.Meta
                                    title={this.state.category.name}
                                    description={this.state.category.description}
                                    />
                            </Card>
                        </Divider>
                        <List
                            grid={{
                                gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
                            }}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <Link to="/category/heading" onClick={() => this.props.setCurrentHeading(item.heading)}>
                                        <Card bordered={false} hoverable={true}>
                                            <Card.Meta title={item.heading.name} />
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        }
    }
}

export default connect(
    (state: IApplicationState) => { return  { categoryId: state.categoryId }},
    headingActions.actionCreators
)(CategoryView)