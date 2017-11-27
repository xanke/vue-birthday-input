/* eslint-env mocha */
import Vue from 'vue'
import { expect } from 'chai'
import { mount } from 'avoriaz'
import birthdayInput from '@/vue-birthday-input'
import sinon from 'sinon'

describe('vue-birthday-input.vue', () => {
  it('默认测试', () => {
    const wrapper = mount(birthdayInput, { propsData: { value: '20120101' }})
    console.log(wrapper.data())
    expect(wrapper.data().birthday).to.equal('2012年01月01日')
  })

  it('yyyy/mm/dd', () => {
    const wrapper = mount(birthdayInput, { propsData: { value: '20120101', formatView: 'yyyy/mm/dd'  }})
    console.log(wrapper.data())
    expect(wrapper.data().birthday).to.equal('2012/01/01')
  })
  it('yyyy-mm-dd', () => {
    const wrapper = mount(birthdayInput, { propsData: { value: '20120101', formatView: 'yyyy-mm-dd'  }})
    console.log(wrapper.data())
    expect(wrapper.data().birthday).to.equal('2012-01-01')
  })
})
