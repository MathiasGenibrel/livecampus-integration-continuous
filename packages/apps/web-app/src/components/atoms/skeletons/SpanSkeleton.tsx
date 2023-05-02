import React, { FC } from 'react';
import clsx from 'clsx';
import { SkeletonProps } from './skeleton-types';
import { defaultClassName } from './defaultClassName';

export const SpanSkeleton: FC<SkeletonProps> = ({
  className,
  width,
  height,
}) => (
  <div
    className={clsx(
      defaultClassName,
      'rounded-full',
      className,
      width,
      height ?? 'h-2'
    )}
  ></div>
);
