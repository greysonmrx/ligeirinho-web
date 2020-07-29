import React, { useState, useCallback, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import MenuTable from '../../components/MenuTable';
import Pagination from '../../components/Pagination';
import LookDelivery from './LookDelivery';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import {
  Delivery,
  ResponseListDelivery,
  ParsedDelivery,
} from '../../interfaces/delivery';

import {
  Container,
  Wrapper,
  Content,
  Top,
  ChartContainer,
  ChartCard,
  Filter,
  DeliverymanField,
  DeliveryStatusTD,
  DeliveryStatus,
} from './styles';

const Deliveries: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deliveries, setDeliveries] = useState<ParsedDelivery[]>([]);
  const [looking, setLooking] = useState<ParsedDelivery>();

  const handleSelectFilter = useCallback(
    (selectedFilter: string) => {
      setStatus(selectedFilter);
      setCurrentPage(1);
    },
    [setStatus],
  );

  const handleSearch = useCallback((name: string) => {
    setCurrentPage(1);

    setSearch(name);
  }, []);

  const handleLook = useCallback(delivery => {
    setLooking(delivery);
  }, []);

  const handleDeleteDelivery = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/deliveries/${id}`);

        setDeliveries(oldDeliveries =>
          oldDeliveries.filter(delivery => delivery.id !== id),
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

  const parseDeliveries = useCallback((data: Delivery[]) => {
    return data.map(
      (delivery): ParsedDelivery => {
        const parsedDelivery = {} as ParsedDelivery;

        parsedDelivery.deliverymanAvatar =
          delivery.deliveryman?.avatar?.url ||
          `https://api.adorable.io/avatars/70/${delivery.deliveryman.name}.png`;

        switch (delivery.status) {
          case 'PENDENTE':
            parsedDelivery.statusText = delivery.status;
            parsedDelivery.statusColor = '#FA6401';
            break;
          case 'ENTREGUE':
            parsedDelivery.statusText = delivery.status;
            parsedDelivery.statusColor = '#1A9856';
            break;
          case 'CANCELADA':
            parsedDelivery.statusText = delivery.status;
            parsedDelivery.statusColor = '#E12021';
            break;
          case 'RETIRADA':
            parsedDelivery.statusText = delivery.status;
            parsedDelivery.statusColor = '#0074D9';
            break;
        }

        return {
          ...parsedDelivery,
          ...delivery,
        };
      },
    );
  }, []);

  useEffect(() => {
    async function fetchDeliveries() {
      try {
        const params = {
          q: search,
          page: currentPage,
          limit: perPage,
          status,
        };

        const response = await api.get<ResponseListDelivery>('/deliveries', {
          params,
        });

        const parsedDeliveries = parseDeliveries(response.data.deliveries);

        setCurrentPage(response.data.current_page);
        setPageCount(response.data.page_count);
        setPerPage(response.data.per_page);
        setTotalItems(response.data.total_items);
        setTotalPages(response.data.total_pages);
        setDeliveries(parsedDeliveries);
      } catch (err) {
        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    }

    fetchDeliveries();
  }, [search, parseDeliveries, status, currentPage, perPage, addToast]);

  return (
    <>
      <Container>
        <Header />
        <Wrapper>
          <Content>
            <Top>
              <h1>Gerenciando encomendas</h1>
              <button
                type="button"
                onClick={() => history.push('/deliveries/create')}
              >
                Cadastrar encomenda
              </button>
            </Top>
            <ChartContainer>
              <ChartCard>
                <div>
                  <p>Retiradas</p>
                  <strong>1046</strong>
                </div>
                <LineChart type="retiradas" />
              </ChartCard>
              <ChartCard>
                <div>
                  <p>Pendentes</p>
                  <strong>520</strong>
                </div>
                <LineChart type="pendentes" />
              </ChartCard>
              <ChartCard>
                <div>
                  <p>Canceladas</p>
                  <strong>127</strong>
                </div>
                <LineChart type="canceladas" />
              </ChartCard>
              <ChartCard>
                <div>
                  <p>Entregues</p>
                  <strong>3023</strong>
                </div>
                <LineChart type="entregues" />
              </ChartCard>
            </ChartContainer>
            <MenuTable>
              <ul>
                <li>
                  <Filter
                    type="button"
                    onClick={() => handleSelectFilter('')}
                    isActive={status === ''}
                  >
                    Todas as encomendas
                  </Filter>
                </li>
                <li>
                  <Filter
                    type="button"
                    onClick={() => handleSelectFilter('RETIRADA')}
                    isActive={status === 'RETIRADA'}
                  >
                    Retiradas
                  </Filter>
                </li>
                <li>
                  <Filter
                    type="button"
                    onClick={() => handleSelectFilter('PENDENTE')}
                    isActive={status === 'PENDENTE'}
                  >
                    Pendentes
                  </Filter>
                </li>
                <li>
                  <Filter
                    type="button"
                    onClick={() => handleSelectFilter('CANCELADA')}
                    isActive={status === 'CANCELADA'}
                  >
                    Canceladas
                  </Filter>
                </li>
                <li>
                  <Filter
                    type="button"
                    onClick={() => handleSelectFilter('ENTREGUE')}
                    isActive={status === 'ENTREGUE'}
                  >
                    Entregues
                  </Filter>
                </li>
              </ul>
              <div>
                <input
                  placeholder="Busque por encomendas"
                  value={search}
                  onChange={({ target }) => handleSearch(target.value)}
                />
                <FiSearch />
              </div>
            </MenuTable>
            <Table>
              <thead>
                <tr>
                  <th>Entregador</th>
                  <th>Destinátario</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>CEP</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map(delivery => (
                  <tr key={delivery.id}>
                    <td>
                      <DeliverymanField>
                        <img
                          src={delivery.deliverymanAvatar}
                          alt={delivery.deliveryman.name}
                        />
                        {delivery.deliveryman.name}
                      </DeliverymanField>
                    </td>
                    <td>{delivery.recipient.name}</td>
                    <td>{delivery.recipient.city}</td>
                    <td>{delivery.recipient.state}</td>
                    <td>{delivery.recipient.zip_code}</td>
                    <DeliveryStatusTD>
                      <DeliveryStatus color={delivery.statusColor}>
                        {delivery.statusText}
                      </DeliveryStatus>
                    </DeliveryStatusTD>
                    <td>
                      <Actions>
                        <button
                          type="button"
                          onClick={() => {
                            handleLook(delivery);
                          }}
                        >
                          Visualizar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`/deliveries/edit`, {
                              id: delivery.id,
                            })
                          }
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteDelivery(delivery.id);
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
      {looking && (
        <LookDelivery
          delivery={looking}
          closeCallback={() => handleLook(undefined)}
        />
      )}
    </>
  );
};

export default Deliveries;
