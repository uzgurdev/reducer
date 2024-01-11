import React, { useState } from "react";

import { Button, Table } from "antd";
import axios from "axios";
import User from "./mappers";
import { Modal } from "../../components";
import ModalElm from "../../components/modal";

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  city: string;
  zipcode: string;
  website: string;
  company: string;
}

interface IObj {
  users: IUser[];
  isOpen: boolean;
  selectedUser: IUser | null;
  isEdit: boolean;
}

interface IAction {
  type: string;
  payload?: any;
}

interface IInfo {
  id: string;
}

const reducer = (state: IObj, action: IAction) => {
  console.log("action: ", action);
  console.log("state: ", state);
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "info":
      return {
        ...state,
        isEdit: false,
        selectedUser: state.users[action.payload.id - 1],
        isOpen: !state.isOpen,
      };
    case "edit":
      return {
        ...state,
        isEdit: !state.isEdit,
        selectedUser: state.users[action.payload.id - 1],
        isOpen: !state.isOpen,
      };
    case "delete":
      return {
        ...state,
        isEdit: false,
        selectedUser: null,
        users: state.users.filter((user) => user.id !== action.payload.id),
        isOpen: false,
      };
    default:
      return { ...state };
  }
};

const Reducer = () => {
  const [state, dispatch] = React.useReducer<React.Reducer<IObj, IAction>>(
    reducer,
    {
      users: [],
      isOpen: false,
      selectedUser: null,
      isEdit: false,
    }
  );

  React.useEffect(() => {
    async function getUsers() {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );
      const _users = await data;
      const users = _users.map((user: any) => User(user));

      dispatch({ type: "update", payload: { users } });
    }
    getUsers();
  }, []);

  const infoFn = ({ id }: IInfo) => {
    console.log("isEdit: ", state.isEdit);
    const action: IAction = { type: "info", payload: { id } };
    dispatch(action);
  };

  const editFn = ({ id }: IInfo) => {
    const action: IAction = { type: "edit", payload: { id } };
    dispatch(action);
  };

  const deleteFn = ({ id }: IInfo) => {
    const action: IAction = { type: "delete", payload: { id } };
    dispatch(action);
  };

  const columns = [
    {
      title: "🆔",
      dataIndex: "id",
      width: 40,
    },
    {
      title: "Name 🌀",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username 🤦🏻",
      dataIndex: "username",
    },
    {
      title: "Email 📧",
      dataIndex: "email",
    },
    {
      title: "City 🌆",
      dataIndex: "city",
    },
    {
      title: "ZipCode 🔒",
      dataIndex: "zipcode",
    },
    {
      title: "Website ⛬",
      dataIndex: "website",
    },
    {
      title: "Company 💼",
      dataIndex: "company",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (user: IUser) => {
        return (
          <Button.Group>
            <Button
              type="primary"
              className="bg-blue-500 text-white"
              onClick={() => infoFn(user)}
            >
              Info
            </Button>
            <Button
              type="text"
              className="bg-yellow-500 text-white hover:border-white hover:text-white"
              onClick={() => editFn(user)}
            >
              Edit
            </Button>
            <Button
              type="default"
              danger
              // className="bg-yellow-500 text-white hover:border-white hover:text-white"
              onClick={() => deleteFn(user)}
            >
              Delete
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <div className="mx-auto w-[1200]">
      <Table
        bordered
        rowKey="id"
        dataSource={state.users}
        columns={columns}
        pagination={false}
        rowClassName="text-center"
      />
      <ModalElm
        {...state.selectedUser!}
        isEdit={state.isEdit}
        open={state.isOpen}
        onOk={() => dispatch({ type: "update", payload: { isOpen: false } })}
        onCancel={() =>
          dispatch({ type: "update", payload: { isOpen: false } })
        }
      />
    </div>
  );
};

export default Reducer;
