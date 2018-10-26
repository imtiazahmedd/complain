import React, {Component} from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import Styles from './CommentScreenStyle'
import {Dimensions} from 'react-native'
import {addComments, showComments, ratingStar} from './../../configs/Firebase'
import {connect} from "react-redux";
import StarRating from 'react-native-star-rating';

const {width, height} = Dimensions.get('window');

class CommentScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            comment : '',
            description: '',
            createdBy: '',
            complainTitle: '',
            createdAt: '',
            complainId: '',
            departId: '',
            allComments: [],
            starCount: 0,
            ratingId: '',
            userId: '',
            status: 0,
            rating: 0

        };
        this.addComment = this.addComment.bind(this);
        this.showComment = this.showComment.bind(this);
        this.onStarRatingPress = this.onStarRatingPress.bind(this);
    }

    componentWillMount(){
        const {navigation} = this.props
        const description  = navigation.getParam('description')
        const createdBy  = navigation.getParam('createdBy')
        const name  = navigation.getParam('name')
        const createdAt  = navigation.getParam('createdAt')
        const complainId  = navigation.getParam('id')
        const departId  = navigation.getParam('departId')
        const status  = navigation.getParam('status')
        const userId  = navigation.getParam('userId')
        const rating  = navigation.getParam('rating')
        this.setState({description: description, createdBy: createdBy, complainTitle: name, createdAt: createdAt, complainId: complainId, departId: departId, userId: userId, rating: rating, status: status})
        this.showComment(complainId, departId)
    }

    async showComment(complainId, departId){
        let commentData = await showComments(complainId, departId)
        this.setState({allComments: commentData})
    }

    async addComment(){
        const {comment, complainId, departId, createdBy, user} = this.state
        let commentRes = await addComments(comment, complainId, departId, createdBy, user)
        this.setState({comment: ''})
        this.showComment(complainId, departId)
    }
    async onStarRatingPress(rating) {
        const {complainId, departId} = this.state
        if(this.state.userId == this.props.user.id && this.state.status == 'Resolved'){
            const rate = await ratingStar(rating, complainId, departId)
            this.setState({
                starCount: rate
            });
        }

    }
    render(){
        return(
            <View style={Styles.mainView}>
                <View style={Styles.headerMain}>
                    <View style={Styles.headerSub}>
                        <View style={Styles.headerBack}>
                            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                <Image source={require('../../images/leftArrow.png')} style={Styles.headerImg}/>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.headerHeading}>
                            <Text style={Styles.headerText}>{this.state.complainTitle}</Text>
                        </View>
                    </View>
                </View>

                <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between'}}>
                    <View style={{height: height*0.3}}>
                        <View style={Styles.descriptionView}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: width*0.6,justifyContent:'center'}}>
                                    <Text style={Styles.descriptionText}>
                                        {this.state.description}
                                    </Text>
                                </View>
                                <View style={{width: width*0.4,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={Styles.createdAtText}>{this.state.createdAt}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={Styles.createdByText}>By {this.state.createdBy}</Text>
                                <View style={{marginLeft: width* 0.22}}>
                                    <StarRating
                                        emptyStar = {require('./../../images/star.png')}
                                        fullStar = {require('./../../images/fillStar.png')}
                                        disabled={false}
                                        starSize={20}
                                        maxStars={5}
                                        rating={this.state.starCount ? this.state.starCount : this.state.rating ? this.state.rating : 0 }
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{height: height*0.45}}>
                        <ScrollView>
                            {this.state.allComments.map((comment)=>{
                                return(
                                    <View style={Styles.commentTxtView}>
                                        <Text style={Styles.commentCreatedBy}>{comment.data.createdBy}: </Text>
                                        <Text style={Styles.CommentTxt}>{comment.data.comment}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={{height: height*0.2,alignItems:'center'}}>
                        <View style={{flexDirection: 'row' }}>
                            <TextInput style={Styles.TxtInput}
                                       underlineColorAndroid = 'transparent'
                                       placeholder= 'Comment'
                                       multiline = {true}
                                       value = {this.state.comment}
                                       onChangeText = {(text)=> this.setState({comment: text})}
                            />
                            <View style={Styles.inputBtnView}>
                                <TouchableOpacity onPress = {()=>{this.addComment()}}>
                                    <Image style = {Styles.inputImg}source={require('./../../images/tick.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
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
export default connect(
    mapStateToProps
)(CommentScreen)