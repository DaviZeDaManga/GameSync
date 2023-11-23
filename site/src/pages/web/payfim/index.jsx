import './index.scss'

export default function PayFim(){

 
    

    return(

        <div id='finalizar-payment-main'>
            <div className='finalizar-payment'>
                <div className='titulo-payment'>
                    <h1>Estamos Preparando Seu Pagamento!</h1>
                </div>
                <div className='text-payment'>
                Falta Pouco Para Terminarmos Seu Pagamento, Selecione o Metodo Que Deseja:
                </div>
                <div className='metodos-de-pagamento'>
                    <div className='pagarpix'>
                        <img src='/assets/images/pagamento/pixlogo.svg'/>
                        <div className='btn-pagar'>
                            <button className='chave-pix'>Pague Com Pix</button>
                        </div>

                    </div>
                    <div className='pagarboleto'>
                        <img src='/assets/images/pagamento/boletologo.svg' />
                        <div className='btn-pagar'>
                            <button className='boleto'>Pagar Com Boleto</button>
                        </div>
                    </div>
                        
                </div>
            </div>





        </div>


    )


}