<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href="/" class="mx-auto nav-item">Home</a>
            <div class="status mx-auto nav-item">
                <p class="d-inline">You are..  </p>
                <p v-if="loggedIn" class="d-inline">Logged in!</p>
                <p v-else class="d-inline">Logged out!</p>
            </div>
            <div class="mx-auto nav-item">
                <a @click="signOut">Sign Out</a>
            </div>
            <!-- 
            <a class="nav-item nav-link" href="#">Features</a>
            <a class="nav-item nav-link" href="#">Pricing</a> -->
    </nav>
      <!-- You are 
      <span v-if="loggedIn">Logged in!</span>
      <span v-else>Logged out!</span>
      <div>
          <button @click="signOut">Sign Out</button>
      </div> -->
  </div>
</template>

<script>

import * as firebase from "firebase/app";
import "firebase/auth";

export default {

    created(){
        firebase.auth().onAuthStateChanged(user =>{

            this.loggedIn = !!user;
            // if(user){
            //     this.loggedIn=true;
            // } else {
            //     this.loggedIn = false;
            // }
        })
    },
    data(){
        return{
            loggedIn: false
        }
    },
    methods: {
        async signOut() {
            try{
                const data = await firebase.auth().signOut();
                console.log(data)
                this.$router.replace({name: "home"})
            }catch(err){
                console.log(err)
            }
            
        }
    }
  }
</script>

<style lang="scss" scoped>
.status {
    color:azure;
    font-size: 14px;
}
a {
    font-weight: bold;
    font-size: 14px;
    color: azure !important;
    text-decoration: none !important;
    cursor: pointer !important;
}

.navbar{
    width: 100% !important;
}
</style>