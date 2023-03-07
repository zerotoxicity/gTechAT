import { Input, Text } from '@chakra-ui/react';

const CustomInput = ({ setter, placeholder, required = false }) => {
  const changeHandler = e => {
    setter(e.target.value);
  };

  return (
    <label>
      <Text as="b" color={'green.200'}>
        {placeholder}
      </Text>
      <Input
        onChange={changeHandler}
        placeholder={placeholder}
        focusBorderColor="green.200"
        color="#F0FFF4"
        size="lg"
        isRequired={required}
      />
    </label>
  );
};

export default CustomInput;
