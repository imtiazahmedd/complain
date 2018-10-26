import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');
const Styles = {
    container: {
        flex: 1
    },
    header:{
        flex:0.1,
        flexDirection: 'row',
        backgroundColor: '#127c7e'

    },
    subContainer:{
        flex:0.9
    },
    departHeading: {
        fontSize:18,
        marginLeft: width* 0.25,
        marginTop:height*0.03,
        color:'#fff',
        fontFamily: 'gt-walsheim-regular'
    },
    div1:{
        height: height*0.18,
        marginLeft:20,
        backgroundColor : 'lightgrey',
        width:width*0.9,
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        fontSize:18,
        marginLeft: width* 0.25,
        marginTop:height*0.03,
        color:'#fff',
        fontFamily: 'gt-walsheim-regular'

    },
    div1Image:{
        width:90,
        height:90
    },
    div1Text:{
        fontSize:16,
        color:'#129c7e',
        fontFamily: 'gt-walsheim-regular'
    },
    div:{
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    divSub:{
        backgroundColor:'#129c7e',
        width: '48%',
        height: height* 0.15,
        alignItems:'center',
        justifyContent:'center',
        margin: 0.6
    },
    divImage:{
        width:40,
        height:40
    },
    divText:{
        fontSize:14,
        color:'#fff',
        fontFamily: 'gt-walsheim-regular'
    },
    headerSubContent:{
        width: width* 0.1,
        height: height * 0.1,
        alignItems:'center',
        justifyContent:'center'
    },
    menuImg:{
        width: width* 0.07,
        height: height * 0.035,
        marginLeft:10
    },
    mainCont:{
        width: width* 0.4,
        height: height * 0.1,
        marginLeft: width * 0.5,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row'
    },
    headText:{
        fontSize: 13,
        fontFamily: 'gt-walsheim-regular',
        color: '#fff'
    },
    addImg:{
        width : 15,
        height : 15,
        marginLeft: width * 0.02
    },
    complainDiv:{
        height:height*0.25
    },
    complainSub:{
        flex: 1,
        flexDirection: 'column'
    },
    complainSub2:{
        height: height*0.07,
        backgroundColor: '#129c7e',
        marginTop:height*0.02,
        width:width*0.84,
        marginLeft:width*0.08
    },
    complainSub3:{
        height: height*0.18,
        width:width*0.94
    },
    complainLogo:{
        flex: 1,
        flexDirection: 'column'
    },
    LogoSub:{
        width:width,
        height: height*0.085,
        alignItems:'center',
        justifyContent:'center'
    },
    logoSub2:{
        width:width*0.25,
        height:35,
        alignItems:'center',
        justifyContent:'center'
    },
    logoImg:{
        width:width*0.12,
        height:width*0.12,
        borderRadius:100,
        marginTop:15
    },
    logoTxt:{
        color:'#fff',
        fontFamily: 'gt-walsheim-regular'
    },
    deptName:{
        width:width,
        height: height*0.065,
        alignItems:'center',
        justifyContent:'center'
    }
};

export default Styles;