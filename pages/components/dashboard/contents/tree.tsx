import Tree from "react-d3-tree";

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
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div className="flex justify-between h-full">
      <Tree data={orgChart} />
    </div>
  );
};

interface IProp {}
export default TreeComponent;
