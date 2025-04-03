import { useEffect, useState, useReducer } from 'react';

import { MouseHandler } from '@nivo/circle-packing';

import { CircleNode, emptyNode, TitleCountCirclePacking } from '@/components';

interface TitleCount {
  title: string;
  word_count: number;
  label: string;
}

interface ZoomState {
  zoomedId: string | null;
  isZoomed: boolean;
}

type ZoomAction = { type: 'ZOOM'; id: string | null } | { type: 'RESET' };

const zoomReducer = (state: ZoomState, action: ZoomAction): ZoomState => {
  switch (action.type) {
    case 'ZOOM':
      return { zoomedId: action.id, isZoomed: true };
    case 'RESET':
      return { zoomedId: null, isZoomed: false };
    default:
      return state;
  }
};

const WordCounts = () => {
  const [circleData, setCircleData] = useState<CircleNode>(emptyNode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomState, zoomDispatch] = useReducer(zoomReducer, {
    zoomedId: null,
    isZoomed: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('http://localhost:3001/title-counts'); // Example: your eCFR API
        if (!response.ok) {
          setError(`HTTP error! status: ${response.status}`);
        }
        const result: TitleCount[] = (await response.json()) as TitleCount[];
        const titleChildren = result.map(
          (title: { title: string; word_count: number }) => ({
            name: title.title,
            value: title.word_count,
            label: `Title ${title.title} (${title.word_count})`,
          }),
        );

        // Transform API response to match Nivo's expected format
        // Assuming result is like { titles: [{ number: "1", word_count: 100 }, ...] }
        const transformedData: CircleNode = {
          name: 'Titles',
          value: 100,
          label: 'Titles',
          children: titleChildren,
        };

        setCircleData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData().catch((err) => {
      setError(
        err instanceof Error
          ? `Error loading data: ${err.message}`
          : 'Unknown error',
      );
    });
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!circleData) return <div>No data available</div>;

  const onClick: MouseHandler<CircleNode> = (node, _event) => {
    if (zoomState.isZoomed) {
      zoomDispatch({ type: 'RESET' });
    } else {
      zoomDispatch({ type: 'ZOOM', id: node.data.name });
    }
  };

  return (
    <div>
      <h1>Word Counts</h1>
      <div className="h-screen w-full">
        <TitleCountCirclePacking
          data={circleData}
          onClick={onClick}
          zoomedId={zoomState.zoomedId}
        />
      </div>
    </div>
  );
};

export default WordCounts;
