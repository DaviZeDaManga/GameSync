USE GameSyncDB;

-- ADM
create table tb_admin (
id_admin int key auto_increment, 
nm_admin varchar(30), 
ds_email varchar(200), 
ds_senha varchar(200), 
vl_codigo varchar(200)
);







-- CLIENTE TABLES
-- clientes
create table tb_clientes (
id_cliente int key auto_increment, 
nm_cliente varchar(200),
ds_email varchar(200), 
ds_senha varchar(200), 
ds_telefone varchar(25), 
ds_cpf varchar(15), 
ds_cor varchar(200)
);

-- tabela que adiciona uma imagem ao cliente
create table tb_cliente_imagem (
id_cliente_img int key auto_increment, 
id_cliente int, 
img_cliente varchar(255)
);

-- mascotes
create table tb_mascote (
id_mascote int key auto_increment, 
nm_mascote varchar(200), 
ds_gif text, 
ds_fundo text,
ds_cor varchar(200)
);

-- tabela que adiciona um mascote ao cliente
create table tb_mascote_cliente (
id_tb_mascote_cliente int key auto_increment,
id_mascote int, 
id_cliente int
);

-- tabela para salvar itens aos favoritos
create table tb_favoritos (
id_favoritos int key auto_increment, 
id_cliente int, 
id_produto int, 
data_adicao datetime
);

-- tabela para salvar itens ao carrinho
create table tb_pedido_item (
id_pedido_item int key auto_increment, 
id_produto int, 
id_cliente int
);

-- cartao do cliente
create table tb_cartao (
id_cartao int primary key auto_increment, 
id_cliente int,
numero_cartao varchar(16),
data_validade varchar(7), 
cvv varchar(3), 
nome_titular varchar(200)
);










-- BATEPAPO TABLES
-- id do batepapo entre duas pessoas
CREATE TABLE tb_batepapo (
id_batepapo int primary key,
dt_criacao datetime,
ds_tema varchar(200)
);

-- juntar as duas pessoas no batepapo
CREATE TABLE tb_batepapo_clientes (
id_batepapo_clientes int primary key auto_increment,
id_batepapo int,
id_cliente int,
id_outro int,
foreign key (id_batepapo) references tb_batepapo (id_batepapo),
foreign key (id_cliente) references tb_clientes (id_cliente)
);

-- mensagens que seram enviadas em um id de batepapo
CREATE TABLE tb_mensagem (
id_mensagem int primary key auto_increment,
id_cliente int,
id_batepapo int,
ds_mensagem TEXT,
dt_envio datetime,
bt_lida boolean,
id_mensagem_respondida int,
ds_mensagem_respondida TEXT,
foreign key (id_batepapo) references tb_batepapo (id_batepapo)
);

CREATE TABLE tb_mensagem_imagem (
id_mensagem_imagem int primary key auto_increment,
id_mensagem int,
img_mensagem text,
foreign key (id_mensagem) references tb_mensagem (id_mensagem)
);








-- PRODUTO TABLES
-- produto
create table tb_produto (
id_produto int primary key auto_increment,
id_categoria int, 
id_admin int, 
nm_produto varchar(255), 
ds_descricao text, 
vl_preco decimal(15,2), 
vl_preco_promocional decimal(15,2), 
bt_destaque tinyint(1), 
bt_promocao tinyint(1), 
bt_disponivel tinyint(1), 
qtd_estoque int, 
ds_classificacao varchar(50), 
dt_lancamento datetime, 
ds_tamanho varchar(15), 
ds_empresa_publi varchar(255), 
ds_desenvolvedor varchar(255)
);

-- imagens dos produtos
create table tb_produto_imagem (
id_produto_img int primary key auto_increment, 
id_produto int, 
img_produto varchar(255)
);

-- videos dos produtos
create table tb_produto_video (
id_produto_video int primary key auto_increment, 
id_produto int, 
url_video varchar(255)
);

-- tabela de categorias
create table tb_categoria (
id_categoria int primary key auto_increment, 
nm_categoria varchar(255)
);

-- tabela que mescla produtos as categorias
create table tb_categoria_produto (
id_tb_categoria_produto int primary key auto_increment,
id_categoria int, 
id_produto int, 
data_associacao date
);

-- tabela dos comentarios dos clientes nos produtos
CREATE TABLE tb_comentarios_avaliacoes_produtos (
	id_comentario_avaliacao int primary key auto_increment, 
	id_cliente int,
	id_produto int,
	comentario text,
	avaliacao decimal(2,1),
	data_comentario datetime,
    foreign key (id_produto) references tb_produto (id_produto),
    foreign key (id_cliente) references tb_clientes (id_cliente)
);





//criar novamente a tabela de games