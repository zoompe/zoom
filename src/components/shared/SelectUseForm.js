import React from 'react';

const SelectUseForm = ({register, name, options}) => (
        <div className="form-group">
            <label htmlFor={name}></label>
            <select 
              name={name}
              ref={register}
              // onChange = {handleChange}
              >
              {/* <option value="" disabled>SELECT {name} </option> */}
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


export default SelectUseForm;


