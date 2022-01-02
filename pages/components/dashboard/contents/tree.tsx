import TreeD from "react-d3-tree";
import { useContainerSize } from "../../../../src/helpers/windowSize";
import {
  CustomNodeElementProps,
  TreeNodeDatum,
} from "react-d3-tree/lib/types/common";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../../common/modal";
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers,
} from "react-joyride";

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
  const [storyData, setStoryData] = useState({
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
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState({} as TreeNodeDatum);
  const { width, height } = useContainerSize(".tree-container");
  const nodeSize = { x: width / 4, y: height / 3 };
  const openEditModal = useCallback(
    (node: TreeNodeDatum, e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setShowModal(!showModal);
      setSelectedNode(node);
    },
    [showModal]
  );
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);
  const renderForeignObjectNode = useCallback(
    (props: ITreeCreationParameter) => {
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

                <div className="p-6 bg-white border-gray-200 text-right">
                  <a
                    className="bg-blue-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-blue-400 rounded uppercase"
                    href="#"
                    onClick={(e) => openEditModal(nodeDatum, e)}
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </foreignObject>
        </g>
      );
    },
    [openEditModal]
  );

  // Tour Guide
  const [run, setRun] = useState(true);
  const [tourSteps, setTourSteps] = useState([
    {
      content:
        "You can swipe the story tree and use scroll to zoom in and out.",
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".tree-container",
      title: "Stories Tree",
      disableBeacon: true,
    },
  ] as Step[]);
  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, type } = data;
      const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

      if (finishedStatuses.includes(status)) {
        setRun(false);
      }

      console.groupCollapsed(type);
      console.log(data);
      console.groupEnd();
    },
    [setRun]
  );
  // End Tour Guide
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <>
      {showModal && (
        <Modal
          headerString={`Edit ${selectedNode.name}`}
          cancelButtonString="Cancel"
          onCancelHandler={handleCloseModal}
          onSubmitHandler={() => {}}
          submitButtonString="Submit"
        >
          <form></form>
        </Modal>
      )}
      <Joyride
        callback={handleJoyrideCallback}
        continuous={false}
        run={run}
        showSkipButton={true}
        steps={tourSteps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <div className="flex justify-between h-full tree-container">
        <TreeD
          data={storyData}
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
    </>
  );
};

interface IProp {}
export default TreeComponent;
