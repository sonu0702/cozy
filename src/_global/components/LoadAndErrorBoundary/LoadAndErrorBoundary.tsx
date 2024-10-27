'use client';
import { ErrorBoundary } from '@rollbar/react';
import { ReactNode, Suspense } from 'react';
import MemoisedSuspenseFallbackUI from './SuspenseBoundayUI';
import MemoisedFallbackErrorUI from './ErrorBoundaryUI';

/**
 * @function LoadAndErrorBoundary
 * - Wrapper function that wraps the given child components
 * with a Error and Suspense Boundary
 */
export default function LoadAndErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary fallbackUI={MemoisedFallbackErrorUI}>
      <Suspense fallback={<MemoisedSuspenseFallbackUI />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
