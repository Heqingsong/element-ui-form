import * as renders from './renders';

const vueRenderAttrs = ['class', 'style', 'attrs', 'props', 'domProps', 'on', 'nativeOn', 'directives', 'scopedSlots', 'slot', 'key', 'ref', 'refInFor'];

export const getVueOptions = option => {
  let result = {};

  vueRenderAttrs.forEach(key => {
    const value = option[key];

    if (value !== undefined) {
      result[key] = value;
    }
  });

  return result;
}

export const DateElType = {
  'time': 'el-time-select',
  'date': 'el-time-picker',
  'datetime': 'el-date-picker'
};

export function renderRadioCheckboxGroup (el, bind, params, h) {
  const EL = el;
  const EL_GROUP = `${el}-group`;
  const EL_BUTTON = `${el}-button`;
  const target = params.options;

  return target.group ? (
    <EL_GROUP v-model={ bind[target.model] } { ...getVueOptions(target) }>
      {
        target.data && target.data.map((option, index) => {
          return target.group.type === 'button' ? (
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
    target.data && target.data.map((option, index) => {
      return (
        <EL
          v-model={ bind[target.model] }
          label={ option.value }
          key={  option.key }
          { ...getVueOptions(target) }
        >{ option.label }</EL>
      );
    })
  );
}

export function renderComponents(item, config, h) {
  return item.hide ? null : <el-form-item { ...getVueOptions(item) }>
    {
      item.is ?
      item.is.render.call(this, h) :
      renders[`m_${item.options.component}`].call(this, config.props.model, item, h)
    }
  </el-form-item>
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
      let index = row > 0 ? col + row * COL : col;
      return (
        <el-col { ...col_config }>
          { data[index] && renderComponents.call(this, data[index], config, h) }
        </el-col>
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
      <el-row { ...row_config }>
        { renderCol(row) }
      </el-row>
    );
  })
}

export function renderFormItem(data, config, h) {
  return data.map(item => renderComponents.call(this, item, config, h));
}