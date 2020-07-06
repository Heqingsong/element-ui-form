import Form from './components/Form';

const components = [
  Form
];

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  version: '1.0.0',
  install,
  Form
};
