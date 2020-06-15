<template>
  <div class="Home">
    <div @click="getMess">消息弹窗</div>
    <div @click="upImg">图片上传</div>
    <cropper-modal :title="title" ref="cropperModal" @ok="handleCropperSuccess"></cropper-modal>
   
  </div>
</template>

<script>
import cropperModal from "@/components/cropperModal";
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
      fileList: []
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
    handleCropperSuccess(imgUrl) {
      this.fileList.push(imgUrl);
    }
  }
};
</script>
