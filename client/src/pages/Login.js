import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
//import toast from "react-hot-toast";
//import { useDispatch } from "react-redux";
//import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            Do not have an account? Click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
