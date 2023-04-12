import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import type { Row } from '../../types/CardRow';

import TextField from '@mui/material/TextField';
import { useAppSelector } from '../../redux/hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

interface Props {
  modalCloseHandler: () => void;
  submitChangeHandler: (row: Row) => void;
  open: boolean;
  id: number;
}

const BasicModal: React.FC<Props> = ({
  open,
  modalCloseHandler,
  submitChangeHandler,
  id,
}) => {
  const item = useAppSelector((store) => {
    return store.users.data.find((item) => item.id === id);
  });

  const [name, setName] = React.useState<string>(item?.name || '');
  const [username, setUsername] = React.useState<string>(item?.username || '');
  const [email, setEmail] = React.useState<string>(item?.email || '');

  return (
    <div>
      {item ? (
        <Modal
          open={open}
          onClose={modalCloseHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="id"
              variant="outlined"
              value={item?.id}
              disabled
            />
            <TextField
              label="name"
              id="outlined-basic"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static"
              label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static"
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="modal-cta">
              <Button
                onClick={() =>
                  submitChangeHandler({ id: item?.id, name, email, username })
                }
                variant="outlined"
              >
                Submit
              </Button>
              <Button onClick={modalCloseHandler} variant="outlined">
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      ) : (
        <p>User not found!</p>
      )}
    </div>
  );
};

export default React.memo(BasicModal);
