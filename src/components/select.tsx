import cx from 'classnames';
import React, { ForwardedRef, forwardRef } from 'react';
import { Controller } from 'react-hook-form';

import { OptionData } from '../application-form/application-form.interfaces';

type SelectProps = React
  .DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    id: string;
    labelMsg: string;
    defaultOptionMsg: string;
    options: OptionData[];
    errorMsg?: string;
    control: any;
  }

const Select = forwardRef((
  {
    id,
    labelMsg,
    defaultOptionMsg,
    options,
    errorMsg,
    control,
    ...htmlSelectAttributes
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) => {
  const renderSelectOptions = () => options
    .map((option) => (
      <option key={option.id} value={option.id}>{option.name}</option>
    ));

  return (
    <Controller
      name={id}
      render={({ field }) => (
        <div className="mb-3">
          <label htmlFor={id}>
            {labelMsg}
          </label>
          <select
            {...field}
            id={id}
            name={id}
            className={cx('form-select', {
              'is-invalid': errorMsg,
            })}
            aria-label={labelMsg}
            ref={ref}
            {...htmlSelectAttributes}
          >
            <option value="">{defaultOptionMsg}</option>
            {renderSelectOptions()}
          </select>
          <small className="invalid-feedback d-inline-block">
            {errorMsg}
          </small>
        </div>
      )}
      control={control}
      defaultValue=""
    />
  );
});

Select.defaultProps = {
  errorMsg: '',
};

export default Select;
