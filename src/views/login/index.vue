<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登入</h1>
      <el-card class="login-card" shadow="never">
        <el-form ref="form" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="請輸入手機號碼(13800000002)" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="請輸入密碼(hm#qd@23!)" type="password" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="ruleForm.isAgree">用戶平台使用協議</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 350px" @click="login">登入</el-button>
          </el-form-item>
        </el-form>
        <div class="change-login">
          <el-button style="width: 170px">手機登入</el-button>
          <el-button style="width: 170px">QRcode登入</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: process.env.NODE_ENV === 'development'
      },
      rules: {
        mobile: [
          { required: true, message: '請輸入手機號碼', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手機號碼格式錯誤', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, max: 16, message: '密碼長度應為6-16碼', trigger: 'blur' }
        ],
        isAgree: [
          { validator: (rule, value, callback) => {
            value ? callback() : callback(new Error('請勾選同意協議'))
          } }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.$store.dispatch('user/login', this.ruleForm)
          this.$router.push('/')
        }
      })
    }

  }
}
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  display: flex;
}
.logo {
  width: 58%;
  background: url(../../assets/login_back.5ecbf4ab.png) no-repeat center / cover;
  border-radius: 0 60px 0 0;
}
.form {
  width: 42%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 176px;
}
.login-card {
  border: 0;
}
.el-card__body {
  padding: 0;
}
.el-input {
  width: 350px;
  height: 44px;
}
</style>
