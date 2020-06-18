<template>
  <div>
    <input type="file" ref="imgFileRef" @change="onUploadHeadImage()" style="display: none" v-if="isOnChange">
    <div v-if="visible"    @cancel="cancelHandel" class="cropper-box" >
      <div class="flexCC">
          <p class="title">{{title}}</p>
          <p class="close" @click="cancelHandel">
              <svg-icon icon-class="close" />
          </p>
      </div>
      <div class="cropper-wrapper">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :original="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixed="options.fixed"
          :fixedNumber="options.fixedNumber"
          :fixedBox="options.fixedBox"
          :canMove="options.canMove"
          :canScale="options.canScale"
          :centerBox="options.centerBox"
          :canMoveBox="options.canMoveBox"
          :full="options.full"
          :high="true"
          @realTime="realTime"
        >
        </vue-cropper>
      </div>
      <!-- <div class="result-wrapper">
        <div class="tar-img" :style="previews.div">
          <img :src="previews.url" :style="previews.img"/>
        </div>
      </div> -->
      <div class="footer">
        <div  @click="okHandel" class="sumbit">保存</div>
        <div  @click="cancelHandel" class="cancle">取消</div>
        
      </div>
    </div>
    <div class="mask" v-if="visible"></div>
  </div>
</template>
<script>
  import { VueCropper } from 'vue-cropper'
  export default {
    name:'cropperModal',
    components: {
      VueCropper
    },
    props:{
      title:{
        type: String,
        default: '图片上传'
      },
    },
    data() {
      return {
        visible: false,
        img: null,
        confirmLoading: false,
        type:1,
        options: {
          img: '/avatar2.jpg',    //裁剪图片的地址
          autoCrop: true,         //是否默认生成截图框
          autoCropWidth: 780,     //默认生成截图框宽度
          autoCropHeight: 400,    //默认生成截图框高度
          canMove:true,          // 上传图片是否可以移动
          canScale:true,         // 图片是否允许滚轮缩放
          fixed:true,             // 是否开启截图框宽高固定比例
          fixedNumber:[780,400],  // 截图框的宽高比例
          fixedBox:true,          // 固定截图框大小 不允许改变
          canMoveBox:false,          // 截图框能否拖动
          full:true
        },
        previews: {},
        isOnChange:false,
        upUrl:""

      };
    },
    methods: {
      // record中可以传自定义options配置
      show(record,url) {
        this.upUrl = url;
        this.isOnChange = true;
        let { options } = this; 
        this.options = Object.assign({},options,record);
        this.$forceUpdate()
       // this.type = type;//1封面;2是正文内容
        this.$nextTick(()=>{
           this.$refs.imgFileRef.dispatchEvent(new MouseEvent('click'))        
        })       
      },
      onUploadHeadImage:function(){       
        let reader = new FileReader();
        let file = this.$refs.imgFileRef.files[0];      
        this.options.fileName = file.name
        let that = this;
        reader.onloadend = function () {
          that.options.img = reader.result
          console.log(that.options.img)
          that.visible = true
        };
        reader.readAsDataURL(file);
        this.visible = true;       
      },
      cancelHandel() {
        this.visible = false;
       this.isOnChange = false
      },
      okHandel:async function() {
        // this.confirmLoading = true     
        this.$refs.cropper.getCropBlob(async(data) => {          
          let file = new File([data],this.options.fileName,
            { type: data.type }
          );  
          //base64截取部分
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        let imgBase64;
        fileReader.onload = function(){
            imgBase64 = this.result
        } 
          //截取部分取消
          //上传服务器
          let notice = this.$message({      
                    message:"图片上传中。。。"
          })
          notice.open()
          let formData = new FormData();
          formData.append("file",file)
          let res = await this.$uploadFile(this.imgUrl,formData)
          if (res.code == 0) {
              let notice1 = this.$message({      
                    message:"成功消息提示"
              })
              notice1.open()              
              this.$emit('ok',res.message,imgBase64)
              this.cancelHandel()
          }else{
              let notice = this.$message({      
                    message:res.message
              })
              notice.open()    
          }
        
        })
      },
      //下载输入框里的图片
      downloadNewImg(){
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob((data) => { 
          Utils.blob2Base64(data).then(res=>{
            Utils.downLoadImage(res,'测试的哟');
          })
        })
      },
      //移动框的事件
      realTime(data) {
        this.previews = data
      }
    }
  };
</script>
 
<style  scoped>
.flexCC{
    display: flex;
    justify-content: space-between;
}
 .cropper-box{
    width: 900px;
    height: 600px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -450px;
    top: 50%;
    margin-top: -300px;
    background: #fff;
    /* box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.4); */
    padding-top: 20px;
    border-radius: 10px;
  }
  .title{
     font-size: 16px;
     margin-left: 50px;
     font-weight: bold;
  }
  .cropper-wrapper{
    width: 800px;
    height: 400px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
  }
  .result-wrapper{
    margin-top: 20px;
    width: 40%;
    display: flex;
    padding: 20px;
    justify-content: center;
    
  }
  .tar-img{
      overflow: hidden;
      width: 100%;
      height: auto;
    }
  .footer{
      text-align: right;
      display: flex;
      flex-direction: row-reverse ;
      margin-right: 50px;
      margin-top: 20px;
  }
  .footer .cancle{
      line-height: 40px;
      width: 120px;
      text-align: center;
      border: 1px solid #bbb;
      border-radius: 3px;
      color: #999;
      margin-right: 20px;
      cursor: pointer;
  }
  .footer .sumbit{
      line-height: 40px;
      width: 120px;
      text-align: center;
      border-radius: 3px;
      color: #fff;
      background: rgb(106, 159, 238);
      
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9998;
  }
  .close{
    color: #999;
    margin-right: 50px;
    cursor: pointer;
  }
</style>