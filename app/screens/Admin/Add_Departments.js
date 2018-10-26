import React, { Component } from 'react';
import { Text, View, TouchableOpacity,Image,TextInput, ScrollView, CheckBox,ActivityIndicator,Alert} from 'react-native';
import { Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');
import Styles from "../Register/Styles";
import {register, users, addDepartment} from '../../configs/Firebase'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
var ImagePicker = require('react-native-image-picker');

export default class AddDepartment extends Component {

    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        this.state={
            name : '',
            logo: '',
            users: [],
            checked: false,
            loader : true,
            loader2 : false,
        };
        this.users =  this.users.bind(this);
        this._onOpenActionSheet = this.onOpenActionSheet.bind(this);
    }


    componentWillMount(){
        this.users()
    }
    toggleCheckBox(index) {
        const {users} = this.state;
        users[index].checked = !users[index].checked;
        this.setState({users});
    }
    onOpenActionSheet = () => {
        this.ActionSheet.show()
    };
    async openCamera(get){
        let options  = {
            allowsEditing: true,
            aspect: [3, 3],
            noData : true,
            quality: 0.5,
            maxWidth: 50,
            maxHeight: 50,
        };
        let result;
        if(get == 0){
            ImagePicker.launchImageLibrary(options, (response)  => {
                this.setState({logo : response.uri})
            });
        }else if(get == 1){
            ImagePicker.launchCamera(options, (response)  => {
                this.setState({logo : response.uri})
            });
        }


    }
        async users() {
                try {
                    let res = await users({});
            let list = res.filter((el)=>{
                        return !!el.head
                    });
                    this.setState({users: list, loader : false})
                } catch(e) {
                    console.log('Error', e.error);
                }
        }

        async addDepartment(){
            const {name,users,logo} = this.state;
        let filterUser = users.filter((el)=>{
                return el.checked == true;
            });
            if(name && logo){
                try{
                    const response = await fetch(logo);
                    const blob = await response.blob();
                    this.setState({loader2 : true});
                    let res = await addDepartment(name,filterUser,blob);
                    Alert.alert('','Department added successfully');
                    this.setState({name : '' ,logo : '',loader2 : false});

                }catch (e) {
                    console.log('Error', e.error);
                }
            }else{
                Alert.alert('','All field required')
            }
        }


    render(){
        const options = [
            'Gallery',
            'Camera',
            'Cancel'

        ];
        return (
            <View style={Styles.main}>
                <View style={Styles.headerCont}>
                    <View style={Styles.headerContSub}>
                        <View style={Styles.headerBack}>
                            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.headerTextCont}>
                            <Text style={Styles.headerText}>Add Department</Text>
                        </View>
                    </View>

                </View>
                <View style={Styles.subDiv}>
                    <View>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            placeholder= 'Name'
                            value={this.state.name}
                            style={Styles.inputField3}
                            onChangeText = {(text)=> this.setState({name : text})}
                        />
                        <View>
                            <TouchableOpacity style={Styles.inputField} onPress={this._onOpenActionSheet}>
                                 <Text style={{fontSize: 14, fontcolor: 'grey', marginTop: height * 0.04}}>{this.state.logo ? this.state.logo : 'Logo'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',height:height*0.5}}>
                        {this.state.loader ? <ActivityIndicator size="large" color="#0000ff" /> :<View style={{height:height*0.3,marginTop:height*0.05}}>

                        <ScrollView>
                            {!!this.state.users.length && this.state.users.map((el,index)=>{
                                return(
                                    <View style={{width: width*0.7, height: height*0.1}}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{width: width*0.15 ,alignItems:'center',justifyContent:'center', borderWidth:1,borderTopColor:'transparent',borderLeftColor:'transparent',borderRightColor:'transparent', borderBottomColor:'grey'}}>
                                                <CheckBox
                                                    value={el.checked}
                                                    onValueChange={()=> this.toggleCheckBox(index)}
                                                />
                                            </View>
                                            <View style={{width: width*0.85, borderWidth:1, borderBottomColor:'grey',borderTopColor:'transparent',borderLeftColor:'transparent',borderRightColor:'transparent',alignItems:'center',justifyContent:'center'}}>
                                                <View style={{flex: 1,flexDirection: 'column',marginLeft:width*0.2}}>
                                                    <View style={{ height: height*0.05,width:width}}>
                                                        <Text style={{fontSize:17,fontWeight:'bold'}}>{el.email}</Text>
                                                    </View>
                                                    <View style={{ height: height*0.05}}>
                                                        <Text>{el.first_name +" " +  el.last_name}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                        </ScrollView>
                    </View>}

                    <View>
                        <TouchableOpacity style={Styles.btn} onPress={()=>{this.addDepartment()}} >
                            {this.state.loader2 ? <ActivityIndicator size="small" color="#0000ff" /> : <Text style={Styles.btnText}>Add Department</Text>}
                        </TouchableOpacity>
                    </View>

                    </View>
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

        );
    }
}
