import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import Input, { InputProps } from '@ui/Input';

type RHFInputProps = {
  name: string;
} & InputProps;

const RHFormInput: FC<RHFInputProps> = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <Input {...field} errorMessage={error?.message} {...other} />
      )}
    />
  );
};

export default RHFormInput;
