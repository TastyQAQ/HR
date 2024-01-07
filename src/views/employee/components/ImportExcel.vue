<template>
  <el-dialog title="員工導入" :visible="importDialog" width="500px" @close="$emit('update:importDialog', false)">
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input ref="excel-upload-input" type="file" accept=".xlsx, .xls" class="excel-upload-input" @change="importEmployee">
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="downloadTemplate">下載導入模板</el-button>
          <span>將文件拖到此處或
            <el-button type="text" @click="handleUpload">點擊上傳</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="mini" @click="$emit('update:importDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import FileSaver from 'file-saver'
import { downloadTemplate, importEmployee } from '@/api/employee'
export default {
  name: 'ImportExcel',
  props: {
    importDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 下載導入模板, blob文件, 使用file-saver包轉譯下載
    async downloadTemplate() {
      const result = await downloadTemplate()
      FileSaver.saveAs(result, '員工導入模板.xlsx')
    },
    // 點擊上傳導入員工
    handleUpload() {
      this.$refs['excel-upload-input'].click() // 等同於點擊input上傳檔案
    },
    // input導入員工
    async importEmployee(event) {
      // console.log(event.target.files)
      const files = event.target.files
      if (files.length > 0) { // 說明有文件上傳
        const data = new FormData() // 創建formData實例
        data.append('file', files[0]) // 在實例中添加file屬性
        try {
          await importEmployee(data)
          this.$emit('uploadSuccess') // 通知父組件上傳成功(父組件重新渲染員工列表)
          this.$emit('update:importDialog', false) // 關閉彈層
        } catch (error) {
          // 上傳失敗
          // this.$refs['excel-upload-input'].value = ''
        } finally {
          // finally 不論成功或失敗都會執行
          this.$refs['excel-upload-input'].value = '' // 清空文件選擇器
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-excel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 360px;
    height: 180px;
    color: #697086;
    .excel-upload-input {
        display: none;
    }
    .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #bbb;
        i {
            font-size: 60px;
            display: block;
            color: #c0c4cc;
        }
    }
}
</style>
