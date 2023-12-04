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
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

interface ChangePasswordModalProps{
    onChange(newPassword: string): unknown;
    name: any;
    department: any;
    username: any;

}

const ChangePasswordModal : React.FC<ChangePasswordModalProps> = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSubmit() {
    axios
      .patch("http://localhost:8080/admin/updateUser", {
        username: props.username,
        password: newPassword,
        department: props.department,
        name: props.name,
      })
      .then((res) => {
        console.log(res);
      });
    console.log(newPassword);
    props.onChange(newPassword);
  }

  const clickButton = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <div>
      <button
        style={{ marginRight: "2rem" }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        change password
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          <form className="w-full flex flex-col mt-4">
            <label htmlFor="new" className="label">
              New Password
            </label>
            <div
              className="w-full flex p-2 password-container"
              onChange={(e) => setNewPassword((e.target as HTMLInputElement).value)}
            >
              <input type="text" id="new" className="password" />
            </div>
          </form>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={clickButton}
          >
            Confirm Password
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;