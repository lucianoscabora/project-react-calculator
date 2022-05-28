import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import {useState} from 'react';
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem/index';
import leftArrowImage from './assets/leftarrow.png'


const App = () => {

    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);
 
    const handleCalculateButton = () => {
      if(heightField && weightField) {
        //verifica se está preenchido ambos os campos
          setToShow(calculateImc(heightField, weightField));
      } else {
        alert("Digite todos os campos.");
      }
    }

    const handleBackButton = () => {
      setToShow(null);
      setHeightField(0);
      setWeightField(0);
    }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
              <h1>Calcule o seu IMC.</h1>
              <p>IMC é a sigla para Índice de Massa Corpórea, parametro 
                adotado pela Organização Mundial de Saúde para 
                calcular o peso ideal de cada pessoa.</p>

                <input type="number"
                        placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
                        //o value e onchange precisam ser salvos em states
                        value={heightField > 0 ? heightField : ''}
                        //condicional para que não apareça 0 por padrão, se for maior que 0, é o próprio valor, se não é vazio
                        onChange={e => setHeightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                        //float pois a altura da pessoa pode ter decimal 
                        />

                        <input type="number"
                        placeholder="Digite a seu peso. Ex: 73.6 (em kg)"
                        //o value e onchange precisam ser salvos em states
                        value={weightField > 0 ? weightField : ''}
                        //condicional para que não apareça 0 por padrão, se for maior que 0, é o próprio valor, se não é vazio
                        onChange={e => setWeightField(parseFloat(e.target.value))}
                        //float pois o peso da pessoa pode ter decimal
                        disabled={toShow ? true : false} 
                        />

                        <button onClick={handleCalculateButton} disabled={toShow ? true : false}> Calcular </button>
          </div>
          <div className={styles.rightSide}>
              {!toShow && 
              <div className={styles.grid}>
                {levels.map((item, key)=>(
                  <GridItem key={key} item={item} />
                ))}
              </div>
              }
              {toShow &&
                <div className={styles.rightBig}>
                    <div className={styles.rightArrow} onClick={handleBackButton}>
                       <img src={leftArrowImage} alt="" width={25} />
                       </div>
                    <GridItem item={toShow}/>
                  </div> 
              }
          </div>
        </div>
    </div>
  );
}

export default App;