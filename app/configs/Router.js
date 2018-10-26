import { createStackNavigator, DrawerNavigator } from 'react-navigation';
import Signup from './../screens/Register/Signup';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput,ScrollView, StyleSheet,AsyncStorage} from 'react-native'
import React, { Component } from 'react';
import Login from './../screens/Login/Login';
import * as firebase from 'firebase'
import Department from "../screens/Departments/Department";
import Admin from "../screens/Admin/Admin";
import AddDepartment from "../screens/Admin/Add_Departments";
import NotificationsScreen from '../screens/Drawer/Notifications';
import Complains from '../screens/Forms/Complains'
import { connect } from 'react-redux'
import Complain from '../screens/Complain/Complain'
import Profile from '../screens/Profile/Profile'
import UpdatePassword from '../screens/Profile/UpdatePassword'
import CommentScreen from './../screens/Complain/CommentScreen'
const {width, height} = Dimensions.get('window');
import {signOut} from './../configs/Firebase'
import Styles from "../screens/Profile/Styles";

class DrawerDisplay extends Component{
    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        this.state = {
            userId: ''
        }
    }


    componentWillMount(){
        const currentUser = firebase.auth().currentUser;
        const userId = currentUser.uid;
        this.setState({userId: userId})
    }


    async signOut(){

        let signout = await signOut(this.state.userId);
        await AsyncStorage.setItem('user', '');
        this.props.navigation.navigate("Login", {screen: "Login"})

    }

    render(){
        return(
            <View style={{flex: 1,flexDirection: 'column'}}>
                <View style={{height: height*0.25,borderWidth:0.5,borderBottomColor:'grey',borderLeftColor:'transparent',borderRightColor:'transparent',borderTopColor:'transparent'}}>
                    <View style={{height : height*0.15,alignItems:'center',justifyContent:'center'}}>
                        <View style={{height:height*0.12, width:height*0.12,borderRadius:100,alignItems:'center',justifyContent:'center', borderWidth:1,borderColor:'grey'}}>
                            {this.props.user.profile_picture ?
                                <Image source={{uri: this.props.user.profile_picture}} style={{width:60,height:60,borderRadius : 100}} /> :
                                <Image source={require('../images/profile.png')} style={{width:60,height:60,borderRadius : 100}}/>
                            }
                        </View>
                    </View>
                    <View style={{height:height*0.03,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:16, fontFamily: 'gt-walsheim-regular'}}>{this.props.user.first_name +' '+ this.props.user.last_name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile", {screen: "Profile"})}>
                    <View style={{height: height*0.1,borderWidth:0.5,borderBottomColor:'grey',borderTopColor:'transparent',borderLeftColor:'transparent',borderRightColor:'transparent'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: width*0.15,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/profile.png')} style={{width:25,height:25}}/>
                            </View>
                            <View style={{width: width*0.5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:15, fontFamily: 'gt-walsheim-regular'}}>Profile</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                {this.props.user && this.props.user.isAdmin && <TouchableOpacity onPress={() => this.props.navigation.navigate("AddDepartment", {screen: "AddDepartment"})}>
                    <View style={{height: height*0.1,borderWidth:0.5,borderBottomColor:'grey',borderTopColor:'transparent',borderLeftColor:'transparent',borderRightColor:'transparent'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: width*0.15,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/adddepartment.png')} style={{width:25,height:25}}/>
                            </View>
                            <View style={{width: width*0.5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:15,fontFamily: 'gt-walsheim-regular'}}>Add Departments</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>}
                {this.props.user && this.props.user.isAdmin && <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup", {role : 'admin'})}>
                    <View style={{height: height*0.1,borderWidth:0.5,borderBottomColor:'grey',borderTopColor:'transparent',borderLeftColor:'transparent',borderRightColor:'transparent'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: width*0.15,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/addusers.png')} style={{width:25,height:25}}/>
                            </View>
                            <View style={{width: width*0.5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:15,fontFamily: 'gt-walsheim-regular'}}>Add Users</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>}

                <TouchableOpacity onPress={()=>{this.signOut()}}>
                    <View style={{height: height*0.1,borderWidth:0.5,borderBottomColor:'grey',borderTopColor:'transparent',borderLeftColor:'transparent',borderRightColor:'transparent'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: width*0.15,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/logout.png')} style={{width:25,height:25}}/>
                            </View>
                            <View style={{width: width*0.5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:15,fontFamily: 'gt-walsheim-regular'}}>Logout</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const ContentComponent = connect(mapStateToProps)(DrawerDisplay);

const DrawerNavigatorConfig =  {
    drawerWidth: 280,
    drawerPosition: 'Left',
    contentComponent: ContentComponent
    // props =>
    ,

    contentOptions: {
        activeBackgroundColor: 'white',
        activeTintColor: 'white',
        inactiveTintColor: '#032456',
        inactiveBackgroundColor: 'transparent'
    }

};

const DrawerNav = DrawerNavigator({

    Department: {
        screen: Department,

    },
    NotificationsScreen: {
        screen: NotificationsScreen,
        navigationOptions: {
            header: null,
            drawer: () => ({
                label: 'NotificationsScreen',
            })
        }

    },
    AddDepartment: {
        screen: AddDepartment,
        navigationOptions: {
            drawer: () => ({
                label: 'AddDepartment',
            })
        }
    },

}, DrawerNavigatorConfig);

const Route = createStackNavigator({
    Login: { screen: Login},
    DrawerNav: {screen: DrawerNav},
    CommentScreen: {screen: CommentScreen},
    Signup: { screen: Signup },
    Complain: {screen: Complain},
    Complains: {screen: Complains},
    Profile : {screen : Profile},
    UpdatePassword : {screen : UpdatePassword}

}, {
    headerMode: 'none'
});


export default Route
