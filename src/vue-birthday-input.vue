<template>
  <input
    :placeholder="placeholder"
  >
</template>

<script>
export default {
  name: 'vue-birthday-input',
  props: {
    //placeholder.
    placeholder: {
      default: '出生日期',
      required: false,
      type: String,
    }
  },

  methods: {
  },

  watch: {
  },

  mounted () {
  }
}
</script>
