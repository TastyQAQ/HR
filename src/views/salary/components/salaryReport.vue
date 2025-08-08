<template>
  <div class="container">
    <div class="app-container">
      <div class="title">
        <span>薪資報表</span>
      </div>
      <div class="export">
        <el-button type="primary" size="mini" @click="exportReport">導出</el-button>
      </div>
      <el-table :data="salaryList" :header-cell-style="{background: '#ebeef5'}" :border="true">
        <el-table-column label="序號" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="150" />
        <el-table-column prop="mobile" label="手機號碼" width="150" />
        <el-table-column prop="workNumber" label="工號" width="150" />
        <el-table-column prop="departmentName" label="部門名稱" width="150" />
        <el-table-column prop="inServiceState" label="在職狀態" width="150">
          <template>{{ '離職' }}</template>
        </el-table-column>
        <el-table-column prop="providentFundIndividual" label="公積金個人" width="150" />
        <el-table-column prop="socialSecurityIndividual" label="保險個人" width="150" />
        <el-table-column prop="socialSecurityEnterprise" label="保險企業" width="150" />
        <el-table-column prop="providentFundEnterprises" label="公積金企業" width="150" />
        <el-table-column prop="socialSecurityProvidentFundEnterprises" label="公積金保險企業" width="150" />
        <el-table-column prop="currentBaseSalary" label="基本工資" width="150" />
        <el-table-column label="崗位工資" width="150" />
        <el-table-column label="福利津貼" width="150" />
        <el-table-column prop="attendanceDeductionMonthly" label="考勤扣款" width="150" />
        <el-table-column prop="salaryBeforeTax" label="稅前工資合計" width="150" />
        <el-table-column prop="salaryByTax" label="應納稅工資" width="150" />
        <el-table-column prop="tax" label="應扣稅" width="150" />
        <el-table-column prop="payment" label="實發工資" width="150" />
      </el-table>
    </div>
    <div class="button-box">
      <el-button type="primary" size="mini" @click="openDialog(1)">歸檔{{ this.$route.params.yearMonth.substring(4) }}報表</el-button>
      <el-button type="primary" size="mini" @click="openDialog(2)">新建報表</el-button>
      <el-button size="mini" @click="$router.push('/salary')">取消</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span v-if="dialogContent === 1">您確認歸檔當月報表嗎?</span>
      <span v-else>您將創建 《 {{ yearMonth.substring(0,4) }}年{{ yearMonth.substring(4) }}月 》 報表</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        <el-button v-if="dialogContent === 1" type="primary" size="mini" @click="archiveSalaryData">確定</el-button>
        <el-button v-else type="primary" size="mini" @click="createReport">確定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSalaryList, archiveSalaryData, createReport, exportReport } from '@/api/salary'
import FileSaver from 'file-saver'
export default {
  data() {
    return {
      salaryList: [],
      dialogVisible: false,
      dialogContent: 1,
      yearMonth: ''
    }
  },
  created() {
    this.getSalaryList()
  },
  methods: {
    async getSalaryList() {
      const result = await getSalaryList(this.$route.params.yearMonth)
      this.salaryList = result
      const year = this.$route.params.yearMonth.substring(0, 4)
      const month = this.$route.params.yearMonth.substring(4)
      if (Number(month) < 10) {
        this.yearMonth = year + '0' + (Number(month) + 1)
      } else if (Number(month) > 12) {
        this.yearMonth = (Number(year) + 1) + '01'
      } else {
        this.yearMonth = this.$route.params.yearMonth
      }
    },
    async archiveSalaryData() {
      const result = await archiveSalaryData(this.$route.params.yearMonth)
      if (result === null) {
        this.$message.success('歸檔成功')
        this.dialogVisible = false
      }
    },
    openDialog(num) {
      this.dialogContent = num
      this.dialogVisible = true
    },
    async createReport() {
      const result = await createReport(this.yearMonth)
      if (result === null) {
        this.$message.success('創建成功')
        this.dialogVisible = false
        this.$router.replace('/salary')
      }
    },
    async exportReport() {
      const result = await exportReport(this.$route.params.yearMonth)
      const blob = new Blob([result], { type: 'text/plain' })
      FileSaver.saveAs(blob, `${this.$route.params.yearMonth}工資報表.xlsx`)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
    padding: 10px 15px 0 15px;
    line-height: 40px;
    border-bottom: 1px solid #f4f4f4;
    span {
        padding: 0 25px;
        font-weight: bold;
        font-size: 18px;
        border-bottom: 2px solid #121e41;
        display: inline-block;
    }
}
.export {
    padding: 15px 0;
    display: flex;
    justify-content: end;
}
.button-box {
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
