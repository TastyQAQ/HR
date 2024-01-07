<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="name">{{ userName[0] }}</span>
          <span class="username">{{ userName }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首頁
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/TastyQAQ/HR.git">
            <el-dropdown-item>項目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="passwordDialog = true">
            <el-dropdown-item>修改密碼</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="logoutConfirmDialog = true">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 登出彈層 -->
    <el-dialog :visible.sync="logoutConfirmDialog" center title="提示" width="500px" :append-to-body="true">
      <span style="display:block;">確定要登出嗎?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logout">確定</el-button>
        <el-button @click="logoutConfirmDialog = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 修改密碼彈層 -->
    <el-dialog :visible.sync="passwordDialog" title="修改密碼" width="500px" :append-to-body="true" @close="cancelPassword">
      <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="120px">
        <el-form-item label="舊密碼" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" size="small" />
        </el-form-item>
        <el-form-item label="新密碼" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" size="small" />
        </el-form-item>
        <el-form-item label="確認新密碼" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="updatePassword">確定</el-button>
          <el-button size="mini" @click="cancelPassword">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      logoutConfirmDialog: false, // 登出彈層
      passwordDialog: false, // 修改密碼彈層
      passwordForm: { // 修改密碼表單
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: { // 修改密碼表單校驗規則
        oldPassword: [
          { required: true, message: '舊密碼不可為空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密碼不可為空', trigger: 'blur' },
          { min: 6, max: 16, message: '密碼長度應為6-16碼', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '確認密碼不可為空', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === this.passwordForm.newPassword) {
              callback()
            } else {
              callback(new Error('新密碼與確認密碼不一致'))
            }
          }, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userName'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.logoutConfirmDialog = false
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    updatePassword() {
      this.$refs.passwordForm.validate(async isOk => {
        if (isOk) {
          await updatePassword(this.passwordForm)
          this.$message.success('修改密碼成功')
          this.cancelPassword()
          this.logout()
        }
      })
    },
    cancelPassword() {
      this.$refs.passwordForm.resetFields() // 重置表單
      this.passwordDialog = false // 關閉彈層
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .name {
          width: 30px;
          height: 30px;
          background-color: #04c9be;
          text-align: center;
          line-height: 30px;
          color: #fff;
          border-radius: 50%;
          margin-right: 4px;
        }
        .username {
          margin-right: 10px;
          font-size: 16px;
        }
        .el-icon-setting {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
