import React, { useCallback } from 'react';
import {
  MdAccessTime,
  MdLocalShipping,
  MdDone,
  MdNotInterested,
} from 'react-icons/md';
import { format } from 'date-fns';

import { ParsedDelivery } from '../../interfaces/delivery';

import { Container, Line, StatusContainer, Dot } from './styles';

interface TimeLineProps {
  delivery: ParsedDelivery | undefined;
}

const TimeLine: React.FC<TimeLineProps> = ({ delivery }: TimeLineProps) => {
  const handleStatus = useCallback(
    (status: string): boolean => {
      if (delivery?.end_date) {
        return status === 'ENTREGUE';
      }
      if (delivery?.start_date) {
        return status === 'RETIRADA';
      }
      return status === 'PENDENTE';
    },
    [delivery],
  );

  const handleStatusCanceled = useCallback(() => {
    if (delivery?.canceled_at) {
      return true;
    }
    return false;
  }, [delivery]);

  const handleDate = useCallback((date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }, []);

  return (
    <Container>
      <Line />
      <StatusContainer>
        <div>
          <Dot fill={handleStatus('PENDENTE')}>
            {handleStatusCanceled() && handleStatus('PENDENTE') ? (
              <MdNotInterested />
            ) : (
                <MdAccessTime />
              )}
          </Dot>
          <p>{delivery?.created_at && handleDate(delivery?.created_at)}</p>
        </div>
        <div>
          <Dot fill={handleStatus('RETIRADA')}>
            {handleStatusCanceled() && handleStatus('RETIRADA') ? (
              <MdNotInterested />
            ) : (
                <MdLocalShipping />
              )}
          </Dot>
          <p>{delivery?.start_date && handleDate(delivery?.start_date)}</p>
        </div>
        <div>
          <Dot fill={handleStatus('ENTREGUE')}>
            {handleStatusCanceled() && handleStatus('ENTREGUE') ? (
              <MdNotInterested />
            ) : (
                <MdDone />
              )}
          </Dot>
          <p>{delivery?.end_date && handleDate(delivery?.end_date)}</p>
        </div>
      </StatusContainer>
    </Container>
  );
};

export default TimeLine;
