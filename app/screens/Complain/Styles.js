import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');
const Styles = {
    container: {
        flex: 1
    },
    header: {
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        backgroundColor: '#127c7e'
    },
    headerImg: {
        width: 25,
        height: 25,
        marginLeft: 15,
        marginTop: height * 0.03
    },
    headerText: {
        fontSize: 18,
        marginLeft: width * 0.25,
        marginTop: height * 0.03,
        color: '#fff',
        fontFamily: 'gt-walsheim-regular'

    },
    div1: {
        flex: 0.4,
        backgroundColor: '#7851a9',
        margin: 10,

        alignItems: 'center',
        justifyContent: 'center'
    },
    div1Image: {
        width: 90,
        height: 90
    },
    div1Text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    div: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        flexWrap: 'wrap'
    },
    divSub: {
        backgroundColor: '#7851a9',
        width: '45%',
        height: height * 0.15,
        marginLeft: width * 0.03,
        marginBottom: height * 0.03,
        alignItems: 'center',
        justifyContent: 'center'
    },
    divImage: {
        width: 40,
        height: 40
    },
    divText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    },
    main: {
        width: width,
        height: height
    },
    subCont: {
        width: width,
        height: height * 0.2,
        borderWidth: 0.5,
        borderBottomColor: 'grey',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',


    },
    subSubCont: {
        width: width,
        height: height * 0.2
    },
    statusBtnSub: {
        width: 100,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusBtnText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    dropDown: {
        width: width * 0.3,
        marginBottom: 20,
        marginLeft: 10
    },
    complain: {
        marginLeft: width * 0.33,
        marginTop: height * 0.35
    },
    complainText: {
        fontSize: 20,
        fontFamily: 'gt-walsheim-regular'
    },
    loader: {
        marginTop: height * 0.4
    },
    div1: {
        flex: 1,
        flexDirection: 'column'
    },
    div2: {
        height: height * 0.05
    },
    div3: {
        flex: 1,
        flexDirection: 'row'
    },
    titleDiv: {
        width: width * 0.6,
        justifyContent: 'center'
    },
    titleText: {
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'gt-walsheim-regular'
    },
    createDiv: {
        width: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createText: {
        height: height * 0.05,
        justifyContent: 'center'
    },
    descriptionText2: {
        marginLeft: 15,
        fontFamily: 'gt-walsheim-regular'
    },
    byMain: {
        height: height * 0.1
    },
    bySub: {
        flex: 1,
        flexDirection: 'row'
    },
    byView: {
        width: width * 0.5,
        justifyContent: 'center'
    },
    byText: {
        marginLeft: 15,
        fontFamily: 'gt-walsheim-regular'
    },
    dropDownMain: {
        width: width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropDownSub: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logMain: {
        height: height * 0.24,
        borderWidth: 0.5,
        borderBottomColor: 'grey',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent'
    },
    logSub: {
        flex: 1,
        flexDirection: 'column'
    },
    logDiv:{
        height: height*0.06
},
    logSubDiv:{
        flex: 1,
        flexDirection: 'row'
    },
    logTitle:{
        width: width*0.65,
        borderWidth:0.5,
        borderBottomColor:'grey',
        borderLeftColor:'transparent',
        borderRightColor:'grey',
        borderTopColor:'transparent',
        alignItems:'center',
        justifyContent:'center'
    },
    logText:{
        width: width*0.35,
        borderWidth:0.5,
        borderBottomColor:'grey',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderTopColor:'transparent',
        alignItems:'center',
        justifyContent:'center'
    },
    txtFont:{
        fontFamily: 'gt-walsheim-regular'
    },
    time:{
        fontFamily: 'gt-walsheim-regular'
    }
};

export default Styles;