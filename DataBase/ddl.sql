CREATE DATABASE GameSyncDB;

USE GameSyncDB;

CREATE TABLE tb_admin (
	id_admin int primary key auto_increment,
    nm_admin varchar(30),
	ds_email varchar(200),
	ds_senha varchar(200),
	vl_codigo varchar(200)
);

/*Parte do cliente*/
CREATE TABLE tb_cliente (
	id_cliente int primary key auto_increment,
	nm_cliente varchar(200),
	ds_email varchar(200),
	ds_senha varchar(200),
	ds_telefone varchar(25),
	ds_cpf varchar(15) UNIQUE
);

UPDATE tb_cliente_imagem
SET img_cliente = 'EGDRGFN'
WHERE id_cliente = 1;

CREATE TABLE tb_cliente_imagem (
    id_cliente_img INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT unique,	
    img_cliente VARCHAR(255),
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente)
);

CREATE TABLE tb_categoria (
	id_categoria INT PRIMARY KEY AUTO_INCREMENT,
	nm_categoria VARCHAR(255)
	);

CREATE TABLE tb_produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT,
    id_admin INT,
    nm_produto VARCHAR(255),
    ds_descricao TEXT, -- Adicionei o tipo de dado TEXT
    vl_preco DECIMAL(15,2),
    vl_preco_promocional DECIMAL(15,2),
    bt_destaque BOOLEAN,
    bt_promocao BOOLEAN,
    bt_disponivel BOOLEAN,
    qtd_estoque INT,
    ds_classificacao VARCHAR(50),
    dt_lancamento DATETIME,
    ds_tamanho VARCHAR(15),
    ds_empresa_publi VARCHAR(255),
    ds_desenvolvedor VARCHAR(255),
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id_categoria),
    FOREIGN KEY (id_admin) REFERENCES tb_admin (id_admin)
);

CREATE TABLE tb_categoria_produto (
    id_tb_categoria_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT,
    id_produto INT,
    data_associacao DATE,  -- Campo adicional para rastrear data de associação
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id_categoria),
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto) ON DELETE CASCADE
);

CREATE TABLE tb_produto_imagem (
    id_produto_img INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT,	
    img_produto VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto) ON DELETE CASCADE
);

CREATE TABLE tb_produto_video (
	id_produto_video INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT,
    url_video	VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto) ON DELETE CASCADE
);

CREATE TABLE tb_cartao (
    id_cartao int primary key auto_increment,
    id_cliente int,
    numero_cartao varchar(16),
    data_validade varchar(7),
    cvv varchar(3),
    nome_titular varchar(200),
    foreign key (id_cliente) references tb_cliente(id_cliente)  ON DELETE CASCADE
);

CREATE TABLE tb_conquista (
    id_conquistas INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT,
    nm_conquista VARCHAR(255),
    ds_descricao VARCHAR(255),
    nr_pontos DECIMAL(15,2),
    img_conquista VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto)
);

CREATE TABLE tb_favoritos (
id_favoritos INT PRIMARY KEY AUTO_INCREMENT,
id_cliente	INT,
id_produto	INT,
data_adicao DATETIME,
FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente),
FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto)
);

CREATE TABLE tb_comentarios_avaliacoes (
    id_comentario_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_produto INT,
    comentario TEXT,
    avaliacao DECIMAL(2,1),  -- Nota Maxima 5
    data_comentario DATETIME,
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente),
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto)
);

CREATE TABLE tb_jogos(
id_jogos INT PRIMARY KEY AUTO_INCREMENT,
nm_jogo VARCHAR(100),
ds_descricao TEXT,
img_jogo	VARCHAR(255),
url_jogo	VARCHAR(255) 
);

CREATE TABLE tb_noticia(
id_noticia	INT PRIMARY KEY AUTO_INCREMENT,
ds_titulo	VARCHAR(50),
ds_subtitulo VARCHAR(50),
ds_texto TEXT
);

CREATE TABLE tb_noticia_imagem (
    id_noticia_img INT PRIMARY KEY AUTO_INCREMENT,
    id_noticia INT,	
    img_produto VARCHAR(255),
    FOREIGN KEY (id_noticia) REFERENCES tb_noticia (id_noticia) ON DELETE CASCADE
);
