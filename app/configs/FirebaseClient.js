import { Alert } from "react-native";

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

    async send(body) {

        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "key=" + 'AIzaSyDjezKnce_BxImJNnhysTjbu4-1KZb5oj0'
        });

        try {
            let response = await fetch(API_URL, { method: "POST", headers, body });
            console.log(response);
            try{
                response = await response.json();
                if(!response.success){
                    Alert.alert('Failed to send notification, check error log')
                }
            } catch (err){
                Alert.alert('Failed to send notification, check error log')
            }
        } catch (err) {
            Alert.alert(err && err.message)
        }
    }

}

let firebaseClient = new FirebaseClient();
export default firebaseClient;