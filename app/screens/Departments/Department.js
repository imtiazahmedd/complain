import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput,ScrollView, StyleSheet,ActivityIndicator} from 'react-native'
const {width, height} = Dimensions.get('window');
import Styles from './Styles'
import AddDepartment from "../Admin/Add_Departments";
import {connect} from "react-redux";
import {departments, complaines, allComplainStatus} from './../../configs/Firebase'

class Department extends Component{
    static navigationOptions = {
        drawerLabel: 'Department',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./../../images/Adv2.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };
    constructor(props){
        super(props);
        this.state = {
            depart: [],
            loader : false
        };
        this.loadDepart = this.loadDepart.bind(this);
        this.loadComplains = this.loadComplains.bind(this);

    }
    componentWillMount(){
        this.loadDepart()
    }

    async loadComplains(){
        this.props.navigation.navigate('Complain', {
            toggle: 'privateComplain',
        });
    }

    async loadDepart(){
        let depart = await departments();
        this.setState({depart: depart})
    }

    render(){
        return(
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity  style= {Styles.headerSubContent} onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={require('./../../images/menu.png')} style={Styles.menuImg}/>
                    </TouchableOpacity>
                    {this.props.user && !this.props.user.head && !this.props.user.isAdmin && <TouchableOpacity style={Styles.mainCont}  onPress={() => this.props.navigation.navigate("Complains", {screen: "Complains"})}>
                        <Text style={Styles.headText}>Add Complains</Text>
                        <Image source={require('./../../images/add.png')} style={Styles.addImg}/>
                    </TouchableOpacity>}
                    { this.props.user && this.props.user.head || this.props.user.isAdmin ? <Text style={Styles.departHeading}>Departments</Text> : null }


                </View>
                <View style={Styles.subContainer}>
                    {this.props.user && !this.props.user.head && !this.props.user.isAdmin &&
                    <View style={Styles.complainDiv}>
                        <View style={Styles.complainSub}>
                            <View style={Styles.complainSub2}>

                            </View>
                            <View style={Styles.complainSub3}>
                                <View style={Styles.div1}>
                                    <TouchableOpacity onPress={()=>this.loadComplains()}>
                                        <Text style={Styles.div1Text}>My Complains</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                        }

                    <ScrollView>
                        {this.state.depart.length ?
                            <View style={this.props.user && !this.props.user.head && !this.props.user.isAdmin ? {marginLeft:30,marginBottom:20,marginRight:19}: {marginTop:30,marginLeft:30,marginBottom:20,marginRight:19}}>
                            <View style={Styles.div}>
                                {this.state.depart.map((depart, index)=> {
                                    return(
                                        <View style={Styles.divSub}>
                                            <TouchableOpacity onPress={()=>{
                                                this.props.navigation.navigate('Complain', {
                                                    name: depart.data.name,
                                                    id: depart.id,
                                                    users: depart.data.users
                                                });
                                            }}>

                                                <View style={Styles.complainLogo}>
                                                    <View style={Styles.LogoSub}>
                                                        <View style={Styles.logoSub2}>
                                                            {depart.data ? <Image style={Styles.logoImg} source={{uri: depart.data.ImageId}}/> : <Text style={Styles.logoTxt} >Logo</Text>}
                                                        </View>
                                                    </View>
                                                    <View style={Styles.deptName}>
                                                        <Text style={Styles.divText}>{depart.data.name}</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                            </View>
                                : null
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};
export default connect(
    mapStateToProps
)(Department)