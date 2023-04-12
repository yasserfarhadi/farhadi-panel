import React from 'react';
import Card from './Card';
import { User } from '../../api/Models/User';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

interface Props {
  list: User[];
  setModalHandler: (id: number) => void;
}
const CardList: React.FC<Props> = ({ list, setModalHandler }) => {
  return (
    <CardContainer>
      {list.map((user) => {
        return (
          <Card
            name={user.name}
            username={user.username}
            email={user.email}
            setModalHandler={setModalHandler}
            id={user.id}
          />
        );
      })}
    </CardContainer>
  );
};

export default CardList;
