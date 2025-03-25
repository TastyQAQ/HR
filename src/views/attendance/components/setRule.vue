<template>
  <el-dialog
    title="設置"
    :visible="dialogVisible"
    width="50%"
    @close="close"
  >
    <el-tabs v-model="activeName" style="padding: 20px 40px 0 40px" @tab-click="switchTab">
      <el-tab-pane label="出勤設置" name="first">
        <el-form ref="formAttendance" :model="formAttendance" label-width="90px">
          <el-form-item label="部門:" required>
            <el-select v-model="formAttendance.departmentId" style="width: 220px; margin-left: 10px;" @change="getAttendanceRule">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="出勤時間:" required>
            <el-time-select
              v-model="formAttendance.morningStartTime"
              :picker-options="{
                start: '00:00',
                step: '00:05',
                end: '23:55'
              }"
              :placeholder="formAttendance.morningStartTime"
              style="width: 220px; margin-left: 10px;"
            />
            -
            <el-time-select
              v-model="formAttendance.morningEndTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              :placeholder="formAttendance.morningEndTime"
              style="width: 220px;"
            />
          </el-form-item>
          <el-form-item>
            <el-time-select
              v-model="formAttendance.afternoonStartTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              :placeholder="formAttendance.afternoonStartTime"
              style="width: 220px; margin-left: 10px;"
            />
            -
            <el-time-select
              v-model="formAttendance.afternoonEndTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              :placeholder="formAttendance.afternoonEndTime"
              style="width: 220px;"
            />
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveAttendanceRule">保存更新</el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="請假設置" name="second">
        <el-form ref="leaveDepartmentId" label-width="90px">
          <el-form-item label="部門:" required>
            <el-select v-model="leaveDepartmentId" style="width: 200px; margin-left: 10px;" @change="getLeaveRule">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <div>假期類型</div>
        <el-table
          :data="formLeave"
          style="width: 100%; margin-top: 15px"
          :header-cell-style="{background: '#F5F6F8'}"
        >
          <el-table-column
            prop="name"
            label="類型"
            width="180"
          />
          <el-table-column
            label="是否可用"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isEnable"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveLeaveRule">保存更新</el-button>
          <el-button @click="close">取消</el-button>
        </div>
        <el-alert
          type="warning"
          show-icon
          :closable="false"
        >
          <slot>
            <p>事假 請假單位為0.5天 只能提交工作日內的請假單</p>
            <p>當請假開關關閉後，員工則不得在員工端提交請假申請</p>
          </slot>
        </el-alert>
      </el-tab-pane>
      <el-tab-pane label="扣款設置" name="third">
        <el-form ref="deductionDepartmentId" label-width="90px">
          <el-form-item label="部門:" required>
            <el-select v-model="deductionDepartmentId" style="width: 200px; margin-left: 10px;" @change="getDeductionRule">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-table
          :data="formDeduction"
          style="width: 100%; margin-top: 15px"
          :header-cell-style="{background: '#F5F6F8'}"
        >
          <el-table-column>
            <template slot-scope="scope">
              <div>
                <span style="margin-right: 5px">{{ scope.row.name }}</span>
                <el-switch
                  v-model="scope.row.isEnable"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                />
              </div>
              <div v-if="scope.row.dedAmonutLowerLimit" style="padding: 30px 15px 15px 80px">
                <p>
                  <span>{{ scope.row.name.substring(0,2) }}≤</span>
                  <el-input v-model="scope.row.periodLowerLimit" type="text" :placeholder="scope.row.periodLowerLimit" style="width: 50px; margin-left: 5px" />
                  <span>分鐘</span>
                </p>
                <div class="deductionInfo">
                  <p>
                    <span>{{ scope.row.name.substring(0,2) }}≤</span>
                    <el-input v-model="scope.row.timesLowerLimit" type="text" :placeholder="scope.row.timesLowerLimit" style="width: 50px; margin-left: 5px" />
                    <span>次，每次扣款</span>
                    <el-input v-model="scope.row.dedAmonutUpperLimit" type="text" :placeholder="scope.row.dedAmonutUpperLimit" style="width: 50px; margin-left: 5px" />
                    <span>元</span>
                  </p>
                  <p>
                    <span>{{ scope.row.name.substring(0,2) }}></span>
                    <el-input v-model="scope.row.timesUpperLimit" type="text" :placeholder="scope.row.timesUpperLimit" style="width: 50px; margin-left: 5px" disabled />
                    <span>次，每次扣款</span>
                    <el-input v-model="scope.row.dedAmonutLowerLimit" type="text" :placeholder="scope.row.dedAmonutLowerLimit" style="width: 50px; margin-left: 5px" />
                    <span>元</span>
                  </p>
                </div>
                <p>
                  <span>{{ scope.row.name.substring(0,2) }}></span>
                  <el-input v-model="scope.row.periodUpperLimit" type="text" :placeholder="scope.row.periodUpperLimit" style="width: 50px; margin-left: 5px" disabled />
                  <span>分鐘</span>
                </p>
                <div class="deductionInfo">
                  <p>
                    <span>{{ scope.row.name.substring(0,2) }}></span>
                    <el-input v-model="scope.row.absenceTimesUpperLimt" type="text" :placeholder="scope.row.absenceTimesUpperLimt" style="width: 50px; margin-left: 5px" disabled />
                    <span>次，每次曠工</span>
                    <el-input v-model="scope.row.absenceDays" type="text" :placeholder="scope.row.absenceDays" style="width: 50px; margin-left: 5px" />
                    <span>天</span>
                  </p>
                </div>
              </div>
              <div v-else style="padding: 30px 15px 15px 80px">
                <p>
                  <span>{{ scope.row.name.substring(0,2) }}按</span>
                  <el-input v-model="scope.row.fineSalaryMultiples" type="text" :placeholder="scope.row.fineSalaryMultiples" style="width: 50px; margin-left: 5px" />
                  <span>倍工資處罰</span>
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveDeductionRule">保存更新</el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="加班設置" name="fourth">
        <el-form label-width="100px">
          <el-form-item label="部門:" required>
            <el-select v-model="extraDutyDepartmentId" style="width: 220px; margin-left: 10px;" @change="getExtraDutyRule">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="加班規則:">
            <div v-for="item in formExtraDuty.rules" :key="item.id" class="ruleInfo">
              <el-row type="flex">
                <el-col :span="10">
                  <el-switch
                    v-model="item.isEnable"
                    active-color="#409eff"
                    inactive-color="#dcdfe6"
                    :active-value="1"
                    :inactive-value="0"
                    style="margin-right: 10px;"
                  />
                  <span>{{ item.rule }}</span>
                </el-col>
                <el-col :span="14">
                  <el-checkbox v-model="item.isTimeOff" :true-label="1" :false-label="0" style="margin-right: 10px; padding-left: 30px;">調休假</el-checkbox>
                  <el-time-select v-model="item.ruleStartTime" :picker-options=" {start: '01:00', step: '00:15', end: '23:45'}" :placeholder="item.ruleStartTime" style="width: 100px" />&nbsp;
                  <el-time-select v-model="item.ruleEndTime" :picker-options=" {start: '01:00', step: '00:15', end: '23:45'}" :placeholder="item.ruleEndTime" style="width: 100px" />
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="打卡驗證:">
            <el-switch
              v-model="formExtraDuty.isClock"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              style="margin-right: 10px;"
            />
            <span>加班需要有打卡紀錄</span>
          </el-form-item>
          <el-form-item label="開啟補償:">
            <el-switch
              v-model="formExtraDuty.isCompensationint"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="調休假設置:" required>
            <div>
              <p style="margin-top: 0;padding-top: 0;">
                <span>最晚有效期限:&nbsp;&nbsp;&nbsp;次年</span>
                <el-date-picker
                  v-model="formExtraDuty.latestEffectDate"
                  type="date"
                  placeholder="選擇日期"
                  style="width: 150px;margin-left: 5px;margin-bottom: 15px;"
                  format="MM-dd"
                />
              </p>
              <p>
                <span>請假最小單位</span>
                <el-input v-model="formExtraDuty.unit" :placeholder="formExtraDuty.unit" style="width: 50px;margin-left: 5px;" />
                <span>天</span>
              </p>
            </div>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveExtraDutyRule">保存更新</el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { getAttendanceRule, saveAttendanceRule, getLeaveRule, saveLeaveRule, getDeductionRule, saveDeductionRule, getExtraDutyRule, saveExtraDutyRule } from '@/api/attendance'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'first',
      departmentList: [],
      formAttendance: {
        companyId: 1,
        departmentId: 1,
        morningStartTime: '',
        morningEndTime: '',
        afternoonStartTime: '',
        afternoonEndTime: ''
      },
      copyFormAttence: {},
      leaveDepartmentId: 1,
      leaveName: ['年假', '事假', '病假', '婚假', '喪假', '產假', '獎勵產假', '陪產假', '探親假', '工傷假', '調休假', '產檢假', '流產假', '長期病假'],
      formLeave: [],
      copyFormLeave: [],
      deductionDepartmentId: 1,
      formDeduction: [],
      copyFormDeduction: [],
      extraDutyDepartmentId: 1,
      formExtraDuty: {
        departmentId: 1175311267684352000,
        isClock: 0,
        isCompensationint: 0,
        latestEffectDate: '2023-06-27',
        unit: '1',
        rules: []
      },
      copyFormExtraDuty: {}
    }
  },
  created() {
    this.getDepartmentList()
    this.getAttendanceRule()
    this.getLeaveRule()
    this.getDeductionRule()
    this.getExtraDutyRule()
  },
  methods: {
    close() {
      this.formAttendance.departmentId = 1
      this.getAttendanceRule()
      this.formLeave = JSON.parse(JSON.stringify(this.copyFormLeave))
      this.formDeduction = JSON.parse(JSON.stringify(this.copyFormDeduction))
      this.formExtraDuty = JSON.parse(JSON.stringify(this.copyFormExtraDuty))
      this.$emit('update:dialogVisible', false)
    },
    switchTab() {
      this.formAttendance = JSON.parse(JSON.stringify(this.copyFormAttence))
      this.formLeave = JSON.parse(JSON.stringify(this.copyFormLeave))
      this.formDeduction = JSON.parse(JSON.stringify(this.copyFormDeduction))
      this.formExtraDuty = JSON.parse(JSON.stringify(this.copyFormExtraDuty))
    },
    async getDepartmentList() {
      const result = await getDepartmentList()
      this.departmentList = result
    },
    async getAttendanceRule() {
      const result = await getAttendanceRule(this.formAttendance.departmentId)
      this.formAttendance.morningStartTime = result.morningStartTime
      this.formAttendance.morningEndTime = result.morningEndTime
      this.formAttendance.afternoonStartTime = result.afternoonStartTime
      this.formAttendance.afternoonEndTime = result.afternoonEndTime
      this.copyFormAttence = JSON.parse(JSON.stringify(this.formAttendance))
    },
    async saveAttendanceRule() {
      const result = await saveAttendanceRule(this.formAttendance)
      if (result === null) {
        this.$message.success('出勤時間設置成功')
        this.close()
      }
    },
    async getLeaveRule() {
      const result = await getLeaveRule(this.leaveDepartmentId)
      this.formLeave = result
      this.formLeave.forEach((ele, index) => {
        ele.name = this.leaveName[index]
      })
      this.copyFormLeave = JSON.parse(JSON.stringify(this.formLeave))
    },
    async saveLeaveRule() {
      this.copyFormLeave = JSON.parse(JSON.stringify(this.formLeave))
      const result = await saveLeaveRule(this.formLeave)
      if (result === null) {
        this.$message.success('請假規則設置成功')
        this.close()
      }
    },
    async getDeductionRule() {
      const result = await getDeductionRule(this.deductionDepartmentId)
      result.forEach(ele => {
        if (ele.dedTypeCode === '51000') {
          ele.name = '遲到扣款'
        } else if (ele.dedTypeCode === '52000') {
          ele.name = '早退扣款'
        } else {
          ele.name = '曠工扣款'
        }
      })
      this.formDeduction = result
      this.copyFormDeduction = JSON.parse(JSON.stringify(this.formDeduction))
    },
    async saveDeductionRule() {
      this.copyFormDeduction = JSON.parse(JSON.stringify(this.formDeduction))
      const result = await saveDeductionRule(this.formDeduction)
      if (result === null) {
        this.$message.success('扣款規則設置成功')
        this.close()
      }
    },
    async getExtraDutyRule() {
      const result = await getExtraDutyRule(this.extraDutyDepartmentId)
      const { extraDutyRuleList, dayOffConfigs, extraDutyConfig } = result
      this.formExtraDuty.departmentId = extraDutyConfig.departmentId
      this.formExtraDuty.isClock = extraDutyConfig.isClock
      this.formExtraDuty.isCompensationint = extraDutyConfig.isCompensationint
      this.formExtraDuty.latestEffectDate = dayOffConfigs.latestEffectDate
      this.formExtraDuty.unit = dayOffConfigs.unit
      this.formExtraDuty.rules = extraDutyRuleList
      this.copyFormExtraDuty = JSON.parse(JSON.stringify(this.formExtraDuty))
    },
    async saveExtraDutyRule() {
      this.copyFormExtraDuty = JSON.parse(JSON.stringify(this.formExtraDuty))
      const result = await saveExtraDutyRule(this.formExtraDuty)
      if (result === null) {
        this.$message.success('加班規則設置成功')
        this.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
  padding: 30px 0;
}
p {
  margin: 12px 0;
  padding: 5px 0;
}
.deductionInfo {
  margin-left: 100px;
}
.ruleInfo {
  margin-bottom: 5px;
}
</style>
