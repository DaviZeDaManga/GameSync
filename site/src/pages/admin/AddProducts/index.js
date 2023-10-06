import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';


export default function AddProduct(){


    return(
        <div id='add-main-addproduct'>
            <AdmBarraLateral/>
            <main className="all">

               <article className="pesquisar">

                <div className="pesquisar-barra">
                    <img src="" alt="" />
                    <input type="text" />
                </div>

                <div className="pesquisar-barra">
                    <h1>nome Adm</h1>
                    <img src="" alt="" />
                </div>
               </article>

               <article className="add">
                   <figure className="add-part1">

                        <div className="add-part1-nome">
                            <h3>Nome do Produto</h3>
                            <input type="text" />
                        </div>

                        <div className="add-part1-valores">
                            <h1>Valor do Produto</h1>
                            <div className="add-part1-valores-vl">
                                <input type="number" />
                                <input type="number" />
                            </div>
                        </div>

                        <div className="add-part1-negocio">
                            <h1>Opções de Negócio</h1>

                            <section className="add-part1-negocio-checks">

                            <div className="add-part1-negocio-um">
                                <input type="checkbox" />
                                <p>Categoria?</p>
                            </div>

                            <div className="add-part1-negocio-dois">
                                <input type="checkbox" />
                                <p>Promoção?</p>
                            </div>

                            <div className="add-part1-negocio-tres">
                                <input type="checkbox" />
                                <p>Disponivel?</p>
                            </div>

                            <div className="add-part1-negocio-quarto">
                                <input type="checkbox" />
                                <p>Destaque?</p>
                            </div>

                            <div className="add-part1-negocio-cinco">
                                <input type="checkbox" />
                                <p>Estoque?</p>
                            </div>

                            </section>
                        </div>

                        <div>

                            <h1>Descrição do produto</h1>
                            <input type="text-area" />

                        </div>
                    </figure>


                    <figure className="add-part2">
                        <div className="add-part2-imagem1">
                            <input type="file" />
                        </div>

                        <div className="add-part2-imagem2">
                            <input type="file" />
                            <input type="file" />
                        </div>

                        <div className="add-part2-imagem-selecionados">
                            <img src="" alt="" />
                            <h1>Arquivos Selecionados</h1>
                        </div>

                        <div className="add-part2-imagem3">
                            <div>

                            </div>

                            <div>

                            </div>

                            <div>

                            </div>
                        </div>
                    </figure>

                    <section>
                        <button>Adicionar produto</button>
                    </section>
               </article>
            </main>
        </div>
    )
}