<template>
  <div class="container">
    <div class="app-container">
      <el-card>
        <div class="basicInfoBox">
          <img src="https://heimahr.itheima.net/static/img/img.0615818f.jpeg" alt="">
          <div class="basicInfo">
            <p>
              <span class="state">離職</span>
            </p>
            <p class="time">
              <span>入職時間:</span>
              <span>最新工資:<span class="num">NaN</span></span>
              <el-tooltip content="員工所有調薪後的基本工資、崗位工資合計" placement="bottom-start" effect="light">
                <span class="tip">?</span>
              </el-tooltip>
            </p>
            <p>
              <span>當月基本工資 / 當月崗位工資: /</span>
            </p>
          </div>
        </div>
        <div class="allowance">
          <h4>津貼</h4>
          <div>
            <ul>
              <li>
                <h4>津貼類型</h4>
                <p>交通補助</p>
                <p>午餐補助</p>
              </li>
              <li>
                <h4>補貼金額</h4>
                <p>100.00</p>
                <p>100.00</p>
              </li>
              <li>
                <h4>津貼類型</h4>
                <p>通訊補助</p>
                <p>住房補助</p>
              </li>
              <li>
                <h4>補貼金額</h4>
                <p>100.00</p>
                <p>100.00</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="social">
          <h4>保險公積金<span>企業 --</span><span>個人 --</span></h4>
          <div class="pay">
            <ul>
              <li>
                <h4>繳費項目</h4>
                <p>保險</p>
                <p>公積金</p>
                <p>繳費合計</p>
              </li>
              <li>
                <h4>基數</h4>
                <p>--</p>
                <p>--</p>
                <p>--</p>
              </li>
              <li>
                <h4>企業繳納</h4>
                <p>--</p>
                <p>--</p>
                <p>--</p>
              </li>
              <li>
                <h4>個人繳納</h4>
                <p>--</p>
                <p>--</p>
                <p>--</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="total">
          <el-form label-position="left">
            <el-form-item label="實際出勤天數(正式) :" label-width="180px" style="width: 50%;">
              <el-input placeholder="0" disabled />
            </el-form-item>
            <el-form-item label="計薪天數(正式) :" label-width="180px" style="width: 50%;">
              <el-input placeholder="0" disabled />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.basicInfoBox {
  display: flex;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.basicInfo {
  margin-left: 10px;
  line-height: 25px;
  span {
    display: inline-block;
    &.state {
      display: inline;
      padding: 4px 10px;
      background-color: #f56c6c;
      color: white;
      font-size: 12px;
      border-radius: 3px;
      margin-left: 10px;
    }
    &.num {
      margin: 0 10px;
    }
    &.tip {
      color: #666;
      border: 1px solid #666;
      border-radius: 50px;
      width: 16px;
      text-align: center;
      margin-left: 40px;
      line-height: 14px;
      font-size: 12px;
    }
  }
  .time {
    padding: 16px 0;
  }
}
.allowance {
  ul {
    background-color: #f9f9f9;
    display: flex;
    list-style: none;
    li {
      width: 25%;
      text-align: center;
      h4 {
        margin-bottom: 0;
      }
    }
  }
}
.social {
  h4 {
    span {
      font-weight: normal;
      padding: 0 80px;
    }
  }
  ul {
    background-color: #f9f9f9;
    display: flex;
    list-style: none;
    li {
      width: 25%;
      text-align: center;
      h4 {
        margin-bottom: 0;
      }
    }
  }
}
</style>
