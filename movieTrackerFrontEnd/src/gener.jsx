import React from 'react';

function Gener()  {

    const onChangeValue = (event) => {
        console.log(event.target.value);
      }
    return (
        <div onChange={onChangeValue}>
          <input type="radio" value="Male" name="gender" /> Male
          <input type="radio" value="Female" name="gender" /> Female
          <input type="radio" value="Other" name="gender" /> Other
        </div>
      );
}


export default Gener;