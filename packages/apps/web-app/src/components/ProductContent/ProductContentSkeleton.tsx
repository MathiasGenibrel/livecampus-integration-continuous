import { FC } from 'react';
import { ButtonSkeleton } from '../atoms/skeletons/ButtonSkeleton';
import { ImageSkeleton } from '../atoms/skeletons/ImageSkeleton';
import {
  TitleSkeleton,
  TitleSkeletonType,
} from '../atoms/skeletons/TitleSkeleton';
import { SpanSkeleton } from '../atoms/skeletons/SpanSkeleton';

export const ProductContentSkeleton: FC = () => {
  return (
    <div className="animate-pulse mt-4">
      <ImageSkeleton />
      <section className={'flex justify-between w-full mt-4'}>
        <TitleSkeleton width={'w-3/4'} />
        <SpanSkeleton />
      </section>

      <section className={'flex flex-col gap-4 my-8'}>
        <TitleSkeleton type={TitleSkeletonType.H2} width={'w-1/4'} />
        <div className="flex flex-col gap-2.5">
          <SpanSkeleton />
          <SpanSkeleton />
          <SpanSkeleton />
          <SpanSkeleton width="w-3/4" />
        </div>
      </section>

      <div className={'flex gap-4 justify-between'}>
        <ButtonSkeleton width={'w-3/4'} />
        <SpanSkeleton height={'h-max-content'} width={'w-1/4'} />
      </div>
    </div>
  );
};
