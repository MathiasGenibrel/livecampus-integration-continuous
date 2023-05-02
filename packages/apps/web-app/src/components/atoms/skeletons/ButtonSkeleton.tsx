import React, { FC } from 'react';
import clsx from 'clsx';
import { SkeletonProps } from './skeleton-types';
import { defaultClassName } from './defaultClassName';

export const ButtonSkeleton: FC<SkeletonProps> = ({
  className,
  width,
  height,
}) => (
  <div
    className={clsx(
      defaultClassName,
      'rounded',
      className,
      width ?? 'w-36',
      height ?? 'h-8'
    )}
  ></div>
);
