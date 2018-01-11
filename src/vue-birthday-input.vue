<template>
  <input
    :id="elementId"
    :placeholder="placeholder"
    @focus="onFocusHandler"
    @click="onFocusHandler"
    @mouseover="onMouseoverHandel"
    @mouseout="onMouseoutHandel"
    @keyup.delete="onDeleteHander"
    @keyup="onInputHander($event)"
    v-model="birthday"
    :maxlength="formatView.length"
  >
</template>
<script type="module">
import moment from 'moment'

export default {
  name: 'vue-birthday-input',
  props: {
    placeholder: {
      default: '出生日期',
      type: String
    },
    format: {
      default: 'YYYYMMDD',
      type: String
    },
    formatView: {
      default: 'yyyy年mm月dd日',
      type: String
    },
    value: {
      default: '',
      required: true,
      type: [Number, String]
    }
  },
  data: () => ({
    birthday: '',
    bir: '',
    pos: 0,
    elementId: '',
    isDelete: false
  }),
  computed: {},
  methods: {
    // 获得焦点事件
    onFocusHandler(e) {
      this.$emit('focus', e)
    },
    // 鼠标经过
    onMouseoverHandel() {
      if (!this.birthday) {
        this.birthday = this.formatView
      }
    },
    // 鼠标退出
    onMouseoutHandel() {
      if (this.birthday == this.formatView) {
        this.birthday = ''
      }
    },
    // 获取光标位置
    getCursortPosition() {
      let ctrl = document.getElementById(this.elementId)
      var CaretPos = 0 // IE Support
      if (document.selection) {
        var Sel = document.selection.createRange()
        Sel.moveStart('character', -ctrl.value.length)
        CaretPos = Sel.text.length
      } else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        // Firefox support
        CaretPos = ctrl.selectionStart
      return CaretPos
    },
    // 设置光标位置
    setCaretPosition(pos) {
      let textDom = document.getElementById(this.elementId)
      if (textDom.setSelectionRange) {
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
    // 回退事件
    onDeleteHander() {
      let dob = this.bir
      dob = dob.split('')

      let key = 0
      for (let i = 0; i < dob.length; i++) {
        let val = dob[i]
        if (val.match(/[0-9]/)) {
          key = i
        }
      }

      dob[key] = this.format[key]
      dob = dob.join('')

      this.bir = this.birthday = dob
      this.isDelete = true
    },
    // 提取年月日
    dobSubstr(val, ymd) {
      let format = this.formatView
      format = format.toLowerCase()
      let st = format.indexOf(ymd)
      let et = format.lastIndexOf(ymd)
      val = val.substring(st, et + 1).replace(/[^0-9]/gi, '')
      return val + ''
    },
    // 格式化
    dobFormat(birthday, value) {
      if (birthday.length !== this.formatView.length) {
        this.birthday = this.formatView
        return
      }

      let dob = birthday.split('')

      for (let i = 0; i < dob.length; i++) {
        let val = dob[i]
        val = val.toLowerCase()
        if (val.match(/y|m|d/)) {
          dob[i] = value
          this.setCaretPosition(i + 1)
          break
        }
      }
      dob = dob.join('')
      let year = this.dobSubstr(dob, 'y')
      let month = this.dobSubstr(dob, 'm')
      let day = this.dobSubstr(dob, 'd')

      if (year) {
        if (year[0] != 1 && year[0] != 2) {
          return false
        }
      }

      if (month) {
        if (month[0] != 0 && month[0] != 1) {
          return false
        }
        if (month.length == 2) {
          if (moment(month, 'MM').format('x') == 'Invalid date') {
            return false
          }
        }
      }

      if (day) {
        let m = month.length == 2 ? month : '12'
        let y = year.length == 4 ? year : '2000'

        if (day.length == 1) {
          if (
            day != 0 &&
            moment(y + m + day + '0', 'YYYYMMDD').format('x') == 'Invalid date'
          ) {
            return false
          }
        } else {
          if (moment(y + m + day, 'YYYYMMDD').format('x') == 'Invalid date') {
            return false
          }
        }
      }

      this.birthday = dob
      this.bir = dob
    },
    // 输入数字
    onInputHander(e) {
      let re = /Digit[0-9]/
      let birthday = this.birthday
      if (re.test(e.code)) {
        let val = e.code.replace('Digit', '')
        this.birthday = this.dobFormat(birthday, val) || this.birthday
      }
    }
  },
  watch: {},
  mounted() {
    this.elementId = 'vueBirthdayInput_' + Math.round(Math.random() * 1000000)

    let value = this.value
    if (value) {
      if (value.length !== this.format.length) {
        return
      }

      let format = this.format.toUpperCase()
      let formatView = this.formatView.toUpperCase()
      this.birthday = this.bir = moment(value, format).format(formatView)
    }
  }
}
</script>
