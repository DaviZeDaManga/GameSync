import './index.scss'

export default function Title({nome, voltar, fixed}) {
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
        </div>
     )
}