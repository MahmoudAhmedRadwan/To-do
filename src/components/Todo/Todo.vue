<template>
    <div class="todo">
        <div class="createTodo">
            <form action="#">
                <div class="form-group">
                    <label for="addModel">Title</label>
                    <input type="text" class="form-control" id="addModel" v-model="title">
                </div>
                <div class="form-group">
                    <label for="addYear">Description</label>
                    <input type="text" class="form-control" id="addYear" v-model="des">
                </div>
                <div class="form-group">
                    <b-button type="submit" class="addBtn btn" v-on:click.prevent="addTodo" v-if="actionType == 'add'">Add Todo</b-button>
                    <b-button type="submit" class="addBtn btn" v-on:click.prevent="updateTodo" v-if="actionType == 'update'">Update Todo</b-button>
                </div>
            </form>
        </div>

        <div class="table_container">
            <div class="todo_table mt-5">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Finished At</th>
                            <th>Archive At</th>
                            <th>Checked</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(todo, index) in todos" :key="index">
                            <td :class="todo.checked == true ? 'checkedActive' : ''">{{index + 1}}</td>
                            <td :class="todo.checked == true ? 'checkedActive' : ''">{{todo.title}}</td>
                            <td :class="todo.checked == true ? 'checkedActive' : ''">{{todo.description}}</td>
                            <td :class="todo.checked == true ? 'checkedActive' : ''">{{todo.createdAt}}</td>
                            <td>{{todo.finishedAt}}</td>
                            <td>{{todo.archiveAt}}</td>
                            <td><input type="checkbox" v-model="todo.checked" @click="() => check(index)"> </td>
                            <td class="actions">
                                <b-button variant="danger" @click="() => deleteTodo(index)"><b-icon icon="trash" aria-hidden="true" ></b-icon></b-button>
                                <b-button variant="success" @click="() => showUpdateDataTodo(index)"><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button>
                                <b-button variant="outline-primary" @click="() => AddToArchive(index)"><b-icon icon="smartwatch" aria-hidden="true"></b-icon></b-button>
                            </td>
                        </tr>	
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Todo',
    data() {
        return{
            darkMode: false,
            todos:[],

            title: '',
            des: '',
            date: '',
            actionType: 'add',
            todoIndex: ''
        }		
	},
    created() {
        navigator.geolocation.watchPosition((position) => {
            this.getWeather(position.coords.latitude, position.coords.longitude)
        });
    },
    mounted(){
        // get data from localStorage
        this.todos = JSON.parse(localStorage.getItem('todosList'));
    },
	methods: {
        // add new todo
		addTodo(){
            if(this.title !== '' && this.des !== ''){
                this.todos.push({
                    title: this.title,
                    description: this.des,
                    checked: false,
                    createdAt: new Date().toJSON().slice(11,16),
                    finishedAt: '',
                    archiveAt: '',
                    archive: false
                });
                this.setTodoLocalStorage();
                this.title = '',
                this.des = '';
            }
		},

        check(index){
            this.todos[index].checked = !this.todos[index].checked
            this.todos[index].finishedAt = new Date().toJSON().slice(11,16)
            this.setTodoLocalStorage();
            
        },

        // function to save data in localStorage
        setTodoLocalStorage(){
            localStorage.setItem('todosList', JSON.stringify(this.todos))
        },

        // add to archive
        AddToArchive(index){
            this.todos[index].archive = true;
            this.todos[index].archiveAt = new Date().toJSON().slice(11,16);
            this.setTodoLocalStorage();
        },

        // delete one todo
        deleteTodo(index){
            this.todos.splice(index, 1)
            this.setTodoLocalStorage();
        },

        // show data in inputs to update
        showUpdateDataTodo(index){
            this.actionType = "update";
            this.todoIndex = index;
            this.title = this.todos[index].title
            this.des = this.todos[index].description
            
        },

        // todo update
        updateTodo(){
            this.todos.splice(this.todoIndex, 1, {
                title: this.title,
                description: this.des,
                checked: false,
                createdAt: new Date().toJSON().slice(11,16),
                finishedAt: '',
                archiveAt: '',
            });
            this.setTodoLocalStorage();
        },

        // weather api
        getWeather(lat, lon){
            axios.create()
            .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=d5f517bf2236e32b2182b34c8dc22b6c`)
            .then(res => {
                console.log(res)
            });
        },
	}
}
</script>
<style lang="scss" scoped>

</style>