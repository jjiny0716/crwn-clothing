import { Group, FormInputLabel, Input } from "./FormInput.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps}/>
      {
        label ? <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel> : ''  
      }
    </Group>
  );
}

export default FormInput;