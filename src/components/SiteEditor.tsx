import * as React from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button, Upload, Icon, Modal, notification} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {IApplicationState} from 'src/store';
import {Actions, ISitesState, Statuses} from '../store/sites';
import {Sites} from '../models/Sites';
import {RouteComponentProps} from 'react-router-dom';
import {UploadFile} from 'antd/lib/upload/interface';
import {List} from 'immutable';
import {formItemLayout, tailFormItemLayout} from '../Common';

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

const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

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
        let site = {...this.state.site}
        site.name = getFieldValue("Name");
        site.url = getFieldValue("Url");
        site.description = getFieldValue("Description");

        let imagesList: List<string> = List<string>();
        for(var i=0; i<this.state.picturesState.fileList.length; i++) {
            imagesList = imagesList.push(this.state.picturesState.fileList[i].response);
        }
        site.images = imagesList;
        if (this.state.isNew) {
            this.props.create(site);
            openNotification('success', "Created");
        } 
        else {
            this.props.update(site);
            openNotification('success', "Saved");
        }
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
                    <FormItem {...formItemLayout} label="Name">
                        {getFieldDecorator('Name', {
                            rules:[],
                            initialValue: site.name || null
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Url">
                        {getFieldDecorator('Url', {
                            rules:[],
                            initialValue: site.url || null
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Description">
                        {getFieldDecorator('Description', {
                            rules:[],
                            initialValue: site.description || null
                        })(
                            <Input />
                        )}
                    </FormItem>
                    {this.state.isNew ||
                    <FormItem {...formItemLayout} label="Images">
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
                    <FormItem {...tailFormItemLayout}>
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