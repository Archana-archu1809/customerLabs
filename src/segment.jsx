import { useState } from "react";
import * as formik from "formik";

import { Drawer } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button } from "react-bootstrap";

const Segment = () => {
  const { Formik } = formik;

  const [open, setOpen] = useState(false);
  const data = [
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

  const showDrawer = () => {
    setOpen(true);
  };

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((fields, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldChange = (index, event) => {
    const newfields = [...fields];
    newfields[index] = event.target.value;
    setFields(newfields);
  };

  const onClose = () => {
    setOpen(false);
  };

  const submit = (values, { resetForm }) => {
    console.log(values.segment, values.schema, fields);
   
  };

  return (
    <>
      <Button onClick={showDrawer}>Save segment</Button>
      <Drawer title="Saving segment" onClose={onClose} open={open}>
        <Formik
          onSubmit={submit}
          initialValues={{
            segment: "",
            schema: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">
                  Enter the Name of the Segment
                </Form.Label>
                <Form.Control
                  type="text"
                  name="segment"
                  placeholder="Name of the segment"
                  required
                  onChange={handleChange}
                  value={values.segment}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select
                  className="form-select"
                  name="schema"
                  placeholder="Add schema to segment"
                  required
                  onChange={handleChange}
                  value={values.schema}
                >
                  <option value="">Select Pairname</option>

                  <option value="first_name">First Name</option>
                  <option value="last_name">Last Name</option>
                  <option value="gender">Gender</option>
                  <option value="age">Age</option>
                  <option value="account_name">Account Name</option>
                  <option value="city">City</option>
                  <option value="state">State</option>
                </Form.Select>
              </Form.Group>

              <Button onClick={handleAddField}>
                <PlusOutlined />
                Add new schema
              </Button>

              {fields.map((field, index) => (
                <Form.Group key={index} className="mb-3">
                  <Form.Select
                    className="form-select"
                    placeholder="Add schema to segment"
                    onChange={(e) => handleFieldChange(index, e)}
                    value={field}
                  >
                    <option value=""></option>
                 

                    {data
                      .filter((data) => data.value !== values.schema)

                      .map((data) => {
                        return (
                          <option key={data.id} value={data.value}>
                            {data.label}
                          </option>
                        );
                      })}
                  </Form.Select>

                  <MinusCircleOutlined
                    onClick={() => handleRemoveField(index)}
                  ></MinusCircleOutlined>
                </Form.Group>
              ))}

              <Button
                className="btn btn-primary"
                type="submit"
                variant="primary"
              >
                Save the segment
              </Button>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};
export default Segment;
