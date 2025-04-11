<template>
  <div class="container">
    <div class="app-container">
      <div class="card-box">
        <el-card class="left-card">
          <div>
            <div class="title">申請人資料</div>
            <div>
              <span class="info-item">
                <span>姓名:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.username }}</span>
              </span>
            </div>
            <div>
              <span class="info-item">
                <span>部門:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.departmentName }}</span>
              </span>
              <span class="info-item">
                <span>入職時間:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.timeOfEntry }}</span>
              </span>
            </div>
          </div>
          <el-divider />
          <div>
            <div class="title">加班申請</div>
            <div>
              <span class="info-item">
                <span>補償方式:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.procData.compensation }}</span>
              </span>
              <span class="info-item">
                <span>加班開始時間:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.procData.start_time }}</span>
              </span>
            </div>
            <div>
              <span class="info-item">
                <span>加班結束時間:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.procData.end_time }}</span>
              </span>
              <span class="info-item">
                <span>申請原因:&nbsp;&nbsp;</span>
                <span>{{ leaveInfo.procData.reason }}</span>
              </span>
            </div>
          </div>
        </el-card>
        <el-card class="right-card">
          <div class="title">審核紀錄</div>
          <el-steps direction="vertical" :active="3">
            <el-step v-for="item in approvalProgress" :key="item.taskId" style="flex-basis: 85px;" status="success">
              <template slot="title">{{ item.handleUserName }}&nbsp;{{ item.handleOpinion }}</template>
              <template slot="description">{{ item.handleTime }}</template>
            </el-step>
          </el-steps>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getApprovalDetail, getApprovalProgress } from '@/api/approval'
export default {
  data() {
    return {
      leaveInfo: {},
      processState: ['已提交', '審核中', '審核通過', '審核不通過', '撤銷'],
      approvalProgress: []
    }
  },
  created() {
    this.getApprovalDetail()
    this.getApprovalProgress()
  },
  methods: {
    async getApprovalDetail() {
      const result = await getApprovalDetail(this.$route.params.id)
      result.procData = JSON.parse(result.procData)
      this.leaveInfo = result
      console.log(result)

      // this.leaveInfo.procData = JSON.parse(result.procData)
    },
    async getApprovalProgress() {
      const result = await getApprovalProgress(this.$route.params.id)
      this.approvalProgress = result
      console.log(this.approvalProgress)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
  .app-container {
    background-color: transparent;
    .card-box {
      display: flex;
      background-color: transparent;
      .left-card {
        margin-right: 10px;
        flex: 4;
      }
      .right-card {
        flex: 1;
      }
      .title {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .info-item {
        display: inline-block;
        margin: 5px;
        font-size: 14px;
        width: 280px;
        :first-child {
          margin-right: 10px;
          color: #646a73;
        }
      }
    }
}
}
</style>
