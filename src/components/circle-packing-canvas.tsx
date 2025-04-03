import {
  ComputedDatum,
  MouseHandler,
  ResponsiveCirclePackingHtml,
} from '@nivo/circle-packing';
import { LabelProps } from '@nivo/circle-packing/dist/types/types';

export interface CircleNode {
  name: string;
  value: number; // Assuming 'value' is what your labels use
  label: string;
  children?: CircleNode[];
}

export const emptyNode: CircleNode = {
  name: '',
  value: 0,
  label: '',
  children: [],
};

export interface CirclePackingProps {
  data: CircleNode;
  onClick?: MouseHandler<CircleNode>;
  zoomedId?: string | null;
}

const MultiLineLabel = ({ node }: LabelProps<CircleNode>) => {
  const title = node.data.name;
  const count = node.data.value;

  return (
    <div
      style={{
        position: 'absolute',
        left: node.x, // Center of the circle (x)
        top: node.y, // Center of the circle (y)
        transform: 'translate(-50%, -50%)', // Center the div on x, y
        textAlign: 'center',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        color: 'black',
        fontSize: '12px',
        pointerEvents: 'none',
      }}
    >
      <span>Title {title}</span>
      <br />
      <span>{count}</span>
    </div>
  );
};

const Tooltip = (props: ComputedDatum<CircleNode>) => {
  return (
    <div
      style={{
        background: 'lightgray',
        color: 'black',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: props.color,
          display: 'inline-block',
          marginRight: '5px',
        }}
      ></div>
      <strong>Title {props.data.name}</strong>
      <br />
      <span>Words {props.data.value}</span>
    </div>
  );
};

export const TitleCountCirclePacking = ({
  data /* see data tab */,
  onClick,
  zoomedId,
}: CirclePackingProps) => {
  return (
    <ResponsiveCirclePackingHtml
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      zoomedId={zoomedId}
      colors={{ scheme: 'spectral' }}
      colorBy="id"
      childColor={{
        from: 'color',
        modifiers: [['brighter', 0.4]],
      }}
      padding={5}
      isInteractive={true}
      onClick={onClick}
      leavesOnly={true}
      enableLabels={true}
      labelComponent={MultiLineLabel}
      tooltip={Tooltip}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 2.4]],
      }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
      }}
      animate={true}
    />
  );
};
