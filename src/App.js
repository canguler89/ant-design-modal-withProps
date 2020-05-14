import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Modal,
} from "antd";

export default function DataTable() {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => setVisible(false);

  const showModal = () => {
    setVisible(true);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "5%" }}>
      <h1>React Ant design Modal with props</h1>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TableComponent />
      </Modal>
    </div>
  );
}
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    row1: `${i}`,
    row2: `${i}`,
    row3: `${i}`,
    row4: `${i}`,
    row5: `${i}`,
    row6: `${i}`,
    row7: `${i}`,
    row8: `${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableComponent = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      row1: "",
      row2: "",
      row3: "",
      row4: "",
      row5: "",
      row6: "",
      row7: "",

      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "data1",
      dataIndex: "row1",
      width: "15%",
      editable: true,
    },
    {
      title: "data2",
      dataIndex: "row2",
      width: "15%",
      editable: true,
    },
    {
      title: "data3",
      dataIndex: "row3",
      width: "15%",
      editable: true,
    },
    {
      title: "data4",
      dataIndex: "row4",
      width: "15%",
      editable: true,
    },
    {
      title: "data5",
      dataIndex: "row5",
      width: "15%",
      editable: true,
    },
    // {
    //   title: "data6",
    //   dataIndex: "row6",
    //   width: "15%",
    //   editable: true,
    // },
    // {
    //   title: "data7",
    //   dataIndex: "row7",
    //   width: "15%",
    //   editable: true,
    // },
    {
      title: "Change Data",
      width: "5%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
                width: "5%",
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
      />
    </Form>
  );
};
