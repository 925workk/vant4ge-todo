<template>
    <div class="todoAppContainer">
        <top-header></top-header>
        <div>
            <div class="container">
                <div class="row">
                    <div class="addTodoLabel mt-5 col-md-12">
                        <h3 class="d-inline">Add a To-do: </h3>
                        <input type="text" v-model="name" class="addBox"/> 
                    </div>
                    <div class="col-md-12 mt-3 mb-5">
                        <h4 class="categoryLabel d-inline">Select a Category: </h4>
                            <select v-model="category" class="mt-2">
                                <option disabled value="">Select option</option>
                                <option value="Books To Read">Books To Read</option>
                                <option value="Self Improvement">Self Improvement</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Home Repair">Home Repair</option>
                            </select>
                        <button @click="addTodo()" class="btn btn-primary addButton mt-2 ml-2">Add Task</button>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="mb-3 mt-5">Task List</h2>
        <div class="container">
            <!-- <ul> -->
                <h5 v-for="item in tasksCollection" :key="item.key" class="taskContainer">
                    <div class="container">
                        <div class="row text-center">
                            <div class="col-md-3">
                                <button @click="checkCompleted(item.name)" class="btn btn-outline-primary" :class="{completed:item.completed}">Mark Completed</button>
                            </div>
                            <div class="col-md-3 mb-2">
                                <p class="d-inline texts" :class="{completed:item.completed}"><strong> {{item.name}}</strong></p>
                            </div>
                            <div class="col-md-3 mb-2">
                                <small class="d-inline texts" :class="{completed:item.completed}">Category: {{item.category}}</small>
                                <!-- <p class="d-inline texts"><strong>Completed: </strong> {{item.completed}}</p> -->
                            </div>
                            <div class="col-md-3">
                                <i @click="$bvModal.show(item.name)" class="fas fa-edit mr-4" :class="{completed:item.completed}"></i>
                                <i @click="removeTodo(item.name)" class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>
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
    width: 80px;
    height: 32px;
    position: relative;
    top: 15px;
    font-size: 12px;
}

.btn:focus,.btn:active {
   outline: none !important;
   box-shadow: none !important;
   background-color: transparent !important;
}

.addBox{
    height: 36px;
    width: 45%;
    border: black solid 1px;
}
.completed{
    text-decoration: line-through;
    color: gray;
    border: gray;
}
.completed:hover{
    background-color: transparent;
    color: gray !important;
    cursor:default;
    text-decoration: line-through;
}

.texts{
    position: relative;
    top: 8px;
}

i{
    color: #007bff;
    position: relative;
    top:9px;
}

select{
    position: relative;
    top:20px;
    height: 32px;
}

i:hover{
    cursor: pointer;
    color: #007bff;
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