import * as React from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button, Upload, Icon, Modal} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {IApplicationState} from 'src/store';
import {Actions, ISitesState} from '../store/sites';
import {Sites} from '../models/Sites';
import {RouteComponentProps} from 'react-router-dom';
import {UploadFile} from 'antd/lib/upload/interface';
import {List} from 'immutable';

interface IPictureState {
    previewVisible: boolean,
    previewImage: string,
    fileList: Array<any>
}

type Prop = ISitesState 
    & typeof Actions.actionCreators
    & FormComponentProps
    & RouteComponentProps;

interface IState {
    site: Sites,
    isNew: boolean,
    picturesState: IPictureState
}

class SiteEditor extends React.Component<Prop, IState> {
    constructor(props) {
        super(props);

        let isNew = this.props.location.state.isNew;
        let imagesList: Array<UploadFile> = [];
        if (!isNew) {
         //if(this.props.currentSite.data.images && !this.props.currentSite.data.images.isEmpty()) {
            this.props.currentSite.data.images.forEach((item, key) => 
                imagesList.push({
                    uid: key.toString(),
                    url: item,
                    status: "done",
                    name: "some.jpg",
                    size: 10,
                    type: ".jpg"
                }));
           // }
        }

        this.state = {
            isNew: isNew,
            site: isNew ? new Sites() : this.props.currentSite.data,
            picturesState: {
                previewVisible: false,
                previewImage: '',
                fileList: imagesList
            }
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleCancelPreview = this.handleCancelPreview.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChangeImages = this.handleChangeImages.bind(this);
    }

    handleSave() {
        let {getFieldValue} = this.props.form;
        let site = new Sites();
        site.name = getFieldValue("Name");
        site.url = getFieldValue("Url");
        site.description = getFieldValue("Description");

        var iiiii = getFieldValue("image");
        let imagesList: List<string> = List<string>();
        this.state.picturesState.fileList.forEach(value => 
            imagesList.push(value.url)
        )
        iiiii.array.forEach(element => {
            imagesList.push(element.response)
        });
        site.images = iiiii;

        this.props.create(site);
    }

    handleCancelPreview() {
        this.setState({
            picturesState: {...this.state.picturesState,
                previewVisible: false
            }
        });
    }

    handlePreview(file) {
        this.setState({
            picturesState: {...this.state.picturesState,
                previewImage: file.url || file.thumbUrl,
                previewVisible: true
            }
        });
    }

    handleChangeImages({fileList}) {
        this.setState({
            picturesState: {...this.state.picturesState,
                fileList: fileList
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const FormItem = Form.Item;
        const {previewImage, previewVisible, fileList} = this.state.picturesState;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div style={{marginTop: '8px', color: '#666'}}>
                    Upload
                </div>
            </div>
        );
        let site = this.state.site;
        return <div>
            <Form>
                <FormItem label="Name">
                    {getFieldDecorator('Name', {
                        rules:[],
                        initialValue: site.name || null
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Url">
                    {getFieldDecorator('Url', {
                        rules:[],
                        initialValue: site.url || null
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Description">
                    {getFieldDecorator('Description', {
                        rules:[],
                        initialValue: site.description || null
                    })(
                        <Input />
                    )}
                </FormItem>
                {this.state.isNew ||
                <FormItem label="Images">
                {getFieldDecorator("image", {
                    rules:[],
                    
                }) (
                    <Upload
                        action={"http://localhost:5000/api/sites/" + site.id.toString() + "/image" }
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChangeImages}>
                            {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                )}
                </FormItem>
                }
                <FormItem>
                    <Button type='primary' onClick={this.handleSave}>{this.state.isNew ? 'Create' : 'Save'}</Button>
                </FormItem>
            </Form>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                <img alt="example" style={{width: '100%'}} src={previewImage} />
            </Modal>
        </div>
    }
}

export default connect(
    (state: IApplicationState) => state.sites,
    Actions.actionCreators
)(Form.create()(SiteEditor));