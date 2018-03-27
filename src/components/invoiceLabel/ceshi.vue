<template>
    <div>
      <ul>
        <li v-for="todo in todos">
         <!-- <input type="text" value="{{todo.name}}">-->
          {{todo.name}}
        </li>
      </ul>
    </div>
</template>

<script>
  export default{
    data(){
      return{
        todos: [
          {
            id: 1,
            name: '物业费',
            isShowIcon: false,
            completed:true
          },
          {
            id: 2,
            name: '北京出差',
            isShowIcon: false,
            completed:true
          },
          {
            id: 3,
            name: '钉钉报销',
            isShowIcon: false,
            completed:true
          },
          {
            id: 4,
            name: '成都出差',
            isShowIcon: false,
            completed:true
          },
          {
            id: 5,
            name: '自来水费',
            isShowIcon: false,
            completed:true
          },
          {
            id: 6,
            name: '电费',
            isShowIcon: false,
            completed:true
          },
          {
            id: 7,
            name: '用友报销',
            isShowIcon: false,
            completed:true
          },
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
