# element-ui-form
一个数据驱动的element ui 表单工具，负责根据数据模型生成相应表单界面

### 所有支持组件总览
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config" ref="myForm"></v-form>
</template>

<script>
  export default {
    data: function () {
      return {
        config: {
          props: {
            model: {
              input: '',
              autocomplete: '',
              text: '',
              datetime: '',
              textarea: '',
              select: '',
              cascader: [],
              number: 1,
              radio: '',
              checkbox: [],
              switch: '',
              link: '',
              slider: 0,
              rate: null,
              tag: [],
              color: null,
              fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
            },
            labelWidth: '170px',
            size: 'mini',
            labelPosition: 'right',
            rules: {
              input: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              autocomplete: [
                { required: true, message: '请输入家庭住址', trigger: 'blur' }
              ],
              datetime: [
                { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
              ],
              number: [
                {
                  validator: (rule, value, callback) => {
                    if (value < 2) {
                      callback(new Error('不能小于2'));
                    } else if (value > 10) {
                      callback(new Error('不能大于10'));
                    } else {
                      callback();
                    }
                  },
                  trigger: 'blur'
                }
              ]
            }
          },
          ref: 'form'
        },
        formData: [{
          props: {
            label: '姓名',
            prop: 'input'
          },
          options: {
            component: 'input',
            model: 'input',
            attrs: {
              placeholder: '请输入标题'
            },
            props: {
              clearable: true
            },
            on: {
              change: () => {
                console.log('执行了');
              }
            }
          }
        },
        {
          props: {
            label: '家庭住址',
            prop: 'autocomplete'
          },
          options: {
            component: 'autocomplete',
            model: 'autocomplete',
            props: {
              placeholder: '请输入家庭住址',
              fetchSuggestions: (queryString, cb) => {
                cb([]);
              }
            },
            on: {
              select: result => {
                console.log(result);
              }
            }
          }
        },
        {
          props: {
            label: '出生日期',
            prop: 'datetime'
          },
          options: {
            component: 'datetime',
            model: 'datetime',
            type: 'picker',
            props: {
              placeholder: '请输入日期'
            }
          }
        },
        {
          props: {
            label: '个人简介'
          },
          options: {
            component: 'textarea',
            model: 'textarea',
            attrs: {
              placeholder: '请输入个人简介',
              maxlength: 30
            },
            props: {
              type: 'textarea',
              showWordLimit: true
            }
          }
        }, {
          props: {
            label: '任职状态'
          },
          options: {
            component: 'select',
            model: 'select',
            props: {
              placeholder: '请选择任职状态',
              clearable: true,
              multiple: true,
              filterable: true,
              'allow-create': true,
              'default-first-option': true
            },
            data: [{
              label: '在职',
              value: true
            }, {
              label: '离职',
              value: false
            }]
          }
        }, {
          props: {
            label: '所在城市'
          },
          options: {
            component: 'cascader',
            model: 'cascader',
            props: {
              placeholder: '请选择所在城市',
              props: {
                expandTrigger: 'hover'
              },
              clearable: true,
              multiple: true
            },
            on: {
              change: () => {
                console.log('change');
              }
            },
            data: [{
              label: '四川省',
              value: 100010,
              children: [{
                label: '成都市',
                value: 100011,
                children: [{
                  label: '高新区',
                  value: 100012,
                  children: [{
                    label: '桂溪街道办',
                    value: 100012
                  }]
                }]
              }]
            }]
          }
        }, {
          props: {
            label: '待遇要求',
            prop: 'number'
          },
          options: {
            component: 'number',
            model: 'number',
            attrs: {
              placeholder: '请填写待遇预期'
            },
            props: {
              min: 0,
              step: 2,
              max: 100
            },
            on: {
              change: () => {
                console.log('change');
              }
            }
          }
        }, {
          props: {
            label: '求职岗位'
          },
          options: {
            component: 'radio',
            model: 'radio',
            data: [{
              label: '前端开发',
              value: 1
            }, {
              label: '后端开发',
              value: 2
            }, {
              label: '移动App开发',
              value: 3
            }]
          }
        }, {
          props: {
            label: '入职城市'
          },
          options: {
            component: 'checkbox',
            model: 'checkbox',
            data: [{
              label: '杭州',
              value: 1
            }, {
              label: '成都',
              value: 2
            }, {
              label: '广州',
              value: 3
            }, {
              label: '上海',
              value: 4
            }]
          }
        }, {
          props: {
            label: '是否已婚'
          },
          options: {
            component: 'switch',
            model: 'switch',
            props: {
              'active-text': '已婚',
              'inactive-text': '未婚'
            }
          }
        }, {
          props: {
            label: '法律条款'
          },
          options: {
            component: 'link',
            model: 'link',
            attrs: {
              target: '_blank',
              href: 'https://github.com/Heqingsong',
              title: '点击可以查看',
              text: '中华人民共和国《劳动人民保护法》'
            },
            props: {
              underline: true
            }
          }
        }, {
          props: {
            label: '您对我司印象如何'
          },
          options: {
            component: 'slider',
            model: 'slider'
          }
        }, {
          props: {
            label: '请对我司招聘流程评分'
          },
          options: {
            component: 'rate',
            model: 'rate'
          }
        }, {
          props: {
            label: '您有哪些不错的人生标签'
          },
          options: {
            component: 'tag',
            model: 'tag',
            add: {
              input: {
                class: 'mini-form__tag'
              },
              button: {
                class: 'mini-form__button',
                size: 'small'
              }
            },
            data: [{
              value: '热爱学习',
              props: {
                type: 'success',
                closable: true
              },
              on: {
                close: () => {
                  console.log('我关闭了');
                }
              }
            }, {
              value: '终生成长',
              props: {
                type: 'info'
              }
            }, {
              value: '学习型思维'
            }, {
              value: '爱阅读'
            }]
          }
        }, {
          props: {
            label: '您喜欢什么颜色'
          },
          options: {
            component: 'color',
            model: 'color',
            props: {
              showAlpha: true
            },
            on: {
              change: () => {
                console.log('change');
              }
            }
          }
        }, {
          props: {
            label: '上传资料'
          },
          options: {
            component: 'upload',
            on: {
              'on-preview': () => {
                console.log('preview');
              },
              'on-success': () => {
                console.log('success');
              },
              'on-change': () => {
                console.log('change');
              }
            },
            props: {
              'file-list': [],
              action: 'https://jsonplaceholder.typicode.com/posts/',
              'list-type': 'picture-card',
              multiple: true
            },
            slots: [{
              render: (h) => h('div', {
                class: {
                  'el-upload__tip': true
                },
                slot: 'tip'
              }, '只能上传jpg/png文件，且不超过500kb')
            }],
            render: (h, params, _this) => h('i', {
              class: {
                'el-icon-plus': true
              }
            })
          }
        }, {
          props: {
            label: ''
          },
          options: {
            component: 'button',
            data: [{
              attrs: {
                id: 'test'
              },
              props: {
                size: 'mini'
              },
              on: {
                click: () => {
                  this.$refs.myForm.$refs.form.resetFields();
                }
              },
              nativeOn: {
                click: () => {
                  console.log('native reset');
                }
              },
              text: '重置'
            }, {
              props: {
                size: 'mini',
                type: 'primary'
              },
              on: {
                click: () => {
                  this.$refs.myForm.$refs.form.validate((valid) => {
                    if (valid) {
                      alert('submit!');
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  })
                }
              },
              text: '提交'
            }]
          }
        }]
      }
    }
  }
</script>
```

### 安装
> npm install element-ui-form

### 使用

#### 1. 注册
```js
import Vue from 'vue';
import App from './App.vue';
import ElementUiForm from 'element-ui-form';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// 注册
Vue.use(elementUiForm);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

#### 2. 使用
```html
<template>
  <div id="app">
    <v-form :data="formData" :config="config"></v-form>
  </div>
</template>
```

----

### 配置项结构说明
[vue createElement 参数对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

`element-ui-form`底层是基于Vue jsx 来实现的逻辑，所以我们在数据配置项中可以加入 `createElement 的参数对象`，在赋值过程中`element-ui-form`会枚举用户输入的数据模型，判断数据模型中是否存在 `createElement 的参数对象`，如果存在则将该配置项赋值到目标组件上。

让我们来看一下官方的 Vue `createElement方法`有哪些参数。

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

### 表单配置

有了上述参数列表后，让我们从布局开始了解`element-ui-form`可以做到哪些事情。
#### 网格布局
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config" ref="myForm"></v-form>
</template>

<script>
export default {
  data: function () {
      return {
        config: {
          props: {
            model: {
              input: '',
              autocomplete: '',
              datetime: '',
              select: ''
            },
            'label-width': '170px',
            size: 'mini',
            'label-position': 'right'
          },
          ref: 'form',
          grid: [2, 3],
          row: {
            props: {
              gutter: 10
            }
          }
        },
        formData: [{
          props: {
            label: '姓名',
            prop: 'input'
          },
          options: {
            component: 'input',
            model: 'input',
            attrs: {
              placeholder: '请输入标题'
            },
            props: {
              clearable: true
            }
          }
        }, {
          props: {
            label: '姓名',
            prop: 'input'
          },
          options: {
            component: 'input',
            model: 'input',
            attrs: {
              placeholder: '请输入标题'
            },
            props: {
              clearable: true
            },
            on: {
              change: () => {
                console.log('执行了');
              }
            }
          }
        }, {
          props: {
            label: '姓名',
            prop: 'input'
          },
          options: {
            component: 'input',
            model: 'input',
            attrs: {
              placeholder: '请输入标题'
            },
            props: {
              clearable: true
            },
            on: {
              change: () => {
                console.log('执行了');
              }
            },
            slots: [{
              render: (h) => h('i', {
                class: {
                  'el-icon-search': true
                },
                slot: 'prepend'
              })
            }]
          }
        }, {
          props: {
            label: '姓名',
            prop: 'input'
          },
          options: {
            component: 'input',
            model: 'input',
            attrs: {
              placeholder: '请输入标题'
            },
            props: {
              clearable: true
            },
            on: {
              change: () => {
                console.log('执行了');
              }
            },
            slots: [{
              render: (h) => h('i', {
                class: {
                  'el-icon-search': true
                },
                slot: 'prepend'
              })
            }, {
              render: (h) => h('span', {
                slot: 'append'
              }, '文字')
            }]
          }
        }, {
          props: {
            label: '任职状态'
          },
          options: {
            component: 'select',
            model: 'select',
            props: {
              placeholder: '请选择任职状态',
              clearable: true
            },
            data: [{
              label: '在职',
              value: true
            }, {
              label: '离职',
              value: false
            }]
          }
        }, {
          props: {
            label: ''
          },
          options: {
            component: 'button',
            data: [{
              attrs: {
                id: 'test'
              },
              props: {
                size: 'mini'
                // loading: true
              },
              on: {
                click: () => {
                  this.$refs.myForm.$refs.form.resetFields();
                }
              },
              nativeOn: {
                click: () => {
                  console.log('native reset');
                }
              },
              text: '重置'
            }, {
              props: {
                size: 'mini',
                type: 'primary'
              },
              on: {
                click: () => {
                  this.$refs.myForm.$refs.form.validate((valid) => {
                    if (valid) {
                      alert('submit!');
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  })
                }
              },
              text: '提交'
            }]
          }
        }]
      }
    }
}
</script>
```
在模板中使用`v-form`组件时，`data`、`config`为必填项，在数据对象中，如果我们需要将`v-bind`的值传递给表单组件，我们可以配置`props`对象给`config`。

##### 参数说明
| 参数 | 说明 | 类型 | 参数格式 | 默认值 |
| ---- | ---- | ---- | ---- | :----: |
| grid | 开启网格布局，不配置该项则交给element-ui自己处理布局 | Array |[row, col] \| [col] | - |
| row | 设置网格行，依赖grid配置 | Object | { props: { ... } } | - |
| col | 设置网格列，依赖grid配置 | Object | { props: { ... } } | - |


!> 表单config 中 props 和 网格行列中的 props 配置参数需要是`element-ui`表单指定的字段，具体配置项请查看 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) 文档.

#### 表单校验
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config" ref="myForm"></v-form>
</template>

<script>
export default {
  data: function () {
      return {
        config: {
          props: {
            model: {
              input: '',
              autocomplete: '',
              datetime: '',
              select: ''
            },
            'label-width': '170px',
            size: 'mini',
            'label-position': 'right',
            rules: {
              input: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              number: [
                {
                  validator: (rule, value, callback) => {
                    if (value < 2) {
                      callback(new Error('不能小于2'));
                    } else if (value > 10) {
                      callback(new Error('不能大于10'));
                    } else {
                      callback();
                    }
                  },
                  trigger: 'blur'
                }
              ]
            }
          },
          ref: 'form'
        },
        formData: [{
          props: {
            label: '表单校验测试',
            prop: 'input'
          },
          options: {
            component: 'input',
            model: 'input',
            attrs: {
              placeholder: '请输入标题'
            },
            props: {
              clearable: true
            }
          }
        },  {
          props: {
            label: '自定义校验',
            prop: 'number'
          },
          options: {
            component: 'number',
            model: 'number',
            attrs: {
              placeholder: '输入大于10试试'
            },
            props: {
              'controls-position': 'right'
            },
            on: {
              change: () => {
                console.log('change');
              }
            }
          }
        }, {
          props: {
            label: ''
          },
          options: {
            component: 'button',
            data: [{
              attrs: {
                id: 'test'
              },
              props: {
                size: 'mini'
              },
              on: {
                click: () => {
                  this.$refs.myForm.$refs.form.resetFields();
                }
              },
              nativeOn: {
                click: () => {
                  console.log('native reset');
                }
              },
              text: '重置'
            }, {
              props: {
                size: 'mini',
                type: 'primary'
              },
              on: {
                click: () => {
                  this.$refs.myForm.$refs.form.validate((valid) => {
                    if (valid) {
                      alert('submit!');
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  })
                }
              },
              text: '提交'
            }]
          }
        }]
      }
    }
}
</script>
```
要实现表单校验，我们只需要在`config`的配置项`props`中添加`rules`配置项即可，在配置项中，我们需要指定表单需要绑定的校验对象，并在单个需要绑定的目标组件的`props`配置项中，添加`prop`配置项即可。

### 元素配置

#### input 输入框
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
      return {
        config: {
          props: {
            model: {
              value: '测试内容'
            },
            size: 'mini'
          }
        },
        formData: [{
          props: {
            label: '输入框'
          },
          options: {
            // 需要渲染的组件类型
            component: 'input',
            // 需要绑定的字段
            model: 'value',
            // 静态的属性值
            attrs: {
              placeholder: '输入内容'
            },
            // 需要传递给element ui 的配置项
            props: {
              'controls-position': 'right'
            },
            // 事件绑定
            on: {
              blur: () => {
                console.log(this.config.props.model.value);
              }
            },
            // 插槽
            slots: [{
              render: (h) => h('i', {
                class: {
                  'el-icon-search': true
                },
                slot: 'prepend'
              })
            }, {
              render: (h) => h('span', {
                slot: 'append'
              }, '文字')
            }]
            // JSX 式写法
            // slots: [{
            //   render: (h) => <i class='el-icon-search' slot='prepend'></i>
            // }, {
            //   render: (h) => <span slot='append'>文字</span>
            // }]
          }
        }]
      }
    }
}
</script>
```
#### autocomplete 输入提示
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
  const address = [
  { "value": "长宁区新渔路144号" },
  { "value": "上海市长宁区淞虹路661号" },
  { "value": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
  { "value": "天山西路438号" },
  { "value": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
  { "value": "上海市长宁区金钟路633号" },
  { "value": "上海市嘉定区曹安公路曹安路1685号" },
  { "value": "上海市普陀区同普路1435号" },
  { "value": "上海市北翟路1444弄81号B幢-107" },
  { "value": "上海市嘉定区新郁路817号" },
  { "value": "嘉定区曹安路1611号" },
  { "value": "嘉定区曹安公路2383弄55号" },
  { "value": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
  { "value": "上海长宁区金钟路968号9号楼地下一层" },
  { "value": "上海市长宁区天山西路119号" },
  { "value": "上海市长宁区仙霞西路" },
  { "value": "上海市长宁区天山西路567号1层R117号店铺" },
  { "value": "上海市普陀区光复西路丹巴路28弄6号楼819" },
  { "value": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
  { "value": "上海市普陀区棕榈路" },
  { "value": "元丰天山花园(东门) 双流路267号" },
  { "value": "上海市长宁区天山西路" },
  { "value": "上海市长宁区通协路" },
  { "value": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
  { "value": "长宁区仙霞西路88号1305室" },
  { "value": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
  { "value": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
  { "value": "上海市长宁区威宁路天山路341号" },
  { "value": "上海市嘉定区丰庄路240号" },
  { "value": "长宁区新渔路144号" },
  { "value": "长宁区淞虹路148号" },
  { "value": "上海市普陀区老真北路160号" },
  { "value": "上海市长宁区金钟路968号15楼15-105室" },
  { "value": "剑河路443-1" },
  { "value": "长宁区北新泾街道天山西路490-1号" },
  { "value": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
  { "value": "上海市金钟路633号地下一层甲部" },
  { "value": "长宁区仙霞西路299弄3号101B" },
  { "value": "天山西路430号" },
  { "value": "上海市长宁区天山西路" },
  { "value": "上海市长宁区金钟路968号15楼15-105室" },
  { "value": "天山西路428号" },
  { "value": "上海市长宁区协和路福泉路255弄57-73号" },
  { "value": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
  { "value": "上海市长宁区天山西路492号" },
  { "value": "长宁区仙霞西路88号百联2楼" },
  { "value": "天山西路389号" },
  { "value": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
];

export default {
  data: function () {
      return {
        config: {
          props: {
            model: {
              value: ''
            },
            size: 'mini'
          }
        },
        formData: [{
          props: {
            label: '输入提示'
          },
          options: {
            // 需要渲染的组件类型
            component: 'autocomplete',
            // 需要绑定的字段
            model: 'value',
            // 静态的属性值
            attrs: {
              placeholder: '输入上海试试'
            },
            // 需要传递给element ui 的配置项
            props: {
              clearable: true,
              // 异步请求在该方法执行操作
              fetchSuggestions: (queryString, cb) => {
                let result = queryString ? address.filter(item => item.value.indexOf(queryString) > -1) : address;
                cb(result);
              }
            },
            // 事件绑定
            on: {
              select: result => {
                console.log(result);
              }
            }
          }
        }]
      }
    }
}
</script>
```
!> 注意 `autocomplete`的配置项在`element ui`的input配置项下。[autocomplete 配置项](https://element.eleme.cn/#/zh-CN/component/input#autocomplete-attributes)

#### datetime 时间选择器
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            time: '',
            date: '',
            datetime: ''
          }
        },
        grid: [2]
      },
      formData: [{
        props: {
          label: '时间选择'
        },
        options: {
          // 需要渲染的组件类型
          component: 'datetime',
          // 需要绑定的字段
          model: 'time',
          // 时间控件类型 [time | date | datetime] 
          type: 'time',
          // 静态的属性值
          attrs: {
            placeholder: '请选择时间'
          },
          props: {
            pickerOptions: {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          }
        }
      }, {
        props: {
          label: '设定范围'
        },
        options: {
          component: 'datetime',
          model: 'date',
          type: 'date',
          attrs: {
            placeholder: '请选择时间'
          },
          props: {
            arrowControl: true,
            pickerOptions: {
              selectableRange: '18:30:00 - 20:30:00'
            }
          }
        }
      }, {
        props: {
          label: '时间日期选择'
        },
        options: {
          component: 'datetime',
          model: 'datetime',
          type: 'datetime',
          attrs: {
            placeholder: '请选择时间'
          },
          props: {
            type: "datetimerange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            defaultTime: ['12:00:00']
          }
        }
      }]
    }
  }
}
</script>
```
!> 在`element ui`的`timePicker`时间选择器中存在`el-time-select`、`el-time-picker`两种类型组件，在配置`type`时需要注意类型，设定时间范围使用`date`类型，选择时间使用`time`类型。日期选择器、日期时间选择器只需配置type为`datetime`即可。

#### textarea 文本域
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '文本域'
        },
        options: {
          // 需要渲染的组件类型
          component: 'textarea',
          // 需要绑定的字段
          model: 'value',
          // 静态的属性值
          attrs: {
            placeholder: '请输入内容',
            maxlength: 30
          },
          // 动态绑定的值
          props: {
            type: 'textarea',
            showWordLimit: true
          }
        }
      }]
    }
  }
}
</script>
```
#### select 选择器
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        },
        grid: [2]
      },
      formData: [{
        props: {
          label: '选择器'
        },
        options: {
          // 需要渲染的组件类型
          component: 'select',
          // 需要绑定的字段
          model: 'value',
          // 静态的属性值
          attrs: {
            placeholder: '请选择'
          },
          props: {
            clearable: true,
            multiple: true,
            filterable: true,
            allowCreate: true,
            defaultFirstOption: true
          },
          data: [{
            label: '在职',
            value: true
          }, {
            label: '离职',
            value: false
          }]
        }
      }, {
        props: {
          label: '选择器分组'
        },
        options: {
          // 需要渲染的组件类型
          component: 'select',
          // 需要绑定的字段
          model: 'value',
          // 静态的属性值
          attrs: {
            placeholder: '请选择'
          },
          props: {
            clearable: true,
            multiple: true,
            filterable: true,
            allowCreate: true,
            defaultFirstOption: true
          },
          group: true,
          data: [{
            label: '热门城市',
            options: [{
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }]
          }, {
            label: '城市名',
            options: [{
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }]
          }]
          // 自定义插槽渲染
          // slots: [{
          //   render: (h) => {}
          // }]
        }
      }]
    }
  }
}
</script>
```
#### cascader 级联选择器
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '级联选择器'
        },
        options: {
          component: 'cascader',
          model: 'value',
          props: {
            placeholder: '请选择所在城市',
            props: {
              expandTrigger: 'hover'
            },
            clearable: true,
            multiple: true
          },
          on: {
            change: () => {
              console.log('change');
            }
          },
          data: [{
            label: '四川省',
            value: 100010,
            children: [{
              label: '成都市',
              value: 100011,
              children: [{
                label: '高新区',
                value: 100012,
                children: [{
                  label: '桂溪街道办',
                  value: 100012
                }]
              }]
            }]
          }]
        }
      }, {
        props: {
          label: '级联选择器-面板模式'
        },
        options: {
          component: 'cascader',
          model: 'value',
          panel: true,
          props: {
            placeholder: '请选择所在城市',
            props: {
              expandTrigger: 'hover'
            },
            clearable: true,
            multiple: true,
            showAllLevels: false
          },
          on: {
            change: () => {
              console.log('change');
            }
          },
          data: [{
            label: '四川省',
            value: 100010,
            children: [{
              label: '成都市',
              value: 100011,
              children: [{
                label: '高新区',
                value: 100012,
                children: [{
                  label: '桂溪街道办',
                  value: 100012
                }]
              }]
            }]
          }]
        }
      }]
    }
  }
}
</script>
```
#### number 计数器
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '计数器'
        },
        options: {
          // 需要渲染的组件类型
          component: 'number',
          // 需要绑定的字段
          model: 'value',
          // 静态的属性值
          attrs: {
            placeholder: '请输入内容'
          },
          props: {
            controlsPosition: 'right',
            min: 0,
            step: 2,
            max: 100
          },
          on: {
            change: () => {
              console.log('change');
            }
          }
        }
      }]
    }
  }
}
</script>
```
#### radio 单选框
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: '',
            group: ''
          }
        },
        grid: [2]
      },
      formData: [{
        props: {
          label: '单选框'
        },
        options: {
          component: 'radio',
          model: 'value',
          attrs: {
            placeholder: '请输入内容'
          },
          data: [{
            label: '前端开发',
            value: 1
          }, {
            label: '后端开发',
            value: 2
          }, {
            label: '移动App开发',
            value: 3
          }]
        }
      }, {
        props: {
          label: '单选框-分组'
        },
        options: {
          // 需要渲染的组件类型
          component: 'radio',
          // 需要绑定的字段
          model: 'group',
          // 静态的属性值
          attrs: {
            placeholder: '请输入内容'
          },
          group: {
            type: 'button',
            attrs: {
              size: 'mini',
              disabled: false
            },
            on: {
              change: () => {
                console.log('radio group change');
              }
            }
          },
          data: [{
            label: '前端开发',
            value: 1
          }, {
            label: '后端开发',
            value: 2
          }, {
            label: '移动App开发',
            value: 3
          }]
        }
      }]
    }
  }
}
</script>
```
#### checkbox 多选框
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: [],
            group: []
          }
        },
        grid: [2]
      },
      formData: [{
        props: {
          label: '多选框'
        },
        options: {
          component: 'checkbox',
          model: 'value',
          data: [{
            label: '杭州',
            value: 1
          }, {
            label: '成都',
            value: 2
          }, {
            label: '广州',
            value: 3
          }, {
            label: '上海',
            value: 4
          }]
        }
      }, {
        props: {
          label: '多选框-分组'
        },
        options: {
          component: 'checkbox',
          model: 'group',
          group: {
            type: 'button',
            attrs: {
              size: 'mini',
              disabled: false
            },
            on: {
              change: () => {
                console.log('checkbox group change');
              }
            }
          },
          data: [{
            label: '杭州',
            value: 1
          }, {
            label: '成都',
            value: 2
          }, {
            label: '广州',
            value: 3
          }, {
            label: '上海',
            value: 4
          }]
        }
      }]
    }
  }
}
</script>
```
#### switch 开关
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '开关'
        },
        options: {
          component: 'switch',
          model: 'value',
          props: {
            activeText: '开启',
            inactiveText: '关闭'
          }
        }
      }]
    }
  }
}
</script>
```
#### link 文字链接
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '文字链接'
        },
        options: {
          component: 'link',
          model: 'link',
          attrs: {
            target: '_blank',
            href: 'https://github.com/Heqingsong',
            title: '点击可以查看',
            text: '中华人民共和国《劳动人民保护法》'
          },
          props: {
            underline: true
          }
        }
      }]
    }
  }
}
</script>
```
#### slider 滑块
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: []
          },
          labelPosition: 'top'
        }
      },
      formData: [{
        props: {
          label: '滑块'
        },
        options: {
          component: 'slider',
          model: 'value',
          props: {
            step: 10,
            showStops: true
          }
        }
      }]
    }
  }
}
</script>
```
#### rate 评分
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: 0
          }
        }
      },
      formData: [{
        props: {
          label: '评分'
        },
        options: {
          component: 'rate',
          model: 'value',
          props: {
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            showText: true
          }
        }
      }]
    }
  }
}
</script>
```
#### tag 标签
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        },
        grid: [2]
      },
      formData: [{
        props: {
          label: '标签'
        },
        options: {
          component: 'tag',
            model: 'tag',
            data: [{
              value: '热爱学习',
              props: {
                type: 'success',
                closable: true
              },
              on: {
                close: () => {
                  console.log('我关闭了');
                }
              }
            }, {
              value: '爱阅读'
            }]
          }
        }, {
          props: {
            label: '标签-带添加按钮'
          },
          options: {
            component: 'tag',
            model: 'tag',
            add: {
              input: {
                class: 'input-new-tag'
              },
              button: {
                class: 'button-new-tag',
                size: 'small',
                text: '+ New Tag'
              }
            },
            data: [{
              value: '热爱学习',
              props: {
                type: 'success',
                closable: true
              },
              on: {
                close: () => {
                  console.log('我关闭了');
                }
              }
            }, {
              value: '终生成长',
              props: {
                type: 'info'
              }
            }, {
              value: '学习型思维'
            }, {
              value: '爱阅读'
            }]
          }
        }]
    }
  }
}
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
```
#### color 颜色选择器
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '颜色选择器'
        },
        options: {
          component: 'color',
          model: 'value',
          props: {
            showAlpha: true
          },
          on: {
            change: () => {
              console.log(this.config.props.model.value);
            }
          }
        }
      }]
    }
  }
}
</script>
```
#### upload 文件上传
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          },
          labelWidth: '100px'
        }
      },
      formData: [{
        props: {
          label: '文件上传'
        },
        options: {
          component: 'upload',
          model: 'value',
          props: {
            fileList: [],
            action: 'https://jsonplaceholder.typicode.com/posts/',
            listType: 'picture-card',
            multiple: true
          },
          on: {
            onPrevie: () => {
              console.log('preview');
            },
            onSucces: () => {
              console.log('success');
            },
            onChange: () => {
              console.log('change');
            }
          },
          slots: [{
            render: (h) => h('div', {
              class: {
                'el-upload__tip': true
              },
              slot: 'tip'
            }, '只能上传jpg/png文件，且不超过500kb')
          }],
          render: (h, params, _this) => {
            // console.log(params, _this);

            return h('i', {
              class: {
                'el-icon-plus': true
              }
            })
          }
        }
      }]
    }
  }
}
</script>
```
#### button 按钮
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {
            value: ''
          }
        }
      },
      formData: [{
        props: {
          label: '按钮'
        },
        options: {
          component: 'button',
          data: [{
            attrs: {
              id: 'test'
            },
            props: {
              size: 'mini'
            },
            nativeOn: {
              click: () => {
                alert('native click');
              }
            },
            text: '重置'
          }, {
            props: {
              size: 'mini',
              type: 'primary'
            },
            on: {
              click: () => {
                alert('提交了');
              }
            },
            text: '提交'
          }]
        }
      }]
    }
  }
}
</script>
```
### 自定义组件
```html
/*vue*/
<template>
  <v-form :data="formData" :config="config"></v-form>
</template>

<script>
export default {
  data: function () {
    return {
      config: {
        props: {
          model: {}
        }
      },
      formData: [{
        props: {
          label: '自定义组件测试'
        },
        is: {
          render: (h) => {
            return [h('el-avatar', {
              props: {
                size: 'large',
                shape: 'square',
                src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              },
              nativeOn: {
                click: () => {
                  this.$message({
                    message: '恭喜你，这是一条成功消息',
                    type: 'success'
                  });
                }
              }
            }), h('h1', {
              class: {
                'tipsy': true
              }
            }, '<- 点这个图片试试')];
          }
        }
      }]
    }
  }
}
</script>
<style>
  .tipsy{
    display: inline;
    padding-left: 20px;
    font-size: 14px !important;
    vertical-align: top;
  }
</style>
```
