import { QSelectOption, QSelectProps } from 'quasar';
import { Ref } from 'vue';

export const createSimpleFilter = (
  currentOptions: Ref<QSelectOption[]>,
  initialOptions: QSelectOption[]
) => {
  const filterFn: QSelectProps['onFilter'] = (val, update) => {
    update(() => {
      if (val === '') {
        currentOptions.value = initialOptions;
      } else {
        const needle = val.toLowerCase();
        currentOptions.value = initialOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  };

  return filterFn;
};
