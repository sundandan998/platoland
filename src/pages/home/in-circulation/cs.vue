<template>
	<div id="app">
  <ul>
      <li v-for = "todo in todos" v-bind:style="stylelist">
          <span>{{todo.text}}</span>
      </li>
  </ul>
  <input type="text" v-on:keyup.enter="addTodo" v-model="message"/>
  <button v-on:click = "add" v-bind:class="buttonStyle">增加书籍</button>
  <button v-on:click="remove" v-bind:class="buttonStyle">删除</button>
</div>
</template>
<script>
	export default{
  data(){
  	return{
    todos:[{text:'红楼梦'},{text:'水浒传'}],
    message:'',
    stylelist:{
      height:'30px',
      lineHeight:'30px',
      border:'1px solid red',
      textAlign:'center',
      background:'pink',
      color:'red'
    },
    buttonStyle:{
      'buttonstylelist':true
    }
   }
  },
  methods:{
    remove:function(index){
      this.todos.splice(index,1)
    },
    addTodo:function(){
      var text = this.message.trim();
      if(text){
        this.todos.push({text:text});
        this.message=" ";
      }
    },
    add:function(){
      var text = this.message.trim();
      if(text){
        this.todos.push({text:text});
        this.message=" ";
      }
    }
  }
 }
</script>
<style>
	    ul{
      list-style: none;
      width:100px;
      height:auto;
    }
    
    .buttonstylelist{
      width:80px;
      height:30px;
      border:1px solid blue;
      color:#fff;
      background: blue;
    }
</style>