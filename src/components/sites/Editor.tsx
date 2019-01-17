import * as React from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button, Upload, Icon, notification, Select, Tag, Tooltip, message} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {IApplicationState} from 'src/store';
import {Actions, ISitesState, Statuses} from '../../store/sites';
import {Sites} from '../../models/Sites';
import {RouteComponentProps} from 'react-router-dom';
import {List} from 'immutable';
import {formItemLayout, tailFormItemLayout} from '../../Common';
import {Link} from 'react-router-dom';
import {typeOfSiteList} from '../../Common';

interface ILogoState {
    loading: boolean,
    imgUrl: string
}

interface ITagState {
    tags: Array<string>,
    inputVisible: boolean,
    inputValue: string
}

type Prop = ISitesState 
    & typeof Actions.actionCreators
    & FormComponentProps
    & RouteComponentProps;

interface IState {
    site: Sites,
    isNew: boolean,
    tagsState: ITagState,
    logoState: ILogoState
}

const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };
  
  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

class SiteEditor extends React.Component<Prop, IState> {
    private saveInputRef = React.createRef<Input>();

    constructor(props) {
        super(props);

        let isNew = this.props.location.state.isNew;
        let tags: Array<string> = [];
        if (!isNew) {
            this.props.current.data.tags.forEach(tag => tags.push(tag));
        }
        
        this.state = {
            isNew: isNew,
            site: isNew ? new Sites() : this.props.current.data,
            tagsState: {
                tags: tags,
                inputVisible: false,
                inputValue: ''
            },
            logoState: {
                loading: false,
                imgUrl: this.props.current.data.image
            }
        }
        
        this.handleSave = this.handleSave.bind(this);
        this.showInput = this.showInput.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.handleLogoImageChange = this.handleLogoImageChange.bind(this);
    }

    handleSave() {
        let {getFieldValue} = this.props.form;
        let site = {...this.state.site}
        site.name = getFieldValue("Name");
        site.url = getFieldValue("Url");
        site.description = getFieldValue("Description");

        site.image = this.state.logoState.imgUrl;

        site.type = getFieldValue("Type");

        site.tags = List<string>(this.state.tagsState.tags);

        if (this.state.isNew) {
            this.props.create(site);
            openNotification('success', "Created");
        } 
        else {
            this.props.update(site);
            openNotification('success', "Saved");
        }

        this.setState({site: site, isNew:false});
    }

    componentDidUpdate() {
        if (this.state.site.id <= 0 && this.props.current.data.id > 0)
            this.setState({site: this.props.current.data});
    }

    handleLogoImageChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ logoState: { ...this.state.logoState, loading: true }});
          return;
        }
        if (info.file.status === 'done') {
            this.setState({
              logoState: {
                  loading: false,
                  imgUrl: info.file.response
              }
          });
        }
      }

    handleRemoveTag(removedTag) {
        const tags = this.state.tagsState.tags.filter(tag => tag !== removedTag);
        this.setState({
            tagsState: {
                ...this.state.tagsState,
                tags: tags
            }
        });
    }

    showInput() {
        this.setState({
            tagsState: {
                ...this.state.tagsState,
                inputVisible: true
            }
        }, () => this.saveInputRef.current.focus());
    }

    handleInputConfirm() {
        const state = this.state;
        const inputValue = state.tagsState.inputValue;
        let tags = state.tagsState.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tagsState: {
                tags,
                inputVisible: false,
                inputValue: '',
            }
        });
    }

    renderOptions() {
        let typesOfSitesOptions: any[] =[];
        typeOfSiteList.forEach((value, index) => {
            typesOfSitesOptions.push(
                <Select.Option key={value.name.toString()} value={value.name}>
                    <Tooltip placement="left" title={value.description}>
                        {value.name}
                    </Tooltip>
                </Select.Option>
            );
        });
        return typesOfSitesOptions;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const FormItem = Form.Item;
        const {tags, inputVisible, inputValue} = this.state.tagsState;
        const {imgUrl, loading} = this.state.logoState;
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div style={{marginTop: '8px', color: '#666'}}>
                    Upload
                </div>
            </div>
        );
        let site = this.state.site;

        return <div>
                <Form>
                    {this.state.isNew ? null : <FormItem {...formItemLayout} label="Logo">
                        {getFieldDecorator('Logo', {
                            initialValue: imgUrl || null
                        })(
                            <Upload
                                name="file"
                                listType="picture-card"
                                action={"http://localhost:5000/api/sites/" + site.id.toString() + "/image"}
                                className="uploadImage"
                                beforeUpload={beforeUpload}
                                showUploadList={false}
                                onChange={this.handleLogoImageChange}>
                                    {imgUrl ? <img src={imgUrl} className="uploadImage" alt="avatar" /> : uploadButton}
                            </Upload>
                        )}                        
                    </FormItem>}
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
                            rules:[{required: true, message: "Введите веб адрес сайта!"}],
                            initialValue: site.url || null
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Type">
                            {getFieldDecorator('Type', {
                                rules: [{required: true, message: "Выберите тип сайта!"}],
                                initialValue: site.type || null
                            })(
                                <Select>
                                    {this.renderOptions()}
                                </Select>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Tags">
                        <div>
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem =(
                                    <Tag key={tag} closable={true} afterClose={() => this.handleRemoveTag(tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                                <Input 
                                    ref={this.saveInputRef as React.RefObject<Input>}
                                    type="text"
                                    size="small"
                                    className="tag input"
                                    value={inputValue}
                                    onChange={(e) => this.setState({tagsState: {...this.state.tagsState, inputValue: e.target.value}})}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag
                                    onClick={this.showInput}
                                    className="tag">
                                    <Icon type="plus" /> New Tag
                                </Tag>
                            )}
                        </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="Description">
                        {getFieldDecorator('Description', {
                            rules:[],
                            initialValue: site.description || null
                        })(
                            <Input.TextArea rows={5} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                       <Button className='button' type='primary' onClick={this.handleSave}>{this.state.isNew ? 'Create' : 'Save'}</Button>
                       <Button className='button' type='default'><Link to='/sites'>Cancel</Link></Button>
                   </FormItem>
                </Form>
                
            </div>
    }
}

export default connect(
    (state: IApplicationState) => state.sites,
    Actions.actionCreators
)(Form.create()(SiteEditor));