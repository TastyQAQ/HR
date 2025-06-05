<template>
  <div class="container">
    <div class="app-container">
      <div class="title">
        <span>保險報表</span>
      </div>
      <div class="topLab">
        <div class="topLab-left">
          <div>
            <span style="background-color: rgb(207, 239, 254);" />
            已離職
          </div>
          <div>
            <span style="background-color: rgb(168, 248, 187);" />
            再入職
          </div>
          <div>
            <span style="background-color: rgb(254, 219, 215);" />
            公司合計
          </div>
          <div>
            <span style="background-color: rgb(255, 232, 201);" />
            一級部門
          </div>
          <div>
            <span style="background-color: rgb(253, 252, 213);" />
            二級部門
          </div>
        </div>
        <div class="topLab-right">
          <el-button type="primary" size="mini" @click="exportReport">導出</el-button>
        </div>
      </div>
      <el-table v-loading="loading" :data="reportInfo" :header-cell-style="{background: '#f5f6f8'}">
        <el-table-column label="序號" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="150" prop="username" />
        <el-table-column label="入職時間" width="150" prop="timeOfEntry" />
        <el-table-column label="手機號碼" width="150" prop="mobile" />
        <el-table-column label="身分證號碼" width="180">
          <template slot-scope="scope">
            {{ scope.row.idNumber ? scope.row.idNumber : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="學歷" width="150">
          <template slot-scope="scope">
            {{ scope.row.theHighestDegreeOfEducation ? scope.row.theHighestDegreeOfEducation : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="開戶銀行" width="150">
          <template slot-scope="scope">
            {{ scope.row.openingBank ? scope.row.openingBank : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="一級部門" width="150" prop="firstLevelDepartment" />
        <el-table-column label="二級部門" width="150" prop="twoLevelDepartment" />
        <el-table-column label="工作城市" width="150">
          <template slot-scope="scope">
            {{ scope.row.workingCity ? scope.row.workingCity : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險電腦號碼" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurityComputerNumber ? scope.row.socialSecurityComputerNumber : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金帳號" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundAccount ? scope.row.providentFundAccount : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="離職時間" width="150">
          <template slot-scope="scope">
            {{ scope.row.leaveDate ? scope.row.leaveDate : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="戶籍類型" width="150">
          <template slot-scope="scope">
            {{ scope.row.householdRegistrationType ? scope.row.householdRegistrationType : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="參保城市" width="150">
          <template slot-scope="scope">
            {{ scope.row.participatingInTheCity ? scope.row.participatingInTheCity : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險月份" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurityMonth ? scope.row.socialSecurityMonth : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurityBase ? scope.row.socialSecurityBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險合計" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurity ? scope.row.socialSecurity : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurityEnterprise ? scope.row.socialSecurityEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險個人" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurityIndividual ? scope.row.socialSecurityIndividual : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金城市" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundCity ? scope.row.providentFundCity : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金月份" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundMonth ? scope.row.providentFundMonth : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundBase ? scope.row.providentFundBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.accumulationFundEnterpriseBase ? scope.row.accumulationFundEnterpriseBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfProvidentFundEnterprises ? scope.row.proportionOfProvidentFundEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金個人基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.individualBaseOfProvidentFund ? scope.row.individualBaseOfProvidentFund : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金個人比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.personalRatioOfProvidentFund ? scope.row.personalRatioOfProvidentFund : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金合計" width="150">
          <template slot-scope="scope">
            {{ scope.row.totalProvidentFund ? scope.row.totalProvidentFund : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundEnterprises ? scope.row.providentFundEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金個人" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundIndividual ? scope.row.providentFundIndividual : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="養老企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.pensionEnterpriseBase ? scope.row.pensionEnterpriseBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="養老企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfPensionEnterprises ? scope.row.proportionOfPensionEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="養老企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.pensionEnterprise ? scope.row.pensionEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="養老個人基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.personalPensionBase ? scope.row.personalPensionBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="養老個人比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.personalPensionRatio ? scope.row.personalPensionRatio : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="養老個人" width="150">
          <template slot-scope="scope">
            {{ scope.row.oldAgeIndividual ? scope.row.oldAgeIndividual : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="失業企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.unemploymentEnterpriseBase ? scope.row.unemploymentEnterpriseBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="失業企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfUnemployedEnterprises ? scope.row.proportionOfUnemployedEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="失業企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.unemployedEnterprise ? scope.row.unemployedEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="失業個人基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.theNumberOfUnemployedIndividuals ? scope.row.theNumberOfUnemployedIndividuals : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="失業個人比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.percentageOfUnemployedIndividuals ? scope.row.percentageOfUnemployedIndividuals : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="失業個人" width="150">
          <template slot-scope="scope">
            {{ scope.row.unemployedIndividual ? scope.row.unemployedIndividual : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="醫療企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicalEnterpriseBase ? scope.row.medicalEnterpriseBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="醫療企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfMedicalEnterprises ? scope.row.proportionOfMedicalEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="醫療企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicalEnterprise ? scope.row.medicalEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="醫療個人基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicalPersonalBase ? scope.row.medicalPersonalBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="醫療個人比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicalPersonalRatio ? scope.row.medicalPersonalRatio : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="醫療個人" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicalIndividual ? scope.row.medicalIndividual : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="工傷企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.baseOfIndustrialInjuryEnterprises ? scope.row.baseOfIndustrialInjuryEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="工傷企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfIndustrialInjuryEnterprises ? scope.row.proportionOfIndustrialInjuryEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="工傷企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.industrialInjuryEnterprise ? scope.row.industrialInjuryEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="生育企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.fertilityEnterpriseBase ? scope.row.fertilityEnterpriseBase : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="生育企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfFertilityEnterprises ? scope.row.proportionOfFertilityEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="生育企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.childbearingEnterprise ? scope.row.childbearingEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="大病企業基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.baseOfSeriousIllness ? scope.row.baseOfSeriousIllness : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="大病企業比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.proportionOfSeriouslyIllEnterprises ? scope.row.proportionOfSeriouslyIllEnterprises : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="大病企業" width="150">
          <template slot-scope="scope">
            {{ scope.row.bigDiseaseEnterprise ? scope.row.bigDiseaseEnterprise : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="大病個人基數" width="150">
          <template slot-scope="scope">
            {{ scope.row.personalBaseOfSeriousIllness ? scope.row.personalBaseOfSeriousIllness : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="大病個人比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.personalProportionOfSeriousIllness ? scope.row.personalProportionOfSeriousIllness : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="大病個人" width="150">
          <template slot-scope="scope">
            {{ scope.row.personalBaseOfSeriousIllness ? scope.row.personalBaseOfSeriousIllness * scope.row.personalProportionOfSeriousIllness / 100 : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="公積金備註" width="150">
          <template slot-scope="scope">
            {{ scope.row.providentFundNotes ? scope.row.providentFundNotes : '--' }}
          </template>
        </el-table-column>
        <el-table-column label="保險備註" width="150">
          <template slot-scope="scope">
            {{ scope.row.socialSecurityNotes ? scope.row.socialSecurityNotes : '--' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-box">
      <el-button type="primary" size="mini" @click="checkBox">歸檔{{ $route.query.yearMonth.substring(4) }}報表</el-button>
      <el-button type="primary" size="mini" @click="createReport">新建報表</el-button>
      <el-button size="mini" @click="$router.push('/social')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getYearMonthReport, archiveReport, newReport } from '@/api/social'
import FileSaver from 'file-saver'
import axios from 'axios'
export default {
  data() {
    return {
      reportInfo: [],
      loading: true,
      nextYearMonth: Number(this.$route.query.yearMonth) + 1
    }
  },
  created() {
    this.getYearMonthReport()
  },
  methods: {
    async getYearMonthReport() {
      const result = await getYearMonthReport(this.$route.query.yearMonth)
      this.reportInfo = result.map(ele => {
        for (const key in ele) {
          if (ele[key] === null || ele[key] === '') {
            ele[key] = '--'
          }
        }
        return ele
      })
      this.loading = false
    },
    checkBox() {
      this.$confirm(`您確定要歸檔${this.$route.query.yearMonth}報表? 報表歸檔將覆蓋上一次歸檔紀錄, 無法恢復。`, {
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then(async() => {
        const result = await archiveReport(this.$route.query.yearMonth)
        if (result === null) {
          this.$message({
            type: 'success',
            message: '確定'
          })
        }
      })
    },
    createReport() {
      this.$confirm(`您將創建 《 ${this.nextYearMonth.toString().substring(0, 4)}年${this.nextYearMonth.toString().substring(4)}月 》 報表`, {
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then(async() => {
        const result = await newReport(this.nextYearMonth)
        if (result === null) {
          this.$message({
            type: 'success',
            message: '確定'
          })
        }
        this.$store.commit('social/addYearMonth')
        this.$router.push('/social')
      })
    },
    async exportReport() {
      const result = await axios.get(`/api/social_securitys/historys/${this.$route.query.yearMonth}/export`, { headers: { Authorization: `Bearer ${this.$store.state.user.token}` }})
      const blob = new Blob([result.data], { type: 'text/plain' })
      // const result = await exportReport(this.$route.query.yearMonth)
      // console.log(result)

      FileSaver.saveAs(blob, `${this.$route.query.yearMonth}保險報表.xlsx`)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
    border-bottom: 1px solid #f4f4f4;
    padding: 10px 15px 0 15px;
    span {
        display: inline-block;
        border-bottom: 2px solid black;
        font-weight: bold;
        font-size: 18px;
        line-height: 40px;
        padding: 0 25px;
    }
}
.topLab {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    padding-right: 0;
    .topLab-left {
        display: flex;
        div {
            margin: 0 10px;
            display: flex;
            align-items: center;
            span {
                display: inline-block;
                width: 15px;
                height: 15px;
                margin-right: 5px;
            }
        }
    }
}
.button-box {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>
