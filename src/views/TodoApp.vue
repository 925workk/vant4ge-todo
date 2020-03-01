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
            <ul>
            <li v-for="tasks in tasks" :key="tasks.id">
                <p>{{todo.text}}</p>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>

import {db} from '../main';

export default {
  name: 'app',
  data () {
    return {
        category: this.category,
        completed: false,
        name: this.name,
        uid: ""
    }
  },
  methods: {
    addTodo() {
        db.collection("tasks").add({
            category: this.category,
            completed: false,
            name: this.name,
            uid: ""
        })
    //   todosCollection.add({
    //     category: this.category,
    //     completed: false,
    //     name: this.name,
    //     uid: ""
    //   })
    //   .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });
    //   this.name = '';
    }
  }
}
</script>

<style lang="scss" scoped>

</style>