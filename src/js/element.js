// 虚拟DOM构造函数
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

// 创建虚拟DOM
function createElement(type, props, children) {
  return new Element(type, props, children);
}

// 将虚拟DOM转化成真实DOM
function render(virtualDom) {
  let el = document.createElement(virtualDom.type);

  for (let key in virtualDom.props) {
    setAttr(el, key, virtualDom.props[key]);
  }

  virtualDom.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  })

  return el;
}

function setAttr(node, key, value) {
  switch(key) {
    case 'value':
      if (node.tagName.toLowerCase() === 'input' ||
        node.tagName.toLowerCase() === 'textarea') {
        node.value = value
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
  }
}

// 将真实DOM(el)添加到target下
function renderDom(el, target) {
  target.appendChild(el);
}

export {
  Element,
  createElement,
  render,
  setAttr,
  renderDom
}
