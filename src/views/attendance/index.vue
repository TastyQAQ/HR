<template>
  <div class="container">
    <div v-loading="loading" class="app-container">
      <el-card class="page-tools">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="24">
            <div class="top-left">
              <p>未處理</p>
              {{ tobeTaskCount }}
            </div>
          </el-col>
          <el-col :span="24">
            <el-row type="flex" justify="end">
              <el-button size="mini">打卡範圍</el-button>
              <el-button size="mini" type="primary" @click="dialogVisible = true">設置</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="page-tools">
        <el-form label-width="120px">
          <el-form-item label="部門:">
            <el-checkbox-group v-model="departmentIds" @change="selectDept">
              <el-checkbox v-for="item in departmentList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <!-- <el-table :data="attendanceList" border :header-cell-style="{background: '#fafafa'}">
          <el-table-column label="序號" type="index" width="120px" align="center" />
          <el-table-column label="姓名" prop="username" width="120px" align="center" />
          <el-table-column label="工號" prop="workNumber" width="120px" align="center" />
          <el-table-column label="部門" prop="departmentName" width="120px" align="center" />
          <el-table-column label="手機" prop="mobile" width="120px" align="center" />
          <el-table-column v-for="item in attendanceList.attendanceRecord" :key="item.id" :label="item.day" width="120px" align="center" />
        </el-table> -->
        <div style="width: 100%;position: relative;overflow: auto hidden;">
          <div style="width: 3000px">
            <table data-v-807157d0="" border="0" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
              <tr>
                <th>序號</th>
                <th>姓名</th>
                <th>工號</th>
                <th>部門</th>
                <th>手機</th>
                <th v-for="item in attendanceDate" :key="item">{{ item }} </th>
              </tr>
              <tr v-for="(item, index) in attendanceList" :key="item.mobile">
                <td>{{ index + 1 }} </td>
                <td>{{ item.username }} </td>
                <td>{{ item.workNumber }} </td>
                <td>{{ item.departmentName }} </td>
                <td>{{ item.mobile }} </td>
                <td v-for="items in item.attendanceRecord" :key="items.day" :style="adtStatuColors(items.adtStatu)">
                  <el-popover placement="top-start" width="400" trigger="hover" :open-delay="500">
                    <el-card class="adtStatuInfo">
                      <div slot="header" class="adtStatuInfo-header">
                        <span>{{ item.username }}-{{ items.day }}-考勤紀錄</span>
                        <span class="status">{{ adtStatu[items.adtStatu - 1] }}</span>
                      </div>
                      <div class="adtStatuInfo-body">
                        <div>上班打卡時間:{{ items.adtInTime?items.adtInTime:' -' }}</div>
                        <div>上班打卡地點: -</div>
                        <div>下班打卡時間:{{ items.adtOutTime?items.adtOutTime:' -' }}</div>
                        <div>下班打卡地點: -</div>
                      </div>
                    </el-card>
                    <span slot="reference" style="display: block; width: 100%">{{ adtStatu[items.adtStatu - 1] }}</span>
                  </el-popover>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="page">
          <el-pagination layout="prev, pager, next" :total="attendanceData.total" @prev-click="switchPage" @next-click="switchPage" @current-change="switchPage" />
        </div>
      </el-card>
    </div>
    <setRule :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { getAttendanceList } from '@/api/attendance'
import setRule from './components/setRule.vue'
export default {
  name: 'Attendance',
  components: { setRule },
  data() {
    return {
      departmentList: [], // 部門列表
      departmentIds: [], // 綁定選擇部門id
      tobeTaskCount: 0, // 未處理考勤數量
      attendanceData: [], // 考勤數據
      attendanceList: [], // 考勤列表
      attendanceDay: [], // 考勤日期
      adtStatu: ['正常', '曠工', '遲到', '早退', '外出', '出差', '年假', '事假', '病假', '婚假', '喪假', '產假', '獎勵假期', '陪產假', '探親假', '工傷假', '調休', '產檢假', '流產假', '長期病假', '補簽', '休息'], // 考勤狀況
      params: { // 獲取考勤列表所需數據
        page: '1', // 頁碼
        pagesize: '10', // 每頁顯示幾條數據
        deptID: '' // 部門id
      },
      loading: false, // 加載效果
      dialogVisible: false // 設置規則彈窗
    }
  },
  computed: {
    // 顯示考勤日期
    attendanceDate() {
      return this.attendanceDay.map(ele => {
        const date = new Date(ele.day.substring(0, 4), ele.day.substring(4, 6), ele.day.substring(6))
        const week = new Date(`${ele.day.substring(4, 6)}, ${ele.day.substring(6)}, ${ele.day.substring(0, 4)}`)
        const m = date.getMonth()
        const d = date.getDate()
        const w = week.getDay()
        if (w === 0) {
          return `${m}/${d} (日)`
        } else if (w === 6) {
          return `${m}/${d} (六)`
        } else {
          return `${m}/${d}`
        }
      })
    }
  },
  created() {
    this.getDepartmentList()
    this.getAttendanceList()
  },
  methods: {
    async getDepartmentList() {
      this.departmentList = await getDepartmentList()
    },
    async getAttendanceList() {
      this.loading = true
      const result = await getAttendanceList(this.params)
      this.attendanceData = result.data
      this.attendanceList = result.data.rows
      this.attendanceDay = result.data.rows[0].attendanceRecord
      this.tobeTaskCount = result.tobeTaskCount
      this.loading = false
    },
    adtStatuColors(adtStatuNum) {
      if (adtStatuNum === 2) return { color: 'red' }
      if (adtStatuNum === 22) return { color: '#9093a6' }
    },
    switchPage(pageNum) {
      this.params.page = pageNum
      this.getAttendanceList()
    },
    async getSelectAttendanceList(id) {
      this.loading = true
      id.forEach(async(ele, index) => {
        const result = await getAttendanceList({ page: '1', pagesize: '10', deptID: ele })
        this.attendanceList.push(...result.data.rows)
        if (index === id.length - 1) {
          this.loading = false
        }
      })
    },
    selectDept(id) {
      this.attendanceList = []
      if (id.length > 0) {
        this.getSelectAttendanceList(id)
      } else {
        this.getAttendanceList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #f0f2f5;
}
.page-tools{
  margin-bottom: 10px;
  padding: 20px;
}
.top-left {
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tableInfo {
  margin: 0;
  line-height: 36px;
  border: 1px solid #ebeef5;
  border-right: 0 none;
  border-bottom: 0 none;
  tr th{
    height: 50px;
    text-align: center;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-bottom: 2px solid #e8e8e8;
    background: #fafafa;
    min-width: 120px;
  }
  tr td{
    height: 36px;
    text-align: center;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
  }
}
.adtStatuInfo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .status {
    color: orange;
    font-size: 12px;
    border: 1px solid orange;
    padding: 3px 5px;
    background-color: #e8e8e8;
    border-radius: 5px;
  }
}
.adtStatuInfo-body div{
  margin-bottom: 25px;
}
.page {
  display: flex;
  justify-content: center;
}
</style>
