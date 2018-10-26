import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput, TouchableOpacity, Image, ActivityIndicator,Alert } from 'react-native';
import FCM, { NotificationActionType } from "react-native-fcm";
import firebaseClient from '../../configs/FirebaseClient'
const {width, height} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Styles from './Styles'
import { connect } from 'react-redux'
import {departments, addComplains, departHead, uploadComplainImage} from './../../configs/Firebase'
import { Dropdown } from 'react-native-material-dropdown';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
var ImagePicker = require('react-native-image-picker');
import * as firebase from 'firebase'
require("firebase/firestore");

const db = firebase.firestore();

class Complains extends Component {

    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        super(props);
        this.state= {
            user: this.props.user,
            depart: [],
            selDepart: '',
            complainTitle: '',
            description: '',
            loader: false,
            profileImg: ''

        };
        this.loadDepart = this.loadDepart.bind(this);
        this.submitComplain = this.submitComplain.bind(this);
        this.sendRemoteNotification = this.sendRemoteNotification.bind(this)
        this._onOpenActionSheet = this.onOpenActionSheet.bind(this);
    }


    componentWillMount(){
        this.loadDepart()
    }

    sendRemoteNotification(token) {
        let body;

        if (token) {
            body = {
                to: token,
                data: {
                    custom_notification: {
                        title: "There's a new complain in your department",
                        body: "Click me to go to detail",
                        sound: "default",
                        priority: "high",
                        show_in_foreground: true,
                        targetScreen: "detail"
                    }
                },
                priority: 10
            };
        } else {
            body = {
                to: token,
                notification: {
                    title: "Add Complains",
                    body: "Click me for check complains",
                    sound: "default"
                },
                data: {
                    targetScreen: "detail"
                },
                priority: 10
            };
        }

        firebaseClient.send(JSON.stringify(body), "notification");
    }

    onOpenActionSheet = () => {
        this.ActionSheet.show()
    };

    async openCamera(get){
        let options  = {
            allowsEditing: true,
            aspect: [3, 3],
            noData : true
        };
        let result;
        if(get == 0){
            ImagePicker.launchImageLibrary(options, (response)  => {
                this.setState({profileImg : response.uri})
            });
        }else if(get == 1){
            ImagePicker.launchCamera(options, (response)  => {
                this.setState({profileImg : response.uri})
            });
        }


    }

    async loadDepart(){
        let depart = await departments();
        let departData = [];
        depart.map((depart)=>{
            departData.push({value: depart.data.name})
        });
        this.setState({depart: departData})
    }
    async submitComplain(){
        let {selDepart, user, description, complainTitle, profileImg  } = this.state;
        if(selDepart == ''|| description == '' || complainTitle == '' || profileImg == '' ){
            Alert.alert('','All filed must be filled')
        }
        else{
            this.setState({loader: true});
            const response = await fetch(profileImg);
            const blob = await response.blob();
            let AddComplains = await addComplains(user, selDepart, description, complainTitle, blob)
            let departHeadId = []
            AddComplains.users.map((user)=>{
                departHeadId.push({id: user.id})
            })
            const headData = await departHead(departHeadId)
            headData.map((data)=>{
                if(data.token){
                    this.sendRemoteNotification(data.token);
                }

            })
            this.setState({selDepart: '', description: '', complainTitle: '', loader: false})
        }

    }
    render() {
        const options = [
            'Gallery',
            'Camera',
            'Cancel'

        ];
        return (
            <View style={Styles.main}>
                <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} enableOnAndroid={true} >

                    <View style={Styles.headerMain}>
                        <View style={Styles.headerSub}>
                            <View style={Styles.headerBack}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                    <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.headerHeading}>
                                <Text style={Styles.headingText}>Create Complains</Text>
                            </View>
                        </View>
                    </View>

                    <View style={Styles.subDiv}>
                        <View>
                            <TextInput
                                underlineColorAndroid = 'transparent'
                                placeholder= 'Complain Type'
                                secureTextEntry={false}
                                value={this.state.complainTitle}
                                style={Styles.inputField}
                                onChangeText = {(text)=> this.setState({complainTitle: text})}
                            />
                        </View>
                       <View>
                            <TextInput
                                underlineColorAndroid = 'transparent'
                                placeholder= 'Description'
                                value={this.state.description}
                                secureTextEntry={false}
                                style={Styles.inputField}
                                onChangeText = {(text)=> this.setState({description: text})}
                            />
                        </View>
                        <Dropdown
                            label='Departments'
                            data={this.state.depart}
                            containerStyle = {{width: width * 0.7}}
                            value = {this.state.selDepart}
                            onChangeText = {(text)=> this.setState({selDepart: text})}
                        />
                        <View>
                            <TouchableOpacity style={Styles.inputField} onPress={this._onOpenActionSheet}>
                                <Text style={{fontSize: 16, fontcolor: 'grey', marginTop: height * 0.03}}>{this.state.profileImg ? this.state.profileImg : 'Image'}</Text>
                            </TouchableOpacity>
                        </View>
                            <View>
                                <TouchableOpacity style={Styles.btn} onPress={()=>{this.submitComplain()}}>
                                    {this.state.loader ? <ActivityIndicator size="small" color="#0000ff"/>: <Text style={Styles.btnText}>Submit</Text> }
                                </TouchableOpacity>
                            </View>
                    </View>
                </KeyboardAwareScrollView>

                <View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={<Text style={{color: '#000', fontSize: 18}}>Which one do you like?</Text>}
                        options={options}
                        cancelButtonIndex={2}
                        destructiveButtonIndex={2}
                        onPress={(option) => {this.openCamera(option)}}
                    />
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};
export default connect(
    mapStateToProps
)(Complains)