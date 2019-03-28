import Vue from 'vue'
import App from './App.vue'
import { createElement, render, renderDom } from './js/element'
import diff from './js/diff'
import patch from './js/patch'

new Vue({
  el: '#app',
  render: h => h(App),
  mounted () {
    let virtualDom = createElement('ul', { class: 'list' }, [
      createElement('li', { class: 'item' }, ['周杰伦']),
      createElement('li', { class: 'item' }, ['林俊杰']),
      createElement('li', { class: 'item' }, ['王力宏'])
    ])
    console.log('virtualDom')
    console.log(virtualDom)

    let el = render(virtualDom);
    console.log('virtualDom的真实DOM')
    console.log(el);

    renderDom(el, document.getElementById('app'));

    let virtualDom2 = createElement('ul', { class: 'list-group' }, [
      createElement('li', { class: 'item active' }, ['七里香']),
      createElement('li', { class: 'item' }, ['一千年以后']),
      createElement('li', { class: 'item' }, ['需要人陪'])
    ]);
    console.log('virtualDom2')
    console.log(virtualDom2)

    let patches = diff(virtualDom, virtualDom2);
    console.log('patches')
    console.log(patches);

    patch(el, patches);
  }
})
