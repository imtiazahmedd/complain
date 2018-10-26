import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput,ScrollView, StyleSheet,ActivityIndicator,Alert} from 'react-native'
const {width, height} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { connect } from 'react-redux'
import Styles from './Styles'
import {login, uploadImage, updateProfile} from "../../configs/Firebase";
var ImagePicker = require('react-native-image-picker');

class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName : this.props.user.first_name,
            lastName : this.props.user.last_name,
            email : this.props.user.email,
            loader : false,
            role : '',
            memberShip: this.props.user.memberShip,
            mobile: this.props.user.mobile,
            profileImg : this.props.user.profile_picture || '',
            loader : false
        };
        this._onOpenActionSheet = this.onOpenActionSheet.bind(this);

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


   async updateProfile(){

       const {firstName, lastName, mobile ,memberShip, profileImg } = this.state;
        try {
            this.setState({loader: true});
            const response = await fetch(profileImg);
            const blob = await response.blob();
            uploadImage(this.props.user.id, blob);
            await updateProfile(this.props.user.id, {first_name: firstName, last_name: lastName, mobile : mobile, memberShip: memberShip});
            this.setState({loader: false});

        } catch (e) {
            this.setState({loader: false});
            Alert.alert('', e.error)
        }
    }


    render(){
      const {profileImg} = this.state;

        const options = [
            'Gallery',
            'Camera',
            'Cancel'

        ];

        return(
            <View style={Styles.main}>
                <View style={Styles.sub}>
                    <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} enableOnAndroid={true} >

                    <View style={Styles.headerMain}>
                        <View style={Styles.headerSub}>
                            <View style={Styles.headerBack}>
                                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                    <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.headerHeading}>
                                <Text style={Styles.headerText}>Update Profile</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.subMain}>
                        <View style={Styles.subSub}>
                            <View style={Styles.profilePicCont}>
                                <TouchableOpacity style={Styles.picSub} onPress={this._onOpenActionSheet}>

                                    <Image source={profileImg ? {uri: profileImg} : require('./../../images/profile.png')} style={Styles.pic} />

                                </TouchableOpacity>
                            </View>
                            <View style={Styles.formMain}>

                                    <View style={{width: width, alignItems:'center', justifyContent: 'center'}}>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'First Name'
                                                value={this.state.firstName}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({firstName: text})}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'Last Name'
                                                value={this.state.lastName}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({lastName: text})}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'Email'
                                                editable={false}
                                                value={this.state.email}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({email: text})}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                keyboardType = 'numeric'
                                                placeholder= 'Mobile no'
                                                value={this.state.mobile}
                                                style={Styles.inputField}
                                                maxLength={13}
                                                onChangeText = {(text)=> this.setState({mobile: text})}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'Membership #'
                                                value={this.state.memberShip}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({memberShip: text})}
                                            />
                                        </View>
                                    </View>


                            </View>
                            <View style={Styles.footerMain}>
                                    <TouchableOpacity onPress={()=>{this.updateProfile()}} style={Styles.btn}>
                                        {this.state.loader ? <ActivityIndicator size="small" color="#0000ff" /> : <Text style={Styles.btnText}>Update Profile</Text>}
                                    </TouchableOpacity>
                            </View>
                            <View style={Styles.footerMain}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("UpdatePassword", {screen: "UpdatePassword"})} style={Styles.btn2}>
                                    <Text style={Styles.footerText}>For password update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    </KeyboardAwareScrollView>

                </View>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(
    mapStateToProps
)(Profile)

