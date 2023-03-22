import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import Input, { InputProps } from '@ui/Input';

type RHFInputProps = {
  name: string;
} & InputProps;

const RHFInput: FC<RHFInputProps> = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          errorMessage={error?.message}
          {...other}
        />
      )}
    />
  );
};

export default RHFInput;
