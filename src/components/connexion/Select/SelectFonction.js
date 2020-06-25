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
                    key={option.id_Fonction}
                    value={option.id_Fonction}
                    >
                      {option.Fonction}
                  </option>
                ))}         
            </select>
      </div>
)


export default SelectFonction;