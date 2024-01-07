<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" :props="defaultProps" default-expand-all :expand-on-click-node="false">
        <!-- v-slot="{ node, data }" 可以獲取父組件節點和數據 -->
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event表示type(add、edit、del), data.id傳遞父級id, 紀錄是在哪個部門下進行操作 -->
              <el-dropdown @command="handleCommand($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部門</el-dropdown-item>
                  <el-dropdown-item command="edit">編輯部門</el-dropdown-item>
                  <el-dropdown-item command="del">刪除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- ref可以獲取dom實例對象, 也可以獲取自定義組件實例對象(在自定義組件中使用ref等同於自定義組件的this, 使父組件得以調用子組件中的方法) -->
    <AppDept ref="addDept" :dialog-visible.sync="dialogVisible" :current-node-id="currentNodeId" @updateDepartment="getDepartmentList" />
  </div>
</template>

<script>
import { getDepartmentList, delDepartment } from '@/api/department'
import { departmentRender } from '@/utils'
import AppDept from './components/AppDept.vue'
export default {
  name: 'Department',
  components: {
    AppDept
  },
  data() {
    return {
      depts: [], // 部門數據
      defaultProps: {
        children: 'children', // 分支
        label: 'name' // 綁定數據屬性名稱
      },
      dialogVisible: false, // 彈層控鍵
      currentNodeId: null // 存儲當前點擊的id
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    // 獲取部門數據
    async getDepartmentList() {
      const result = await getDepartmentList()
      // 利用遞歸函數使數據符合樹形結構
      this.depts = departmentRender(result, 0)
    },
    // 點擊下拉菜單(新增、編輯、刪除)觸發
    handleCommand(type, id) {
      if (type === 'add') {
        this.dialogVisible = true
        this.currentNodeId = id
      }
      if (type === 'edit') {
        this.dialogVisible = true
        this.currentNodeId = id // 更新props-異步操作
        // 調用子組件方法獲取部門詳情(同步操作)
        // 使用nextTick(), 使dom更新完畢後(子組件props更新後), 再去調用方法, 才能獲取到currentNodeId
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      }
      if (type === 'del') {
        // element-ui中MessageBox的全局方法
        this.$confirm('您確定要刪除此部門嗎?', {
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then(async() => {
          await delDepartment(id)
          this.$message.success('删除部門成功')
          this.getDepartment()
        }).catch(() => {})
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 80px;
  display: inline-block;
  margin: 10px;
}
</style>
