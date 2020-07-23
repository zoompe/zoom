import React from 'react';

const SelectStructure = ({placeholder,name, handleChange, options}) => (
        <div className="form-group">
            <label htmlFor={name}></label>
            <select required="required"
              name={name}
              defaultValue=''
              onChange={handleChange}
              >
              <option value='' disabled >{placeholder}</option>
              {options.map(option => ( 
                  <option 
                    key={option.id_ape}
                    value={option.id_ape}
                    >
                      {option.libelle_ape}
                  </option>
                ))}         
            </select>
      </div>
)


export default SelectStructure;