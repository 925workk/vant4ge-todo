<template>
    <div class="loginContainer">
        <top-header></top-header>
        <h2 class="mt-5">Login</h2>
        <form @submit.prevent="pressed">
            <div class="login">
                <input type="email" placeholder="email" v-model="email">
            </div>
            <div class="password">
                <input  type="password" v-model="password" placeholder="password">
            </div>
            <button type="submit" class="btn btn-primary btn-lg mb-5">Log In</button>
        </form>
        <div class="error" v-if="error">{{error.message}}</div>
        <span>Need an account? Click here to <router-link to="/register">register</router-link></span>
    </div>
</template>

<script>
import TopHeader from "../components/Top-Header"
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    data(){
        return{
            email: "",
            password: "",
            error:""
        }
    },
    components:{
        'top-header': TopHeader
    },
    methods:{
        async pressed(){
            try{
                const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                console.log(val)
                this.$router.replace({name: "todoapp"})
            } catch(err){
                console.log(err)
            }

        }
    }
}
</script>
<style lang="scss" scoped>

    .loginContainer{
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