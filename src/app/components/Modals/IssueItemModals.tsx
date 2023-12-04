import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";

export default function IssueItemsModal(props: {
  item: { item_name: string; _id: any };
  goes: (arg0: any) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [issueitem, setIssueItem] = React.useState({
    username: "",
    item_name: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setIssueItem((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    issueitem.item_name = props.item.item_name;
    axios
      .post("http://localhost:8080/admin/issueItem", issueitem)
      .then((res) => {
        alert("Issued successfully!");
        console.log(res);
        props.goes(props.item._id);
      });

    setIssueItem({
      username: "",
      item_name: "",
    });
    handleClose();
    event.preventDefault();
  };

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mx-1"
        style={{ height: "2.5rem" }}
        onClick={handleOpen}
      >
        Issue Item
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-md p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Issue Item</h2>
          <form className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="new"
                className="text-gray-600 font-semibold block"
              >
                Username
              </label>
              <div className="flex border border-gray-300 rounded-md p-2">
                <input
                  type="text"
                  id="new"
                  className="w-full outline-none"
                  name="username"
                  value={issueitem.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
              </div>
            </div>
          </form>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mt-4"
            onClick={onSubmit}
          >
            Issue Item
          </button>
        </div>
      </Modal>
    </div>
  );
}
