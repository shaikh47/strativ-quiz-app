import clsx from 'clsx';
import { type ReactNode } from 'react';

type ContentLayoutPropertiesType = Readonly<{
  children: ReactNode;
  title: string;
}>;

export const ContentLayout = ({ children, title }: ContentLayoutPropertiesType) => {
  return (
    <>
      <div className={clsx('grid h-full grid-flow-row grid-cols-1 grid-rows-[auto_1fr] rounded-3xl')}>
        <h1 className={clsx('rounded-t-3xl bg-orange-400 px-8 py-5 font-bold text-white')}>{title}</h1>
        <div
          className={clsx(
            'h-full overflow-auto rounded-b-3xl bg-orange-100',
            'px-16 py-10 sp:px-4 sp:py-2 tablet:px-8 tablet:py-5 laptop:px-12 laptop:py-10',
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
