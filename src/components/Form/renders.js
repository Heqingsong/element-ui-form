import { getVueOptions, renderRadioCheckboxGroup } from './utils';

// 下拉列表
export function m_select(bind, params, h) {
  const target = params.options;
  const renderOptions = (target, data) => data && data.map((item, index) => {
    return (
      <el-option
        label={ item.label }
        value={ item.value }
        key={ index }
        disabled={ item.disabled || null }>
        {
          target.slots && target.slots.map(item => {
            return item.render.call(this, h)
          })
        }
      </el-option>
    );
  });

  const renderGroup = target => target.data && target.data.map((item, index) => {
    return (
      <el-option-group key={ index } label={ item.label }>
        { renderOptions(target, item.options) }
      </el-option-group>
    );
  });

  return (
    <el-select v-model={ bind[target.model] } { ...getVueOptions(target) }>
      { target.group ? renderGroup(target) : renderOptions(target, target.data) }
    </el-select>
  );
}

// 级联菜单
export function m_cascader(bind, params, h) {
  const target = params.options;

  return target.panel ? (
    <el-cascader-panel
      v-model={ bind[target.model] }
      options={ target.data || [] }
      { ...getVueOptions(target) }
    ></el-cascader-panel>
  ) : (
    <el-cascader
      v-model={ bind[target.model] }
      options={ target.data || [] }
      { ...getVueOptions(target) }
    ></el-cascader>
  );
}

// Number计数器
export function m_number(bind, params, h) {
  const target = params.options;

  return (
    <el-input-number
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-input-number>
  );
}

// 输入框
export function m_input(bind, params, h) {
  const target = params.options;

  return (
    <el-input
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
      >
        {
          target.slots && target.slots.map(item => {
            return item.render.call(this, h)
          })
        }
    </el-input>
  );
}

// 搜索提示框
export function m_autocomplete(bind, params, h) {
  const target = params.options;

  return (
    <el-autocomplete
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    >
      {
        target.slots && target.slots.map(item => {
          return item.render.call(this, h)
        })
      }
    </el-autocomplete>
  );
}

// textarea
export function m_textarea(bind, params, h) {
  return m_input.call(this, bind, params, h);
}

// 单选
export function m_radio(bind, params, h) {
  return renderRadioCheckboxGroup.call(this, 'el-radio', bind, params, h);
}

// 多选
export function m_checkbox(bind, params, h) {
  return renderRadioCheckboxGroup.call(this, 'el-checkbox', bind, params, h);
}

// 滑块
export function m_switch(bind, params, h) {
  const target = params.options;

  return (
    <el-switch
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-switch>
  );
}

// 时间选择
export function m_datetime(bind, params, h) {
  const target = params.options;

  return target.type && target.type === 'picker' ? (
    <el-time-picker
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-time-picker>
  ) : (
    <el-time-select
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-time-select>
  );
}

// 日期选择
export function m_date(bind, params, h) {
  const target = params.options;

  return (
    <el-date-picker
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-date-picker>
  );
}

// 链接
export function m_link(bind, params, h) {
  const target = params.options;

  return (
    <el-link { ...getVueOptions(target) }>
      { target.attrs.text }
      {
        target.slots && target.slots.map(item => {
          return item.render.call(this, h)
        })
      }
    </el-link>
  );
}

// 滑块
export function m_slider(bind, params, h) {
  const target = params.options;

  return (
    <el-slider
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-slider>
  );
}

// 评分
export function m_rate(bind, params, h) {
  const target = params.options;

  return (
    <el-rate
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></el-rate>
  );
}

// 颜色
export function m_color(bind, params, h) {
  const target = params.options;

  return (
    <el-color-picker v-model={ bind[target.model] }></el-color-picker>
  );
}

// 标签
export function m_tag(bind, params, h) {
  const target = params.options;
  const renderTags = () => (
    target.data && target.data.map((option, index) => (
      <el-tag key={index} { ...{
        on: {
          close: () => {
            this.handleTagClose(bind[target.model], option.value)
          }
        }
      } }>{ option.value }</el-tag>
    ))
  );

  return target.add ? (
    <div>
      { renderTags() }
      {
        this.tagsInputVisible ? (
          <el-input
            v-model={ this.tagInput }
            ref="saveTagInput"
            { ...{
              on: {
                blur: () => this.handleInputConfirm(bind[target.model]),
                '~keyup': () => this.handleInputConfirm(bind[target.model])
              }
            } }
            { ...getVueOptions(target.add.input) }
          ></el-input>
        ) : (
          <el-button
            onClick={ this.showTagInput }
            { ...getVueOptions(target.add.button) }
          >{ target.add.button.text || '+'}</el-button>
        )
      }
    </div>
  ) : renderTags();

}

// 按钮
export function m_button(bind, params, h) {
  const target = params.options;
  const renderButton = () => (
    target.data && target.data.map((option, index) => (
      <el-button key={ index } { ...getVueOptions(option) }>{ option.text }</el-button>
    ))
  );

  return target.group ? (
    <el-button-group>
      { renderButton() }
    </el-button-group>
  ) : renderButton();
}

// 上传
export function m_upload(bind, params, h) {
  const target = params.options;

  return (
    <el-upload { ...getVueOptions(target) }>
      {
        typeof target.render === 'function' ? target.render(h, params, this) : null
      }
      {
        target.slots && target.slots.map(item => {
          return item.render.call(this, h)
        })
      }
    </el-upload>
  )
}