'use client';

import { ComponentProps } from 'react';

import { $ } from '@/utils/core';

interface CardProps extends ComponentProps<'div'> {}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={$(
        'flex flex-col gap-4 rounded-xl border border-gray-3 bg-gray-1 p-4 transition hover:bg-white hover:shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}
