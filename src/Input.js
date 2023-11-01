
function Input({ value, onChange, hasError }) {
  return (
    <input 
      className='task-input'
      placeholder='Add new task'
      value={value}
      onChange={onChange}
      style={hasError ? {border: '1px solid red'} : {}}
    />
  );
}

export default Input;