import React, { ReactElement, useContext } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import games from 'data/games.json';
import styles from './GameInfo.module.scss';
import Return from 'components/Return';
import { UserContext } from 'common/UserContext';
import { CheckOutContext, UseCheckOutContext } from 'common/CheckOutContext';
import { toast } from 'react-toastify';

const GameInfo = ():ReactElement => {

  const { id } = useParams();
  const selectedGame = games.find(item => item.id === Number(id));
  const { isLogged } = useContext(UserContext);
  const { checkOutList } = useContext(CheckOutContext);
  const { handleAdd, handleRemove } = UseCheckOutContext();
  const checkOutItem = checkOutList.some(item => item.id === Number(id));
  const navigate = useNavigate();

  const { title, description, price, genre, console, largeImgPath } = selectedGame!;

  if (!isLogged) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Return />
      <section className={styles.section}>
        <div className={styles.gameContainer}>
          <figure>
            <img src={largeImgPath} alt={title} />
          </figure>
          <figcaption>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            <div className={styles.description}>
              <strong>Descrição: </strong>
              <span>{description}</span>
            </div>
            <div className={styles.genre}>
              <strong>Gênero: </strong>
              <span>{genre}</span>
            </div>
            <div className={styles.price}>
              <strong>Valor: </strong>
              <span>R$ {price.toFixed(2)}</span>
            </div>
            <div className={styles.console}>
              <strong>Console{console.length === 1 ? "" : "s"}: </strong>
              <span>{console.map(item => <span>- {item}</span>)}</span>
            </div>
          </figcaption>
          <div className={styles.buttonContainer}>
            <button type='button' onClick={() => {
              handleAdd(selectedGame!);
              navigate('/');
              toast.success('Jogo adicionado ao seu carrinho!');
              }}>
              Adicionar ao Carrinho
            </button>

            {checkOutItem && 
            <button className={styles.remove} onClick={() => {
              handleRemove(Number(id));
              toast.error('Item removido do carrinho');
              navigate('/');
            }}>
              Remover do carrinho
            </button>}
          </div>
        </div>
      </section>
    </>
  );
};

export default GameInfo;