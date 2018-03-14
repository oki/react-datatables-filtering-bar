import React from 'react'
import SelectFilter from './select_filter'
import CheckboxFilter from './checkbox_filter'

const components = {
  select: SelectFilter,
  checkbox: CheckboxFilter,
};

const FilterFactory = ({filter, selected, handleChange}) => {
  const ComponentFilter = components[filter.type];
  return(
    <ComponentFilter
      label={filter.label}
      name={filter.name}
      selected={selected}
      onChange={handleChange}
      collection={filter.collection}
      includeBlank={filter.include_blank}
    />
  )
}

export default FilterFactory;
