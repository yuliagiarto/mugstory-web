import TreeD from "react-d3-tree";
import { useContainerSize } from "../../../../src/helpers/windowSize";
import {
  CustomNodeElementProps,
  RawNodeDatum,
  TreeNodeDatum,
} from "react-d3-tree/lib/types/common";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../../common/modal";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { firestore, firebase } from "../../../../src/firebase";
import { Story, storyConverter } from "../../../../src/types/story";
import useFirebaseAuth from "../../../../src/helpers/FBAuthApi";
import { Menu, Transition } from "@headlessui/react";
import SelectOptionsSearch from "../../common/selectOptionsSearch";
import Loader from "../../common/loader";
import { getSessionStorageOrDefault } from "../../../../src/helpers/commonFunction";
import { SS_SHOW_TOUR_KEY } from "../../../../src/helpers/constants";
import { Choice, choiceConverter } from "../../../../src/types/choice";

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
    name: "Example Author",
    children: [
      {
        name: "Example Title1",
        attributes: {
          content: "Content",
        },
        children: [
          {
            name: "Example Choice1",
            attributes: {
              content: "Example Content1",
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
  } as RawNodeDatum);
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState({} as TreeNodeDatum);
  const { width, height } = useContainerSize(".tree-container");
  const nodeSize = { x: width / 4, y: height / 3 };
  const isTitleNode = (node: RawNodeDatum): boolean => {
    return node.attributes?.narration !== undefined;
  };
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
              <circle r={18} fill="#f4a261" />
              <circle r={16} fill="#fff" />
              <circle r={14} fill="#f4a261" />
            </>
            <foreignObject {...foreignObjectProps}>
              <div className={`w-[${foreignObjectProps.width}px] mx-auto`}>
                <div className="overflow-hidden shadow-md">
                  <div className="px-6 py-4 bg-white border-b border-gray-200 text-base">
                    <p className="break-words">
                      <i>
                        <b>Creator:</b> {nodeDatum.name}
                      </i>
                    </p>
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
            <circle r={18} fill="#f4a261" />
            <circle r={16} fill="#fff" />
            <circle r={14} fill="#f4a261" />
          </>
          {/* `foreignObject` requires width & height to be explicitly set. */}
          <foreignObject {...foreignObjectProps}>
            <div className={`w-[${foreignObjectProps.width}px] mx-auto`}>
              <div className="overflow-hidden shadow-md">
                <div className="px-6 py-4 bg-white border-b border-gray-200 text-base">
                  <p>{nodeDatum.name}</p>
                </div>
                {nodeDatum.attributes?.content && (
                  <div className="p-6 bg-white border-b border-gray-200">
                    <p className="line-clamp-3">
                      {nodeDatum.attributes?.content}
                    </p>
                  </div>
                )}

                <div className="p-6 bg-white border-gray-200 text-right">
                  <a
                    className="bg-amber-400 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-amber-400 hover:bg-opacity-70 rounded uppercase"
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
  const [run, setRun] = useState(false);
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
      disableBeacon: false,
    },
  ] as Step[]);
  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, type } = data;
      const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
      if (finishedStatuses.includes(status)) {
        setRun(false);
        sessionStorage.setItem(SS_SHOW_TOUR_KEY, "false");
      }
    },
    [setRun]
  );
  useEffect(() => {
    const isFirstTime = getSessionStorageOrDefault<boolean>(
      SS_SHOW_TOUR_KEY,
      true
    );
    if (isFirstTime) {
      setRun(true);
    } else {
      setRun(false);
    }
    return () => {
      document.getElementById("react-joyride-portal")?.remove();
      document.getElementById("react-joyride-step-0")?.remove();
    };
  }, []);
  // End Tour Guide

  // Firebase section
  const { authUser, loading } = useFirebaseAuth();
  const [showLoader, setShowLoader] = useState(false);
  const [stories, setStories] = useState([] as Story[]);
  const [choices, setChoices] = useState([] as Choice[]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(-1);
  useEffect(() => {
    if (!stories || loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [stories, loading]);
  useEffect(() => {
    if (!authUser) {
      // auth user not ready
      return;
    }
    const unsubscribe = firestore
      .collection("story")
      .where("creator", "==", authUser?.email)
      .withConverter(storyConverter)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          const storyT = doc.data();
          return { ...storyT, id: doc.id } as Story;
        });
        if (data) {
          setStories(data);
        }
      });
    return () => unsubscribe();
  }, [authUser]);
  const getOptions = useCallback(() => {
    return stories.map((x) => x.title!);
  }, [stories]);
  const optionSelectedHandler = useCallback(
    (s, i) => {
      setSelectedStoryIndex(i);
    },
    [setSelectedStoryIndex]
  );
  useEffect(() => {
    // Feed story data with selectedStory
    if (selectedStoryIndex < 0) return;
    const selectedStory = stories[selectedStoryIndex];
    const choiceSubs = firestore
      .collection(`story/${selectedStory.id}/choices`)
      .withConverter(choiceConverter)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          const choiceT = doc.data();
          return { ...choiceT, id: doc.id } as Choice;
        });
        if (data) {
          setChoices(data);
        }
      });
    return () => choiceSubs();
  }, [selectedStoryIndex]);
  useEffect(() => {
    // Feed story data with selectedStory
    if (selectedStoryIndex < 0 || !choices || choices.length < 1) return;
    const selectedStory = stories[selectedStoryIndex];
    const detailChoiceData = createChoiceTree(choices, 1);
    const selectedStoryData = {
      name: selectedStory.creator,
      children: [
        {
          name: selectedStory.title,
          attributes: {
            narration: selectedStory.narration,
            content: selectedStory.content,
          },
          children: detailChoiceData,
        },
      ],
    } as RawNodeDatum;
    setStoryData({ ...storyData, ...selectedStoryData });
  }, [choices, stories, setStoryData]);
  const createChoiceTree = (
    choicesData: Choice[],
    level: number,
    parentId?: string
  ): RawNodeDatum[] => {
    if (choicesData.length === 0) {
      return [];
    }
    let currentLevelChoice = choicesData.filter((x) => x.level === level);
    if (parentId) {
      currentLevelChoice = currentLevelChoice.filter(
        (x) => x.parents && x.parents.findIndex((y) => y === parentId) > -1
      );
    }
    let currentData = [] as RawNodeDatum[];
    const nextLevel = ++level;
    let copyChoice = [...choicesData];
    currentLevelChoice.forEach((ch) => {
      // Remove used choice
      var index = copyChoice.indexOf(ch);
      if (index > -1) {
        copyChoice.splice(index, 1);
      }
      currentData.push({
        name: ch.caption,
        attributes: { content: ch.content },
        children: createChoiceTree(copyChoice, nextLevel, ch.id),
      } as RawNodeDatum);
    });
    return currentData;
  };
  // End of Firebase section
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <>
      {showLoader && <Loader />}
      {showModal && (
        <Modal
          headerString={`Edit`}
          cancelButtonString="Cancel"
          onCancelHandler={handleCloseModal}
          onSubmitHandler={() => {}}
          submitButtonString="Submit"
        >
          <form>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              {isTitleNode(selectedNode) ? "Title" : "Choice"}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={selectedNode.name}
              onChange={() => {}}
              placeholder={isTitleNode(selectedNode) ? "Title" : "Choice"}
            />
          </form>
        </Modal>
      )}
      {run && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous={false}
          run={run}
          showSkipButton={true}
          steps={tourSteps}
        />
      )}
      <SelectOptionsSearch
        defaultSelectedOption="Please choose one of your stories"
        options={getOptions()}
        onOptionSelectedHandler={optionSelectedHandler}
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
                width: nodeSize.x,
                height: nodeSize.y,
                y: 32,
                x: -nodeSize.x / 2,
              },
            })
          }
          nodeSize={{ x: nodeSize.x * 1.25, y: nodeSize.y * 1.25 }}
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
export default React.memo(TreeComponent);
