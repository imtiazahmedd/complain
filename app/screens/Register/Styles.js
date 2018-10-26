import { Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');


const Styles = {
    main:{
        width: width,
        height:height
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#127c7e'
    },
    headerSub:{
        width: width*0.15,
        height: height*0.1,
        alignItems:'center',
        justifyContent:'center'
    },
    headerImg:{
        width: 25,
        height: 25
    },


    headingDiv:{
        width: width*0.85,
        height: height*0.1,
        justifyContent:'center',
        marginLeft:width*0.1
    },
    headingText:{
        color:'#fff',
        fontFamily: 'gt-walsheim-regular',
        fontSize:18
    },
    headerCont:{
        flexDirection : 'row',
        flexWrap:'wrap'
    },
    headerContSub:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#127c7e'
    },
    headerBack:{
        width: width*0.15,
        height: height*0.1,
        alignItems:'center',
        justifyContent:'center'
    },
    headerTextCont:{
        width: width*0.85,
        height: height*0.1,
        justifyContent:'center'
    },
    headerText:{
        fontSize: 18,
        marginLeft:width*0.14,
        color:'#fff',
        fontFamily: 'gt-walsheim-regular'

    },
    subDiv:{
        width:width,
        height: height* 0.84,
        alignItems:'center'
    },
    inputField:{
        width: width* 0.7,
        height: height*0.1,
        borderWidth:0.5,
        fontSize:16,
        marginRight: 5,
        borderBottomColor:'grey',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderTopColor:'transparent',
        fontFamily: 'gt-walsheim-regular'
    },
    inputField3:{
        width: width* 0.7,
        height: height*0.1,
        borderWidth:0.5,
        borderBottomColor:'grey',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderTopColor:'transparent',
        marginTop:height*0.1
    },
    inputField4:{
        width: width* 0.7,
        height: height*0.1,
        borderWidth:0.5,
        borderBottomColor:'grey',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderTopColor:'transparent',
    },
    inputField2:{
        width: width* 0.1,
        height: height*0.06,
        borderWidth:0.5,
        borderBottomColor:'grey',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderTopColor:'transparent'
    },
    btn:{
        width: width* 0.7,
        height: height*0.07,
        borderRadius:7,
        marginTop:30,
        backgroundColor:'#127c7e',
        justifyContent:'center',
        alignItems:'center'
    },
    btn1:{
        width: width* 0.7,
        height: height*0.07,
        borderRadius:7,
        marginTop:30,
        backgroundColor:'#127c7e',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontFamily: 'gt-walsheim-regular'
    },
    footerDiv:{
        height:height*0.08,
        alignItems:'center',
        justifyContent:'center'
    },
    footerText:{
        fontSize:18,
        color:'#127c7e',
        fontFamily: 'gt-walsheim-regular'
    }
};

export default Styles;