import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import "./AddItemsModal.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddItemsModal(props: { go: (arg0: any) => void }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [item, setItem] = React.useState({
    item_name: "",
    item_description: "",
    expected_cost: 0,
    item_count: 0,
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    //destructuring
    const { name, value } = event.target;
    setItem((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    /*const newItem = {
        item_name: item.item_name,
        item_description: item.item_description,
        expected_cost: item.expected_cost,
        item_count: item.item_count,
      };*/
    axios.post("http://localhost:8080/admin/addItem", item).then((res) => {
      console.log(res);
      props.go(res.data.item);
    });
    //props.go(n);
    setItem({
      item_name: "",
      item_description: "",
      expected_cost: 0,
      item_count: 0,
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
        Add Items
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md w-[70rem] h-96">
          <h2 className="text-2xl font-bold mb-4">Add Items</h2>
          <form className="grid grid-cols-2 gap-4">
            <div className="px-1">
              <label htmlFor="new" className="label">
                Item Name
              </label>
              <div className="flex p-2 password-container">
                <input
                  type="text"
                  id="new"
                  className="password w-full border border-gray-300 p-2 rounded-md"
                  name="item_name"
                  value={item.item_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="px-1">
              <label htmlFor="current" className="label">
                Description
              </label>
              <div className="flex p-2 password-container">
                <input
                  type="text"
                  id="current"
                  className="password w-full border border-gray-300 p-2 rounded-md"
                  name="item_description"
                  value={item.item_description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="px-1">
              <label htmlFor="new" className="label">
                Cost
              </label>
              <div className="flex p-2 password-container">
                <input
                  type="text"
                  id="new"
                  className="password w-full border border-gray-300 p-2 rounded-md"
                  name="expected_cost"
                  value={item.expected_cost}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="px-1">
              <label htmlFor="current" className="label">
                Quantity
              </label>
              <div className="flex p-2 password-container">
                <input
                  type="text"
                  id="current"
                  className="password w-full border border-gray-300 p-2 rounded-md"
                  name="item_count"
                  value={item.item_count}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mt-4"
            onClick={onSubmit}
          >
            Add Item
          </button>
        </div>
      </Modal>
    </div>
  );
}
