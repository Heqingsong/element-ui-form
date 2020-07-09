import Components from './element';
import { getVueOptions, renderGrids, renderFormItem } from './utils';

export default {
  name: 'VForm',
  props: {
    data: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tagInput: '',
      tagsInputVisible: false,
    }
  },
  methods: {
    showTagInput() {
      this.tagsInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleTagClose(model, tag) {
      if (Array.isArray(model) && tag) {
        model.splice(model.indexOf(tag), 1);
      }
    },
    handleInputConfirm(model) {
      const tagInput = this.tagInput;
      if (tagInput && Array.isArray(model)) {
        model.push(tagInput);
      }
      this.tagsInputVisible = false;
      this.tagInput = '';
    }
  },
  render(h) {
    const { data, config } = this;

    return (
      <Components.form.index { ...getVueOptions(config) }>
        {
          Array.isArray(config.grid) ? renderGrids.call(this, data, config, h) : renderFormItem.call(this, data, config, h)
        }
      </Components.form.index>
    );
  }
};
