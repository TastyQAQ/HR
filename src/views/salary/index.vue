<template>
  <div class="container">
    <div class="app-container">
      <div class="top">
        <el-card>
          <el-button type="danger" size="mini" @click="$router.push('/salary/setting')">設置</el-button>
          <el-button type="primary" size="mini" @click="$router.push(`/salary/report/${dataMonth}`)">{{ dataMonth }}報表</el-button>
        </el-card>
      </div>
      <div class="middle">
        <el-card>
          <el-form :model="formInfo" label-width="120px">
            <el-form-item label="聘用形式:">
              <el-checkbox-group v-model="formInfo.formOfEmployment" @change="checkSalaryList">
                <el-checkbox :label="1">正式</el-checkbox>
                <el-checkbox :label="2">非正式</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="部門:">
              <el-checkbox-group v-model="formInfo.departmentId" @change="checkSalaryList">
                <el-checkbox v-for="item in departmentList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div class="bottom">
        <el-card>
          <el-table :data="salaryListRender" :header-cell-style="{background: '#f5f6f8'}">
            <el-table-column label="序號" width="48px">
              <template slot-scope="scope">{{ scope.$index + ((page - 1) * 10) + 1 }}</template>
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="150px" />
            <el-table-column prop="mobile" label="手機" width="180px" />
            <el-table-column prop="workNumber" label="工號" width="180px" />
            <el-table-column label="聘用形式" width="100px">
              <template slot-scope="scope">{{ scope.row.formOfEmployment = 1 ? '正式' : '非正式' }}</template>
            </el-table-column>
            <el-table-column prop="departmentName" label="部門" width="180px" />
            <el-table-column prop="timeOfEntry" label="入職時間" width="200px" />
            <el-table-column prop="baseSalaryByMonth" label="工資基數" width="80px" />
            <el-table-column label="津貼方案" width="120px">111.00</el-table-column>
            <el-table-column label="操作" width="260px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="changeSalary(scope.row.userId)">操作</el-button>
                <el-button size="mini" @click="$router.push(`/salary/detail/${scope.row.userId}/202412`)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pageSelect">
            <el-pagination layout="prev, pager, next" :total="copySalaryList.length" :current-page="page" @current-change="changePage" />
          </div>
        </el-card>
      </div>
      <el-dialog :title="salaryInfo.currentBasicSalary === 0 ? '定薪' : '調薪'" :visible.sync="dialogVisible" width="700px" @close="close(salaryInfo.currentBasicSalary)">
        <div v-if="salaryInfo.currentBasicSalary !== 0">
          <img class="logo" src="https://heimahr.itheima.net/static/img/img.0615818f.jpeg">
          <div class="dialog-top">
            <p>
              <span />
            </p>
            <p>部門:</p>
            <p>入職時間:</p>
          </div>
          <el-divider />
          <el-form ref="saveSalaryInfo" :model="saveSalaryInfo" :rules="changeSalaryRules">
            <el-form-item label="調整基本工資" label-width="110px" required>
              <el-input :value="salaryInfo.currentBasicSalary" disabled style="width: 220px;" />
              <span class="arrow">-></span>
              <el-form-item prop="currentBasicSalary" style="display: inline-block;">
                <el-input v-model="saveSalaryInfo.currentBasicSalary" placeholder="請輸入調整後基本工資" style="width: 220px;" />
              </el-form-item>
            </el-form-item>
            <el-form-item label="調整崗位工資" required label-width="110px">
              <el-input :value="salaryInfo.currentPostWage" disabled style="width: 220px;" />
              <span class="arrow">-></span>
              <el-form-item prop="currentPostWage" style="display: inline-block;">
                <el-input v-model="saveSalaryInfo.currentPostWage" placeholder="請輸入調整後崗位工資" style="width: 220px;" />
              </el-form-item>
            </el-form-item>
            <el-form-item label="工資合計" label-width="110px">
              <el-input :value="Number(salaryInfo.currentPostWage) + Number(salaryInfo.currentBasicSalary)" disabled style="width: 220px;" />
              <span class="arrow">-></span>
              <el-input value="0" style="width: 220px;" disabled />
            </el-form-item>
            <el-form-item label="調整幅度" label-width="110px">
              <el-input :value="-(Number(salaryInfo.currentPostWage) + Number(salaryInfo.currentBasicSalary))" disabled style="width: 220px;" />
            </el-form-item>
            <div class="buttons">
              <el-form-item label-width="110px">
                <el-button type="primary" @click="saveChangeSalary">保存</el-button>
                <el-button @click="close(1)">關閉</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div v-else>
          <el-form ref="saveInitSalary" :model="saveInitSalary" :rules="initSalaryRules" label-width="120px">
            <el-form-item label="當前基本工資" prop="currentBasicSalary">
              <el-input v-model="saveInitSalary.currentBasicSalary" style="width: 60%;" placeholder="當前基本工資" />
            </el-form-item>
            <el-form-item label="當前崗位工資" prop="currentPostWage">
              <el-input v-model="saveInitSalary.currentPostWage" style="width: 60%;" placeholder="當前崗位工資" />
            </el-form-item>
            <el-form-item label="當前工資合計">
              <el-input :value="Number(saveInitSalary.currentBasicSalary) + Number(saveInitSalary.currentPostWage)" disabled style="width: 60%;" />
            </el-form-item>
            <el-form-item label="轉正基本工資" prop="correctionOfBasicWages">
              <el-input v-model="saveInitSalary.correctionOfBasicWages" style="width: 60%;" placeholder="轉正基本工資" />
            </el-form-item>
            <el-form-item label="轉正崗位工資" prop="turnToPostWages">
              <el-input v-model="saveInitSalary.turnToPostWages" style="width: 60%;" placeholder="轉正崗位工資" />
            </el-form-item>
            <el-form-item label="轉正工資合計">
              <el-input :value="Number(saveInitSalary.correctionOfBasicWages) + Number(saveInitSalary.turnToPostWages)" disabled style="width: 60%;" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateInitSalary">確認</el-button>
              <el-button @click="close(0)">關閉</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { getSalaryList, getSalaryChange, changeSalary, getCompanyDataMonth } from '@/api/salary'
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'Salary',
  data() {
    return {
      formInfo: {
        formOfEmployment: [],
        departmentId: []
      },
      departmentList: [],
      salaryList: [],
      copySalaryList: [],
      salaryListRender: [],
      page: 1,
      employeeParams: {
        page: 1,
        pagesize: 99,
        departmentId: null
      },
      employeeList: [],
      salaryInfo: {},
      saveSalaryInfo: {
        userId: null,
        currentBasicSalary: null,
        currentPostWage: null
      },
      saveInitSalary: {
        userId: null,
        currentBasicSalary: null,
        currentPostWage: null,
        correctionOfBasicWages: null,
        turnToPostWages: null
      },
      dialogVisible: false,
      changeSalaryRules: {
        currentBasicSalary: [
          { required: true, message: '請輸入調整後基本工資', trigger: 'blur' }
        ],
        currentPostWage: [
          { required: true, message: '請輸入調整後崗位工資', trigger: 'blur' }
        ]
      },
      initSalaryRules: {
        currentBasicSalary: [
          { required: true, message: '請輸入當前基本工資', trigger: 'blur' }
        ],
        currentPostWage: [
          { required: true, message: '請輸入當前崗位工資', trigger: 'blur' }
        ],
        correctionOfBasicWages: [
          { required: true, message: '請輸入轉正基本工資', trigger: 'blur' }
        ],
        turnToPostWages: [
          { required: true, message: '請輸入轉正崗位工資', trigger: 'blur' }
        ]
      },
      dataMonth: ''
    }
  },
  created() {
    this.getDepartmentList()
    this.getSalaryList()
    this.getCompanyDataMonth()
  },
  methods: {
    async getDepartmentList() {
      const result = await getDepartmentList()
      this.departmentList = result
    },
    async getSalaryList() {
      const resultE = await getEmployeeList(this.employeeParams)
      this.employeeList = resultE.rows
      const result = await getSalaryList('202412')
      result.forEach((ele, index) => {
        ele.formOfEmployment = this.employeeList[index].formOfEmployment
        ele.timeOfEntry = this.employeeList[index].timeOfEntry
        ele.departmentId = this.employeeList[index].departmentId
        ele.userId = this.employeeList[index].id
      })
      this.salaryList = result
      this.copySalaryList = JSON.parse(JSON.stringify(this.salaryList))
      this.salaryListRender = this.copySalaryList.filter((ele, index) => { return index >= 0 && index < 10 })
      // console.log(this.salaryList)
    },
    changePage(page) {
      this.page = page
      this.salaryListRender = this.copySalaryList.filter((ele, index) => { return index >= (page - 1) * 10 && index < page * 10 })
    },
    checkSalaryList() {
      if (this.formInfo.formOfEmployment.length > 0 && this.formInfo.departmentId.length > 0) {
        this.copySalaryList = JSON.parse(JSON.stringify(this.salaryList)).filter(ele => {
          return this.formInfo.formOfEmployment.includes(ele.formOfEmployment) && this.formInfo.departmentId.includes(ele.departmentId)
        })
      } else if (this.formInfo.formOfEmployment.length > 0 && this.formInfo.departmentId.length === 0) {
        this.copySalaryList = JSON.parse(JSON.stringify(this.salaryList)).filter(ele => {
          return this.formInfo.formOfEmployment.includes(ele.formOfEmployment)
        })
      } else if (this.formInfo.formOfEmployment.length === 0 && this.formInfo.departmentId.length > 0) {
        this.copySalaryList = JSON.parse(JSON.stringify(this.salaryList)).filter(ele => {
          return this.formInfo.departmentId.includes(ele.departmentId)
        })
      } else {
        this.copySalaryList = JSON.parse(JSON.stringify(this.salaryList))
      }
      this.changePage(1)
    },
    async changeSalary(userId) {
      const result = await getSalaryChange(userId)
      this.salaryInfo = result
      this.saveSalaryInfo.userId = this.salaryInfo.userId
      this.saveInitSalary.userId = this.salaryInfo.userId
      this.dialogVisible = true
    },
    async saveChangeSalary() {
      const result = await changeSalary(this.saveSalaryInfo.userId, this.saveSalaryInfo)
      if (result === null) {
        this.$message({
          message: '調薪成功',
          type: 'success'
        })
      } else {
        this.$message.error('發生錯誤')
      }
      this.close(1)
    },
    close(num) {
      if (num === 0) {
        this.$refs.saveInitSalary.resetFields()
      } else {
        this.$refs.saveSalaryInfo.resetFields()
      }
      this.dialogVisible = false
    },
    async updateInitSalary() {
      // await initSalary(this.salaryInfo.userId, this.saveInitSalary)
      this.$message.error('該員工已定薪, 不能重複定薪')
    },
    async getCompanyDataMonth() {
      const result = await getCompanyDataMonth()
      this.dataMonth = result.dataMonth
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  .top {
    margin-bottom: 10px;
  }
  .pageSelect {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .arrow {
    margin: 0 20px;
  }
  .buttons {
    text-align: center;
    margin-top: 40px;
  }
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #999;
  }
  .dialog-top {
    display: inline-block;
    margin-left: 30px;
    p {
      color: #606266;
      line-height: 30px;
      font-weight: bold;
      span {
        display: inline-block;
      }
    }
  }
}
</style>
