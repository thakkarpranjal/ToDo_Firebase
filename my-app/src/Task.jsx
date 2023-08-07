import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Switch, TimePicker } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material'
import './Task.css'
import { useNavigate } from "react-router-dom";
import {
  DeleteFilled, EditOutlined
} from '@ant-design/icons';
// import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, ref } from 'firebase/firestore';
import { db } from './firebase';
import dayjs from 'dayjs';
// dayjs.extend(customParseFormat);
function Task() {
  const [date1, setDate1] = useState(null)
  const [dateString, setDateString] = useState("");
  const [open, setOpen] = useState(false);
  const [true1, false1] = useState(true)
  const [id, setId] = useState("")
  const [idEdit, setIdEdit] = useState("")
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [taskEdit, setTaskEdit] = useState("")
  const [dateEdit, setDateEdit] = useState("")
  // const [dateandtime, setDateandTime] = useState([]);
  // const dateandtimeRef = collection(db, "Tasks");
  const tasksCollectionRef = collection(db, "Tasks")
  const [openEdit, setOpenEdit] = useState(false)
  const showModalEdit = () => {
    setOpenEdit(true)
  }
  const [open1, setOpen1] = useState(false)
  const showModal1 = () => {
    setOpen1(true)
  }
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  const handleOkEdit = async (id, { taskAll, date2 }) => {
    console.log(id, { taskAll, date2 })
    const taskEditRef = doc(db, "Tasks", id)
    await updateDoc(taskEditRef, {
      task: taskAll,
      dateString: dateString,
    })
    window.location.reload();
  }
  
  const handleOk1 = async (id) => {
    const taskDoc = doc(db, "Tasks", id);
    await deleteDoc(taskDoc);
    setOpen1(false)
    getTasks();
  }

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const handleOk = async () => {
    try {
      const data = await addDoc(collection(db, "Tasks"), {
        task,
        dateString
      }
      )
      window.location.reload()
      console.log(date1.$d)
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(true);
      }, 2000);
      
    } catch (err) {
      console.error(err)
    }

  };
  const handleCancel = () => {
    setOpen(false);
    setOpen1(false);
    setOpenEdit(false)
  };
  const onChange = (true1) => {
    false1(!true1);
  };
  const onPick = (date, dateString) => {
    setDateString(dateString);
    setDate1(date)
    console.log(date)
    console.log(dateString)
  };
  const onPickEdit = (date, dateString) => {
    setDateString(dateString);
    setDateEdit(date)
    console.log(date)
    console.log(dateString)
  };

  const getTasks = async () => {
    const data = await getDocs(tasksCollectionRef);
    console.log(data.docs)
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getTasks();
  }, [])


  // const getDate = async () => {
  //   const date1 = await getDocs(dateandtimeRef.$d);
  //   setDateandTime(date1.docs.map((doc) => ({...doc.data(), id: doc.id})))
  // };

  // useEffect(() => {
  //   getDate();
  // }, [])
  return (
    <>
      
      
      <div className='taskPage'>
        <Button type="primary" onClick={showModal} style={{ marginTop: "20px" , }}>
          Set any task
        </Button>
        <div className='modalOpen'>
          <Form>
            <Modal
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form.Item name="task" required>
                <Input 
                placeholder="Add your task here" style={{ marginTop: "25px" }} onChange={(e) => setTask(e.target.value)} value={task} 
              />
              </Form.Item>
              <p>Want to set task according to date and time?</p>
              <Switch defaultunChecked onChange={onChange} />
              <div className={`dateandtime ${true1 ? 'inactive' : 'active'}`}>
                <Form.Item rules={[{ required: true, message: 'Please select date and time' }]}>
                <DatePicker
      format="YYYY-MM-DD HH:mm"
      value={date1}
      onChange={onPick}
      disabledDate={disabledDate}
      showTime={{
        defaultValue: dayjs("00:00", "HH:mm")
      }}
    />
                </Form.Item>
              </div>
            </Modal>
          </Form>
        </div>
        <div className='taskHere'>
          {
            tasks && tasks.length > 0 ?
              tasks.map((task, i) => {
                return (
                  <div className='allTasks'>
                    <div className='task1'>
                      <div className='buttons'>
                      <div className='editTask'>
                      <Form onFinish={showModalEdit}>
                          <Button icon={<EditOutlined />} onClick={() => setIdEdit(task.id)} type='primary' htmlType='submit'
                          style={{width: "100px",
                            height: "35px"}}
                          >Edit</Button>
                        </Form>
                        <Modal mask={false}
              open={openEdit}
              onOk={() => handleOkEdit(idEdit, {taskAll:taskEdit,date2:dateEdit})}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
                          <p>Update your TODO task , date & time from below:</p>
                          <Form.Item rules={[{ required: true, message: 'Please input your Todo Task' }]}>
                            <Input placeholder="Updated TODO Task" style={{ marginTop: "25px" }} onChange={(e) => setTaskEdit(e.target.value)} value={taskEdit} />
                          </Form.Item>

                          <Switch defaultunChecked onChange={onChange} />
                          <div className={`dateandtime ${true1 ? 'inactive' : 'active'}`}>
                            <Form.Item rules={[{ required: true, message: 'Please select date and time' }]}>
                              <DatePicker placeholder='Set date and Time' showTime onChange={onPickEdit} style={{ marginTop: "10px" }} value={dateEdit} />
                            </Form.Item>
                          </div>

                        </Modal>
                      </div>


                      <div className='deleteTask'>
                        <Form onFinish={showModal1}>
                          <Button icon={<DeleteFilled />} onClick={() => setId(task.id)} type='primary' htmlType='submit'
                          style={{width: "100px",
                            height: "35px"}}
                          >Delete</Button>
                        </Form>
                        <Modal mask={false}
              open={open1}
              onOk={() => handleOk1(id)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
                          <h2>Do you want to delete this Task?</h2>
                        </Modal>
                        
                      </div>
                      </div>

                      <div className='taskTitle'>
                        <p>Tasks: {task?.task}</p>
                      </div>
                      <div className='taskDate'>
                        <p>Date: {task?.dateString}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              )
              : (
                 <Box 
                display="flex" 
                width={1500} height={80} 
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
              )
          } 

         
        </div>
        
      </div>
    </>
  );
};


export default Task