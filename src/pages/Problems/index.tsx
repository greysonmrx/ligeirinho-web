import React, { useState, useCallback, useEffect } from 'react';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import Header from '../../components/Header';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';
import LookProblem from './LookProblem';

import { useToast } from '../../hooks/toast';

import { ResponseListProblems, Problem } from '../../interfaces/problem';

import api from '../../services/api';

import {
  Container,
  Wrapper,
  Content,
  Top,
  Filter,
  DeliverymanAvatar,
} from './styles';

const Problems: React.FC = () => {
  const { addToast } = useToast();

  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [looking, setLooking] = useState<Problem>();

  const handleSelectFilter = useCallback((selectedFilter: string) => {
    setFilter(selectedFilter);
  }, []);

  useEffect(() => {
    async function loadProblems() {
      try {
        const params = {
          page: currentPage,
          limit: perPage,
          filter,
        };

        const response = await api.get<ResponseListProblems>('/problems', {
          params,
        });

        setCurrentPage(response.data.current_page);
        setPageCount(response.data.page_count);
        setPerPage(response.data.per_page);
        setTotalItems(response.data.total_items);
        setTotalPages(response.data.total_pages);
        setProblems(response.data.problems);
      } catch (err) {
        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    }

    loadProblems();
  }, [addToast, filter, currentPage, perPage]);

  const handleLook = useCallback(problem => {
    setLooking(problem);
  }, []);

  const handleCancelDelivery = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/problems/${id}/cancel-delivery`);

        setCurrentPage(1);

        addToast({
          title: 'Tudo certo!',
          description: 'Encomenda cancelada com êxito.',
        });
      } catch (err) {
        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Container>
        <Header />
        <Wrapper>
          <Content>
            <Top>
              <h1>Gerenciando problemas</h1>
            </Top>
            <MenuTable>
              <ul>
                <li>
                  <Filter
                    type="button"
                    onClick={() => handleSelectFilter('')}
                    isActive={filter === ''}
                  >
                    Todos os problemas
                  </Filter>
                </li>
              </ul>
            </MenuTable>
            <Table>
              <thead>
                <tr>
                  <th>Entregador</th>
                  <th>Produto</th>
                  <th>Problema</th>
                  <th>Data de criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(problem => (
                  <tr key={problem.id}>
                    <td>
                      <DeliverymanAvatar>
                        <img
                          src={
                            problem.delivery.deliveryman?.avatar?.url ||
                            `https://api.adorable.io/avatars/70/${problem.delivery.deliveryman.name}.png`
                          }
                          alt={problem.delivery.deliveryman.name}
                        />
                        {problem.delivery.deliveryman.name}
                      </DeliverymanAvatar>
                    </td>
                    <td>{problem.delivery.product}</td>
                    <td>{problem.description}</td>
                    <td>
                      {format(
                        new Date(problem.created_at),
                        "dd 'de' MMMM yyyy",
                        {
                          locale: pt,
                        },
                      )}
                    </td>
                    <td>
                      <Actions>
                        <button
                          type="button"
                          onClick={() => {
                            handleLook(problem);
                          }}
                        >
                          Visualizar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleCancelDelivery(problem.id);
                          }}
                        >
                          Cancelar encomenda
                        </button>
                      </Actions>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              data={{
                page_count: pageCount,
                total_items: totalItems,
                current_page: currentPage,
                per_page: perPage,
                total_pages: totalPages,
              }}
              callback={setCurrentPage}
            />
          </Content>
        </Wrapper>
      </Container>
      {looking && (
        <LookProblem
          problem={looking}
          closeCallback={() => handleLook(undefined)}
        />
      )}
    </>
  );
};

export default Problems;
