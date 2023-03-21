import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import Input, { InputProps } from '@ui/Input';

type RHFInputProps = {
  name: string;
  required?: boolean;
} & InputProps;

const RHFInput: FC<RHFInputProps> = ({ name, required, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <Input {...field} errorMessage={error?.message} {...other} />
      )}
    />
  );
};

export default RHFInput;
