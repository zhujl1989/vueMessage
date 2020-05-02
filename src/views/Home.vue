<template>
  <div class="Home">  
      <div @click="getMess">消息弹窗</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{}
  },
  methods:{
    getMess(){
      let notice = this.$message({      
        message:"成功消息提示"
      })
      notice.open()
    }
  }
}
</script>
