import React, {Component} from 'react'
import {Text, View, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity, Image, Alert} from 'react-native'
import {
    complains,
    login,
    complainStatusUpdate,
    complainUserToken,
    allComplains,
    allDepartId,
    allPrivateComplains,
    allComplainStatus,
    ratingStar
} from "../../configs/Firebase";
import moment from 'moment'
import firebaseClient from '../../configs/FirebaseClient'
import * as firebase from 'firebase'
import Styles from "./Styles"
import { Dropdown } from 'react-native-material-dropdown';
import CommentScreen from "./CommentScreen";
import {connect} from "react-redux";
import _ from "underscore";
import StarRating from 'react-native-star-rating';
require("firebase/firestore");


const db = firebase.firestore();
const {width, height} = Dimensions.get('window');
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 30;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};


class Complain extends Component{
    static navigationOptions = {
        header : null
    };

    constructor(props){
        super(props);
        this.state = {
            complains: [],
            users: [],
            user: this.props.user,
            departName : '',
            status: '',
            loader: false,
            departmentId: '',
            departHead: '',
            complainId: '',
            complainUserId :'',
            changeStatus : false,
            registeredComplains : '',
            inProcessComplains: '',
            resolveComplains: '',
            totalCompalins: '',
            starCount: 0,
            ratingId: '',
            count : 7

        };
        this.loadComplain = this.loadComplain.bind(this);
        this.sendRemoteNotification = this.sendRemoteNotification.bind(this);
        this.loadPrivateComplain = this.loadPrivateComplain.bind(this);
        this.loadComplainStatus = this.loadComplainStatus.bind(this);
        this.onStarRatingPress = this.onStarRatingPress.bind(this);
        this._onScroll = this.onScroll.bind(this);
    }

    componentWillMount(){
        const { navigation } = this.props;
        const users = navigation.getParam('users');
        const toggle = navigation.getParam('toggle');

        if(toggle == 'privateComplain'){
            this.loadPrivateComplain()
            }
        else{
            const departHead = users.map((user)=>{
                if(user.email == this.state.user.email){
                    this.setState({departHead: user})
                }
            });
            this.loadComplainStatus();
            let res =  this.loadComplain();
        }

    }

    async loadPrivateComplain(){
        const departId = await allDepartId()
        const complains = await allPrivateComplains(this.props.user.id, departId)
        const userComplain = _.flatten(complains)
        const sortComplain = _.sortBy(userComplain, (obj) => obj.data.createdAt);
        const revComplain = sortComplain.reverse()
        this.setState({complains: revComplain, loader: true,})


    }

    async loadComplainStatus(){
        const departId = await allDepartId()
        const complainStatus = await allComplainStatus(departId)
        const complainStat = _.flatten(complainStatus)
        var totalCompalins = 0
        var registeredComplains = 0
        var resolveComplains = 0
        var inProcessComplains = 0
        complainStat.map((el) => {
            const count = 1
            totalCompalins = totalCompalins + count;
            if(el.status == 'Resolved'){
                resolveComplains = resolveComplains + count;
            }
            else if(el.status == 'In process'){
                inProcessComplains = inProcessComplains + count;
            }
            else if(el.status == 'Registered'){
                registeredComplains = registeredComplains + count;
            }

        });
        this.setState({registeredComplains: registeredComplains,inProcessComplains: inProcessComplains, resolveComplains:resolveComplains, totalCompalins: totalCompalins });
    }

    async loadComplain(){
        const { navigation } = this.props;
        const departName = navigation.getParam('name');
        this.setState({departName: departName});
        const id = navigation.getParam('id');
        let complain =  await complains(id);
        this.setState({complains: complain, loader: true, departmentId: id})

    }

  async statusUpdate(id, userId){
        this.setState({complainId: id, complainUserId: userId});
      const { navigation } = this.props;
      const departId = navigation.getParam('id');
        try{
            let res = await complainStatusUpdate(departId, id, {status : this.state.status});
            Alert.alert('','status updated successfully');
            this.loadComplain();
            let getToken = await complainUserToken(userId);
            if(getToken.token){
                this.sendRemoteNotification(getToken.token);
            }
        }
        catch(e){
            Alert.alert('', e.error)
        }
    }

    sendRemoteNotification(token) {
        let body;
        if (token) {
            body = {
                to: token,
                data: {
                    custom_notification: {
                        title: "Your complained is " + this.state.status,
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

    onScroll({nativeEvent}) {
        if (isCloseToBottom(nativeEvent)) {

            this.setState({count: this.state.count + 5})
        }
    }

    updateDropdown(text,param1, param2){
        this.setState({status : text});
        this.statusUpdate(param1, param2)

    }
 renderComplain(){
     let status = [{
         value: 'Registered',
     }, {
         value: 'In process',
     }, {
         value: 'Resolved',
     }
     ];
        const complains = [...this.state.complains];
        complains.length = this.state.count;
        return(
            <View>
                {complains.map((complain)=>{
                    let date = complain.data.createdAt;
                    let createdAt = moment(date).fromNow();
                    return(
                        <View style={Styles.subCont}>
                            <View style={Styles.subSubCont}>
                                <View style={Styles.div1}>
                                    <View style={Styles.div2}>
                                        <View style={Styles.div3}>
                                            <View style={Styles.titleDiv}>
                                                <Text style={Styles.titleText}>{complain.data.title}</Text>
                                            </View>
                                            <View style={Styles.createDiv}>
                                                <Text style={Styles.time}>{createdAt}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={Styles.createText}>
                                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('CommentScreen', {
                                            description: complain.data.description,
                                            createdBy: complain.data.createdBy,
                                            name: complain.data.title,
                                            createdAt: createdAt,
                                            id: complain.id,
                                            departId: this.state.departmentId,
                                            status: complain.data.status,
                                            userId: complain.data.userId,
                                            rating: complain.data.rating

                                        })}>
                                            <View style={Styles.description}>
                                                <Text style={Styles.descriptionText2}>{complain.data.description}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={Styles.byMain}>
                                        <View style={Styles.bySub}>
                                            <View style={Styles.byView}>
                                                <Text style={Styles.byText}>{'By ' + complain.data.createdBy}</Text>
                                            </View>
                                            <View style={Styles.dropDownMain}>

                                                {complain.data.status && !this.state.departHead ?
                                                    <Text style={{fontFamily: 'gt-walsheim-regular'}} >Status : {complain.data.status}</Text> :
                                                    <View>
                                                        {
                                                            this.state.departHead ?
                                                                <View style={Styles.dropDownSub}>
                                                                    <Dropdown
                                                                        label={complain.data.status ? complain.data.status : 'status'}
                                                                        data={status}
                                                                        containerStyle = {Styles.dropDown}
                                                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                                                        value = {this.state.complainId == complain.id ? this.state.status : ''}
                                                                        onChangeText = {(text)=> this.updateDropdown(text,complain.id, complain.data.userId)}
                                                                    />
                                                                </View>
                                                                : <View><Text style={{fontFamily: 'gt-walsheim-regular'}}>In process</Text></View>
                                                        }

                                                    </View>
                                                }

                                            </View>
                                        </View>
                                        <View style={{height:height*0.05, flexDirection: 'row', marginLeft: width* 0.63}}>
                                            <StarRating
                                                emptyStar = {require('./../../images/star.png')}
                                                fullStar = {require('./../../images/fillStar.png')}
                                                disabled={false}
                                                starSize={20}
                                                maxStars={5}
                                                rating={complain.rating ? complain.ratingCount : complain.data.rating ? complain.data.rating : 0}
                                                selectedStar={(rating) => this.onStarRatingPress(rating, complain)}
                                            />
                                        </View>
                                    </View>

                                </View>
                            </View>

                        </View>
                    )
                })}

            </View>

        )
 }

    async onStarRatingPress(rating, complain) {
        if(complain.data.userId == this.props.user.id && complain.data.status == 'Resolved'){
            const {departmentId} = this.state
            complain.rating = true
            complain.ratingCount = rating
            const rate = await ratingStar(rating, complain.id, complain.data.departId)
            this.setState({
                starCount: rating
            });
        }

    }
    render(){
        let status = [{
            value: 'Registered',
        }, {
            value: 'In process',
        }, {
            value: 'Resolved',
        }
        ];

        return(
            <View style={Styles.main}>
                <View style={Styles.header}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>Complains</Text>
                </View>
                {this.props.user && this.props.user.isAdmin && <View style={Styles.logMain}>
                    <View style={Styles.logSub}>
                        <View style={Styles.logDiv}>
                            <View style={Styles.logSubDiv}>
                                <View style={Styles.logTitle}>
                                    <Text style={Styles.txtFont}>
                                        Total complains
                                    </Text>
                                </View>
                                <View style={Styles.logText}>
                                    <Text style={Styles.txtFont}>
                                        {this.state.totalCompalins}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.logDiv}>
                            <View style={Styles.logSubDiv}>
                                <View style={Styles.logTitle}>
                                    <Text style={Styles.txtFont}>
                                        Registered complains
                                    </Text>
                                </View>
                                <View style={Styles.logText}>
                                    <Text style={Styles.txtFont}>
                                        {this.state.registeredComplains}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.logDiv}>
                            <View style={Styles.logSubDiv}>
                                <View style={Styles.logTitle}>
                                    <Text style={Styles.txtFont}>
                                        In process complains
                                    </Text>
                                </View>
                                <View style={Styles.logText}>
                                    <Text style={Styles.txtFont}>{this.state.inProcessComplains}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.logDiv}>
                            <View style={Styles.logSubDiv}>
                                <View style={Styles.logTitle}>
                                    <Text style={Styles.txtFont}>
                                        Resolved complains
                                    </Text>
                                </View>
                                <View style={Styles.logText}>
                                    <Text style={Styles.txtFont}>
                                        {this.state.resolveComplains}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>}
                <ScrollView onScroll={this._onScroll}>
                    {this.state.loader ? this.state.complains.length ?
                        this.renderComplain() :
                        <View style={Styles.complain}>
                            <Text style={Styles.complainText}>No Complains</Text>
                        </View>
                      :
                        <View style={Styles.loader}>
                            <ActivityIndicator color = '#bc2b78' size = "large"/>
                        </View>

                    }
                </ScrollView>

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
)(Complain)