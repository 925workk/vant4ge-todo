import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import firebase from 'firebase'
import 'firebase/firestore'
require ("firebase/firestore")

Vue.prototype.$axios = axios;
Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: "AIzaSyA1hYsvsVPiXaKvhQiZw9Cv8NZpAkpQOq4",
    authDomain: "van4ge.firebaseapp.com",
    databaseURL: "https://van4ge.firebaseio.com",
    projectId: "van4ge",
    storageBucket: "van4ge.appspot.com",
    messagingSenderId: "776366649645",
    appId: "1:776366649645:web:453da0c7d09b282cb723a4"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  Vue.prototype.$firebase = firebase;
  const db=firebase.firestore();
  let app;

  firebase.auth().onAuthStateChanged(user=>{
    console.log(user);
    if (!app){
      app= new Vue({
        router,
        store,
        render: h => h(App)
        }).$mount('#app')
    }
  })

  const collection = db.collection('tasks');

  collection.get().then(snapshot => {

  snapshot.forEach(doc => {

    console.log( doc.data() );    

  });

});

export {db}