import React from 'react';
import Pagination from '../components/Pagination/Pagination';
import { useAppSelector } from '../redux/hooks';
import Container from '@mui/material/Container';
import CardList from '../components/Card/CardList';
import { User } from '../api/Models/User';

interface Props {
  setModalHandler: (id: number) => void;
}

const CardView: React.FC<Props> = ({ setModalHandler }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { users, searchParam } = useAppSelector((store) => ({
    searchParam: store.users.searchParam,
    users: store.users.data,
  }));

  const filteredUsers = React.useMemo(
    (listArr: User[] = []) => {
      users.forEach((user) => {
        if (
          user.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          user.username.toLowerCase().includes(searchParam.toLowerCase()) ||
          user.email.toLowerCase().includes(searchParam.toLowerCase())
        ) {
          listArr.push(user);
        }
      });

      return listArr;
    },
    [users, searchParam]
  );

  const cutList = React.useMemo(
    (listArr: User[] = []) => {
      const cutPageItemsStart = (currentPage - 1) * 4;
      const cutPageItemsEnd = currentPage * 4;

      filteredUsers.forEach((item, index) => {
        if (index >= cutPageItemsStart && index < cutPageItemsEnd) {
          listArr.push(item);
        }
      });
      return listArr;
    },
    [filteredUsers, currentPage]
  );

  return (
    <div>
      <Container maxWidth="lg">
        <CardList list={cutList} setModalHandler={setModalHandler} />
        <Pagination
          currentPage={currentPage}
          limit={4}
          total={filteredUsers.length}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </Container>
    </div>
  );
};

export default CardView;
