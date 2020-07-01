import React from 'react';

const SelectTeam = ({placeholder,name, handleChange, options}) => (
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
                    key={option.id_Team}
                    value={option.id_Team}
                    >
                      {option.Team}
                  </option>
                ))}         
            </select>
      </div>
)


export default SelectTeam;