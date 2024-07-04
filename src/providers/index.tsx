import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { MediaQueryProvider } from './media-query-provider';
import { Spinner } from '../components/elements';

const ErrorFallback = () => {
  return (
    <div
      className='grid h-screen w-screen grid-flow-row grid-cols-1 place-content-center place-items-center gap-2'
      role='alert'
    >
      <div className='text-lg font-bold text-red-500'>Something went wrong</div>
      <div
        onClick={() => {
          window.location.assign(window.location.origin);
        }}
      >
        Refresh
      </div>
    </div>
  );
};

type AppProviderPropertiesType = {
  readonly children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderPropertiesType) => {
  return (
    <Suspense
      fallback={
        <div className='grid h-screen w-screen place-content-center place-items-center'>
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
            {/* <Notifications /> */}
              <MediaQueryProvider>
                <Router>{children}</Router>
                {/* <RouterProvider router={children} /> */}
                {/* {children} */}
              </MediaQueryProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
