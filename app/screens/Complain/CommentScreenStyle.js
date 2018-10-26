import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');
const Styles = {
    mainView:{
        width: width,
        height: height,
    },
    headerMain:{
        height:height*0.1,
        backgroundColor: '#127c7e'
    },
    headerSub:{
        flex: 1,
        flexDirection: 'row'
    },
    headerBack:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center'
    },
    headerImg:{
        width:25,
        height:25,
    },
    headerHeading:{
        flex:0.8,
        justifyContent:'center'
    },
    headerText:{
        fontSize:18,
        marginLeft:width*0.18,
        fontFamily: 'gt-walsheim-regular',
        color: '#fff'

    },
    descriptionView:{
        width: width ,
        height: height * 0.26,
        justifyContent:'center',
        borderWidth: 0.5,
        borderBottomColor:'grey',
        borderTopColor:'transparent',
        borderLeftColor:'transparent',
        borderRightColor:'transparent'

    },
    createdByText:{
        fontSize: 16,
        marginLeft: width* 0.02,
        fontFamily: 'gt-walsheim-regular',
        marginBottom:10
    },
    createdAtText:{
        color:'#696e75',
        marginLeft: width* 0.02,
        fontFamily: 'gt-walsheim-regular'
    },
    descriptionText:{
        color:'#000000',
        marginLeft: width* 0.02,
        fontFamily: 'gt-walsheim-regular'
    },
    commentView:{
        width: width * 0.95,
        height: height * 0.57
    },
    TxtInput:{
        width: width * 0.8,
        height: height * 0.06,
        marginLeft: width * -0.01,
        marginTop: height * 0.01,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 35,
        position: 'absolute'
    },
    inputBtnView:{
        width: width * 0.07,
        height: width * 0.07,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent:'center',
        borderColor: 'grey',
        borderRadius: 100,
        marginLeft: width * 0.7,
        marginTop: height * 0.02
    },
    inputImg:{
        width: width * 0.04,
        height: width * 0.04,
    },
    commentTxtView:{
        width: width,
        flexDirection: 'row',
        marginTop: height * 0.02,
        backgroundColor: '#edeff2'
    },
    commentCreatedBy:{
        fontSize: 17,
        fontFamily: 'gt-walsheim-regular',
        marginLeft: width* 0.02
    },
    CommentTxt:{
        fontSize: 15,
        marginTop: height * 0.005,
        marginLeft: width* 0.01,
        fontFamily: 'gt-walsheim-regular'
    }


};
export default Styles;