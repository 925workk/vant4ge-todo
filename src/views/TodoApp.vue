<template>
    <div>
        <div>
            <label>Add To-do: </label>
            <input type="text" v-model="name" /> 
            <br />
            <label>Select a Category: </label>
            <br />
            <input type="radio" id="Books To Read" v-model="category" value="Books To Read">
            <label for="Books To Read">Books To Read</label>
            <br />
            <input type="radio" id="Self Improvement" v-model="category" value="Self Improvement">
            <label for="Self Improvement">Self Improvement</label>
            <br />
            <input type="radio" id="Grocery" v-model="category" value="Grocery">
            <label for="Grocery">Grocery</label>
            <br />
            <input type="radio" id="Home Repair" v-model="category" value="Home Repair">
            <label for="Home Repair">Home Repair</label>
            <br />
            <button @click="addTodo()">Add Task</button>
        </div>
        <div>
            <ul>
                <li v-for="item in tasksCollection" :key="item.key">
                    <p>Todo: {{item.name}}</p>
                    <small>Category: {{item.category}}</small><br/>
                    <button @click="removeTodo(item.name)">Remove</button>
                    <button @click="editTodo()">Edit</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {db} from '../main';

export default {
  name: 'Tasks',

  data () {
    return {
        'category': "",
        'completed': false,
        'name': "",
        'uid': "",
        tasksCollection: []
    }
  },

    mounted() {
        this.grabTodos()
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
                'uid': "9mr9bcUSGmdBCnt3AaQmtHlcFWb2"
            })
            .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
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
        editTodo(){
            
        },
    }
}
</script>

<style lang="scss" scoped>

</style>