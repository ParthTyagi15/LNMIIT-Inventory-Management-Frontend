import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface DeleteUserModalProps{
  onDelete(username: string): unknown;
  username : string;
}

const DeleteUserModal : React.FC<DeleteUserModalProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    axios
      .delete(`https://lnmiit-inventory-backend.onrender.com/admin/deleteUser/${props.username}`)
      .then((res) => {
        console.log(res);
      });
    props.onDelete(props.username);
    handleClose();
  };

  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        Delete User
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete User ?
          </Typography>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleClick}
          >
            Confirm Delete
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteUserModal;