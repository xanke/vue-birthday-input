<template>
  <input
    id="vueBirthdayInput"
    ref="vueBirthdayInput"
    :placeholder="placeholder"

    @focus="onFocusHandler"
    @click="onFocusHandler"

    @mouseover="onMouseoverHandel"
    @mouseout="onMouseoutHandel"

    v-model="birthday"
  >
</template>

<script>
import moment from 'moment'

const inputDefault = 'yyyy年mm月dd日'
export default {
  name: 'vue-birthday-input',
  props: {
    //placeholder.
    placeholder: {
      default: '出生日期',
      required: false,
      type: String,
    },
  },
  data: () => ({
    birthday: '',
    pos: 0,
    
  }),
  watch: {
    // birthday (newValue) {
    //   console.log(newValue)
    // }

  },
  methods: {
    //获得焦点事件
    onFocusHandler (e) {
      this.$emit('focus', e)
      this.setCaretPosition(this.pos)
    },
    //鼠标经过
    onMouseoverHandel (e) {
      if (this.birthday == '') {
        this.birthday = inputDefault
        this.pos = 0
      }
    },
    //鼠标退出
    onMouseoutHandel (e) {
      if (this.birthday == inputDefault) {
        this.birthday = ''
      }
    },
    // 获取光标位置
    getCursortPosition(ctrl) {
      var CaretPos = 0   // IE Support
      if (document.selection) {
          ctrl.focus()
          var Sel = document.selection.createRange()
          Sel.moveStart ('character', - ctrl.value.length)
          CaretPos = Sel.text.length
      }
      // Firefox support
      else if (ctrl.selectionStart || ctrl.selectionStart == '0')
          CaretPos = ctrl.selectionStart
      return (CaretPos)
    },
    // 设置光标位置
    setCaretPosition(pos) {
      let textDom = document.getElementById('vueBirthdayInput')
      if(textDom.setSelectionRange) {
        // IE Support
        textDom.focus()
        // setTimeout(()=>{
          textDom.setSelectionRange(pos, pos + 1)
        // }, 0)

      } else if (textDom.createTextRange) {
        // Firefox support
        let range = textDom.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    }
  },

  watch: {
    birthday (nVal) {
      console.log(nVal)
      if (nVal === inputDefault || !nVal) {
        return
      }
      let pos = this.pos = this.pos + 1
      this.setCaretPosition(pos)
      this.$emit('change', nVal)
    }
  },

  mounted () {
  }
}
</script>
