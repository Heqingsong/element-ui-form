# element-ui-form
一个数据驱动的element ui 表单工具，负责根据数据模型生成相应表单界面

## 外部依赖

element-ui

## 安装
> npm install element-ui-form

## 使用

### 1. 注册
```js
import Vue from 'vue';
import App from './App.vue';
import elementUiForm from 'element-ui-form';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
// 注册
Vue.use(elementUiForm);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

### 2. 使用
```html
<template>
  <div id="app">
    <v-form :data="formData" :config="config" ref="myForm"></v-form>
  </div>
</template>
```

```js
import address from './assets/address.json';

export default {
  name: 'App',
  data() {
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
          'label-width': '170px',
          size: 'mini',
          'label-position': 'right',
          // inline: true,
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
        ref: 'form',
        grid: [4],
        row: {
          props: {
            gutter: 10
          }
        },
        col: {
          props: {
            // span: 10,
            // tag: 'span'
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
          },
          on: {
            change: () => {
              console.log('执行了');
            }
          },
          scopedSlots: {
            // prefix: (props, h) => {
            //   console.log(11);
            // },
            // prepend: () => {
            //   console.log(22);
            // }
          },
          slots: [{
            render: (h) => <i class='el-icon-search' slot='prepend'></i>
          }, {
            render: (h) => <span slot='append'>文字</span>
          }],
          rules: {
            required: true,
            maxLength: 10
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
              let result = queryString ? address.filter(item => item.value.indexOf(queryString) > -1) : address;
              cb(result);
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
            maxlength: '30'
          },
          props: {
            type: 'textarea',
            'show-word-limit': true
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
          slots: [{
            render: (h) => {}
          }],
          // group: true,
          // data: [{
          //   label: '热门城市',
          //   options: [{
          //     value: 'Shanghai',
          //     label: '上海'
          //   }, {
          //     value: 'Beijing',
          //     label: '北京'
          //   }]
          // }, {
          //   label: '城市名',
          //   options: [{
          //     value: 'Chengdu',
          //     label: '成都'
          //   }, {
          //     value: 'Shenzhen',
          //     label: '深圳'
          //   }, {
          //     value: 'Guangzhou',
          //     label: '广州'
          //   }, {
          //     value: 'Dalian',
          //     label: '大连'
          //   }]
          // }]
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
          // panel: true,
          props: {
            placeholder: '请选择所在城市',
            props: {
              expandTrigger: 'hover'
            },
            clearable: true,
            multiple: true
            // 'show-all-levels': false
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
            'controls-position': 'right',
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
          // group: {
          //   type: 'button',
          //   attrs: {
          //     size: 'mini',
          //     disabled: false
          //   },
          //   on: {
          //     change: () => {
          //       console.log('radio group change');
          //     }
          //   }
          // },
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
            'show-alpha': true
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
            // drag: true
          },
          slots: [{
            render: (h) => <div class='el-upload__tip' slot='tip'>只能上传jpg/png文件，且不超过500kb</div>
          }],
          render: (h, params, _this) => <i class='el-icon-plus'></i>
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
      }, {
        props: {
          label: '自定义组件测试'
        },
        is: {
          render: () => <el-button>测试</el-button>
        }
      }]
    }
  },
  methods: {
    initInput() {}
  }
}
```

## todo list
- [ ] 友好的文档
- [ ] 测试用例