import { lazy } from 'react';

const WordCounts = lazy(() => import('@/pages/word-counts.tsx'));

const Changes = lazy(() => import('@/pages/changes'));

const Sections = lazy(() => import('@/pages/sections'));

export { WordCounts, Changes, Sections };
