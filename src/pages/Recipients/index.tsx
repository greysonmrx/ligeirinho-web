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

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Recipient, ResponseListRecipients } from '../../interfaces/recipients';

import { Container, Wrapper, Content, Top, Filter } from './styles';

const Recipients: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const handleSelectFilter = useCallback((selectedFilter: string) => {
    setFilter(selectedFilter);
  }, []);

  const handleSearch = useCallback((name: string) => {
    setCurrentPage(1);

    setSearch(name);
  }, []);

  useEffect(() => {
    async function loadRecipients() {
      try {
        const params = {
          q: search,
          page: currentPage,
          limit: perPage,
          filter,
        };

        const response = await api.get<ResponseListRecipients>('/recipients', {
          params,
        });

        setCurrentPage(response.data.current_page);
        setPageCount(response.data.page_count);
        setPerPage(response.data.per_page);
        setTotalItems(response.data.total_items);
        setTotalPages(response.data.total_pages);
        setRecipients(response.data.recipients);
      } catch (err) {
        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    }

    loadRecipients();
  }, [addToast, search, filter, currentPage, perPage]);

  const handleDeleteRecipient = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/recipients/${id}`);

        setRecipients(oldRecipients =>
          oldRecipients.filter(recipient => recipient.id !== id),
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
            <h1>Gerenciando destinatários</h1>
            <button
              type="button"
              onClick={() => history.push('/recipients/create')}
            >
              Cadastrar destinatário
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
                  Todos os destinatários
                </Filter>
              </li>
            </ul>
            <div>
              <input
                placeholder="Busque por destinatários"
                value={search}
                onChange={({ target }) => handleSearch(target.value)}
              />
              <FiSearch />
            </div>
          </MenuTable>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Rua</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Data de criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>{recipient.name}</td>
                  <td>{recipient.street}</td>
                  <td>{recipient.city}</td>
                  <td>{recipient.state}</td>
                  <td>
                    {format(
                      new Date(recipient.created_at),
                      "dd 'de' MMMM yyyy",
                      { locale: pt },
                    )}
                  </td>
                  <td>
                    <Actions>
                      <button
                        type="button"
                        onClick={() => {
                          history.push('/recipients/edit', { recipient });
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteRecipient(recipient.id);
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

export default Recipients;
