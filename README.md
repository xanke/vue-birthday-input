# vue-birthday-input
vue 生日输入组件

[![npm](https://img.shields.io/npm/v/vue-birthday-input.svg)](https://www.npmjs.com/package/vue-birthday-input)
[![npm](https://img.shields.io/npm/dt/vue-birthday-input.svg)](https://www.npmjs.com/package/vue-birthday-input)
[![npm](https://img.shields.io/npm/dm/vue-birthday-input.svg)](https://www.npmjs.com/package/vue-birthday-input)
[![Build Status](https://travis-ci.org/kevinongko/vue-birthday-input.svg?branch=master)](https://travis-ci.org/kevinongko/vue-birthday-input)
[![Codecov](https://img.shields.io/codecov/c/github/kevinongko/vue-birthday-input.svg)](https://codecov.io/gh/kevinongko/vue-birthday-input)
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
|Props|Description|Required|Type|Default|
|-----|-----------|--------|----|-------|
|placeholder|Placeholder|false|String|'出生日期'|

## License

Vue-Numeric is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)