<template>
  <div class="container">
    <div class="app-container">
      <div class="add-role">
        <el-button size="mini" type="primary" @click="addRoleDialog = true">添加角色</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%">
        <el-table-column prop="name" label="角色" align="center">
          <template v-slot="{row}">
            <!-- 編輯狀態樣式 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="啟用" align="center">
          <!-- v-slot="{row}"可以獲取當行的數據 -->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" size="mini" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1 ? '已啟用' : row.state === 1 ? '未啟用' : '無' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
          <template v-slot="{row}">
            <!-- 編輯狀態樣式 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{row}">
            <!-- 編輯狀態樣式 -->
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="confirmEdit(row)">確定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text" @click="assignPermission(row.id)">分配權限</el-button>
              <el-button size="mini" type="text" @click="rowEdit(row)">編輯</el-button>
              <el-popconfirm title="確定要刪除這條數據嗎？" confirm-button-text="確定" @onConfirm="deleteRole(row.id)">
                <el-button slot="reference" size="mini" type="text" style="margin-left: 10px">刪除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="height:60px" align="middle">
        <el-pagination layout="prev, pager, next" :total="pageParams.total" :page-size="pageParams.pagesize" :current-page="pageParams.page" @current-change="changePage" />
      </el-row>
    </div>
    <!-- 新增角色彈層 -->
    <el-dialog title="新增角色" :visible.sync="addRoleDialog" width="500px">
      <el-form ref="addRole" label-width="120px" :model="addForm" :rules="addrule">
        <el-form-item label="角色名稱" prop="name">
          <el-input v-model="addForm.name" size="mini" style="width:300px" />
        </el-form-item>
        <el-form-item label="啟用">
          <el-switch v-model="addForm.state" size="mini" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addForm.description" type="textarea" style="width:300px" :rows="3" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="addRole">確定</el-button>
              <el-button size="mini" @click="addClose">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分配權限彈層 -->
    <el-dialog title="分配權限" :visible.sync="assignDialog" width="500px">
      <el-tree ref="assignPermission" :data="permissionData" :props="{ label: 'name' }" show-checkbox default-expand-all node-key="id" :default-checked-keys="permIds" />
      <el-row slot="footer" type="flex" justify="center">
        <el-button type="primary" size="small" @click="confirmAssign">確定</el-button>
        <el-button size="small" @click="assignDialog = false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, deleteRole, editRole, getRoleDetails, assignPermission } from '@/api/role'
import { departmentRender } from '@/utils'
import { getPermission } from '@/api/permission'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [], // 角色列表
      pageParams: { // 分頁請求數據
        page: 1, // 頁數
        pagesize: 5, // 每頁顯示數據數量
        total: 0 // 總數
      },
      addRoleDialog: false, // 新增角色彈層控件
      addForm: { // 新增角色表單
        name: '',
        description: '',
        state: 0 // 默認值為1(啟用), 0為未啟用
      },
      addrule: { // 新增角色表單驗證規則
        name: [
          { required: true, message: '角色名稱不可為空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不可為空', trigger: 'blur' }
        ]
      },
      assignDialog: false, // 分配權限彈層控件
      permissionData: [], // 權限列表資料
      permIds: [], // 權限點列表, 雙向綁定數據用(勾選複選框所拿到的id值, 將回傳給後端接口)
      currentId: null // 當前角色id
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 編輯角色狀態(行內編輯)
    rowEdit(row) {
      // 將選中的角色更改為編輯狀態(行內表單樣式)
      row.isEdit = true
      // 更新緩存數據(避免改到一半取消, 下次點編輯數據回顯不一致)
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    // 更新角色
    async confirmEdit(row) {
      if (row.editRow.name && row.editRow.description) {
        await editRole({ ...row.editRow, id: row.id })
        this.$message.success('編輯角色成功')
        // row.name = row.editRow.name // eslint的一校驗 誤判(await後不能再對row進行操作)
        // Object.assign(target, source)
        Object.assign(row, { ...row.editRow, isEdit: false // 退出編輯模式
        }) // 規避eslint的誤判
      } else {
        this.$message.warning('角色名稱和角色描述不可為空')
      }
    },
    // 刪除角色
    async deleteRole(id) {
      await deleteRole(id)
      this.$message.success('刪除角色成功')
      // 判斷是否為當前頁面的最後一個數據, 若是, 則將當前頁數減1並重新渲染
      if (this.roleList.length === 1) {
        this.pageParams.page--
      }
      this.getRoleList()
    },
    // 獲取角色列表
    async getRoleList() {
      // 解構獲取data裡的rows
      const { rows, total } = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
      // 遍歷每個角色, 將其添加isEdit屬性, 供判斷編輯狀態使用
      this.roleList.forEach(ele => {
        // 數據響應式的問題  數據變化 視圖更新
        // 添加的動態属性 不具備響應式特點
        // this.$set(目標對象, 属性名稱, 初始值) 可以針對目標對象 添加的属性 添加響應式 (等同計算屬性內的get()set())
        this.$set(ele, 'isEdit', false)
        // 添加編輯時可隨意修改的屬性(方便取消編輯時原始數據不改變)
        this.$set(ele, 'editRow', {
          name: ele.name,
          state: ele.state,
          description: ele.description
        })
      })
    },
    // newPage為current-change事件默認傳遞的回調參數, 值為當前頁面
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    // 關閉新增角色彈層並重置表單
    addClose() {
      this.$refs.addRole.resetFields()
      this.addRoleDialog = false
    },
    // 新增角色並重新渲染列表
    addRole() {
      this.$refs.addRole.validate(async(isOk) => {
        if (isOk) {
          await addRole(this.addForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.addClose()
        }
      })
    },
    // 分配權限渲染彈層
    async assignPermission(id) {
      this.permissionData = departmentRender(await getPermission(), 0)
      this.currentId = id
      const { permIds } = await getRoleDetails(id)
      this.permIds = permIds
      this.assignDialog = true
    },
    // 確認權限分配
    async confirmAssign() {
      await assignPermission(this.currentId, this.$refs.assignPermission.getCheckedKeys())
      this.$message.success('權限分配成功')
      this.assignDialog = false
    }
  }

}
</script>

<style scoped>
.add-role {
  padding: 10px;
}
</style>
