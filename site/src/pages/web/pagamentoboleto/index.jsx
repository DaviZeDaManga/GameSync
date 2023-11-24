import './index.scss'
import { Link } from 'react-router-dom';




    export default function Boleto(){



        return (
            <div id='boleto-payment-main'>

                <div className='boleto-payment-background'>
                    <div className='return'>
                        <Link to={'/payfim'}>
                            <button className='btn-return'>Retornar</button>
                        </Link>
                    </div>
                    <div className='text-pay-boleto'>
                        <h1>Aqui Está Seu Boleto!</h1>
                    </div>
                    <div className='boleto'>
                        <img src='/assets/images/pagamento/boleto.png'/>
                    </div>
                    <div className='button-sections'>
                        
                        <div className='button'>
                            <Link to={'/'}>
                                <button className='back'> Voltar ao Inicio </button>
                            </Link>
                            
                        </div>

                        <div className='button'>
                            <button className='finalizar-pays'>Finalizar Compra </button>
                        </div>

                    </div>

                </div>
                <div className='info-boleto'>
                    <h1>Informações importantes sobre o pagamento do Boleto</h1>
                    <p>- Você pode não conseguir realizar o pagamento imediatamente. Neste caso, tente novamente após 30 segundos.</p>
                    <p>- Se o Boleto não for pago até a data de vencimento, seu pedido será cancelado. O Boleto estará disponível em Seus pedidos até esta data.</p>
                    <p>- Evite pagar o boleto no dia do vencimento caso haja algum feriado local em sua cidade, assim como após o expediente bancário em dias úteis. Alguns lugares recebem o pagamento, mas só o repassam para a Amazon no dia útil seguinte, quando o boleto pode já ter vencido. Atente-se às regras de onde você fará o pagamento para evitar que seu pedido seja cancelado.</p>
                    <p>- Devido à situação com a COVID-19, recomendamos que os pagamentos de boletos sejam realizados pelos canais digitais do seu banco (aplicativo ou Internet Banking). Caso não tenha acesso a estes canais, veja quais outras formas de pagamento são aceitas para que você não precise sair de casa.</p>

                    <div className='metodo-difer'>
                        <p>Existem Outros Meios de Pagamento Atráves do Cartão:</p>
                        <img src='/assets/images/pagamento/cartao.png'/>
                    </div>
                </div>
            </div>
        )








    };