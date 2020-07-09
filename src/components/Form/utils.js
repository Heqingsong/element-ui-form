import * as renders from './renders';
import Components from './element';

const vueRenderAttrs = ['class', 'style', 'attrs', 'props', 'domProps', 'on', 'nativeOn', 'directives', 'scopedSlots', 'slot', 'key', 'ref', 'refInFor'];

export const getVueOptions = option => vueRenderAttrs.reduce((value, target) => {
  const key = option[target];

  if (key !== undefined) {
    value[target] = key;
  }
  
  return value;
}, {});

export const DateElType = {
  time: Components.time.select,
  date: Components.time.picker,
  datetime: Components.date
}

export function renderRadioCheckboxGroup (el, bind, params, h) {
  const EL = Components[el]['index'];
  const EL_GROUP = Components[el]['group'];
  const EL_BUTTON = Components[el]['button'];
  const target = params.options;
  const { group, model, data } = target;

  return group ? (
    <EL_GROUP v-model={ bind[model] } { ...getVueOptions(target) }>
      {
        data && data.map((option, index) => {
          return group.type === 'button' ? (
            <EL_BUTTON
              label={ option.value }
              key={ option.key }
              disabled={ option.disabled || false }
            >{ option.label }</EL_BUTTON>
          ) : (
            <EL
              label={ option.value }
              key={ option.key }
              disabled={ option.disabled || false }
            >{ option.label }</EL>
          )
        })
      }
    </EL_GROUP>
  ) : (
    data && data.map((option, index) => {
      return (
        <EL
          v-model={ bind[model] }
          label={ option.value }
          key={  option.key }
          { ...getVueOptions(target) }
        >{ option.label }</EL>
      );
    })
  );
}

export function renderComponents(item, config, h) {
  const { hide, is, options } = item;

  return hide ? null : <Components.form.item { ...getVueOptions(item) }>
    {
      is ?
      is.render.call(this, h) :
      renders[`m_${options.component}`].call(this, config.props.model, item, h)
    }
  </Components.form.item>
}

export function renderGrids(data, config, h) {
  const GRID = config.grid;
  let col_width = 0;
  let row_config = config.row || {};
  let col_config = config.col || {};
  let ROW = GRID[0];
  let COL = GRID[1];
  const renderCol = (row) => {
    return new Array(COL).fill(0).map((item, col) => {
      const index = row > 0 ? col + row * COL : col;
      return (
        <Components.col { ...col_config }>
          { data[index] && renderComponents.call(this, data[index], config, h) }
        </Components.col>
      );
    });
  };

  if(GRID.length === 1) {
    COL = ROW;
    ROW = Math.ceil(data.length / GRID[0]);
  }

  col_width = parseInt( 24 / COL);

  try {
    if (!Object.keys(col_config.props).includes('span')) {
      col_config.props['span'] = col_width;
    }
  } catch (error) {
    col_config = {
      props: {
        span: col_width
      }
    };
  }

  row_config = row_config ? getVueOptions(row_config) : {};
  col_config = col_config ? getVueOptions(col_config) : {};

  // row
  return new Array(ROW).fill(0).map((item, row) => {
    return (
      <Components.row { ...row_config }>
        { renderCol(row) }
      </Components.row>
    );
  })
}

export function renderFormItem(data, config, h) {
  return data.map(item => renderComponents.call(this, item, config, h));
}

export function renderHocComponents(El, bind, params, h) {
  const target = params.options;
  
  return (
    <El
      v-model={ bind[target.model] }
      { ...getVueOptions(target) }
    ></El>
  );
}