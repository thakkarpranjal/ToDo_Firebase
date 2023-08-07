import React, { useState } from 'react';
import './User.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Tabs } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

const onChange = (key) => {
  console.log(key);
};


function User() {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email1, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [loginmail, setLoginmail] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const navigate = useNavigate();
  const handleClick = async() => {
    try{
    
      const res = await createUserWithEmailAndPassword(auth, email1, password1)
     
       const user = await addDoc(collection(db , "users" ),{
        fName,
        lName,
        email1,
        password1
      })
      navigate("/Task")
      console.log("User created")
    } catch(err) {
      console.log(err)
    }
  }  

  const handleUser = async() => {
    try{
      const login = await signInWithEmailAndPassword(auth , loginmail, loginpassword)
      navigate("/Task")
    } catch (err) {
      console.log(err.message)
    }
  }
  
  return(
    <div className='user'>
      
    <div className='tabsUser'>
    <Tabs defaultActiveKey="2" onChange={onChange}>
    
      <Tabs.TabPane key="1" tab="Sign up">
      <div className='signUpForm'>
      <Form
      onSu
      // name="normal_signUp"
      // className="signUp-form"
      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
    >
      <Form.Item
        name="fName"
        rules={[
          {
            required: true,
            message: 'Please input your First Name',
          },
        ]}
      >
        <Input placeholder="First name" type="text" onChange={(e) => setFname(e.target.value)} value={fName}/>
      </Form.Item>

      <Form.Item
        name="lName"
        rules={[
          {
            required: true,
            message: 'Please input your Last Name',
          },
        ]}
      >
        <Input placeholder="Last Name" type="text" onChange={(e) => setLname(e.target.value)} value={lName}/>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email1}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password1}
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleClick} className="signup-form-button" htmlType='submit'>
          Sign up
        </Button>
      </Form.Item>
    </Form>
      </div>
      </Tabs.TabPane>
    
      <Tabs.TabPane key="2" tab="Login">
      <div className='loginForm'>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" type="email" value={loginmail} onChange={(e) => setLoginmail(e.target.value)}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={loginpassword}
          onChange={(e) => setLoginpassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleUser}>
          Log in
        </Button>
      </Form.Item>
    </Form>
      </div>
      </Tabs.TabPane>

      </Tabs>
    </div>
    </div>
  )
  
}

export default User