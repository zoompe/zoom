import React from 'react';

const Select = ({value,name, handleChange, options}) => (
        <div className="form-group">
            <label htmlFor={name}></label>
            <select required="required"
              name={name}
              value={value}
              onChange={handleChange}
              >
              <option value="" disabled>SELECT {name} </option>
              {options.map(option => (
                  <option
                    key={option}
                    value={option}
                    label={option}>{option}
                  </option>
                ))}         
            </select>
      </div>
)


export default Select;