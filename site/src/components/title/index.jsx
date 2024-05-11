import './index.scss'

export default function Title({nome, comp, voltar}) {
    function VoltarPagina() {
        window.history.back()
    }

     return(
        <div className='title-card'>
            {voltar == true &&
            <div onClick={VoltarPagina} className='voltar'>
                <img src='/assets/images/acoes/seta-esquerda.png' />
            </div>}
            <section className='title'>
                <h1>{nome}</h1>
            </section>
            {comp != null &&
            <section className='comp'>
                <p>{comp}</p>
            </section>
            }
        </div>
     )
}