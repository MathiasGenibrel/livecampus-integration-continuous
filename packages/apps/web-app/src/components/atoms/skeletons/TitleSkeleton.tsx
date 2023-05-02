import React, { FC } from 'react';
import clsx from 'clsx';
import { defaultClassName } from './defaultClassName';

interface TitleSkeletonProps {
  type?: TitleSkeletonType;
  width?: string;
}

export enum TitleSkeletonType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
}

export const TitleSkeleton: FC<TitleSkeletonProps> = ({
  type = TitleSkeletonType.H1,
  width,
}) => {
  let height: string;

  switch (type) {
    case TitleSkeletonType.H1:
      height = 'h-7';
      break;

    case TitleSkeletonType.H2:
      height = 'h-5';
      break;

    case TitleSkeletonType.H3:
      height = 'h-3.4';
      break;

    case TitleSkeletonType.H4:
      height = 'h-2.5';
      break;
  }

  return (
    <div
      className={clsx(
        defaultClassName,
        'rounded-full',
        width ? width : 'w-48',
        height
      )}
    ></div>
  );
};
