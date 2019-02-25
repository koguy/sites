import * as React from 'react';
import {connect} from 'react-redux';
import {IApplicationState} from '../store/index';
import {IAuthState, Actions as authActions} from '../store/admin/authentication';
import {Form, Input, Button, Row, Col, Alert} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {formItemLayout, tailFormItemLayout} from '../Common';
import { Statuses } from 'src/store/admin/cnst';

type Prop = IAuthState
            & typeof authActions.actionCreation
            & FormComponentProps;
interface IState {

}

class Login extends React.Component<Prop, IState> {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let getFieldValue = this.props.form.getFieldValue;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(getFieldValue('username'), getFieldValue('password'));
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const FormItem = Form.Item;
        return <div>
            <Row>
                <Col offset={8} span={8}>
                    {this.props.status == Statuses.loginFailed &&
                    <Alert 
                        type="error" 
                        message="Login failed."
                        description="Username or password is incorect!"/>}
                </Col>
            </Row>
            <Row>
                <Col offset={8} span={8}>
                    <Form>
                        <FormItem label="Username" {...formItemLayout}>
                            {getFieldDecorator('username', {
                                rules:[{required: true, message:"Please input username!"}]
                            })(
                                <Input onPressEnter={this.handleSubmit} />
                            )}
                        </FormItem>
                        <FormItem label="Password" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules:[{required: true, message:"Please input password!"}]
                            })(
                                <Input  onPressEnter={this.handleSubmit} />
                            )}
                        </FormItem>
                        <Button onClick={this.handleSubmit}>Login</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    }
}

export default connect(
    (state: IApplicationState) => state.admin,
    authActions.actionCreation
)(Form.create()(Login));