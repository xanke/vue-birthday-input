<template>
  <input
    id="vueBirthdayInput"
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
    pos: 0
  }),
  computed: {
  },
  methods: {
    //获得焦点事件
    onFocusHandler (e) {
      this.$emit('focus', e)
      let pos = this.pos
      if (!this.birthday || this.birthday == this.formatView) {
        this.birthday = this.formatView
        pos = 0
        this.setCaretPosition(pos)
      }
    },
    //鼠标经过
    onMouseoverHandel () {
      if (!this.birthday) {
        this.birthday = this.formatView
      }
    },
    //鼠标退出
    onMouseoutHandel () {
      if (this.birthday == this.formatView) {
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
      this.birthday = this.dobFormat(this.birthday, true)
    },
    //格式化
    dobFormat(nVal, del) {
      let dob = nVal.replace(/[^0-9]/ig, "")
      if (dob.length > 8) {
        return false
      }
      //删除
      if (del) {
        dob = dob.substring(0, dob.length - 1)
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
        dob = year + month + day
        dob = moment(dob, 'YYYYMMDD').format(this.format)
        this.$emit('input', dob)
      } else {
        this.$emit('input', '')
      }
      return val.join('')
    }
  },
  watch: {
    birthday (nVal, oVal) {
      if (nVal !== oVal) {
        this.$emit('change', nVal)
        let pos = this.pos

        if (nVal === this.formatView || !nVal) {
          return
        }

        //正常输入
        let val = this.dobFormat(nVal)
        if (val) {
          this.birthday = val
        } else {
          this.birthday = oVal
        }

        if (nVal.length > this.formatView.length) {
          pos = pos + 1
          this.pos = pos
          
        }
      }
    }
  },

  mounted () {
    let dob = this.dobFormat(this.value)
    if (dob != this.formatView) {
      this.birthday = dob
    }
  }
}
</script>
