<template>
  <div class="message" v-if="showMess">     
      <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'message',
  props:{   
    message:{
      type:String,
      default:""
    },
    duration:{
      type:Number,
      default:3000
    }
  },
  data(){
    return{
      showMess:false
    }
  },
  methods:{
     open(){
       this.showMess = true;
       setTimeout(()=>{
         this.close()
       },this.duration)
     },
     close(){
       this.showMess = false
     }
  }
}
</script>

<style scoped>
  .message{
    /* width: 400px; */
    padding: 0 80px;
    line-height: 40px;
    text-align: left;
    margin: 10px auto;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    position: fixed;
    top: 180px;
    left: 46%;
    z-index: 99999;
    color: #fff;
  }
</style>
