import * as React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Divider, Breadcrumb, Icon} from 'antd';
import { Category } from 'src/models/Category';
import {IApplicationState} from '../../store/index';
import ListCard from '../../components/sites/ListCard'
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';
import {Map} from 'immutable';
import {Sites} from '../../models/Sites';
import {Heading} from '../../models/Heading';
import {Actions as headingActions} from '../../store/heading';
import {Actions as sitesActions } from '../../store/sites';

interface IHeadingPropsFromRedux {
    headingId: number,
    heading: Heading,
    sitesList: Array<Sites>
}

type Props = IHeadingPropsFromRedux 
            & RouteComponentProps
            & typeof headingActions.actionCreators
            & typeof sitesActions.actionCreators;

interface IState {
    fetched: boolean
}

class HeadingView extends React.Component<Props, IState> {
    constructor(props){
        super(props);

        this.state = {fetched: false}
    }

    componentDidMount() {
        if (this.props.headingId > 0) {
            if (this.props.heading.id == 0)
                this.props.get(this.props.headingId);
            this.props.fetchListByHeading(this.props.headingId);
            this.setState({fetched: true});
        }
        else
            this.props.history.push('/');
    }

    render() {
        if (this.state.fetched) {
            return <div>
                <Row>
                    <Col className="img-on-page" />
                </Row>
                <Row>
                    <Col offset={4} span={16} style={{padding:'15px'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/category">Category</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider>
                            <Card bordered={false}>
                                <Card.Meta
                                    title={this.props.heading.name}
                                    />
                            </Card>
                        </Divider>
                        <ListCard data={this.props.sitesList} />
                    </Col>
                </Row>
            </div>;
        }
        else
            return <div></div>;
    }
}

export default connect(
    (state: IApplicationState): IHeadingPropsFromRedux => { 
        return { 
            headingId: state.headingId,
            heading: state.heading,
            sitesList: state.sites
        }},
    {...headingActions.actionCreators, ...sitesActions.actionCreators}
)(HeadingView);
