import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {IApplicationState} from '../store/index';
import {ComponentType} from 'react/index';

// export const PrivateRoute = ({ component: Component, ...rest}) => (
//     <Route {...rest} render={props => (
//         JSON.parse(sessionStorage.getItem('persist:root')).token != "null"
//             ? <Component {...props} />
//             : <Redirect to={{pathname: '/login', state: {from: props.location} }} />
//     )} />
// )
interface IProps {
    path: string,
}
type Props = IProps & {token: string};
interface IState{}

class PrivateRoute extends React.Component<Props, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Route exact path={this.props.path} render={props => (
            this.props.token != null
                ? this.props.children
                : <Redirect to={{pathname: '/login', state: {from: props.location} }} />
        )} />;
    }
}

export default connect(
    (state: IApplicationState) => { return {token: state.token}},
    null
)(PrivateRoute);