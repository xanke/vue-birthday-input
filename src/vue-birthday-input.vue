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
<script>
import moment from 'moment'

export default {
  name: 'vue-birthday-input',
  props: {
    placeholder: {
      default: '出生日期',
      type: String,
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
  data : () => ({
    birthday: '',
    pos: 0,
    elementId: '',
    isDelete: false,

  }),
  computed: {
  },
  methods: {
    //获得焦点事件
    onFocusHandler(e) {
      this.$emit('focus', e)
      if (!this.birthday || this.birthday == this.formatView) {
        this.birthday = this.formatView
        this.setCaretPosition(0)
      } else {
        this.setCaretPosition(this.pos)
      }
    },
    //鼠标经过
    onMouseoverHandel() {
      if (!this.birthday) {
        this.birthday = this.formatView
      }
    },
    //鼠标退出
    onMouseoutHandel() {
      if (this.birthday == this.formatView) {
        this.birthday = ''
      }
    },
    //获取光标位置
    getCursortPosition() {
      let ctrl = document.getElementById(this.elementId)
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
      let textDom = document.getElementById(this.elementId)
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
    onDeleteHander(e) {
      this.isDelete = true
    },
    //格式化
    dobFormat(nVal, addVal = '') {
      nVal = nVal + ''
      let dob = nVal.replace(/[^0-9]/ig, "")
      if (dob.length > 8) {
        return false
      }
      dob = dob + addVal

      let del = this.isDelete
      // //删除
      if (del) {
        dob = dob.substring(0, dob.length - 1)
        this.isDelete = false
      }
      //数组化比对
      let val = this.formatView.split('')
      let dk = 0
      let pos = 0
      let year = '', month = '', day = ''
      //遍历替换
      for (let i = 0; i < val.length; i ++) {
        let item = val[i]
        //y|m|d提取替换
        item = item.toLowerCase()
        if (item.match(/y|m|d/)) {
          //如果已输入
          if (dob[dk]) {
            pos ++
            val[i] = dob[dk]
            if (item == 'y') {
              year = year + dob[dk]
              if (year[0] != 1 && year[0] != 2 ) {
                return false
              }
            }
            if (item == 'm') {
              month = month + dob[dk]
              if (month[0] != 0 && month[0] != 1 ) {
                return false
              }
              if (month.length == 2) {
                if (moment(month, 'MM').format('MM') == "Invalid date") {
                  return false
                }
              }
            }
            if (item == 'd') {
              day = day + dob[dk]
              if (day.length == 1) {
                if (day != 0 && moment(year + month + day + '0', 'YYYYMMDD').format('YYYYMMDD') == "Invalid date") {
                  return false
                }
              } else {
                if (moment(year + month + day, 'YYYYMMDD').format('YYYYMMDD') == "Invalid date") {
                  return false
                }
              }
            }
          } else {
            this.pos = pos
            this.setCaretPosition(pos)
            return val.join('')
          }
          dk ++
        } else {
          pos ++
        }
      }
      //完成输入
      if (dob.length == 8) {
        dob = year + month + day + ''
        dob = moment(dob, 'YYYYMMDD').format(this.format)
        this.$emit('input', dob)
        this.pos = -1
      } else {
        this.$emit('input', '')
      }
      return val.join('')
    },
    onInputHander(e) {
      let re =  /Digit[0-9]/
      let birthday = this.birthday
      if (re.test(e.code)) {
        this.isDelete = false
        let val = e.code.replace('Digit', '')
        this.birthday = this.dobFormat(birthday, val) || this.birthday
      }
    }
  },
  watch: {
    birthday (nVal, oVal) {
      if (nVal !== oVal) {
        if (nVal === this.formatView || !nVal) {
          return
        }
        //正常输入
        this.birthday = this.dobFormat(nVal) || oVal
      }
    }
  },
  mounted () {
    this.elementId = 'vueBirthdayInput_' + Math.round(Math.random() * 1000000)
    let dob = this.dobFormat(this.value)
    if (dob != this.formatView) {
      this.birthday = dob
    }
  }
}
</script>
