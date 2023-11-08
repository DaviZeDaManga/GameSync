CREATE DATABASE GameSync;

USE GameSync;

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

CREATE TABLE tb_endereco (
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    ds_cep VARCHAR(10),
    ds_endereco VARCHAR(255),
    nr_endereco VARCHAR(10),
    ds_cidade VARCHAR(255)
);

CREATE TABLE tb_pedido (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_endereco_entrega INT,
    ds_nota_fiscal VARCHAR(255),
    tp_forma_pagamento VARCHAR(50),
    qtd_parcelas INT,
    dt_pedido DATETIME,
    ds_situacao VARCHAR(50),
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente),
    FOREIGN KEY (id_endereco_entrega) REFERENCES tb_endereco (id_endereco)
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

CREATE TABLE tb_pedido_item (
    id_pedido_item INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT,
    id_produto INT,
    qtd_items INT,
    vl_preco DECIMAL(15,2),
    FOREIGN KEY (id_pedido) REFERENCES tb_pedido (id_pedido),
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto)
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
