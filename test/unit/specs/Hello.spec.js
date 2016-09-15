import Vue from 'vue'
import Hello from 'src/components/Hello'

// this could be in wallaby.js, I guess (?)
var chai = require('chai')
var expect = chai.expect

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Hello)
    })
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Hello Vue!')
  })
})
