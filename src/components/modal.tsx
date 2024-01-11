import { Modal } from "antd";
import React from "react";

interface IModal {
  id: string;
  name: string;
  username: string;
  email: string;
  city: string;
  zipcode: string;
  website: string;
  company: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const ModalElm: React.FC<IModal> = ({
  open,
  onOk,
  onCancel,
  isEdit,
  ...props
}) => {
  return (
    <>
      {!isEdit && (
        <Modal
          title={`Info about ${props.name}`}
          centered
          open={open}
          onOk={onOk}
          onCancel={onCancel}
          width={300}
        >
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Name 👤:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.name}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Username 💠:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.username}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Email 📧:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.email}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            City 🏙️:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.city}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            ZipCode 🛅:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.zipcode}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            WebSite 🕸️:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.website}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Company 🖥️:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.company}
            />
          </h2>
        </Modal>
      )}

      {isEdit && open && (
        <Modal
          title={`Editing ${props.name}'s information`}
          centered
          open={isEdit && open}
          onOk={onOk}
          onCancel={onCancel}
          width={isEdit ? 400 : 300}
        >
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Name 👤:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.name}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Username 💠:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.username}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Email 📧:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.email}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            City 🏙️:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.city}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            ZipCode 🛅:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.zipcode}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            WebSite 🕸️:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.website}
            />
          </h2>
          <h2 className="flex items-center gap-4 text-lg mb-2">
            Company 🖥️:
            <input
              className="w-max bg-amber-200 p-2"
              type="text"
              value={props.company}
            />
          </h2>
        </Modal>
      )}
    </>
  );
};

export default ModalElm;
