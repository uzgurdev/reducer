import React from "react";
import axios from "axios";
import { Button, Table } from "antd";

import User from "./mappers";
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

interface IINFO {
  id: string;
}

const reducer = (state: IObj, action: IAction) => {
  console.log("action: ", action);
  console.log("state: ", state);
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    case "INFO":
      return {
        ...state,
        isEdit: false,
        selectedUser: state.users[action.payload.id - 1],
        isOpen: !state.isOpen,
      };
    case "EDIT":
      return {
        ...state,
        isEdit: !state.isEdit,
        selectedUser: state.users[action.payload.id - 1],
        isOpen: !state.isOpen,
      };
    case "DELETE":
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

      dispatch({ type: "UPDATE", payload: { users } });
    }
    getUsers();
  }, []);

  const INFOFn = ({ id }: IINFO) => {
    console.log("isEdit: ", state.isEdit);
    const action: IAction = { type: "INFO", payload: { id } };
    dispatch(action);
  };

  const editFn = ({ id }: IINFO) => {
    const action: IAction = { type: "EDIT", payload: { id } };
    dispatch(action);
  };

  const deleteFn = ({ id }: IINFO) => {
    const action: IAction = { type: "DELETE", payload: { id } };
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
              onClick={() => INFOFn(user)}
            >
              INFO
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
        onOk={() => dispatch({ type: "UPDATE", payload: { isOpen: false } })}
        onCancel={() =>
          dispatch({ type: "UPDATE", payload: { isOpen: false } })
        }
      />
    </div>
  );
};

export default Reducer;
