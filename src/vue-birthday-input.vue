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
    v-on:keyup.delete="onDeleteHander"
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
    verification: false
  }),
  computed: {
 
  },
  methods: {
    //获得焦点事件
    onFocusHandler (e) {
      this.$emit('focus', e)
      let pos = this.pos
      let fpos = this.getCursortPosition()

      if (this.birthday == '' || this.birthday == inputDefault) {
        this.birthday = inputDefault
        pos = 0
      }
      if (fpos > pos) {
        this.setCaretPosition(pos)
      }
    },
    //鼠标经过
    onMouseoverHandel (e) {
      if (this.birthday == '') {
        this.birthday = inputDefault
      }
    },
    //鼠标退出
    onMouseoutHandel (e) {
      if (this.birthday == inputDefault) {
        this.birthday = ''
      }
    },
    //获取光标位置
    getCursortPosition() {
      let ctrl = document.getElementById('vueBirthdayInput')
      var CaretPos = 0   // IE Support
      if (document.selection) {
        var Sel = document.selection.createRange()
        Sel.moveStart ('character', - ctrl.value.length)
        CaretPos = Sel.text.length
      }
      // Firefox support
      else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart
      return (CaretPos)
    },
    //设置光标位置
    setCaretPosition(pos) {
      let textDom = document.getElementById('vueBirthdayInput')
      if(textDom.setSelectionRange) {
        // IE Support
        setTimeout(() => {
          textDom.setSelectionRange(pos, pos)
        }, 0)

      } else if (textDom.createTextRange) {
        // Firefox support
        let range = textDom.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    },
    //回退事件
    onDeleteHander() {
      this.birthday = this.format(this.birthday, true)
    },
    //格式化
    format(nVal, del) {
      let dob = nVal.replace(/[^0-9]/ig, "")
      //超出范围 
      if (dob.length > 8) {
        return false
      }
      if (del) {
        dob = dob.substring(0, dob.length - 1)
      }

      let val = inputDefault.split('')
      let dk = 0
      for (let i = 0; i < val.length; i ++) {
        let item = val[i]
        if ( item.match(/y|m|d/)) {
          if (dob[dk]) {
            val[i] = dob[dk]
          }
          dk = dk + 1
        }
      }
      val = val.join('')
      return val
    }
  },

  watch: {
    birthday (nVal, oVal) {
      this.$emit('change', nVal)
      
      let fpos = this.getCursortPosition()
      let pos = this.pos

      if (nVal === inputDefault || !nVal) {
        return
      }
      //如被全选输入
      if (nVal.length == 1) {
        this.birthday = inputDefault
      }
      //正常输入
      // if (nVal.length > 11) {
        let val = this.format(nVal)
        if (val) {
          this.birthday = val
        } else {
          this.birthday = oVal
        }
        return
      // }

      if (pos == 3 || pos == 6) {
        pos = pos + 2
      } else {
        pos = pos + 1
      }

      this.pos = pos
      this.setCaretPosition(pos)
    }
  },

  mounted () {
  }
}
</script>
