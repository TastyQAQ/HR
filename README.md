此項目使用VScode編輯器撰寫, 以Vue2版本並基於Vue CLI架設

所有獲取數據之接口為中國「黑馬程序員」機構所創建, 因此會有許多簡體字

考勤、保險、薪資、審批頁面尚未完成

模板代碼作者為https://github.com/PanJiaChen/vue-admin-template.git , 下面有作者模板的詳細介紹 

# 人力資源管理系統
<img src="https://img.onl/xQtoQ0">

###### 此項目為人力資源管理系統, 模擬管理員對公司各部門、員工、職務等等相關操作

## 登入頁

##### 已設置默認登入帳號密碼, 若想

**添加**
<img src="https://img.onl/4pWWGr">

**編輯**
<img src="https://img.onl/9INCQa">

**刪除**
<img src="https://img.onl/9WN1Og">

## 其他

- [x] 登入
- [x] 登出
- [x] 修改密碼...

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

線上演示地址(黑馬程序員架設): https://heimahr.itheima.net

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
