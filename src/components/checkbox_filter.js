import React from 'react'

const CheckboxFilter = ({ label, name, selected, onChange, collection, includeBlank=true }) => {
  return(
    <label>{label}
      <input type="checkbox" name={name} value="1" onChange={onChange} checked={selected.toString() == "true"}/>
    </label>
  )
}

export default CheckboxFilter;
