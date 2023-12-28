'use client';

import { ComponentProps, useRef } from 'react';

import { $ } from '@/utils/core';

import Button from '../Button';
import { Icon } from '../Icon';

export default function CheckboxItem({
  id,
  name,
  value,
  children,
  checked,
  onChange,
  disabled,
}: ComponentProps<'input'>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <>
      <Button
        className={$(
          'mt-2 w-full gap-2 rounded-lg border border-gray-3/70 p-4 transition-colors duration-100',
          checked ? 'bg-primary text-white' : 'bg-secondary/25',
        )}
        type="button"
        onClick={onClick}
      >
        {children}
        {checked && <Icon iconName="checkCircled" className="fill-white/50" />}
      </Button>

      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={checked}
        ref={inputRef}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
    </>
  );
}
