<template>
  <div class="container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="employeeForm" label-width="220px" :model="employeeForm" :rules="employeeRules">
          <el-form-item label="姓名" prop="username">
            <el-input v-model="employeeForm.username" class="inputW" size="mini" />
          </el-form-item>
          <el-form-item label="工號" prop="workNumber">
            <el-input v-model="employeeForm.workNumber" class="inputW" size="mini" disabled />
          </el-form-item>
          <el-form-item label="手機" prop="mobile">
            <!-- !!表示取反再取反, 轉化成Boolean值 -->
            <el-input v-model="employeeForm.mobile" class="inputW" size="mini" :disabled="!!$route.params.id" />
          </el-form-item>
          <el-form-item label="部門" prop="departmentId">
            <SelectTree v-model="employeeForm.departmentId" class="inputW" />
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <el-select v-model="employeeForm.formOfEmployment" class="inputW" size="mini" placeholder="請選擇">
              <el-option label="正式" :value="1" />
              <el-option label="非正式" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="入職時間" prop="timeOfEntry">
            <el-date-picker v-model="employeeForm.timeOfEntry" type="date" placeholder="選擇日期" class="inputW" size="mini" value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label="轉正時間" prop="correctionTime">
            <el-date-picker v-model="employeeForm.correctionTime" type="date" placeholder="選擇日期" class="inputW" size="mini" value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label="員工頭像">
            <ImageUploader v-model="employeeForm.staffPhoto" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="saveUpdate">保存更新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTree from './components/SelectTree.vue' // 部門選擇器封裝組件
import ImageUploader from './components/ImageUploader.vue' // 上傳頭像封裝組件
import { addEmployee, getEmployeeDetails, editEmployee } from '@/api/employee'
export default {
  components: {
    SelectTree,
    ImageUploader
  },
  data() {
    return {
      // 新增(修改)所需員工數據
      employeeForm: {
        mobile: '', // 手機號
        username: '', // 姓名
        timeOfEntry: '', // 入職時間
        workNumber: '', // 工號
        correctionTime: '', // 轉正時間
        departmentId: null, // 部門id
        formOfEmployment: null, // 聘用形式(1正式、2非正式)
        staffPhoto: '' // 員工頭像(可傳可不傳)
      },
      // 員工表單校驗規則
      employeeRules: {
        username: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
          { min: 1, max: 4, message: '姓名長度為1-4個字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '請輸入手機號碼', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手機號碼格式錯誤', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '請選擇部門', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '請選擇聘用形式', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '請選擇入職時間', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '請選擇轉正時間', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (this.employeeForm.timeOfEntry) {
              if (new Date(this.employeeForm.timeOfEntry) > new Date(value)) {
                callback(new Error('轉正時間不得小於入職時間'))
                return
              }
            }
            callback()
          }, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getEmployeeDetails()
    }
  },
  methods: {
    // 新增(修改)員工
    saveUpdate() {
      this.$refs.employeeForm.validate(async isOk => {
        if (isOk) {
          if (this.$route.params.id) {
            await editEmployee(this.employeeForm)
            this.$message.success('編輯員工成功')
          } else {
            await addEmployee(this.employeeForm)
            this.$message.success('新增員工成功')
          }
          this.$refs.employeeForm.resetFields()
          this.$router.push('/employee')
        }
      })
    },
    // 獲取員工詳情
    async getEmployeeDetails() {
      this.employeeForm = await getEmployeeDetails(this.$route.params.id)
    }
  }

}
</script>

<style lang="scss" scoped>
    .edit-form {
      background: #fff;
      padding: 20px;
      padding-left: 20%;
      .inputW {
        width: 380px
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed black;
    }
</style>
