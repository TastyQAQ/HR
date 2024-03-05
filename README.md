此項目使用VScode編輯器撰寫, 以Vue2版本並基於Vue CLI架設

主要使用工具包含element-ui組件庫及axios請求工具等等

所有獲取數據之接口為中國「黑馬程序員」機構所創建, 因此會有許多簡體字

考勤、保險、薪資、審批頁面尚未完成

模板代碼作者為https://github.com/PanJiaChen/vue-admin-template.git , 下面會有作者模板的詳細介紹 

# 人力資源管理系統

###### 此項目為人力資源管理系統, 模擬管理員對公司各部門、員工、職務等等相關操作
<img src="https://img.onl/xQtoQ0">

## 登入頁

##### 已設置默認登入帳號密碼, 登入時會依據用戶職務權限渲染可訪問的頁面
<img src="https://img.onl/nlDycD">

## 首頁

##### 公司部分數據顯示, 包含人數、員工、近期通知等等, 配合ECharts圖表及vue-count-to數字滾動插件美化數據顯示
<img src="https://img.onl/xQtoQ0">

## 組織

##### 所有部門展示及相關操作, 添加子部門、編輯部門、刪除部門
<img src="https://img.onl/7azSb8">
<img src="https://img.onl/4pWWGr" height="220px">
<img src="https://img.onl/DKfeyF" height="220px">
<img src="https://img.onl/VYpiO8" height="220px">

## 職務

##### 所有職務描述及相關操作, 添加職務、分配職務權限(可訪問的頁面或部分操作)、編輯職務、刪除職務
<img src="https://img.onl/w6u9b">

## 員工

##### 所有員工相關資料及操作, 可依照各部門顯示該部門員工, 亦可以直接搜尋
##### 查看按鈕可修各員工資料、角色按鈕可設定該員工的職務, 另有excel導出及導入功能, 可依照固定格式上傳員工資料或使用file-saver插件將員工資料下載成excel檔案
<img src="https://img.onl/za5L2">

## 權限

##### 所有權限展示及相關操作, 添加權限(及子權限)、編輯權限、刪除權限
<img src="https://img.onl/xllvVp">

## 安裝

```bash
# 取得專案
git clone https://github.com/TastyQAQ/HR

# 進入專案
cd Vue2_HR

# 安裝套件
npm install

# 運行專案
npm run dev
```
會自動於瀏覽器開啟http://localhost:9528

另有黑馬程序員所架設之線上演示地址: https://heimahr.itheima.net

# 主要工具

* Vue v2.7.0
* Vue Router v3.0.6
* Vuex v3.1.0
* element-ui v2.13.2
* axios v0.18.1

-------------------------以下為模板代碼作者的模板介紹------------------------------
# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template


**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

<p align="center">
  <b>SPONSORED BY</b>
</p>
<p align="center">
   <a href="https://finclip.com?from=vue_element" title="FinClip" target="_blank">
      <img height="200px" src="https://gitee.com/panjiachen/gitee-cdn/raw/master/vue%E8%B5%9E%E5%8A%A9.png" title="FinClip">
   </a>
</p>

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
