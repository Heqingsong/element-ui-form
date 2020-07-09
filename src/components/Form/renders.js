import Components from './element';
import {
  getVueOptions,
  renderRadioCheckboxGroup,
  DateElType,
  renderHocComponents
} from './utils';

// 下拉列表
export function m_select(bind, params, h) {
  const target = params.options;
  const { model, group, data } = target;

  const renderOptions = (target, value) => value && value.map((item, index) => {
    const { label, value, disabled, slots, render } = item;

    return (
      <Components.select.option
        label={ label }
        value={ value }
        key={ index }
        disabled={ disabled || null }>
        {
          slots && slots.map(item => render.call(this, h))
        }
      </Components.select.option>
    );
  });

  const renderGroup = target => target.data && target.data.map((item, index) => {
    const { label, options } = item;

    return (
      <Components.select.group key={ index } label={ label }>
        { renderOptions(target, options) }
      </Components.select.group>
    );
  });
  
  return (
    <Components.select.index v-model={ bind[model] } { ...getVueOptions(target) }>
      { group ? renderGroup(target) : renderOptions(target, data) }
    </Components.select.index>
  );
}

// 级联菜单
export function m_cascader(bind, params, h) {
  const target = params.options;
  const { panel, model, data } = target;

  return panel ? (
    <Components.cascader.panel
      v-model={ bind[model] }
      options={ data || [] }
      { ...getVueOptions(target) }
    ></Components.cascader.panel>
  ) : (
    <Components.cascader.index
      v-model={ bind[model] }
      options={ data || [] }
      { ...getVueOptions(target) }
    ></Components.cascader.index>
  );
}

// Number计数器
export function m_number(bind, params, h) {
  return renderHocComponents.call(this, Components.number, bind, params, h);
}

// 输入框
export function m_input(bind, params, h) {
  const target = params.options;
  const { model, slots } = target;

  return (
    <Components.input
      v-model={ bind[model] }
      { ...getVueOptions(target) }
      >
        {
          slots && slots.map(item => {
            return item.render.call(this, h)
          })
        }
    </Components.input>
  );
}

// 搜索提示框
export function m_autocomplete(bind, params, h) {
  const target = params.options;
  const {  model, slots } = target;

  return (
    <Components.autocomplete
      v-model={ bind[model] }
      { ...getVueOptions(target) }
    >
      {
        slots && slots.map(item => {
          return item.render.call(this, h)
        })
      }
    </Components.autocomplete>
  );
}

// textarea
export function m_textarea(bind, params, h) {
  return m_input.call(this, bind, params, h);
}

// 单选
export function m_radio(bind, params, h) {
  return renderRadioCheckboxGroup.call(this, 'radio', bind, params, h);
}

// 多选
export function m_checkbox(bind, params, h) {
  return renderRadioCheckboxGroup.call(this, 'checkbox', bind, params, h);
}

// 滑块
export function m_switch(bind, params, h) {
  return renderHocComponents.call(this, Components.switch, bind, params, h);
}

// 时间选择
export function m_datetime(bind, params, h) {
  const target = params.options;
  const { type, model } = target;
  const dateMapKey = Object.keys(DateElType);
  const Type = dateMapKey.includes(type) ? type : dateMapKey[0];
  const EL = DateElType[Type];

  return (
    <EL
      v-model={ bind[model] }
      { ...getVueOptions(target) }
    ></EL>
  );
}

// 日期选择
export function m_date(bind, params, h) {
  return renderHocComponents.call(this, Components.date, bind, params, h);
}

// 链接
export function m_link(bind, params, h) {
  const target = params.options;
  const { attrs, slots } = target;

  return (
    <Components.link { ...getVueOptions(target) }>
      { attrs.text }
      {
        slots && slots.map(item => {
          return item.render.call(this, h)
        })
      }
    </Components.link>
  );
}

// 滑块
export function m_slider(bind, params, h) {
  return renderHocComponents.call(this, Components.slider, bind, params, h);
}

// 评分
export function m_rate(bind, params, h) {
  return renderHocComponents.call(this, Components.rate, bind, params, h);
}

// 颜色
export function m_color(bind, params, h) {
  return renderHocComponents.call(this, Components.color, bind, params, h);
}

// 标签
export function m_tag(bind, params, h) {
  const target = params.options;
  const { data, model, add } = target;
  const renderTags = () => (
    data && data.map((option, index) => (
      <Components.tag key={index} { ...{
        on: {
          close: () => {
            this.handleTagClose(bind[model], option.value)
          }
        }
      } } { ...getVueOptions(option) }>{ option.value }</Components.tag>
    ))
  );

  return add ? (
    <div>
      { renderTags() }
      {
        this.tagsInputVisible ? (
          <Components.input
            v-model={ this.tagInput }
            ref="saveTagInput"
            { ...{
              on: {
                blur: () => this.handleInputConfirm(bind[model]),
                '~keyup': () => this.handleInputConfirm(bind[model])
              }
            } }
            { ...getVueOptions(add.input) }
          ></Components.input>
        ) : (
          <Components.button.index
            onClick={ this.showTagInput }
            { ...getVueOptions(add.button) }
          >{ add.button.text || '+'}</Components.button.index>
        )
      }
    </div>
  ) : renderTags();

}

// 按钮
export function m_button(bind, params, h) {
  const target = params.options;
  const { data, group } = target;
  const renderButton = () => (
    data && data.map((option, index) => (
      <Components.button.index key={ index } { ...getVueOptions(option) }>{ option.text }</Components.button.index>
    ))
  );

  return group ? (
    <Components.button.group>
      { renderButton() }
    </Components.button.group>
  ) : renderButton();
}

// 上传
export function m_upload(bind, params, h) {
  const target = params.options;
  const { render, slots } = target;

  return (
    <Components.upload { ...getVueOptions(target) }>
      { typeof render === 'function' ? render(h, params, this) : null }
      {
        slots && slots.map(item => {
          return item.render.call(this, h)
        })
      }
    </Components.upload>
  )
}