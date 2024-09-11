import { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Drawer, Input, Select, Button, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const Segment = () => {
  const [open, setOpen] = useState(false);

  const options = [
    {
      id: 1,
      value: "first_name",
      label: "First Name",
    },
    {
      id: 2,
      value: "last_name",
      label: "Last Name",
    },
    { id: 3, value: "gender", label: "Gender" },
    { id: 4, value: "age", label: "Age" },
    { id: 5, value: "account_name", label: "Account Name" },
    { id: 6, value: "city", label: "City" },
    { id: 7, value: "state", label: "State" },
  ];

  const [fields, setFields] = useState([]);
  const [schema, setSchema] = useState("");
  const [selected, setSelected] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type) => {
    api[type]({
      message: "Schema Added Successfully"
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const handleAddField = () => {
    setFields([...fields, ""]);
  };
  const [segment, setSegment] = useState("");
  const handleRemoveField = (index, field) => {
    const newFields = fields.filter((fields, i) => i !== index);
    setFields(newFields);
    setSelected(selected.filter((data, i) => data !== field));
  };

  const handleFieldChange = (index, value) => {
    const newfields = [...fields];
    newfields[index] = value;
    setFields(newfields);

    setSelected((oldArray) => [...oldArray, value]);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleOptions = (value) => {
    setSchema(value);

    setSelected((oldArray) => [...oldArray, value]);
  };
  const submit = () => {
    const data = {
      segment_name: segment,
      schema: [
        {
          schema: schema,
          fields: fields,
        },
      ],
    };
    axios
      .post("https://dummy.restapiexample.com/api/v1/create", data)
      .then((response) => console.log("Created Successfully", response));

    setSegment("");
    setSchema("");
    setOpen(false);
    openNotification("success");
  };
  const handleCancel = () => {
    setOpen(false);
    setSegment("");
    setSchema("");
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={showDrawer}
        variant="outline-light"
        style={{ color: "black" }}
      >
        Save segment
      </Button>
      <Drawer title="Saving Segment" onClose={onClose} open={open} width={500}>
        <div className="mb-3">
          <label>Enter the Name of the segment</label>
          <Input
            value={segment}
            placeholder="Name of the segment"
            onChange={(e) => setSegment(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <Button onClick={handleAddField} type="link">
            <PlusOutlined />
            Add new schema
          </Button>
        </div>
        <div className="mb-3">
          <Select
            placeholder="Add schema to segment"
            onChange={(value) => handleOptions(value)}
            value={schema}
            style={{
              width: 400,
            }}
            required
          >
            {options.map((data, i) => {
              return (
                <Option key={data.id} value={data.value}>
                  {data.label}
                </Option>
              );
            })}
          </Select>
        </div>

        {fields.map((field, index) => (
          <>
            <div className="mb-3">
              <Select
                placeholder="Add schema to segment"
                value={field}
                onChange={(value) => handleFieldChange(index, value)}
                style={{
                  width: 400,
                }}
              >
                {options
                  .filter((n) => !selected.includes(n.value))
                  .map((data, i) => {
                    return (
                      <Option key={data.id} value={data.value}>
                        {data.label}
                      </Option>
                    );
                  })}
              </Select>
              <MinusCircleOutlined
                onClick={() => handleRemoveField(index, field)}
              ></MinusCircleOutlined>
            </div>
          </>
        ))}
        <Row>
          <Col>
            <Button type="primary" onClick={submit}>
              Save the segment
            </Button>
          </Col>
          <Col>
            <Button type="link" danger onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
export default Segment;
