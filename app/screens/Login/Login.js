import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput, Alert, StyleSheet, ActivityIndicator,AsyncStorage} from 'react-native'
import Signup from "../Register/Signup";
import {login} from "../../configs/Firebase";
import {onLogin} from '../../redux/auth/action'
import * as firebase from 'firebase'
import FCM, { NotificationActionType } from "react-native-fcm";
import  '@firebase/messaging';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Department from "../Departments/Department";
import Admin from '../Admin/Admin'
const {width, height} = Dimensions.get('window');
import Styles from './Styles'

 class Login extends Component{

    static navigationOptions = {
        header : null
    };


    constructor(props){
        super(props);
        this.state={
            email : '',
            password : '',
            loader : false,
            token: ''
        }
    }

     componentWillMount(){
         this.getUsers();
         FCM.getFCMToken().then(token => {
             this.setState({ token: token || "" });
         });
     }

     async getUsers(){
         const value = await AsyncStorage.getItem('user');
         const user = JSON.parse(value);
         if(user){
             let email = user.email;
             let pass = user.password;
             let token = user.token;
            this.setState({email : email, password: pass, token : token},()=>{
                this.login()
            })
         }
     }

    async login() {
        const {email, password, token} = this.state;
        // this.props.navigation.navigate("DrawerNav", {screen: "DrawerNav"});
            try {
                if(email.length && password.length){
                    this.setState({loader: true});
                    let res = await login({ email, password, token});
                    let user = {email: email, password: password, token: token};
                    let userr = JSON.stringify(user);
                    await AsyncStorage.setItem('user', userr);
                    this.setState({email : '',password : '', loader: false});
                    setTimeout(()=>{
                        this.props.navigation.navigate("DrawerNav", {screen: "DrawerNav"});
                    },3000);
                    this.props.onLogin(res);

                }else{
                    Alert.alert('','Enter email and password')
                }

            } catch(e) {
                this.setState({loader: false});
                Alert.alert('', e.error)
            }
    }


    render(){
        return(
            <View style={Styles.main}>
                <View style={Styles.header}>
                    <Text style={Styles.headerText}>LOG IN</Text>
                </View>
                <View style={Styles.sub}>
                    <View>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            placeholder= 'Email'
                            value={this.state.email}
                            style={Styles.inputStyle}
                            onChangeText = {(text)=> this.setState({email: text})}
                        />
                    </View>
                    <View>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            secureTextEntry={true}
                            value={this.state.password}
                            placeholder= 'Password'
                            style={Styles.inputStyle}
                            onChangeText = {(text)=> this.setState({password: text})}
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={Styles.loginBtn}  onPress={()=>{this.login()}}>
                            {this.state.loader ? <ActivityIndicator size="small" color="#0000ff" /> :<Text style={Styles.loginBtnText}>Log In</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.footer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup", {screen: "Signup"})}>
                            <Text style={Styles.footerText}>Don't you have an account! Signup</Text>
                        </TouchableOpacity>
                    </View>

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
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogin: onLogin
    }, dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)