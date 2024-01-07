<template>
  <!-- action 為自動上傳的目標地址, 此項目(手動上傳)不需要 -->
  <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="updateStaffPhoto">
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
// import { updateStaffPhoto } from '@/api/employee'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      staffPhoto: ''
    }
  },
  methods: {
    // 檢查函數 判斷文件的類型還有大小 return  true(繼續上傳)/false(停止上傳)
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 5 // 5MB

      if (!isJPG) {
        this.$message.error('上傳頭像圖片只能是 JPG、PNG、GIF、BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上傳頭像圖片大小不能超過 5MB!')
      }
      return isJPG && isLt2M
    },
    updateStaffPhoto(params) {
      // const reader = new FileReader()
      // // 將blob或file轉成base64格式
      // reader.readAsDataURL(params.file)
      // // 傳換完成觸發函數(reader.result為轉換結果)
      // reader.onload = () => {
      //   // console.log(reader.result)
      //   this.$emit('input', reader.result)
      // }
      // 將file轉成blob格式(blob:http://localhost:9528/5e073b99-5861-410e-b783-e344fdaa88b9)
      const imgBlob = URL.createObjectURL(params.file)
      this.$emit('input', imgBlob)
    }
  }
}
</script>

<style>
div.el-upload{
    border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
