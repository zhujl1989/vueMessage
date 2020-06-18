<template>
  <div class="Home">
    <div @click="getMess" class="btn">点击消息弹窗</div>
    <div @click="upImg" class="btn">点击图片上传</div>
    <!-- <cropper-modal :title="title" ref="cropperModal" @ok="handleCropperSuccess"></cropper-modal> -->
		<cropper-modal :title="title" ref="cropperModal" @ok="handleCropperSuccess"></cropper-modal>
    <div class="contair">
              <div class="imgList" v-for="(item,index) in base64List" >
                   <img :src="item"  />
                   
              </div>
              <!-- <div class="addImg">
                  <svg-icon icon-class="add" />
                  <p>图片上传</p>
                  <input type="file"  @change="onUploadHeadImage($event)"   class="upInput">
              </div> -->
          </div>
  </div>
</template>

<script>
import cropperModal from "@/components/cropperModal2";
export default {
  name: "Home",
  data() {
    return {
      coverRecord: {
        autoCropWidth: 400, //默认生成截图框宽度
        autoCropHeight: 300,
        fixedNumber: [400, 300]
      },
      title: "图片编辑",
      fileList: [],
      base64List:[]
    };
  },
  components: {
    cropperModal
  },
  methods: {
    getMess() {
      let notice = this.$message({
        message: "成功消息提示"
      });
      notice.open();
    },
    upImg() {
      let url = "";
      this.$refs.cropperModal.show(this.coverRecord, url);
      this.title = "图片裁剪";
    },
    handleCropperSuccess(imgUrl,base64List) {
      console.log(base64List)
      this.fileList.concat(imgUrl);
      this.base64List = this.base64List.concat(base64List)
      console.log(this.base64List)
    }
  }
};
</script>
<style>
.btn{
  padding: 0 20px;
  color: #fff;
  background: #395ef3;
  line-height: 40px;
  font-size: 14;
  width: 140px;
  margin: 0 auto;
  margin-bottom: 10px;
  
}
 .contair{
      padding:20px 50px;
      display: flex;
      flex-wrap: wrap;
  }
  .addImg{
     padding-top:20px;
     width:100px;
     height:80px;
     border:1px dashed #dbdbdb;
     text-align:center;
     position:relative
  }
  .imgList{
    width: 100px;
    height: 100px;
    position: relative;
    margin-right: 10px;
  }
  .imgList>img{
    width: 100px;
    height: 100px;
  }
   .upInput{
      position:absolute;
      width:100px;
      height:100px;
      left:0;
      top:0;
      display:block;
      opacity:0
      
  }
</style>
