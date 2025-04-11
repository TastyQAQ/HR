<template>
  <div class="container">
    <div class="app-container">
      <el-card class="apply-box" :body-style="{display: 'flex'}">
        <div>
          <p>當前審核中</p>
          <p>{{ applyList.currApproveCount }}</p>
        </div>
        <div>
          <p>本月審核通過</p>
          <p>{{ applyList.approveCount }}</p>
        </div>
        <div>
          <p>本月審核駁回</p>
          <p>{{ applyList.rejectionCount }}</p>
        </div>
      </el-card>
      <el-card>
        <el-table :data="applyList.rows" :header-cell-style="{background: '#F5F6F8'}">
          <el-table-column type="selection" width="30" />
          <el-table-column label="序號" width="80">
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column label="審核類型" prop="processName" width="205" sortable />
          <el-table-column label="申請人" prop="username" width="215" sortable />
          <el-table-column label="當前審核人" prop="procCurrNodeUserName" width="217" sortable />
          <el-table-column label="審核發起時間" prop="procApplyTime" width="200" sortable />
          <el-table-column label="審核狀態" prop="processState" :formatter="procesState" width="210" sortable />
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="check(scope)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-select">
          <el-pagination layout="prev, pager, next" :total="applyList.total" @prev-click="getApplyList(current)" @next-click="getApplyList(current)" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getApplyList } from '@/api/approval'
export default {
  name: 'Approval',
  data() {
    return {
      applyList: {
        rows: [],
        total: 1,
        currApproveCount: 1,
        approveCount: 1,
        rejectionCount: 1
      },
      processState: ['已提交', '審核中', '審核通過', '審核不通過', '撤銷']
    }
  },
  created() {
    this.getApplyList()
  },
  methods: {
    async getApplyList(page = 1, pageSize = 10) {
      const result = await getApplyList(page, pageSize)
      this.applyList = result
    },
    procesState(row) {
      return this.processState[row.processState]
    },
    check(scope) {
      if (scope.row.processKey === 'process_leave') {
        this.$router.push(`/approval/process_leave/detail/${scope.row.processId}`)
      } else if (scope.row.processKey === 'process_overtime') {
        this.$router.push(`/approval/process_overtime/detail/${scope.row.processId}`)
      } else {
        this.$router.push(`/approval/process_dimission/detail/${scope.row.processId}`)
      }
      // this.$router.push(`/approval/${scope.row.processKey}/detail/${scope.row.processId}`)
    }
  }
}
</script>

<style scoped lang=scss>
.container {
  padding: 10px;
  .apply-box {
    margin-bottom: 10px;
    div {
      text-align: center;
      font-size: 18px;
    }
    :nth-child(2) {
      margin: 0 10px;
    }
  }
  .page-select {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
