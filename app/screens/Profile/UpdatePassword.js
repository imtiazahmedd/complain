import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity,TextInput,ActivityIndicator,Alert} from 'react-native'
const {width, height} = Dimensions.get('window');
import Styles from './Styles'
import {updatePassword} from "../../configs/Firebase";

export default class UpdatePassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            OldPassword: '',
            NewPassword: '',
            ReType: '',
            loader : false
        };

    }

    validate() {
        const {OldPassword, NewPassword,ReType} = this.state;
        if (!OldPassword || !NewPassword ) {
            Alert.alert('','Enter All Fields.');
            return false;
        } else if (NewPassword.length < 8) {
            Alert.alert('','Minimum length of password field is 8 characters');
            return false;
        } else if (NewPassword.length > 16) {
            Alert.alert('','Maximum length of password field is 16 characters');
            return false;
        }
        else if (NewPassword != ReType) {
            Alert.alert('','Passwords do not match.');
            return false;
        }
        return true;
    }

    async updatePassword() {

        const {OldPassword, NewPassword, ReType} = this.state;
        if (this.validate()) {
            try {
                this.setState({loader: true});
                await updatePassword(OldPassword, NewPassword);
                this.setState({loader : false , OldPassword : '', NewPassword : '', ReType : ''})
            } catch (e) {
                this.setState({loader : false});
                Alert.alert('', e.error)
            }
        }
    }


    render(){

        return(
            <View style={Styles.main}>
                <View style={Styles.sub}>

                        <View style={Styles.headerMain2}>
                            <View style={Styles.headerSub}>
                                <View style={Styles.headerBack}>
                                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                        <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={Styles.headerHeading}>
                                    <Text style={Styles.headerText}>Update Password</Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.subMain2}>
                            <View style={Styles.subSub}>

                                <View style={Styles.formMain2}>

                                    <View style={{width: width, alignItems:'center', justifyContent: 'center'}}>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'Old Password'
                                                secureTextEntry={true}
                                                value={this.state.OldPassword}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({OldPassword: text})}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'New Password'
                                                value={this.state.NewPassword}
                                                secureTextEntry={true}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({NewPassword: text})}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                underlineColorAndroid = 'transparent'
                                                placeholder= 'Re-type Password'
                                                value={this.state.ReType}
                                                secureTextEntry={true}
                                                style={Styles.inputField}
                                                onChangeText = {(text)=> this.setState({ReType: text})}
                                            />
                                        </View>

                                    </View>

                                </View>
                                <View style={Styles.footerMain2}>
                                    <TouchableOpacity onPress={()=>{this.updatePassword()}} style={Styles.btn}>
                                        {this.state.loader ? <ActivityIndicator size="small" color="#0000ff" /> :  <Text style={Styles.btnText}>Update Password</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                </View>

            </View>
        )
    }
}

