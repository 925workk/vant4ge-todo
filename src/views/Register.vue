<template>
    <div  class="registerContainer">
        <top-header></top-header>
        <h2 class="mt-5">Register</h2>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            <div class="email">
                <input type="email" v-model="email" placeholder="email">
            </div>
            <div class="password">
                <input  type="password" v-model="password" placeholder="password">
            </div>
            <button type="submit" class="btn btn-primary btn-lg mb-5">Register</button>
        </form>
        <span>Already have an account? Click here to <router-link to="/login">login</router-link></span>
    </div>
</template>

<script>

import TopHeader from "../components/Top-Header"
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    methods:{
        async pressed(){
            try{
                const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                console.log(user)
                alert("Account creation successful! Redirecting you to the log in screen...")
                this.$router.replace({name: "login"})
            } catch(err){
                console.log(err)
            }     
        }
    },
    data(){
        return {
            email: "",
            password: "",
            error: ""
        }
    },
    components:{
        'top-header': TopHeader
    },
}
</script>

<style lang="scss" scoped>
    .registerContainer{
        width: 100%;
        background-image: url("../../public/images/nice_snow.png");
        background-repeat: repeat;
        height: 100vh;
    }
    .error {
        color: red;
        font-size: 18px;
    }
    input {
        width: 80%;
        padding: 20px;
        margin: 20px;
        font-size: 21px;
        border: 1px black solid;
    }
        button {
        width: 40%;
        height: 60px;
        font-size: 20px;
    }
</style>