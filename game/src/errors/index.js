import './index.scss';

function NotFound(){

    return(
        <article className='mae'>
            <div className='image'>
            <img src="/assets/images/err/giphy.gif" alt="" />
            </div>
            
            <div className="not-found-container">
      <h1>Ops! Parece que você se perdeu.</h1>
      <p>A página que você está procurando não foi encontrada.</p>
      <p>Que tal retornar à página inicial?!</p>
      <a href="/">Página Inicial</a>
    </div>

        </article>
    )
}
export default NotFound;