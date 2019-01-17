import * as React from 'react';
import {connect} from 'react-redux';
import {IApplicationState} from '../../store/index';
import {Actions} from '../../store/sites';

class SiteView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div></div>;
    }
}

export default connect(
    (state: IApplicationState) => state.sites.current,
    Actions.actionCreators
)(SiteView);