import React from 'react';

const SelectFonction = ({placeholder,name, handleChange, options}) => (
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
                    key={option.id_fonction}
                    value={option.id_fonction}
                    >
                      {option.fonction}
                  </option>
                ))}         
            </select>
      </div>
)


export default SelectFonction;