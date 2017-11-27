# vue-birthday-input
vue 生日输入组件

[![npm](https://img.shields.io/npm/v/vue-birthday-input.svg)](https://www.npmjs.com/package/vue-birthday-input)
[![npm](https://img.shields.io/npm/dt/vue-birthday-input.svg)](https://www.npmjs.com/package/vue-birthday-input)
[![npm](https://img.shields.io/npm/dm/vue-birthday-input.svg)](https://www.npmjs.com/package/vue-birthday-input)
[![Build Status](https://travis-ci.org/xanke/vue-birthday-input.svg?branch=master)](https://travis-ci.org/xanke/vue-birthday-input)
[![Codecov](https://img.shields.io/codecov/c/github/xanke/vue-birthday-input.svg)](https://codecov.io/gh/xanke/vue-birthday-input)
[![npm](https://img.shields.io/npm/l/vue-birthday-input.svg)](http://opensource.org/licenses/MIT)


#### 加入模块
```js
import Vue from 'vue'
import birthdayInput from 'vue-birthday-input'

export default {
  name: 'App',

  components: {
    birthdayInput
  }
}
```

### 快速开始
```vue
<template>
  <vue-numeric v-model="birthday"></vue-numeric>
</template>

<script>
import birthdayInput from 'vue-birthday-input'

export default {
  name: 'App',

  components: {
    birthdayInput
  },

  data: () => ({
    birthday: ''
  }),
}
</script>
```

## Props
|参数|说明|必须|类型|可选值|默认值|
|-----|-----------|--------|----|----|-------|
|placeholder|占位符|否|String|—|出生日期|
|formatView|显示格式|否|String|yyyy/mm/dd / yyyy-mm-dd / mm/dd/yyyy|yyyy年mm月dd日|
|format|输出格式|否|String|符合moment.format即可|YYYYMMDD|

## License

Vue-birthday-input is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)