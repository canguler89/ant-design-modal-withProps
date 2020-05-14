import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Table } from "antd";
import { Resizable } from "react-resizable";

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class TableCont extends React.Component {
  state = {
    columns: [
      {
        title: "Data1",
        dataIndex: "data1",
        width: 50,
      },
      {
        title: "Data2",
        dataIndex: "data1",
        width: 50,
      },
      {
        title: "Data3",
        dataIndex: "data1",
        width: 50,
      },
      {
        title: "Data4",
        dataIndex: "data1",
        width: 50,
      },
      {
        title: "Data4",
        dataIndex: "data1",
        width: 50,
      },
      {
        title: "Data4",
        dataIndex: "data1",
        width: 50,
      },
    ],
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  data = [
    {
      key: 0,
      data1: "2018-02-11",
      data2: "2018-02-11",
    },
    {
      key: 1,
      data2: "2018-02-11",
    },
    {
      key: 2,
      data3: "2018-02-11",
    },
    {
      key: 3,
      data4: "2018-02-11",
    },
    {
      key: 4,
      data5: "2018-02-11",
    },
  ];
  //   "data1": [1,2,3,4,5],
  //   "data2": [10,11,12,13,14],
  //   "data3": [5,4,3,2,1],
  //   "data4": [0,1,12,1,1],
  //   "data5": [12,12,7,4,8],
  //   "data6": [8,8,9,9,6]

  handleResize = (index) => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <Table
        bordered
        components={this.components}
        columns={columns}
        dataSource={this.data}
      />
    );
  }
}

export default TableCont;
