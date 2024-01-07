<template>
  <el-cascader :options="treeData" :props="props" size="mini" separator="-" :value="value" placeholder="請選擇" @change="changeValue" />
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { departmentTreeData } from '@/utils/index'
export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      treeData: [], // 賦值给 級聯组件的options
      props: {
        value: 'id', // 要存儲的字段
        label: 'name' // 要展示的字段
      }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      this.treeData = departmentTreeData(await getDepartmentList(), 0) // 將组織架構的數據 轉化樹形賦值给treeData
    },
    changeValue(value) {
      // value為當前選中節點的值, 數組包含選中部門及其父級以上部門的id
    //   console.log(value)
      if (value.length > 0) {
        this.$emit('input', value[value.length - 1]) // 數組最後一個值為當前部門id
      } else {
        this.$emit('input', null) // 說明未選擇部門或無部門數據
      }
    }
  }
}
</script>

<style>

</style>
