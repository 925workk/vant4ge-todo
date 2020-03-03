<template>
    <div class="todoAppContainer">
        <top-header></top-header>
        <div>
            <div class="addTodoLabel mt-4">
                <h3 class="d-inline">Add a To-do: </h3>
                <input type="text" v-model="name" class="addBox"/> 
            </div>
            <br />
            <h4 class="categoryLabel">Select a Category: </h4>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <input type="radio" id="Books To Read" v-model="category" value="Books To Read">
                        <label for="Books To Read">Books To Read</label>
                    </div>
                    <div class="col-md-3">
                        <input type="radio" id="Self Improvement" v-model="category" value="Self Improvement">
                        <label for="Self Improvement">Self Improvement</label>
                    </div>
                    <div class="col-md-3">
                        <input type="radio" id="Grocery" v-model="category" value="Grocery">
                        <label for="Grocery">Grocery</label>
                    </div>
                    <div class="col-md-3">
                        <input type="radio" id="Home Repair" v-model="category" value="Home Repair">
                        <label for="Home Repair">Home Repair</label>
                    </div>
                </div>
            </div>
            <button @click="addTodo()" class="btn btn-primary mb-5 addButton mt-3">Add Task</button>
        </div>
        <h2 class="mb-3 m-3">Task List</h2>
        <div class="container">
            <!-- <ul> -->
                <h5 v-for="item in tasksCollection" :key="item.key" class="taskContainer">
                    <button @click="checkCompleted(item.name)" class="btn btn-outline-primary" :class="{completed:item.completed}">Mark Completed</button>
                    <p class="d-inline texts" :class="{completed:item.completed}"><strong>Task: </strong> {{item.name}}</p>
                    <p class="d-inline texts" :class="{completed:item.completed}"><strong>Category: </strong> {{item.category}}</p>
                    <!-- <p class="d-inline texts"><strong>Completed: </strong> {{item.completed}}</p> -->
                    <i @click="$bvModal.show(item.name)" class="fas fa-edit ml-4 mr-4"></i>
                    <i @click="removeTodo(item.name)" class="fas fa-trash-alt"></i>

                    <b-modal :id="item.name" hide-footer>
                        <template v-slot:modal-title class="text-center">
                            ITEM EDITING: <p>{{item.name}}</p>
                        </template>
                        <div class="d-block text-center">
                            <div class="TodoLabel mt-4">
                                <h3 class="d-inline">Change Task to: </h3>
                                <input type="text" v-model="nameEdit" class="addBox">
                            </div>
                            <br />
                            <h4 class="categoryLabel">Select a Category: </h4>
                            <br />
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-6">
                                        <input type="radio" id="Books To Read" v-model="categoryEdit" value="Books To Read">
                                        <label for="Books To Read">Books To Read</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="radio" id="Self Improvement" v-model="categoryEdit" value="Self Improvement">
                                        <label for="Self Improvement">Self Improvement</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="radio" id="Grocery" v-model="categoryEdit" value="Grocery">
                                        <label for="Grocery">Grocery</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="radio" id="Home Repair" v-model="categoryEdit" value="Home Repair">
                                        <label for="Home Repair">Home Repair</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-button class="mt-3" block @click="$bvModal.hide(item.name)">Close</b-button>
                        <b-button class="mt-3" variant="primary" block @click="editTodo(item.name), $bvModal.hide(item.name)">Save Changes</b-button>
                    </b-modal>
                </h5>
            <!-- </ul> -->
        </div>

        <!-- <b-modal id="bv-modal-example" hide-footer>
            <template v-slot:modal-title class="text-center">
                To-do Editor
            </template>
            <div class="d-block text-center">
                <div class="TodoLabel mt-4">
                    <h3 class="d-inline">Edit a To-do: </h3>
                    <input type="text" v-model="nameEdit" class="addBox"/> 
                </div>
                <br />
                <h4 class="categoryLabel">Select a Category: </h4>
                <br />
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="radio" id="Books To Read" v-model="categoryEdit" value="Books To Read">
                            <label for="Books To Read">Books To Read</label>
                        </div>
                        <div class="col-md-6">
                            <input type="radio" id="Self Improvement" v-model="categoryEdit" value="Self Improvement">
                            <label for="Self Improvement">Self Improvement</label>
                        </div>
                        <div class="col-md-6">
                            <input type="radio" id="Grocery" v-model="categoryEdit" value="Grocery">
                            <label for="Grocery">Grocery</label>
                        </div>
                        <div class="col-md-6">
                            <input type="radio" id="Home Repair" v-model="categoryEdit" value="Home Repair">
                            <label for="Home Repair">Home Repair</label>
                        </div>
                    </div>
                </div>
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
            <b-button class="mt-3" variant="primary" block @click="editTodo(item.name), $bvModal.hide('bv-modal-example')">Save Changes</b-button>
        </b-modal> -->

    </div>
</template>

<script>
import TopHeader from "../components/Top-Header"
import {db} from '../main';


export default {
  name: 'Tasks',

  data () {
    return {
        'category': "",
        'completed': false,
        'name': "",
        'uid': "",
        'nameEdit':"",
        'categoryEdit':'',
        tasksCollection: [],
        userID: []
        }
    },

    components:{
        'top-header': TopHeader
    },

    mounted() {
        this.grabTodos()
        console.log("user id: " + this.$firebase.auth().currentUser.uid);
     },
    methods: {
        grabTodos(){
        const database = this.$firebase.firestore();
        database
        .collection('tasks')
        .get()
        .then(snap => {
            const tasksCollection = [];
            snap.forEach(doc => {
            tasksCollection.push(doc.data());
            });
            this.tasksCollection = tasksCollection;
        });
        },
        addTodo() {
            db.collection("tasks").add({
                'category': this.category,
                'completed': false,
                'name': this.name,
                'uid': this.$firebase.auth().currentUser.uid
            })
            .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.name=''
            this.grabTodos();
        },
        removeTodo(doc){
            console.log(doc)
            db.collection('tasks')
            .where('name', '==', doc).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete().then(this.grabTodos)
                })
            })
            // db.collection("tasks").doc(doc).delete().then(function() {
            //     console.log("Document successfully deleted!");
            // }).catch(function(error) {
            //     console.error("Error removing document: ", error);
            // });
        },
        editTodo(doc){
            console.log(doc)
            db.collection('tasks')
            .where('name', '==', doc).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        'name': this.nameEdit,
                        'category': this.categoryEdit,
                    }).then(this.grabTodos)
                })
            })
        },
        checkCompleted(doc){
            console.log(doc)
            db.collection('tasks')
            .where('name', '==', doc).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        completed: true
                    }).then(this.grabTodos)
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.todoAppContainer{
    width: 100%;
    background-image: url("../../public/images/nice_snow.png");
    background-repeat: repeat;
    min-height: 100vh;
}

label{
    font-size: 16px;
    position: relative;
    left: 8px;
    top: 2px;
    font-weight: bold;
}

.categoryLabel{
    position: relative;
    top: 20px;
}

.addTodoLabel{
    position: relative;
    top: 25px;
}

.addButton{
    width: 40%;
    height: 40px;
    font-size: 20px;
}

.addBox{
    height: 40px;
    width: 40%;
    border: black solid 1px;
}
.completed{
    text-decoration: line-through;
    color: gray;
    border: gray;
}
.completed:hover{
    background-color: transparent;
    cursor:default;
}

.texts{
    position: relative;
    top: 8px;
}

i{
    color: #007bff;
}

i:hover{
    cursor: pointer;
}

.taskContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid lightgray;
    padding-top: 14px;
    margin-bottom: 14px;
}
</style>