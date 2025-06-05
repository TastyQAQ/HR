<template>
  <div class="container">
    <div class="app-container">
      <div class="top">
        <span>全公司</span>
        <div class="date">
          <el-date-picker v-model="year" value-format="yyyy" type="year" placeholder="2020" size="mini" :clearable="true" align="center" @change="getHistoryArchive" />
        </div>
      </div>
      <div v-if="archiveList.length > 0" class="middle">
        <div v-for="item in archiveList" :key="item.id" class="middle-content">
          <div class="expand">
            <button @click="showReport(item.yearsMonth)">
              <i class="el-icon-arrow-right" />
            </button>
          </div>
          <div>
            <p>
              保險報表
              <span>{{ item.yearsMonth }}</span>
            </p>
            <p>保險報表</p>
          </div>
          <div>
            <p class="project">企業繳納</p>
            <p class="project-num">{{ item.enterprisePayment }}</p>
          </div>
          <div>
            <p class="project">個人繳納</p>
            <p class="project-num">{{ item.personalPayment }}</p>
          </div>
          <div>
            <p class="project">合計</p>
            <p class="project-num">{{ item.total }}</p>
          </div>
        </div>
        <div v-if="show" class="report">
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
          <el-table v-loading="loading" :data="reportInfo" :header-cell-style="{background: '#f5f6f8'}" height="300px" :border="true">
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
      </div>
    </div>
  </div>
</template>

<script>
import { historyArchiveReport, getYearMonthReport } from '@/api/social'
import FileSaver from 'file-saver'
import axios from 'axios'
export default {
  data() {
    return {
      year: '',
      archiveList: [],
      reportInfo: [],
      loading: true,
      show: false,
      yearMonth: ''
    }
  },
  methods: {
    async getHistoryArchive() {
      const result = await historyArchiveReport(this.year)
      this.archiveList = result
    },
    async showReport(yearMonth) {
      this.yearMonth = yearMonth
      const result = await getYearMonthReport(yearMonth)
      this.reportInfo = result.map(ele => {
        for (const key in ele) {
          if (ele[key] === null || ele[key] === '') {
            ele[key] = '--'
          }
        }
        return ele
      })
      this.loading = false
      this.show = true
    },
    async exportReport() {
      const result = await axios.get(`/api/social_securitys/historys/${this.yearMonth}/export`, { headers: { Authorization: `Bearer ${this.$store.state.user.token}` }})
      const blob = new Blob([result.data], { type: 'text/plain' })
      // const result = await exportReport(this.$route.query.yearMonth)
      // console.log(result)

      FileSaver.saveAs(blob, `${this.yearMonth}保險報表.xlsx`)
    }
  }
}
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 0 15px;
  position: relative;
  span {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    padding: 0 25px;
    border-bottom: 2px solid black;
    text-align: center;
    line-height: 40px;
  }
  .date {
    position: absolute;
    top: 12px;
    right: 10px;
  }
}
.middle-content {
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 3px solid #ccc;
  div {
    padding: 0 50px;
    border-right: 1px solid #ccc;
  }
  .expand {
    padding: 0 0 0 15px;
    border: 0;
    i:hover {
      cursor: pointer;
    }
  }
  button {
    background-color: transparent;
    border: 0;
  }
  span,.project {
    color: #999;
    font-size: 13px;
    margin: 8px 0;
  }
  .project-num {
    font-size: 20px;
    margin: 0;
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
</style>
