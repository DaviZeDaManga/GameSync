USE GameSync;

-- carga inicial usuario adim
INSERT INTO tb_admin (nm_admin, ds_email, ds_senha, vl_codigo)
VALUES 
    ('Luis Felipi', '@Luis.com.br', '1234', 'JK$)@),S(:#-JZb(K*.):h7}Ff}9;CZ|'),
    ('Davi Matinho', 'davi@example.com', 'davi', '£h-I4VWQ4bCj8I=8/=304Fu\RrQT8~DfNgBJA`,JRjhYAM>2[`'),
    ('Juan Oliveira', 'juan@example.com', 'juan', 'x^,zbp_XK[3Lt}@GYLA{OKI!qiMc;5/z40£YNW:6m<{mMflt4q'),
    ('Felipe Pereira', 'felipe@example.com', 'felipe', 'jcR'']BI~D2w92X}4Hpl)}E=3kFeo.?nlCnZLv$4Ky<P3K/i.T');

-- Inserir um novo cliente
INSERT INTO tb_cliente (nm_cliente, ds_telefone, ds_cpf, ds_email, ds_senha)
VALUES 
    ('Luis Felipi', '(01) 9876-5432', '133.456.789-01', 'luis@email.com', 'senha123'),
    ('Davi Matinho', '(12) 8765-4321', '144.567.890-12', 'davi@email.com', 'davi123'),
    ('Juan Oliveira', '(13) 7654-3210', '155.678.901-23', 'juan@email.com', 'juan123'),
    ('Felipe Pereira', '(14) 6543-2109', '166.789.012-34', 'felipe@email.com', 'felipe123');

INSERT INTO tb_categoria (nm_categoria)
VALUES ('Ação'),
       ('Terror'),
       ('FPS'),	
        ('RPG'),
		('Souls Like'),
		('Aventura'),
		('Tiro'),
		('Estratégia'),
		('Esportes'),
		('Corrida'),
		('Quebra-cabeça'),
		('Plataforma'),
		('Simulação'),
		('Luta'),
		('Sobrevivência'),
		('RTS'),
		('Cartas'),
		('Música'),
		('MMO'),
		('Mundo Aberto'),
		('Sandbox'),
		('História Interativa'),
		('Educacional'),
		('Visual Novel'),
		('Battle Royale'),
		('Rogue-like'),
		('Construção');

SELECT * FROM tb_admin;
SELECT * FROM tb_cliente;
SELECT * FROM tb_produto_imagem;
SELECT * FROM tb_produto;
SELECT * FROM tb_categoria;
SELECT * FROM tb_categoria_produto;
SELECT * FROM tb_produto_video ;
            
-- Efetuar login
SELECT id_admin AS id,
       ds_email AS email
FROM tb_admin
WHERE ds_email = 'admin@admin.com.br'
AND ds_senha = '1234';

SELECT id_cliente AS id,
       ds_email AS email
FROM tb_cliente
WHERE ds_email = 'joao@email.com'
AND ds_senha = 'senha123';

-- Alterar imagem do jogo
UPDATE tb_produto_imagem
SET img_produto = '/storage/jogo/adshsf.jpg'
WHERE id_jogos = 1;

-- Alterar jogo
UPDATE tb_jogo
SET nm_titulo = 'O Kara',
    ds_genero = 'Aventura',
    qtd_conquistas = 5,
    ds_classificacao = 'Maiores de 18',
    dt_lancamento = '2010-08-17',
    nr_tamanho = 6.2,
    ds_empresa_publi = 'Nova Empresa',
    ds_desenvolvedor = 'Novo Desenvolvedor'
WHERE id_jogos = 1;


-- SET foreign_key_checks = 0; 
-- DELETE FROM tb_produto WHERE id_produto = 1;
-- SET foreign_key_checks = 1;

-- ou um desses dois para deletar 

DELETE FROM tb_produto
WHERE id_produto = 4;

-- Consultar todos jogos
SELECT id_jogos AS id,
       nm_titulo AS nome,
       nr_tamanho AS tamanho,
       dt_lancamento AS lancamento,
       bt_disponivel AS disponivel
FROM tb_jogo;

-- Consultar todos jogos por nome
SELECT id_jogos AS id,
       nm_titulo AS nome,
       nr_tamanho AS tamanho,
       dt_lancamento AS lancamento,
       bt_disponivel AS disponivel
FROM tb_jogo
WHERE nm_titulo LIKE '%a%';

-- Consultar jogo por ID
SELECT id_jogos AS id,
       nm_titulo AS nome,
       nr_tamanho AS tamanho,
       dt_lancamento AS lancamento,
       bt_disponivel AS disponivel
FROM tb_jogo
WHERE id_jogos = 1;

UPDATE tb_admin
SET ds_email = 'admin@admin.com.br',
	ds_senha = '1234',
	vl_codigo = 'JK$)@),S(:#-JZb(K*.):h7}Ff}9;CZ|'
WHERE id_admin = 1;

-- Inserir um produto fictício na tabela tb_produto
INSERT INTO tb_produto (
    id_categoria, id_admin, nm_produto, ds_descricao, vl_preco, vl_preco_promocional,
    bt_destaque, bt_promocao, bt_disponivel, qtd_estoque, ds_classificacao,
    dt_lancamento, ds_tamanho, ds_empresa_publi, ds_desenvolvedor
) VALUES (
    1, 
    1,
    'Nome do Produto',
    'Descrição do produto',
    29.99,
    19.99, 
    1, 
    1, 
    0, 
    100, 
    'Classificação do Produto',
    '2023-10-26', 
    '15GB', 
    'Nome da Empresa',
    'Nome do Desenvolvedor'
);

DELETE FROM tb_admin
where id_admin = 1;

INSERT INTO tb_categoria_produto (id_categoria, id_produto, data_associacao)
VALUES (1, 2, CURDATE());

SELECT
    p.id_produto,
    p.nm_produto,
    p.ds_descricao,
    p.vl_preco,
    p.vl_preco_promocional,
    p.bt_destaque,
    p.bt_promocao,
    p.bt_disponivel,
    p.qtd_estoque,
    p.ds_classificacao,
    p.dt_lancamento,
    p.ds_tamanho,
    p.ds_empresa_publi,
    p.ds_desenvolvedor,
    c.nm_categoria,
    pi.img_produto,
    pv.url_video
FROM tb_produto p
LEFT JOIN tb_categoria c ON p.id_categoria = c.id_categoria
LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto;

SELECT
    -- Tabela tb_produto
    p.id_produto AS produto_id,
    p.nm_produto AS nome,
    p.ds_descricao AS descricao,
    p.vl_preco AS valor,
    p.vl_preco_promocional AS promocao,
    p.bt_destaque AS destaque,
    p.bt_promocao AS EmPromocao,
    p.bt_disponivel AS disponivel,
    p.qtd_estoque AS estoque,
    p.ds_classificacao AS classificacao,
    p.dt_lancamento AS lancamento,
    p.ds_tamanho AS tamanho,
    p.ds_empresa_publi AS empresa,
    p.ds_desenvolvedor AS desenvolvedor,
    
    -- Tabela tb_categoria
    c.id_categoria AS categoria_id,
    c.nm_categoria AS categoria_nome,
    
    -- Tabela tb_produto_imagem
     pi.id_produto_img  AS imagem_id,
    pi.img_produto AS imagem_produto,
    
    -- Tabela tb_produto_video
    pv.id_produto_video AS video_id,
    pv.url_video AS video_url,
    
    -- Tabela tb_categoria_produto
    cp.id_tb_categoria_produto AS categoria_produto_id,
    cp.id_categoria AS categoria_produto_categoria_id,
    cp.id_produto AS categoria_produto_produto_id,
    cp.data_associacao AS categoria_produto_data_associacao
FROM tb_produto p
LEFT JOIN tb_categoria c ON p.id_categoria = c.id_categoria
LEFT JOIN tb_produto_imagem pi ON p.id_produto = pi.id_produto
LEFT JOIN tb_produto_video pv ON p.id_produto = pv.id_produto
LEFT JOIN tb_categoria_produto cp ON p.id_produto = cp.id_produto;

INSERT INTO tb_produto_img_vd (id_produto, img_produto)
VALUES (2, 'caminho_da_imagem1.jpg');

INSERT INTO tb_produto_video (id_produto, url_video)
VALUES (2, 'https://www.exemplo.com/video1.mp4');

UPDATE tb_admin
    SET ds_senha = '321'
    WHERE id_admin = 1;
    
    
UPDATE tb_categoria_produto
SET id_categoria = 2, -- confirmação de mudança de categoria 
    data_associacao = '2023-11-04'  
WHERE id_produto = 1;  

UPDATE tb_produto
SET id_categoria = 2  
WHERE id_produto = 1;

UPDATE tb_produto_imagem
SET img_produto = 'nome_da_nova_imagem.jpg' 
WHERE id_produto = 1;  

UPDATE tb_produto_video
SET url_video = '//hypspwfw/video/gay'
WHERE id_produto = 1