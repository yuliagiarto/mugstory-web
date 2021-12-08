import TreeD from "react-d3-tree";
import { useContainerSize } from "../../../../src/helpers/windowSize";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";

interface IForeignObjectProps {
  width: number;
  height: number;
  x: number;
  y: number;
}
interface ITreeCreationParameter {
  customeNodeParam: CustomNodeElementProps;
  foreignObjectProps: IForeignObjectProps;
}

const TreeComponent = (prop: IProp) => {
  const orgChart = {
    name: "Author",
    children: [
      {
        name: "Title1",
        attributes: {
          content: "Content",
        },
        children: [
          {
            name: "Choice1",
            attributes: {
              content: "Content1",
            },
            children: [
              {
                name: "Choice1",
              },
              {
                name: "Choice2",
              },
            ],
          },
          {
            name: "Choice2",
            attributes: {
              content: "Content2",
            },
            children: [
              {
                name: "Choice1",
              },
              {
                name: "Choice2",
              },
            ],
          },
        ],
      },
    ],
  };
  const { width, height } = useContainerSize(".tree-container");
  const nodeSize = { x: width / 4, y: width / 4 };
  const renderForeignObjectNode = (props: ITreeCreationParameter) => {
    const { customeNodeParam, foreignObjectProps } = { ...props };
    const { nodeDatum, toggleNode, hierarchyPointNode } = customeNodeParam;
    const isBranchNode = !!nodeDatum.children;
    const isLeafNode = !nodeDatum.children;
    const isRootNode = nodeDatum.__rd3t.depth === 0;

    if (isRootNode) {
      return (
        <g strokeWidth={0} stroke="#8a8a8a">
          <>
          <circle r={18} fill="#578aef" />
          <circle r={16} fill="#fff" />
          <circle r={14} fill="#578aef" />
          </>
          <foreignObject {...foreignObjectProps}>
          <div className={`w-[${foreignObjectProps.width}px] mx-auto`}>
            <div className="overflow-hidden shadow-md">
              <div className="px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase">
                {nodeDatum.name}
              </div>
            </div>
          </div>
        </foreignObject>
        </g>
      );
    }

    return (
      <g onClick={toggleNode} strokeWidth={0}>
        <>
          <circle r={18} fill="#578aef" />
          <circle r={16} fill="#fff" />
          <circle r={14} fill="#578aef" />
        </>
        {/* `foreignObject` requires width & height to be explicitly set. */}
        <foreignObject {...foreignObjectProps}>
          <div className={`w-[${foreignObjectProps.width}px] mx-auto`}>
            <div className="overflow-hidden shadow-md">
              <div className="px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase">
                {nodeDatum.name}
              </div>

              {nodeDatum.attributes?.content && (
                <div className="p-6 bg-white border-b border-gray-200">
                  {nodeDatum.attributes?.content}
                </div>
              )}
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div className="flex justify-between h-full tree-container">
      <TreeD
        data={orgChart}
        shouldCollapseNeighborNodes={true}
        enableLegacyTransitions={true}
        zoomable={true}
        scaleExtent={{ max: 2, min: 0.1 }}
        orientation={"horizontal"}
        pathFunc={"step"}
        translate={{ x: width / 5, y: height / 4 }}
        renderCustomNodeElement={(customeNodeParam) =>
          renderForeignObjectNode({
            customeNodeParam,
            foreignObjectProps: {
              width: nodeSize.x * 0.75,
              height: nodeSize.y,
              y: 32,
              x: -(nodeSize.x * 0.75) / 2,
            },
          })
        }
        nodeSize={{ x: nodeSize.x, y: nodeSize.y }}
        rootNodeClassName="node__root"
        initialDepth={2}
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </div>
  );
};

interface IProp {}
export default TreeComponent;
