// @flow
const stack = []
const EMPTY_ARRAY = []

class VNode {}

export const createElement = ( nodeName, attributes, ...arg ) =>  {
  //simpeType ==  !function | string ? true
  let child, simpleType, children = EMPTY_ARRAY, lastSimpleType;

  for(let i = arg.length;i--;) {
    stack.push(arg[i])
  }

  if(attributes && attributes.children!=null) {
    if(!stack.length) {
      stack.push(attributes.children) //[{}]
    }
    delete attributes.children
  }

  while(stack.length) {    

    child = stack.pop()
    const nodeNameType = typeof nodeName
    const childType = typeof child 

    if(child  && child.pop !== undefined ) {
      for(let i = child.length;i--;) stack.push(child[i])
    }else {
      if(childType === 'boolean') child = null
      if( simpleType = nodeNameType !== 'function') {
        if( child == null ) {
          child = ''
        }else if(childType === 'number') {
          child = String(child)
        }else if(childType !== 'string') {
          simpleType = false
        }
      }

      // 俩个连续的字符串则 拼接到一起
      if(simpleType && lastSimpleType ) children[children.length - 1 ] += child
      else if( children === EMPTY_ARRAY ) children=[child]
      else {
        children.push(child)
      }
      lastSimpleType = simpleType 
  }
}

    

  const vNode = new VNode() 
  vNode.children = children
  vNode.nodeName = nodeName
  vNode.attributes = attributes !== null ? attributes : undefined
  vNode.key = attributes != null ? attributes.key : undefined

  //todo 
  // dont know for now 
  // option.vNode
  return vNode
}