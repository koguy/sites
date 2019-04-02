import * as React from 'react';
import {Row, Col, Divider, PageHeader} from 'antd';
import SitesList from './sites/List';
import Search from './Search';
import {connect} from 'react-redux';
import {IApplicationState} from '../store/index';
import {Actions as searchActions, IFilterState, FilterType} from '../store/filter';
import {Actions as sitesActions} from '../store/sites';
import {isSitesEmpty, filterByTag, filterBySearch, filterByHeading, listRecentlyAdded} from '../helpers/allSites';

type Prop = typeof searchActions.actionCreators
                & typeof sitesActions.actionCreators
                & IFilterState;

interface IState {
    fetched: boolean;
}

class Home extends React.Component<Prop, IState> {
    constructor(props) {
        super(props);

        this.state = {
            fetched: false
        }
    }

    componentDidMount()
    {
        if (isSitesEmpty())
        {
            if (this.props.type == FilterType.bySearch) 
                filterBySearch(this.props.value);
            else if (this.props.type == FilterType.byTag)
                filterByTag(this.props.value);
            else if (this.props.type == FilterType.byHeading)
                filterByHeading(Number(this.props.value));
            else if(this.props.type == FilterType.recent)
                listRecentlyAdded(10);
        }

        this.setState({
            fetched: true,
        });
    }

    render() {
        if (this.state.fetched)
            return <Row>
                <Col>
                    <Divider style={{fontSize:'18px'}}>{this.props.title.toUpperCase()}</Divider>
                    <SitesList />
                </Col>
            </Row>;
        else
            return <div></div>;
    }
}

export default connect(
    (state: IApplicationState) => state.filter,
    {...searchActions.actionCreators, ...sitesActions.actionCreators}
)(Home);