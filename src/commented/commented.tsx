// import {UploadFile} from 'antd/lib/upload/interface';

// interface IPictureState {
//     previewVisible: boolean,
//     previewImage: string,
//     fileList: Array<any>
// }


// let imagesList: Array<UploadFile> = [];
//         if (!isNew) {
//             this.props.currentSite.data.images.forEach((item, key) => 
//                 imagesList.push({
//                     uid: (key * -1).toString(),
//                     url: item,
//                     status: "done",
//                     name: "some.jpg",
//                     size: 10,
//                     type: ".jpg"
//                 }));
//         }

// this.state = {
//     picturesState: {
//         previewVisible: false,
//         previewImage: '',
//         fileList: imagesList
//     },
//     choosingLogoModalVisible: false,
// }

// this.handleCancelPreview = this.handleCancelPreview.bind(this);
//         this.handlePreview = this.handlePreview.bind(this);
//         this.handleChangeImages = this.handleChangeImages.bind(this);



// handleSave() {
//     let imagesList: List<string> = List<string>();
//     for(var i=0; i<this.state.picturesState.fileList.length; i++) {
//         imagesList = imagesList.push(this.state.picturesState.fileList[i].response || this.state.picturesState.fileList[i].url);
//     }
//     site.images = imagesList;
//     site.image = imagesList.contains(site.image) ? site.image : "";
// }


// handleCancelPreview() {
//     this.setState({
//         picturesState: {...this.state.picturesState,
//             previewVisible: false
//         }
//     });
// }

// handlePreview(file) {
//     this.setState({
//         picturesState: {...this.state.picturesState,
//             previewImage: file.url || file.thumbUrl,
//             previewVisible: true
//         }
//     });
// }

// handleChangeImages({fileList}) {
//     this.setState({
//         picturesState: {...this.state.picturesState,
//             fileList: fileList
//         }
//     });
// }

// renderChoosingLogoRadios() {
//     let radioImages:any[] = [];
//     this.state.site.images.forEach((item, index) => {
//         radioImages.push(
//         <Radio key={index} value={item}>
//             <img alt="example" className="logoImageOnEditor" src={item} />
//         </Radio>);
//     }); 
        
//     return radioImages;
// }

// render() {

//     const {previewImage, previewVisible, fileList} = this.state.picturesState;



//     <FormItem {...formItemLayout} label="Logo">
//                         {site.image 
//                         ? <img alt="example" className="logoImageOnEditor" src={site.image} onClick={() => this.setState({choosingLogoModalVisible: true})} />  
//                         : <div className="logoImageOnEditor placeholder" onClick={() => this.setState({choosingLogoModalVisible: true})}> 
//                             <Icon type="picture"  /><br/>
//                                 Choose
//                         </div>}
//                     </FormItem>


// {this.state.isNew ||
//     <FormItem {...formItemLayout} label="Images">
//     {getFieldDecorator("image", {
//         rules:[],
        
//     }) (
//         <Upload
//             action={"http://localhost:5000/api/sites/" + site.id.toString() + "/image" }
//             listType="picture-card"
//             fileList={fileList}
//             onPreview={this.handlePreview}
//             onChange={this.handleChangeImages}>
//                 {fileList.length >= 3 ? null : uploadButton}
//         </Upload>
//     )}
//     </FormItem>
//     }

// <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
//                     <img alt="example" style={{width: '100%'}} src={previewImage} />
//                 </Modal>
//                 <Modal visible={this.state.choosingLogoModalVisible} title="Choose logo image" onCancel={() => this.setState({choosingLogoModalVisible: false})} onOk={() => this.setState({choosingLogoModalVisible: false})}>
//                     <Radio.Group onChange={this.handleSelectedLogo} value={site.image}>
//                         {this.renderChoosingLogoRadios()}
//                     </Radio.Group>
//                 </Modal>
// }

