import { Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');


const Styles = {
    main:{
        width: width,
        height:height
    },
    header:{
        width: width* 0.15,
        height: height* 0.05,
        marginTop: height* 0.03,
        marginLeft: width* 0.03
    },
    headerImg:{
        width: 25,
        height: 25
    },
    headingDiv:{
        width:width,
        height: height* 0.2,
        alignItems:'center',
        justifyContent:'center'
    },
    headingText:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    inputField:{
        width: width* 0.7,
        height: height*0.07,
        borderWidth:1.2,
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
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center'
    }
};

export default Styles;