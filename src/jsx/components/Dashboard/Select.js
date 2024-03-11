import Select from 'react-select';

const CustomSelect = (props) => {
  const options = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'tomorrow', label: 'Tomorrow' },
  ];

  return (
    <Select
      options={options}
      isSearchable={false}
      styles={{
        control: (provided) => ({
          ...provided,
          width: '6rem',
          fontSize: '12px',
          marginRight: '0.2rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          textDecoration : 'none',
        }),
          indicatorSeparator : (provided)=>({
            ...provided,
            display : 'none'
          }),
        option: (provided) => ({
            ...provided,
            fontSize: '12px', // Set the font size for options
            fontWeight : 500,

          }),
          singleValue: (provided) => ({
            ...provided,
         
          }),
      }}
    />
  );
};
export default CustomSelect;