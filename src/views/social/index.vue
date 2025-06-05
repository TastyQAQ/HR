<template>
  <div class="container">
    <div class="app-container">
      <el-card class="top">
        <div>
          <el-button type="danger" size="mini" @click="$router.push('/social/archive')">歷史歸檔</el-button>
          <el-button type="primary" size="mini" @click="$router.push(`/social/report?yearMonth=${$store.state.social.yearMonth}`)">{{ $store.state.social.yearMonth }}報表</el-button>
        </div>
      </el-card>
      <el-card v-loading="loading" class="middle">
        <el-form label-width="120px">
          <el-form-item label="部門">
            <el-checkbox-group v-model="socialListData.departmentChecks" @change="selectList">
              <el-checkbox v-for="item in departmentList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="投保地點">
            <el-checkbox-group v-model="socialListData.socialSecurityChecks" @change="selectList">
              <el-checkbox v-for="item in cityList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="公積金地點">
            <el-checkbox-group v-model="socialListData.providentFundChecks" @change="selectList">
              <el-checkbox v-for="item in cityList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card v-loading="loading">
        <el-table :data="socialList.rows" :header-cell-style="{background: '#F5F6F8'}" @row-click="socialDetail">
          <el-table-column label="序號" width="50">
            <template slot-scope="scope">
              {{ (socialListData.page - 1) * 10 + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="手機" prop="mobile" sortable />
          <el-table-column label="工號" prop="workNumber" sortable />
          <el-table-column label="部門" prop="departmentName" sortable />
          <el-table-column label="入職時間" prop="timeOfEntry" sortable />
          <el-table-column label="離職時間" sortable>
            <template slot-scope="scope">
              {{ scope.leaveTime || '--' }}
            </template>
          </el-table-column>
          <el-table-column label="投保城市" prop="participatingInTheCity" />
          <el-table-column label="公積金城市" prop="providentFundCity" />
          <el-table-column label="投保基數" prop="socialSecurityBase" />
          <el-table-column label="公積金基數" prop="providentFundBase" />
        </el-table>
        <div class="page">
          <el-pagination layout="prev, pager, next" :total="socialList.total" @current-change="changePage" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { getCityList, getSocilaList } from '@/api/social'
export default {
  name: 'Social',
  data() {
    return {
      departmentList: [],
      cityList: [],
      cityIds: [],
      fundIds: [],
      socialListData: {
        page: 1,
        pageSize: 10,
        departmentChecks: [],
        providentFundChecks: [],
        socialSecurityChecks: []
      },
      socialList: [],
      loading: false
    }
  },
  created() {
    this.getDepartmentList()
    this.getCityList()
    this.getSocilaList()
  },
  methods: {
    async getDepartmentList() {
      const result = await getDepartmentList()
      this.departmentList = result
    },
    async getCityList() {
      const result = await getCityList()
      this.cityList = result
    },
    async getSocilaList() {
      this.loading = true
      const result = await getSocilaList(this.socialListData)
      this.socialList = result
      this.loading = false
    },
    selectList() {
      this.getSocilaList()
    },
    changePage(page) {
      this.socialListData.page = page
      this.getSocilaList()
    },
    socialDetail(row) {
      this.$router.push(`/social/detail/${row.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  .top {
    margin-bottom: 10px;
  }
  .middle {
    margin-bottom: 10px;
  }
  .page {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
