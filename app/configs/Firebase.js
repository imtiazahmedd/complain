import * as firebase from 'firebase'
import { Alert} from 'react-native'

require("firebase/firestore");

var config = {
    apiKey: "AIzaSyC9paK9-qYHe5EJxb6EDdxbUZVLv6dS56U",
    authDomain: "complaintcellpechs-valancia.firebaseapp.com",
    databaseURL: "https://complaintcellpechs-valancia.firebaseio.com",
    projectId: "complaintcellpechs-valancia",
    storageBucket: "complaintcellpechs-valancia.appspot.com",
    messagingSenderId: "164114551035"
};
firebase.initializeApp(config);

//Initialize Firestore
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);


//Methods
const register = ({firstName, lastName, email, password, role, plot, block, memberShip, mobile}) => {
    return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        db.collection('users').doc(res.user.uid).set({
            id: res.user.uid,
            head: !!role,
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            plot : plot,
            block : block,
            memberShip : memberShip,
            mobile : mobile
        }).then(()=>{
            resolve(res);
        })
        .catch((error) =>  {
            reject(error);
            console.log(error);
        });
}
    ).catch((error)=>{
        reject(error)
    })
    }
    )};

const users = () => {
    return new Promise((resolve, reject) => {
        var users = db.collection('users').get()
            .then(snapshot => {
                let user = [];
                snapshot.forEach(function(doc) {
                    if (doc.exists) {
                            user.push(doc.data());
                    } else {
                        reject(user)
                    }
                });
                resolve(user);
            })
    })
};


const login = ({email, password, token}) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                db.collection('users').doc(res.user.uid).update({token: token})
                resolve(res)
            })
            .catch((error) => {
                reject({error: 'Something went wrong!'})
            });
    })
};

const departments = () => {
    return new Promise((resolve, reject) => {
        var depart = db.collection('departments').get()
            .then(snapshot => {
                let departments = [];
                let id = [];
                snapshot.forEach(function(doc) {
                    var obj = {};
                if (doc.exists) {
                        obj.data = doc.data();
                    obj.id = doc.id;
                    departments.push(obj)
                } else {
                    console.log("No such document!");
                }
            });
                resolve(departments)
        })

    })
};

const updatePassword = (oldPassword,newPassword) =>{

    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        firebase.auth().signInWithEmailAndPassword(user.email, oldPassword)
            .then((res) => {
                user.updatePassword(newPassword).then((res) => {
                    resolve(res);
                    Alert.alert('','Password is changed successfully!');
                }).catch((error) => {
                    reject({error: 'Something went wrong!'})
                });
            }).catch((error) => {
            reject({error: 'Old password is incorrect!'})
        })
    });

};

const uploadDepartmentLogo  = (departmentId, image) => {
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('departmentImage/logo'+ departmentId +'.jpg');

    return new Promise((resolve, reject) => {
        imagesRef.put(image)
            .then(function(snapshot) {
                imagesRef.getDownloadURL().then(function(url) {
                    resolve(url);
                  return  db.collection('departments').doc(departmentId).update({ImageId: url});
                }).catch(function(error) {
                    reject({error: error.message})
                });
            }).catch((e) => {
            reject({error: e.message})
        });
    })
};

const addDepartment = (name,users,blob) =>{
    return new Promise((resolve,reject)=>{
        db.collection('departments').add({
            name: name,
            users: users,
            createdAt: Date.now()
        }).then((res)=>{
            uploadDepartmentLogo(res.id, blob);
            resolve(res);
        })
            .catch((error) =>  {
                reject(error);
                console.log(error);
            });

    })
};
const complains = (id) =>{
    return new Promise((resolve,reject)=>{
        db.collection('departments').doc(id).collection("complains").get()
            .then(snapshot => {
                let complain = []
                snapshot.forEach(doc => {
                    var obj = {}
                    obj.data = doc.data()
                    obj.id = doc.id
                    complain.push(obj)
                })
                resolve(complain)
            })
    })
};

const addComplains = (user, selDepart, description, complainTitle, blob) =>{
    return new Promise((resolve,reject)=>{
        var depart = db.collection('departments').get()
            .then(snapshot => {
                snapshot.forEach( doc =>{
                    if (doc.exists) {
                        if(doc.data().name == selDepart){
                            db.collection('departments').doc(doc.id).collection("complains").add({
                                title: complainTitle,
                                description: description,
                                department: selDepart,
                                createdAt: Date.now(),
                                createdBy: user.first_name + ' ' + user.last_name,
                                userId: user.id,
                                departId: doc.id
                            }).then((res)=>{
                                uploadComplainImage(res.id, doc.id,  blob);
                                resolve(doc.data())
                            })
                                .catch((error)=>{
                                    reject(error)
                                    console.log(error)
                                })
                        }
                    } else {
                        console.log("No such document!");
                    }
                });
            })
    })
};

const updateProfile = (userId, params) => {
    return db.collection('users').doc(userId).update(params)
};

const complainStatusUpdate = (departId, id, params) =>{

    return db.collection('departments').doc(departId).collection("complains").doc(id).update(params)
};


const uploadImage = (userId, image) => {
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images/profile_'+ userId +'.jpg');

    return new Promise((resolve, reject) => {
        imagesRef.put(image)
            .then(function(snapshot) {
                imagesRef.getDownloadURL().then(function(url) {
                    updateProfile(userId, {profile_picture: url});
                    resolve(url);
                    Alert.alert('','Profile update successfully')
                }).catch(function(error) {
                    reject({error: error.message})
                });
            }).catch((e) => {
            reject({error: e.message})
        });
    })
};

const uploadComplainImage = (complainId, departId, image) => {
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('complainImages/profile_'+ complainId +'.jpg');

    return new Promise((resolve, reject) => {
        imagesRef.put(image)
            .then(function(snapshot) {
                imagesRef.getDownloadURL().then(function(url) {
                    resolve(url);
                    db.collection('departments').doc(departId).collection("complains").doc(complainId).update({ImageId: url})
                    Alert.alert('','Complains add successfully')
                }).catch(function(error) {
                    reject({error: error.message})
                });
            }).catch((e) => {
            reject({error: e.message})
        });
    })
};

const departHead = (id) => {
        let promises = id.map((el)=>{
            return new Promise((resolve, reject) => {
                db.collection('users').doc(el.id).get()
                .then((res)=>{
                    resolve(res.data())
                });
        });
    });
    return Promise.all(promises);
};

const addComments = (comment, id, departmentId, createdBy, user) => {
    return new Promise((resolve,reject)=>{
        db.collection('departments').doc(departmentId).collection('complains').doc(id).collection("comments").doc().set({
            comment: comment,
            createdBy: user.first_name + ' ' + user.last_name
        })
            .then((res)=>{
                resolve(res)
            })
            .catch((error)=>{
                reject(error);
                console.log(error,"Error")
            });
    });
};

const showComments = (complainId, departId) => {
    return new Promise((resolve,reject)=>{
        db.collection('departments').doc(departId).collection('complains').doc(complainId).collection("comments").get()
            .then(snapshot => {
                let comment = [];
                snapshot.forEach(doc => {
                    var obj = {};
                    obj.data = doc.data();
                    obj.id = doc.id;
                    comment.push(obj)
                });
                resolve(comment)
            });
    });
};
const signOut = (uid) =>{
    return new Promise((resolve, reject)=>{
        db.collection('users').doc(uid).update({token: ''})
            .then(()=>{
                firebase.auth().signOut();
                resolve()
            });
    });
};

const complainUserToken = (uid) =>{
    return new Promise((resolve, reject)=>{
        db.collection('users').doc(uid).get()
            .then((res)=>{
                resolve(res.data())
            });
    });
};

const allDepartId = () => {
    let departId= []
    return new Promise((resolve,reject)=> {
        db.collection('departments').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    departId.push({id: doc.id})
                })
                resolve(departId)
            })
    })
};

const allPrivateComplains = (id, departId) => {

    let promises = departId.map((el)=>{
        return new Promise((resolve, reject) => {
            db.collection('departments').doc(el.id).collection('complains').where("userId", "==", id ).get()
                .then(snapshot=>{
                    var userComplain = []
                    snapshot.forEach(doc =>{
                        let obj = {}
                        obj.id = doc.id;
                        obj.data = doc.data()
                        userComplain.push(obj)
                    })
                    resolve(userComplain)
                })
        });
    });
    return Promise.all(promises);
};

const allComplainStatus= (departId) => {
    let promises = departId.map((el)=>{
        return new Promise((resolve, reject) => {
            db.collection('departments').doc(el.id).collection('complains').get()
                .then(snapshot=>{
                    var complain = []
                    snapshot.forEach(doc =>{
                        complain.push(doc.data())
                    })
                    resolve(complain)
                })
        });
    });
    return Promise.all(promises);

};

const ratingStar = (rating, complainId, departId)=>{
    return new Promise((resolve, reject)=>{
        db.collection('departments').doc(departId).collection('complains').doc(complainId).update({rating: rating})
            .then((res)=>{
                resolve(rating)
            })
            .catch((err)=>{
                reject(err)
            })

    })
}

export {
    register,
    login,
    users,
    departments,
    firebase,
    addDepartment,
    complains,
    addComplains,
    uploadImage,
    updateProfile,
    updatePassword,
    addComments,
    showComments,
    complainStatusUpdate,
    signOut,
    complainUserToken,
    departHead,
    uploadComplainImage,
    allDepartId,
    allPrivateComplains,
    allComplainStatus,
    ratingStar
}