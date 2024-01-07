<template>
  <el-dialog
    :title="showTitle"
    :visible="dialogVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="addDept" :model="deptForm" :rules="deptRule" label-width="120px">
      <el-form-item label="部門名稱" prop="name">
        <el-input v-model="deptForm.name" placeholder="2-10個字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="部門代碼" prop="code">
        <el-input v-model="deptForm.code" placeholder="2-10個字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="部門負責人" prop="managerId">
        <el-select v-model="deptForm.managerId" placeholder="請選擇負責人" style="width: 80%" size="mini">
          <el-option v-for="item in managerList" :key="item.id" :value="item.id" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部門介紹" prop="introduce">
        <el-input v-model="deptForm.introduce" type="textarea" :rows="4" placeholder="2-100個字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="confirmBtn">確定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartmentList, getManagerList, addDepartment, getDepartmentDetail, editDepartment } from '@/api/department'
export default {
  name: 'AppDept',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      deptForm: { // 表單資料, 屬性根據後端接口所要求設置
        code: '', // 部門代碼
        introduce: '', // 部門介紹
        managerId: '', // 部門負責人
        name: '', // 部門名稱
        pid: '' // 部門所屬父級id, 無須校驗
      },
      deptRule: { // 表單驗證規則
        code: [ // 部門代碼
          { required: true, message: '請輸入部門代碼', trigger: 'blur' },
          { min: 1, max: 10, message: '部門代碼長度為2-10個字符', trigger: 'blur' },
          // 判斷是否為編輯狀態, 若是, 則排除自身再校驗(避免校驗顯示代碼重複錯誤)
          // 自定義規則判斷代碼是否已存在
          { validator: async(rule, value, callback) => {
            let result = await getDepartmentList()
            if (this.deptForm.id) {
              result = result.filter(ele => ele.id !== this.deptForm.id)
            }
            if (result.some(ele => ele.code === value)) {
              callback(new Error('此代碼已存在'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        introduce: [ // 部門介紹
          { required: true, message: '請輸入部門介紹', trigger: 'blur' },
          { min: 1, max: 100, message: '部門介紹長度為2-100個字符', trigger: 'blur' }
        ],
        managerId: [{ required: true, message: '部門負責人不可為空', trigger: 'blur' }], // 部門負責人
        name: [ // 部門名稱
          { required: true, message: '請輸入部門名稱', trigger: 'blur' },
          { min: 1, max: 10, message: '部門名稱長度為2-10個字符', trigger: 'blur' },
          // 判斷是否為編輯狀態, 若是, 則排除自身再校驗(避免校驗顯示名稱重複錯誤)
          // 自定義規則判斷部門名稱是否已存在
          { validator: async(rule, value, callback) => {
            let result = await getDepartmentList()
            if (this.deptForm.id) {
              result = result.filter(ele => ele.id !== this.deptForm.id)
            }
            if (result.some(ele => ele.name === value)) {
              callback(new Error('此部門已存在'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ]
      },
      managerList: [] // 負責人列表
    }
  },
  computed: {
    showTitle() {
      return this.deptForm.id ? '編輯部門' : '新增部門'
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // resetFields只能重置模板中存在的數據, 因此將deptForm賦值回初始的對象
      this.deptForm = { // 表單資料, 屬性根據後端接口所要求設置
        code: '', // 部門代碼
        introduce: '', // 部門介紹
        managerId: '', // 部門負責人
        name: '', // 部門名稱
        pid: '' // 部門所屬父級id, 無須校驗
      }
      this.$refs.addDept.resetFields() // 重置表單
      this.$emit('update:dialogVisible', false) // 父組件中使用.sync修飾符, 可以監聽子組件傳遞的 update:屬姓名 的事件
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    confirmBtn() {
      this.$refs.addDept.validate(async isOk => {
        let msg = '添加'
        if (isOk) {
          // 判斷是否為編輯狀態
          if (this.deptForm.id) {
            msg = '更新'
            await editDepartment(this.deptForm)
          } else {
            await addDepartment({ ...this.deptForm, pid: this.currentNodeId })
          }
          this.$emit('updateDepartment') // 通知父組件更新部門列表
          this.$message.success(`${msg}部門成功`)
          this.close()
        }
      })
    },
    async getDepartmentDetail() {
      this.deptForm = await getDepartmentDetail(this.currentNodeId)
    }
  }
}
</script>

<style>

</style>
