<template>
  <div class="container">
    <div class="app-container">
      <el-card class="cardBox">
        <div class="employeeInfoBox">
          <el-avatar :src="userInfo.staffPhoto" :size="100" />
          <div class="employeeInfo">
            <p>
              <span>
                <span class="userName">{{ userInfo.username }}</span>
                <span class="inServiceStatus">{{ userInfo.inServiceStatus=1?'在職':'離職' }}</span>
              </span>
            </p>
            <p>
              <span>最新工資基數</span>
              <span>入職時間 {{ userInfo.timeOfEntry }}</span>
              <span>連絡電話 {{ userInfo.mobile }}</span>
            </p>
            <p>
              <span>
                <span>本月不繳納保險 </span>
                <el-switch v-model="socialInfo.enterprisesPaySocialSecurityThisMonth" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" />
              </span>
              <span>
                <span>本月不繳納公積金 </span>
                <el-switch v-model="socialInfo.enterprisesPayTheProvidentFundThisMonth" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" />
              </span>
            </p>
          </div>
        </div>
      </el-card>
      <el-card class="cardBox socialCard">
        <el-form size="mini" label-width="100px" :model="socialInfo" :rules="rules">
          <el-form-item label="投保城市" required>
            <el-select v-model="socialInfo.participatingInTheCityId">
              <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="保險類型" required>
            <el-select v-model="socialInfo.socialSecurityType">
              <el-option label="首次開戶" :value="1" />
              <el-option label="非首次開戶" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="戶籍類型" required>
            <el-select v-model="socialInfo.householdRegistrationType">
              <el-option label="本市城鎮" :value="1" />
              <el-option label="本市農村" :value="2" />
              <el-option label="外埠城鎮" :value="3" />
              <el-option label="外埠農村" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="保險基數" prop="socialSecurityBase">
            <el-input v-model="socialInfo.socialSecurityBase" style="width: 38%;" />
            <span>（基数范围是3387 ~ 25401）</span>
          </el-form-item>
          <el-form-item label="工傷比例" prop="industrialInjuryRatio">
            <el-input v-model="socialInfo.industrialInjuryRatio" style="width: 38%;" />
            <span>（比例范围是0.2％ ~ 3％，推荐0.2％）</span>
          </el-form-item>
          <el-form-item label="保險繳納">
            <el-form-item label="個人" label-width="74px" style="display: inline-block">
              <el-input v-model="socialPersonal" style="width: 100%;" disabled />
            </el-form-item>
            <el-form-item label="公司" label-width="74px" style="display: inline-block">
              <el-input v-model="socialCompany" style="width: 100%;" disabled />
            </el-form-item>
            <el-table :data="citySocial" :header-cell-style="{background: '#f5f6f8'}">
              <el-table-column label="繳費項目" prop="name" />
              <el-table-column label="企業基數">{{ socialInfo.socialSecurityBase }}</el-table-column>
              <el-table-column label="企業比例">
                <template slot-scope="scope">
                  <span>{{ scope.row.scaleCompany }}%</span>
                </template>
              </el-table-column>
              <el-table-column label="企業繳納">
                <template slot-scope="scope">
                  <el-input :value="(socialInfo.socialSecurityBase * scope.row.scaleCompany / 100).toFixed(2)" disabled />
                </template>
              </el-table-column>
              <el-table-column label="個人基數" />
              <el-table-column label="個人比例">
                <template slot-scope="scope">
                  <span>{{ scope.row.scalePersonal }}%</span>
                </template>
              </el-table-column>
              <el-table-column label="個人繳納">
                <template slot-scope="scope">
                  <el-input :value="(socialInfo.socialSecurityBase * scope.row.scalePersonal / 100).toFixed(2)" disabled />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="保險備註">
            <el-input v-model="socialInfo.socialSecurityNotes" type="textarea" maxlength="300" show-word-limit style="width: 38%;" />
          </el-form-item>
          <el-form-item label="公積金城市" required>
            <el-select v-model="socialInfo.providentFundCityId">
              <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="公積金基數" prop="providentFundBase">
            <el-input v-model="socialInfo.providentFundBase" style="width: 38%;" />
            <span>（基数范围是2273 ~ 25401）</span>
          </el-form-item>
          <el-form-item label="企業比例" prop="enterpriseProportion">
            <el-input v-model="socialInfo.enterpriseProportion" style="width: 38%;" />
            <span>（比例范围是5％ ~ 12％，推荐12％）</span>
          </el-form-item>
          <el-form-item label="個人比例" prop="personalProportion">
            <el-input v-model="socialInfo.personalProportion" style="width: 38%;" />
            <span>（比例范围是5％ ~ 12％，推荐12％）</span>
          </el-form-item>
          <el-form-item label="公積金繳納">
            <el-form-item label="個人" label-width="74px" style="display: inline-block" prop="personalProvidentFundPayment">
              <el-tooltip :content="`請輸入有效值。最接近的兩個有效值分別是${Math.floor(socialInfo.personalProvidentFundPayment)}和${Math.floor(socialInfo.personalProvidentFundPayment) + 1}。`" :visible-arrow="false" :open-delay="1000" placement="bottom" effect="light">
                <el-input v-model="socialInfo.personalProvidentFundPayment" style="width: 100%;" />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="公司" label-width="74px" style="display: inline-block" prop="enterpriseProvidentFundPayment">
              <el-tooltip :content="`請輸入有效值。最接近的兩個有效值分別是${Math.floor(socialInfo.enterpriseProvidentFundPayment)}和${Math.floor(socialInfo.enterpriseProvidentFundPayment) + 1}。`" :visible-arrow="false" :open-delay="1000" placement="bottom" effect="light">
                <el-input v-model="socialInfo.enterpriseProvidentFundPayment" style="width: 100%;" />
              </el-tooltip>
            </el-form-item>
            <span>（为自动测算结果，可手动调整）</span>
          </el-form-item>
          <el-form-item label="公積金備註">
            <el-input v-model="socialInfo.providentFundNotes" type="textarea" maxlength="300" show-word-limit style="width: 38%;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveSocialInfo">保存</el-button>
            <el-button @click="$router.push('/social')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getCityList, getCitySocial, saveSocialInfo } from '@/api/social'
export default {
  data() {
    return {
      userInfo: {},
      socialInfo: {},
      cityList: [],
      citySocial: [],
      rules: {
        socialSecurityBase: [
          { required: true, message: '請輸入保險基數', trigger: 'blur' },
          { validator: (rule, value, callback) => { return value >= 3387 && value <= 25401 ? callback() : callback('請不要超出範圍, 基數範圍是3387 ~ 25401') }, trigger: 'blur' }
        ],
        industrialInjuryRatio: [
          { required: true, message: '請輸入工傷比例', trigger: 'blur' },
          { validator: (rule, value, callback) => { return value >= 0.2 && value <= 3 ? callback() : callback('請不要超出範圍, 比例範圍是0.2% ~ 3%') }, trigger: 'blur' }
        ],
        providentFundBase: [
          { required: true, message: '請輸入公積金基數', trigger: 'blur' },
          { validator: (rule, value, callback) => { return value >= 2273 && value <= 25401 ? callback() : callback('請不要超出範圍, 基數範圍是2273 ~ 25401') }, trigger: 'blur' }
        ],
        enterpriseProportion: [
          { required: true, message: '請輸入企業比例', trigger: 'blur' },
          { validator: (rule, value, callback) => { return value >= 5 && value <= 12 ? callback() : callback('請不要超出範圍, 比例範圍是5%~12%') }, trigger: 'blur' }
        ],
        personalProportion: [
          { required: true, message: '請輸入個人比例', trigger: 'blur' },
          { validator: (rule, value, callback) => { return value >= 5 && value <= 12 ? callback() : callback('請不要超出範圍, 比例範圍是5%~12%') }, trigger: 'blur' }
        ],
        personalProvidentFundPayment: [
          { required: true, message: '請輸入個人公積金繳納數額', trigger: 'change' }
        ],
        enterpriseProvidentFundPayment: [
          { required: true, message: '請輸入企業公積金繳納數額', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    socialPersonal() {
      const scale = this.citySocial.map(ele => {
        return Number(ele.scalePersonal)
      }).reduce((prev, current) => {
        return prev + current
      }, 0)
      return (this.socialInfo.socialSecurityBase * scale / 100).toFixed(2)
    },
    socialCompany() {
      const scale = this.citySocial.map(ele => {
        return Number(ele.scaleCompany)
      }).reduce((prev, current) => {
        return prev + current
      }, 0)
      return (this.socialInfo.socialSecurityBase * scale / 100).toFixed(2)
    }
  },
  created() {
    this.getUserInfo()
    this.getCityList()
  },
  methods: {
    async getUserInfo() {
      const result = await getUserInfo(this.$route.params.id)
      this.userInfo = result.user
      this.socialInfo = result.userSocialSecurity
      this.socialInfo.personalProvidentFundPayment = (result.userSocialSecurity.providentFundBase * result.userSocialSecurity.personalProportion / 100).toFixed(2)
      this.socialInfo.enterpriseProvidentFundPayment = (result.userSocialSecurity.providentFundBase * result.userSocialSecurity.enterpriseProportion / 100).toFixed(2)
      const citySocialResult = await getCitySocial(this.socialInfo.participatingInTheCityId)
      this.citySocial = citySocialResult
    },
    async getCityList() {
      const result = await getCityList()
      this.cityList = result
    },
    async saveSocialInfo() {
      const result = await saveSocialInfo(this.$route.params.id, this.socialInfo)
      if (result === null) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    .cardBox {
        padding: 20px 15px;
        margin-bottom: 10px;
        .employeeInfoBox {
          display: flex;
          align-items: center;
          .employeeInfo {
            margin-left: 35px;
            p>span {
              margin-right: 35px;
            }
            .userName {
              font-weight: bold;
            }
            .inServiceStatus {
              display: inline-block;
              color: white;
              background-color: #67c23a;
              padding: 3px;
              border-radius: 3px;
              font-size: 12px;
              margin-left: 5px;
            }
          }
        }
    }
    .socialCard {
      padding: 10px 40px;
    }
}
</style>
