import { Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');


const Styles = {
    main:{
        width: width,
        height:height
    },
    headerImg:{
        width: 25,
        height: 25
    },
    headingText:{
        fontSize: 18,
        marginLeft:width*0.1,
        fontFamily: 'gt-walsheim-regular',
        color:'#fff'
    },
    headerMain:{
        height:height*0.1,
        backgroundColor: '#127c7e'
    },
    headerSub:{
        flex: 1,
        flexDirection: 'row'
    },
    headerHeading:{
        flex:0.8,
        justifyContent:'center'
    },
    headerBack:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center'
    },
    subDiv:{
        width:width,
        height: height* 0.6,
        alignItems:'center',
        marginTop:height*0.16
    },
    inputField:{
        width: width* 0.7,
        height: height*0.1,
        borderWidth:1.2,
        fontSize: 16,
        borderBottomColor:'grey',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderTopColor:'transparent',
        fontFamily: 'gt-walsheim-regular'
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
        color:'red'
    }

};

export default Styles;