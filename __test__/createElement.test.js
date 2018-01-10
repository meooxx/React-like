const   createElement = require('../src/createElement').createElement
const h = createElement

const buildNode = (nodeName, attributes, children=[]) => ({
  key: attributes ? attributes.key : undefined,
  attributes: attributes ? attributes : undefined,
  nodeName,
  children
})

describe('createElement code' , () => {
  test('create will works', () => {
    expect(createElement('h'))
  })
  test('createElement will return {}', ()=> {
    expect(createElement('span')).toMatchObject({})
  })
  test('createElement(x) will return vnode ', ()=> {
    expect(createElement('span')).toMatchObject(buildNode('span', null, []))
  })
  test('with attribute', () => {
    expect(createElement('span', {key:12, className:'ss'})).toMatchObject(buildNode('span',{key:12, className:'ss'} ))
  })

  test('createElement with children ', ()=> {
    expect(createElement('span', null, 'a', 1,2, h('w'))).toMatchObject(buildNode('span', null, ['a'+'1'+'2', h('w')]))
  })
  test('createElement with seque string', () => {
    expect(createElement('span', null,'a', 'b')).toMatchObject(buildNode('span', null, ['ab']))
  })
  test('createElement should support element', () =>{
    expect(h('span', null, h('x'))).toMatchObject(buildNode('span',null, [buildNode('x')]))
  })
  test('createElemnt child could be number', () => {
    expect(h('x', null, 1)).toMatchObject(buildNode('x', null, ['1']))
  })
  test('createElement only attributes cotaine children but ', () => {
    expect(h('x', { children: [h('x')] })).toMatchObject(buildNode('x',{}, [h('x')]))
  })

  test('children was bool, chang it to null', () =>{
    expect(h('x',null, true, false )).toMatchObject(buildNode('x', null, ['']))
  })
  test('children was null chang it to ""', () =>{
    expect(h('x',null, null, undefined )).toMatchObject(buildNode('x', null, ['']))
  })
  test('node was function', () => {
    expect(h(()=>'a'))
  })
})