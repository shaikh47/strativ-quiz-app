import { type ReactNode } from 'react';

type LayoutPropertiesType = Readonly<{
  children: ReactNode;
}>;

export const Layout = ({ children }: LayoutPropertiesType) => {
  return (
    <div className='grid h-screen grid-flow-row grid-rows-[1fr_auto]'>
      <main className='grid grid-flow-row grid-cols-1 place-content-center place-items-center gap-5'>
        {children}
      </main>
    </div>
  );
};
