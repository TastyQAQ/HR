<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" class="addPermission" @click="addPermission(0, 1)">添加權限</el-button>
      <el-table :data="permissionData" default-expand-all row-key="id">
        <el-table-column label="名稱" prop="name" />
        <el-table-column label="標示" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type===1" type="text" size="mini" @click="addPermission(row.id, 2)">添加</el-button>
            <el-button type="text" size="mini" @click="editPermission(row.id)">編輯</el-button>
            <el-button type="text" size="mini" @click="deletePermission(row.id)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增(編輯)權限彈層 -->
    <el-dialog :title="`${showText}權限點`" :visible.sync="dialogVisible" width="500px" @close="cancelForm">
      <el-form ref="permissionForm" label-width="120px" :model="permissionForm" :rules="permissionRules">
        <el-form-item label="權限名稱" prop="name">
          <el-input v-model="permissionForm.name" size="mini" style="width:90%" />
        </el-form-item>
        <el-form-item label="權限標示" prop="code">
          <el-input v-model="permissionForm.code" size="mini" style="width:90%" />
        </el-form-item>
        <el-form-item label="權限描述" prop="description">
          <el-input v-model="permissionForm.description" size="mini" type="textarea" style="width:90%" />
        </el-form-item>
        <el-form-item label="開啟">
          <el-switch v-model="permissionForm.enVisible" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="10">
          <el-button size="small" type="primary" @click="confirmForm">確定</el-button>
          <el-button size="small" @click="cancelForm">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermission, addPermission, editPermission, getPermissionDetails, deletePermission } from '@/api/permission'
import { departmentRender } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      permissionData: [], // 權限列表資料
      dialogVisible: false, // 彈層控件
      permissionForm: { // 權限表單資料
        name: '', // 權限名稱
        code: '', // 權限標示
        description: '', // 權限描述
        enVisible: '0', // 權限開啟狀態(1開啟、0關閉)無須校驗, 默認關閉
        type: null, // 權限類型(1一級權限、2二級權限)
        pid: null // 權限父級id
      },
      permissionRules: { // 權限表單校驗規則
        name: [
          { required: true, message: '請輸入權限名稱', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '請輸入權限標示', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '請輸入權限描述', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 彈層標題顯示
    showText() {
      return this.permissionForm.id ? '編輯' : '新增'
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    // 獲取權限點列表
    async getPermission() {
      this.permissionData = departmentRender(await getPermission(), 0)
    },
    // 新增權限
    addPermission(pid, type) {
      this.permissionForm.pid = pid
      this.permissionForm.type = type
      this.dialogVisible = true
    },
    // 表單送出
    confirmForm() {
      this.$refs.permissionForm.validate(async isOK => {
        if (isOK) {
          if (this.permissionForm.id) {
            await editPermission(this.permissionForm)
            this.$message.success('編輯權限成功')
          } else {
            await addPermission(this.permissionForm)
            this.$message.success('新增權限成功')
          }
          this.getPermission()
          this.dialogVisible = false
        }
      })
    },
    // 關閉彈層(x號或取消)
    cancelForm() {
      this.$refs.permissionForm.resetFields()
      this.permissionForm = { // 權限表單資料
        name: '', // 權限名稱
        code: '', // 權限標示
        description: '', // 權限描述
        enVisible: '0', // 權限開啟狀態(1開啟、0關閉)無須校驗, 默認關閉
        type: null, // 權限類型(1一級權限、2二級權限)
        pid: null // 權限父級id
      }
      this.dialogVisible = false
    },
    // 編輯權限獲取權限詳情
    async editPermission(id) {
      this.permissionForm = await getPermissionDetails(id)
      this.dialogVisible = true
    },
    // 刪除權限
    async deletePermission(id) {
      try {
        await this.$confirm('確定要刪除該數據嗎?', { confirmButtonText: '確定', cancelButtonText: '取消' })
        await deletePermission(id)
        this.getPermission()
        this.$message.success('刪除成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addPermission {
  margin: 10px;
}
</style>
