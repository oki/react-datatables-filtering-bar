import React from 'react'

const SelectFilter = ({ label, name, selected, onChange, collection, includeBlank=true }) => {
  return(
    <label>{label}
      <select name={name} value={selected} onChange={onChange} className="form-control input-sm">
        {includeBlank && <option value=""></option>}
        {collection.map(object =>
          <option key={object[1]} value={object[1]}>{object[0]}</option>
        )};
      </select>
    </label>
  )
}

export default SelectFilter;
