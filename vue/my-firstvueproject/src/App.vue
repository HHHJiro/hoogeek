<template>
  <div id="app">
    <!-- <hello>123</hello> -->
    <h1 >{{msg}}</h1>
    <input v-model="newItem" @keyup.enter="addNew">
    <ul>
    	<li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toogleFinish(item)">
    		{{item.label}}
    	</li>
    </ul>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Store from './store'
export default {
  // name: 'app',
  components: {
  },
    data () {
    return {
      msg: 'This is a Todo list',
      items: Store.fetch(),
      newItem: '',
      childWords:''
    }
  },
  watch:{
  	items:{
  		handler:function(items){
  			Store.save(items);
  		},
  		deep:true
  	}
  },
  methods: {
  	toogleFinish:function(item){
  		item.isFinished=!item.isFinished;
  	},
  	addNew:function(){
  		this.items.unshift({
  			label: this.newItem,
      		isFinished: false
  		})
  		this.newItem='';
  	},
  	}
  }
</script>

<style>
#app {
  width: 60%;
  min-width: 300px;
  margin:0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  color: #4fc08d;
  font-weight: normal;
}

ul {
  width: 40%;
  min-width: 200px;
  margin: 0 auto;
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  text-align: left;
}

li {
  font-size: 14px;
  cursor: pointer;
  display: block;
  padding: 8px 10px 8px 26px;
  margin-bottom: 3px;
  background: url(images/square.png) no-repeat 4px 8px #99e6c3;
}
li:hover{
  color: #09e;
}
a {
  color: #42b983;
}
.finished{
	text-decoration: line-through;

  background: url(images/square-fill.png) no-repeat 4px 8px  #eee;
}
input{
  text-indent: 14px;
	width: 40%;
	min-width: 200px;
	height: 26px;
	font-size: 18px;

}
</style>
