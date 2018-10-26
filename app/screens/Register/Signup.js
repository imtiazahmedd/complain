import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView} from 'react-native';
const {width, height} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
import {register} from '../../configs/Firebase';
import Styles from './Styles'

export default class Signup extends Component {

    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        this.state={
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            retypePass : '',
            loader : false,
            role : '',
            plot: '',
            block: '',
            memberShip: '',
            mobile: ''

        };
    }


    componentWillMount(){
        const { navigation } = this.props;
        const departName = navigation.getParam('role');
        this.setState({role : departName})
    }

    validation(){
        const {firstName, lastName,email,password,retypePass, plot, block, memberShip, mobile} = this.state;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!firstName.length){
            Alert.alert('','Enter your first name');
            return false
        }
        else if(!lastName.length){
            Alert.alert('','Enter your last name');
            return false
        }
        else if(!re.test(email.toLowerCase())){
            Alert.alert('','Enter valid email');
            return false;
        }
        else if(!block.length){
            Alert.alert('','Select block no');
            return false;
        }
        else if(!plot.length){
            Alert.alert('','Select plot no');
            return false;
        }
        else if(!mobile.length){
            Alert.alert('','Enter mobile no');
            return false;
        }
        else if(!memberShip.length){
            Alert.alert('','Enter membership no');
            return false;
        }
        else if (password.length < 8) {
            Alert.alert('','Minimum length of password field is 8 characters');
            return false;
        } else if (password.length > 16) {
            Alert.alert('','Maximum length of password field is 16 characters');
            return false;
        }
        else if(password !== retypePass){
            Alert.alert('','password not matched');
            return false
        }
        return true;

    }


    async signup() {
        const {firstName, lastName, email, password, role,plot, block, memberShip, mobile} = this.state;
        if(this.validation()){
            try {
                this.setState({loader: true});
                let res = await register({firstName, lastName, email, password, role, plot, block, memberShip, mobile});
                this.setState({firstName: '',lastName:'',email:'',password: '',retypePass:'', plot : '', block: '', memberShip: '', mobile : '',loader: false});
                Alert.alert('','Successfully Registered')
            } catch(e) {
                this.setState({loader: false});
                Alert.alert('','Error' + e);
            }
        }
    }


    render() {

        let block = [{
            value: 'Block 1',
        }, {
            value: 'Block 2',
        }, {
            value: 'Block 3',
        }, {
            value: 'Block 4',
        }, {
            value: 'Block 5',
        }];

        let plot = [{
            value: 'Plot 1',
        }, {
            value: 'Plot 2',
        }, {
            value: 'Plot 3',
        }, {
            value: 'Plot 4',
        }, {
            value: 'Plot 5',
        }];
        return (
            <View style={Styles.main}>
                <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} enableOnAndroid={true} >

                    <View style={Styles.header}>
                        <View style={Styles.headerSub}>
                            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.headingDiv}>
                            {
                                this.props.role ? <Text style={Styles.headingText}>Admin</Text> : <Text style={Styles.headingText}>Create an Account</Text>
                            }
                        </View>
                    </View>


                <View style={Styles.subDiv}>
                    <ScrollView ref='_scrollView'>
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
                            value={this.state.email}
                            style={Styles.inputField}
                            onChangeText = {(text)=> this.setState({email: text})}
                        />
                    </View>
                    <Dropdown
                        label='Society Block #'
                        data={block}
                        itemTextStyle={{fontFamily: 'gt-walsheim-regular'}}
                        containerStyle = {{width: width * 0.7}}
                        value = {this.state.block}
                        onChangeText = {(text)=> this.setState({block: text})}
                    />
                    <Dropdown
                        label='Plot #'
                        data={plot}
                        containerStyle = {{width: width * 0.7}}
                        itemTextStyle={{fontFamily: 'gt-walsheim-regular'}}
                        value = {this.state.plot}
                        onChangeText = {(text)=> this.setState({plot: text})}
                    />
                    <View onLayout={(e)=> {
                        footerY = e.nativeEvent.layout.y;
                    }}>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            keyboardType = 'numeric'
                            placeholder= 'Mobile no'
                            onFocus={() => { this.refs._scrollView.scrollTo(footerY) }}
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
                    <View>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            placeholder= 'Password'
                            value={this.state.password}
                            secureTextEntry={true}
                            style={Styles.inputField}
                            onChangeText = {(text)=> this.setState({password: text})}
                        />
                    </View>
                    <View>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            placeholder= 'Re-type password'
                            value={this.state.retypePass}
                            secureTextEntry={true}
                            style={Styles.inputField}
                            onChangeText = {(text)=> this.setState({retypePass: text})}
                        />
                    </View>
                    </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity style={this.state.role ? Styles.btn1 : Styles.btn} onPress={()=>{this.signup()}}>
                            {this.state.loader ? <ActivityIndicator size="small" color="#00ff00" /> : (this.state.role ? <Text style={Styles.btnText}>Register User</Text> : <Text style={Styles.btnText}>Signup</Text>)}
                        </TouchableOpacity>
                    </View>
                    {!this.state.role && <View style={Styles.footerDiv}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login", {screen: "Login"})}>
                            <Text style={Styles.footerText}>Back to login</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                </KeyboardAwareScrollView>

            </View>
        );
    }
}
