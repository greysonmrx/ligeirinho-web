import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import Header from '../../components/Header';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import api from '../../services/api';

import {
  Deliveryman,
  ResponseListDeliverymen,
} from '../../interfaces/deliveryman';

import { useToast } from '../../hooks/toast';

import {
  Container,
  Wrapper,
  Content,
  Top,
  Filter,
  DeliverymanAvatar,
} from './styles';

const Deliverymen: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deliverymen, setDeliverymen] = useState<Deliveryman[]>([]);

  const handleSelectFilter = useCallback((selectedFilter: string) => {
    setFilter(selectedFilter);
  }, []);

  const handleSearch = useCallback((name: string) => {
    setCurrentPage(1);

    setSearch(name);
  }, []);

  useEffect(() => {
    async function loadDeliverymen() {
      try {
        const params = {
          q: search,
          page: currentPage,
          limit: perPage,
          filter,
        };

        const response = await api.get<ResponseListDeliverymen>(
          '/deliverymen',
          {
            params,
          },
        );

        setCurrentPage(response.data.current_page);
        setPageCount(response.data.page_count);
        setPerPage(response.data.per_page);
        setTotalItems(response.data.total_items);
        setTotalPages(response.data.total_pages);
        setDeliverymen(response.data.deliverymen);
      } catch (err) {
        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    }

    loadDeliverymen();
  }, [addToast, search, filter, currentPage, perPage]);

  const handleDeleteDeliveryman = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/deliverymen/${id}`);

        setDeliverymen(oldDeliverymen =>
          oldDeliverymen.filter(deliveryman => deliveryman.id !== id),
        );

        setCurrentPage(1);

        addToast({
          title: 'Tudo certo!',
          description: 'Registro excluído com êxito.',
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
    <Container>
      <Header />
      <Wrapper>
        <Content>
          <Top>
            <h1>Gerenciando entregadores</h1>
            <button
              type="button"
              onClick={() => history.push('/deliverymen/create')}
            >
              Cadastrar entregador
            </button>
          </Top>
          <MenuTable>
            <ul>
              <li>
                <Filter
                  type="button"
                  onClick={() => handleSelectFilter('')}
                  isActive={filter === ''}
                >
                  Todos os entregadores
                </Filter>
              </li>
            </ul>
            <div>
              <input
                placeholder="Busque por entregadores"
                value={search}
                onChange={({ target }) => handleSearch(target.value)}
              />
              <FiSearch />
            </div>
          </MenuTable>
          <Table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Data de criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymen.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>
                    <DeliverymanAvatar>
                      <img
                        src={
                          deliveryman?.avatar?.url ||
                          `https://api.adorable.io/avatars/70/${deliveryman.name}.png`
                        }
                        alt={deliveryman.name}
                      />
                    </DeliverymanAvatar>
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    {format(
                      new Date(deliveryman.created_at),
                      "dd 'de' MMMM yyyy",
                      { locale: pt },
                    )}
                  </td>
                  <td>
                    <Actions>
                      <button
                        type="button"
                        onClick={() => {
                          history.push('/deliverymen/edit', { deliveryman });
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteDeliveryman(deliveryman.id);
                        }}
                      >
                        Excluir
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
  );
};

export default Deliverymen;
