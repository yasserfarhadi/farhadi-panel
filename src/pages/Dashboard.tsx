import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { editItem, getUsers } from '../redux/features/users/usersSlice';
import GridView from '../containers/GridView';
import CardView from '../containers/CardView';
import Container from '@mui/material/Container';
import { Row } from '../types/CardRow';
import Modal from '../components/Modal/Modal';

interface ModalState {
  isOpen: boolean;
  id: number | null;
}

const Dashboard = () => {
  const [modal, setModal] = React.useState<ModalState>({
    isOpen: false,
    id: null,
  });

  function setModalHandler(id: number) {
    setModal({ isOpen: true, id });
  }
  function closeModalHandler() {
    setModal({ id: null, isOpen: false });
  }

  function submitModalHandler(row: Row) {
    dispatch(editItem(row));
    closeModalHandler();
  }

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="lg">
        <GridView setModalHandler={setModalHandler} />
        <CardView setModalHandler={setModalHandler} />
        {modal.isOpen && modal.id && (
          <Modal
            id={modal.id}
            open={modal.isOpen}
            modalCloseHandler={closeModalHandler}
            submitChangeHandler={submitModalHandler}
          />
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
