import * as SelectPrimitive from '@radix-ui/react-select';
import { ChangeEventHandler, ReactNode } from 'react';

import { $ } from '@/utils/core';

import { Icon } from '../Icon';
import { IconName } from '../Icon/icon.type';

interface SelectProps extends SelectPrimitive.SelectProps {
  onChange?: ChangeEventHandler;
}

export default function Select({ children, ...props }: SelectProps) {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
}

function SelectTrigger({
  defaultValue,
  iconName,
  className,
}: {
  defaultValue?: string;
  iconName: IconName;
  className?: string;
}) {
  return (
    <SelectPrimitive.Trigger className={$('relative', className)}>
      <SelectPrimitive.Value placeholder={defaultValue} />
      <SelectPrimitive.Icon>
        <Icon iconName={iconName} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={$(className)}
        position="popper"
        sideOffset={4}
      >
        {children}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  children,
  className,
  ...props
}: SelectPrimitive.SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={$(
        'inline-flex w-full select-none items-center rounded-md p-4 leading-none text-gray-4 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[disabled]:text-gray-2 data-[highlighted]:text-white data-[highlighted]:outline-none',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-4 inline-flex items-center justify-center">
        <Icon
          iconName="checkCircled"
          width={20}
          height={20}
          viewBox="0 0 15 15"
        />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
