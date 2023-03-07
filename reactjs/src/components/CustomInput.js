import { Input, Text } from '@chakra-ui/react';
import { TEXT_COLOR } from '../Constants';

const CustomInput = ({ setter, placeholder, required = false }) => {
  const changeHandler = e => {
    setter(e.target.value);
  };
  const textColor = TEXT_COLOR;

  return (
    <label>
      <Text as="b" {...textColor}>
        {placeholder}
      </Text>
      <Input
        onChange={changeHandler}
        placeholder={placeholder}
        focusBorderColor="green.200"
        _placeholder={{ opacity: 1, color: '#F0FFF4' }}
        color="#F0FFF4"
        size="lg"
        isRequired={required}
      />
    </label>
  );
};

export default CustomInput;
