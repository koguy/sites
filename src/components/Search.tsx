import * as React from 'react';
import {Input, Row, Col} from 'antd';
import {connect} from 'react-redux';
import {history} from '../index';
import {Actions as filterActions, FilterType} from '../store/filter';
import {filterBySearch} from '../helpers/allSites';
import {Actions as sitesActions} from '../store/sites';

type Prop = typeof filterActions.actionCreators
                & typeof sitesActions.actionCreators;
interface IState {}

class Search extends React.Component<Prop, IState> {
    constructor(props){
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.props.setFilter({title:value, value: value, type: FilterType.bySearch});
        filterBySearch(value);
        history.push("/");
    }

    render() {
        const Search = Input.Search;
        return <Row className="search">
            <Col>
                <Search
                    onSearch={this.handleSearch} />
            </Col>
        </Row>
    }
}

export default connect(
    null,
    {...filterActions.actionCreators, ...sitesActions.actionCreators}
)(Search);