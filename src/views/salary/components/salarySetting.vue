<template>
  <div class="container">
    <div class="app-container">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="計薪設置" name="first" />
          <el-tab-pane label="津貼設置" name="second" />
        </el-tabs>
      </div>
      <div v-if="activeName==='first'">
        <el-form ref="salaryForm" :model="salaryForm" label-width="140px" label-position="left">
          <el-form-item label="對應保險自然月">
            <el-select v-model="salaryForm.socialSecurityType" style="width: 280px">
              <el-option label="當月" :value="1" />
              <el-option label="次月" :value="2" />
            </el-select>
            <el-tooltip effect="dark" placement="top" content="如果201606月工資中扣除2016年6月自然月的保險公積金，請選擇當月；如果扣除2016年7月自然月的保險公積金，請選擇次月。">
              <i class="el-icon-bell" />
            </el-tooltip>
          </el-form-item>
          <el-form-item label="保險數據來源">
            <el-input placeholder="保險模塊" disabled style="width: 280px" />
            <el-tooltip effect="dark" placement="top" content="計算工資的五險一金金額將取自保險報表">
              <i class="el-icon-bell" />
            </el-tooltip>
          </el-form-item>
          <el-form-item label="考勤數據來源">
            <el-input placeholder="考勤模塊" disabled style="width: 280px" />
            <el-tooltip effect="dark" placement="top" content="計算工資時的考勤數據將取自考勤統計表">
              <i class="el-icon-bell" />
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveSalarySetting">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form ref="salaryForm" :model="salaryForm" label-width="100px">
          <el-form-item label="通用方案">
            <el-input v-model="salaryForm.subsidyName" style="width: 400px" />
          </el-form-item>
          <el-form-item label="備註">
            <el-input v-model="salaryForm.subsidyRemark" style="width: 400px" />
          </el-form-item>
          <el-form-item label="津貼名稱">
            <p>
              <el-input value="交通補貼" disabled style="width: 200px" />
              <el-select v-model="salaryForm.transportationSubsidyScheme" style="width: 200px">
                <el-option label="每出勤日" :value="1" />
                <el-option label="每月固定" :value="2" />
              </el-select>
              <el-tooltip effect="dark" placement="top" content="每出勤日：金額*實際出勤天數； 每計薪日：金額*計薪天數； 每月固定：固定金額； 每月（按出勤日）：金額*實際出勤天數/應出勤工作日； 每月（按計薪日）：金額*計薪天數/計薪標準（如21.75）；">
                <i class="el-icon-bell" />
              </el-tooltip>
              <el-input v-model="salaryForm.transportationSubsidyAmount" style="width: 200px" />
            </p>
            <p>
              <el-input value="通訊補貼" disabled style="width: 200px" />
              <el-select v-model="salaryForm.communicationSubsidyScheme" style="width: 200px">
                <el-option label="每出勤日" :value="1" />
                <el-option label="每月固定" :value="2" />
              </el-select>
              <el-tooltip effect="dark" placement="top" content="每出勤日：金額*實際出勤天數； 每計薪日：金額*計薪天數； 每月固定：固定金額； 每月（按出勤日）：金額*實際出勤天數/應出勤工作日； 每月（按計薪日）：金額*計薪天數/計薪標準（如21.75）；">
                <i class="el-icon-bell" />
              </el-tooltip>
              <el-input v-model="salaryForm.communicationSubsidyAmount" style="width: 200px" />
            </p>
            <p>
              <el-input value="午餐補貼" disabled style="width: 200px" />
              <el-select v-model="salaryForm.lunchAllowanceScheme" style="width: 200px">
                <el-option label="每出勤日" :value="1" />
                <el-option label="每月固定" :value="2" />
              </el-select>
              <el-tooltip effect="dark" placement="top" content="每出勤日：金額*實際出勤天數； 每計薪日：金額*計薪天數； 每月固定：固定金額； 每月（按出勤日）：金額*實際出勤天數/應出勤工作日； 每月（按計薪日）：金額*計薪天數/計薪標準（如21.75）；">
                <i class="el-icon-bell" />
              </el-tooltip>
              <el-input v-model="salaryForm.lunchAllowanceAmount" style="width: 200px" />
            </p>
            <p>
              <el-input value="住房補助" disabled style="width: 200px" />
              <el-select v-model="salaryForm.housingSubsidyScheme" style="width: 200px">
                <el-option label="每出勤日" :value="1" />
                <el-option label="每月固定" :value="2" />
              </el-select>
              <el-tooltip effect="dark" placement="top" content="每出勤日：金額*實際出勤天數； 每計薪日：金額*計薪天數； 每月固定：固定金額； 每月（按出勤日）：金額*實際出勤天數/應出勤工作日； 每月（按計薪日）：金額*計薪天數/計薪標準（如21.75）；">
                <i class="el-icon-bell" />
              </el-tooltip>
              <el-input v-model="salaryForm.housingSubsidyAmount" style="width: 200px" />
            </p>
          </el-form-item>
          <el-form-item label="適用計稅方式">
            <el-radio v-model="salaryForm.taxCalculationType" :label="0">稅前</el-radio>
            <el-radio v-model="salaryForm.taxCalculationType" :label="1">稅後</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveSalarySetting">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getSalarySetting, saveSalarySetting } from '@/api/salary'
export default {
  data() {
    return {
      activeName: 'first',
      salaryForm: {
        socialSecurityType: '100.00',
        subsidyName: '100.00',
        subsidyRemark: '100.00',
        transportationSubsidyScheme: '100.00',
        transportationSubsidyAmount: '100.00',
        communicationSubsidyScheme: '100.00',
        communicationSubsidyAmount: '100.00',
        lunchAllowanceScheme: '100.00',
        lunchAllowanceAmount: '100.00',
        housingSubsidyScheme: '100.00',
        housingSubsidyAmount: '100.00',
        taxCalculationType: '100.00'
      },
      copySalartForm: {}
    }
  },
  created() {
    this.getSalarySetting()
  },
  methods: {
    reset() {
      this.salaryForm = JSON.parse(JSON.stringify(this.copySalaryForm))
    },
    async getSalarySetting() {
      const result = await getSalarySetting()
      this.salaryForm = result
      this.copySalaryForm = JSON.parse(JSON.stringify(this.salaryForm))
    },
    async saveSalarySetting() {
      const result = await saveSalarySetting(this.salaryForm)
      if (result === null) {
        this.$message.success('保存成功')
      }
      console.log(result)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
    padding: 0;
    .app-container {
        padding: 80px 60px;
    }
}
</style>
