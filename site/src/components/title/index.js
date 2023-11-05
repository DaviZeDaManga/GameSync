import './index.scss'

export default function Title(props) {
     return(
        <div className='title-card'>
            <section className='title'>
                <h1>{props.nome}</h1>
            </section>
        </div>
     )
}