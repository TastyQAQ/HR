<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input v-model="queryParams.keyword" style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="輸入員工姓名全員搜索" @input="changeValue" />
        <el-tree ref="deptTree" :data="depts" :props="defaultProps" default-expand-all :expand-on-click-node="false" highlight-current node-key="id" @current-change="selectNode" />
      </div>
      <div class="right">
        <el-row type="flex" justify="end" class="opeate-tools">
          <el-button v-permission="'add-employee'" type="primary" size="mini" @click="$router.push('/employee/detail')">添加員工</el-button>
          <el-button size="mini" @click="importDialog = true">excel導入</el-button>
          <el-button size="mini" @click="exportEmployee">excel導出</el-button>
        </el-row>
        <el-table :data="EmployeeList" style="width: 100%">
          <el-table-column prop="staffPhoto" align="center" label="頭像">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
              <span v-else class="username">{{ row.username[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手機號碼" sortable />
          <el-table-column prop="workNumber" label="工號" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span>{{ row.formOfEmployment === 1 ? '正式' : row.formOfEmployment === 2 ? '非正式' : '無' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部門" />
          <el-table-column prop="timeOfEntry" label="入職時間" sortable />
          <el-table-column label="操作" width="280px">
            <template v-slot="{row}">
              <el-button type="text" size="mini" @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="mini" @click="getEnabledRoleList(row.id)">角色</el-button>
              <el-popconfirm title="確定要刪除這條數據嗎？" confirm-button-text="確定" @onConfirm="deleteEmployee(row.id)">
                <el-button slot="reference" size="mini" type="text" style="margin-left: 10px">刪除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination layout="total, prev, pager, next" :total="total" @current-change="changePage" />
        </el-row>
      </div>
      <!-- 導入excel組件 -->
      <ImportExcel :import-dialog.sync="importDialog" @uploadSuccess="getEmployeeList" />
    </div>
    <!-- 分配角色彈層 -->
    <el-dialog title="分配角色" :visible.sync="assignDialog" width="500px">
      <el-checkbox-group v-model="enabledRoleIds">
        <el-checkbox v-for="item in enabledRoleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-button type="primary" size="small" @click="confirmAssign">確定</el-button>
        <el-button size="small" @click="assignDialog = false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from 'file-saver' // 導出excel時所用file-saver包, 下載Blob文件
import ImportExcel from './components/ImportExcel.vue'
import { getDepartmentList } from '@/api/department'
import { departmentRender } from '@/utils'
import { getEmployeeList, exportEmployee, deleteEmployee, getEnabledRoleList, getEmployeeDetails, assignRole } from '@/api/employee'
export default {
  name: 'Employee',
  components: { ImportExcel },
  data() {
    return {
      depts: [], // 部門數據
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 存儲查詢參數
      queryParams: {
        page: 1,
        pagesize: 10,
        keyword: '',
        departmentId: null // 部門節點
      },
      EmployeeList: [], // 員工列表
      total: null, // 員工總數(區分各部門)
      importDialog: false, // 導入彈窗
      assignDialog: false, // 分配角色彈層
      enabledRoleList: [], // 角色列表
      enabledRoleIds: [], // 雙向綁定數據用(勾選複選框所拿到的id值, 將回傳給後端接口)
      currentUserId: null // 用來記錄當前點擊的用戶id
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    // 獲取部門數據
    async getDepartmentList() {
      const result = await getDepartmentList()
      this.depts = departmentRender(result, 0)
      // 設置初始化目標節點
      this.queryParams.departmentId = this.depts[0].id
      this.$nextTick(() => {
        // 設定樹形結構中選中節點的方法
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      this.getEmployeeList()
    },
    // 樹形結構節點切換
    selectNode(node) {
      this.queryParams.departmentId = node.id // 更換部門
      this.queryParams.page = 1 // 切換部門, 顯示第一頁數據
      this.getEmployeeList()
    },
    // 獲取員工列表
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.EmployeeList = rows
      this.total = total
    },
    // 換頁更新員工列表數據
    changePage(newPage) {
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    // 員工查詢(防抖)
    changeValue() {
      // 先清除計時器再開啟, this的實例上賦值了一个timer的属性
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)
    },
    // excel導出
    async exportEmployee() {
      const result = await exportEmployee()
      // 使用一个npm包 直接將blob文件下載到本地 file-saver
      // FileSaver.saveAs(blob對象,文件名稱)
      FileSaver.saveAs(result, '員工資訊表.xlsx') // 下載文件
    },
    // 刪除員工
    async deleteEmployee(id) {
      await deleteEmployee(id)
      if (this.EmployeeList.length === 1 && this.queryParams.page > 1) {
        this.queryParams.page--
      }
      this.getEmployeeList()
      this.$message.success('刪除員工成功')
    },
    // 獲取已啟用角色列表(分配角色)
    async getEnabledRoleList(id) {
      this.enabledRoleList = await getEnabledRoleList()
      const { roleIds } = await getEmployeeDetails(id)
      this.enabledRoleIds = roleIds
      this.currentUserId = id
      this.assignDialog = true
    },
    // 確認角色分配
    async confirmAssign() {
      await assignRole(this.currentUserId, this.enabledRoleIds)
      this.$message.success('分配角色成功')
      this.assignDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    display: flex;
    background: #fff;
     .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    width: 100%;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
  }
</style>
