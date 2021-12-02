import TreeD from "react-d3-tree";
import { useContainerSize } from "../../../../src/helpers/windowSize";

const TreeComponent = (prop: IProp) => {
  const orgChart = {
    name: "CEO",
    children: [
      {
        name: "Manager",
        attributes: {
          department: "Production",
        },
        children: [
          {
            name: "Foreman",
            attributes: {
              department: "Fabrication",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
          {
            name: "Foreman",
            attributes: {
              department: "Assembly",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
        ],
      },
    ],
  };
  const { width, height } = useContainerSize(".tree-container");
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div className="flex justify-between h-full tree-container">
      <TreeD
        data={orgChart}
        shouldCollapseNeighborNodes={true}
        enableLegacyTransitions={true}
        zoomable={true}
        scaleExtent={{ max: 2, min: 0.1 }}
        orientation={"vertical"}
        pathFunc={"step"}
        translate={{ x: width / 2, y: 20 }}
      />
    </div>
  );
};

interface IProp {}
export default TreeComponent;
