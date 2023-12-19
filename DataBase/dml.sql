USE GameSyncDB;

-- carga inicial usuario adim
INSERT INTO tb_admin (nm_admin, ds_email, ds_senha, vl_codigo)
VALUES 
    ('Luis Felipi', 'Luis@L.com.br', '1234', 'JK$)@),S(:#-JZb(K*.):h7}Ff}9;CZ|'),
    ('Davi Matinho', 'davi@example.com', 'davi', '5m851ouamBSk2Kug1DyGoFJgI1yWlSYEuLcAWFcpfxkb9Hmz82'),
    ('Juan Oliveira', 'juan@example.com', 'juan', 'x^,zbp_XK[3Lt}@GYLA{OKI!qiMc;5/z40£YNW:6m<{mMflt4q'),
    ('Felipe Pereira', 'felipe@example.com', 'felipe', '00W6BEkVrr112uI1nhYlB95cV6qDEeBQ6XU77snbi0srVMg6ec');

-- Inserir um novo cliente
INSERT INTO tb_cliente (nm_cliente, ds_telefone, ds_cpf, ds_email, ds_senha)
VALUES 
    ('Luis Felipi', '(01) 9876-5432', '133.456.789-11', 'luis@email.com', 'senha123'),
    ('Davi Matinho', '(12) 8765-4321', '144.567.890-15', 'davi@email.com', 'davi123'),
    ('Juan Oliveira', '(13) 7654-3210', '155.678.901-21', 'juan@email.com', 'juan123'),
    ('Felipe Pereira', '(14) 6543-2109', '166.782.012-34', 'felipe@email.com', 'felipe123');

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
SELECT * FROM tb_jogos;
SELECT * FROM tb_favoritos;
SELECT * FROM tb_comentarios_avaliacoes;

INSERT INTO tb_comentarios_avaliacoes (id_cliente, comentario, avaliacao, data_comentario, id_produto)
  VALUES(1, 'lixo', 1, CURDATE(), 1);
  
SELECT * FROM tb_jogos WHERE id_jogos = 1;
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

DELETE FROM tb_categoria WHERE id_categoria BETWEEN 28 AND 81;

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

INSERT INTO tb_favoritos(id_cliente, id_produto, data_adicao)
VALUES (2, 1, CURDATE());

SELECT tb_favoritos.data_adicao, tb_produto.*, tb_produto_imagem.img_produto
FROM tb_favoritos
JOIN tb_produto ON tb_favoritos.id_produto = tb_produto.id_produto
LEFT JOIN tb_produto_imagem ON tb_favoritos.id_produto = tb_produto_imagem.id_produto
WHERE tb_favoritos.id_cliente = 2;

DELETE FROM tb_favoritos
WHERE id_favoritos = 2;

SELECT * FROM tb_jogos
WHERE id_jogos = 1; 

INSERT INTO tb_comentarios_avaliacoes (id_cliente, id_produto, comentario, avaliacao, data_comentario)
VALUES
    (1, 2, 'Ótimo produto!', 4.5, '2023-11-12 14:30:00');


SELECT * FROM tb_produto
WHERE id_categoria = 1;


INSERT INTO tb_jogos (nm_jogo, ds_descricao,img_jogo , url_jogo)
VALUES ('Termo' ,
       'O objetivo da brincadeira é fazer o usuário adivinhar uma palavra em até seis tentativas. Enquanto a resposta certa não é dada, o jogador precisa arriscar termos ao invés de dar palpites de letras. Além disso, uma nova palavra é escolhida a cada 24h e é a mesma para todos que estejam jogando naquele dia.',
       'http://bit.ly/3G9BQOd',
       'https://term.ooo/'),
       
       ('Kirka.io',
       'Em suma, Kirka.io emerge como uma pérola brilhante no vasto oceano dos jogos online contemporâneos. Sua capacidade de transportar os jogadores para um universo digital envolvente, combinada com uma trama intricada, personagens cativantes e modos de jogo diversificados, estabelece um padrão elevado na indústria dos jogos eletrônicos. A fusão magistral de gráficos deslumbrantes e uma trilha sonora imersiva amplifica a experiência, transformando cada sessão de jogo em uma jornada sensorial. A comunidade ativa em torno de Kirka.io não é apenas um reflexo do sucesso do jogo, mas também um testemunho da sua capacidade de criar laços entre jogadores de todo o mundo. O constante comprometimento dos desenvolvedores em ouvir a comunidade e implementar atualizações regulares revela um compromisso duradouro em oferecer uma experiência de jogo que evolui com as expectativas dos jogadores. Kirka.io não é apenas um jogo, é uma escapada digital, uma imersão total em um universo virtual que transcende os limites da realidade. Sua presença no cenário dos jogos online não é apenas marcada pelo sucesso momentâneo, mas pela promessa de uma jornada contínua e emocionante, onde os Guardiões Digitais e seu compromisso com a proteção do sistema continuarão a inspirar jogadores a explorarem os horizontes digitais de Kirka.io.',
       'https://bit.ly/3MWV3q3',
       'https://kirka.io'),
       
       ('Battlefield',
       'Em conclusão, Battlefield, desde sua origem, solidificou-se como uma referência incontestável no gênero de jogos de tiro em primeira pessoa. Ao longo de suas diversas iterações, o jogo não apenas evoluiu tecnicamente, proporcionando experiências visuais e sonoras imersivas, mas também se destacou por sua abordagem inovadora e realista aos campos de batalha virtuais. A extensa variedade de mapas, veículos e armas oferece aos jogadores uma diversidade táctica que poucos outros títulos conseguiram replicar. A comunidade global formada em torno de Battlefield é testemunho do sucesso duradouro do jogo. O modo multiplayer, repleto de intensos confrontos, estabeleceu um padrão elevado para a competição online, enquanto as campanhas solo entregam narrativas cativantes e cinematográficas. Além disso, o comprometimento contínuo dos desenvolvedores em fornecer atualizações e expansões, demonstra a busca incessante pela excelência e a vontade de adaptar-se às demandas dos jogadores. Battlefield não é apenas um jogo, é uma experiência de guerra virtual que transcende as fronteiras do entretenimento, proporcionando aos jogadores uma imersão autêntica em batalhas épicas que perduram na memória muito além do campo de jogo digital.',
       'https://bit.ly/3sPvIHS',
       'https://venge.io'),
       
       ('Starfield',
       'Em síntese, Starfield, com sua iminente chegada, promete ser uma obra-prima que redefine os limites da exploração espacial nos jogos eletrônicos. Desenvolvido pela renomada Bethesda Game Studios, o título suscita grandes expectativas devido ao histórico da empresa na criação de experiências vastas e imersivas. O potencial de Starfield reside não apenas na sua capacidade de oferecer gráficos espetaculares e jogabilidade envolvente, mas também na promessa de explorar o desconhecido. A narrativa intergaláctica proposta é uma fonte de grande antecipação, sugerindo que os jogadores serão levados a uma jornada cósmica repleta de descobertas, mistérios e aventuras. A comunidade de jogadores aguarda ansiosamente para mergulhar nas vastidões do espaço, explorando planetas desconhecidos, interagindo com civilizações alienígenas e forjando seu caminho nas estrelas. Starfield, como um projeto há muito aguardado, carrega consigo a responsabilidade de não apenas atender, mas superar as expectativas, tornando-se um marco na história dos jogos eletrônicos e consolidando seu lugar como um épico intergaláctico que transcende as fronteiras da imaginação.',
       'https://bit.ly/3MWDDty',
       'https://ev.io'),
       
       ('CS GO',
       'Em conclusão, Counter-Strike: Global Offensive (CS: GO) não é apenas um jogo, mas uma instituição no cenário dos jogos de tiro em primeira pessoa. Desde seu lançamento, o título desenvolvido pela Valve Corporation conquistou milhões de jogadores ao redor do mundo, tornando-se um fenômeno cultural e competitivo. A longevidade do CS: GO é testemunho não apenas da qualidade de sua jogabilidade tática e mecânica precisa, mas também da comunidade ativa e apaixonada que o sustenta. O jogo transcende gerações, proporcionando não apenas partidas emocionantes, mas também alimentando uma cultura competitiva global. A constante evolução do CS: GO, seja por meio de atualizações de jogo, torneios espetaculares ou a expansão do cenário de e-sports, destaca a capacidade da Valve de manter o interesse dos jogadores ao longo do tempo. O equilíbrio entre estratégia e habilidade individual continua a ser a espinha dorsal do sucesso duradouro do CS: GO, garantindo que seja muito mais do que apenas um jogo, mas uma experiência atemporal que deixou uma marca indelével na história dos jogos eletrônicos.',
       'https://bit.ly/46w3NKJ',
       'https://play-cs.com/pt/servers'),
       
       ('Fortnite',
       'Em síntese, Fortnite emerge como um fenômeno cultural e uma experiência de jogo que transcende os tradicionais limites do gênero battle royale. Desenvolvido pela Epic Games, o título conquistou um lugar distinto na indústria dos jogos eletrônicos, atraindo uma vasta comunidade global e se tornando um marco na cultura pop contemporânea. A singularidade de Fortnite reside não apenas na sua jogabilidade dinâmica e visual vibrante, mas na constante reinvenção do cenário virtual. As temporadas e eventos regulares mantêm os jogadores engajados, oferecendo novos desafios, itens e narrativas intrigantes, construindo uma narrativa em constante evolução. A integração única de elementos sociais, como festivais virtuais e colaborações com ícones da música e do cinema, destaca a capacidade de Fortnite de transcender os limites do simples jogo, transformando-se em uma plataforma de entretenimento interativa. A influência duradoura de Fortnite não apenas moldou a paisagem dos jogos online, mas também estabeleceu um precedente para a interconexão entre jogadores, criadores de conteúdo e a cultura popular. Fortnite não é apenas um jogo, é um fenômeno cultural que continuará a moldar a forma como vemos e participamos do entretenimento digital no futuro',
       'https://bit.ly/3sWkgKl',
       'https://1v1.lol'),
       
       ('MineTiro',
       'Em resumo, Krunker.io se destaca como um jogo de tiro em primeira pessoa online que captura a atenção dos jogadores com sua simplicidade e jogabilidade viciante. Desenvolvido independentemente, o título ganhou popularidade rapidamente, proporcionando uma experiência frenética e acessível. A abordagem minimalista de Krunker.io, combinada com gráficos retro e controles intuitivos, democratiza o acesso ao gênero, atraindo jogadores de todas as idades e níveis de habilidade. A variedade de modos de jogo, mapas e a capacidade de criação de conteúdo pela comunidade contribuem para a diversidade que mantém o jogo fresco e cativante. A comunidade ativa em torno de Krunker.io é um testemunho da sua capacidade de cultivar um ambiente engajador e cooperativo. A constante interação entre os desenvolvedores e os jogadores, incorporando feedbacks para melhorias contínuas, solidifica a natureza colaborativa do jogo. Krunker.io, ao se destacar em oferecer uma experiência descomplicada, reforça que a diversão pode ser encontrada na simplicidade, e seu crescimento sustentado sugere que a comunidade continuará a disparar nas arenas digitais deste jogo único. Este não é apenas um jogo de tiro; é uma comunidade digital vibrante que perpetua a alegria da competição e colaboração.',
       'https://bit.ly/49PzO35',
       'https://krunker.io'),
       
       ('Cobrinha',
       'Em síntese, o jogo da cobrinha, uma relíquia dos primórdios dos videogames, permanece como um ícone da simplicidade e diversão atemporal. Desde seu advento em dispositivos de arcade até sua presença em smartphones, o jogo da cobrinha transcende gerações, mantendo-se como uma experiência cativante que desafia o jogador de maneira sutil, mas envolvente. A mecânica básica de guiar uma serpente em constante crescimento através do espaço limitado do ecrã, ao mesmo tempo em que evita colidir consigo mesma, ressoa pela sua simplicidade, oferecendo uma satisfação nostálgica e um desafio estratégico. O sucesso duradouro do jogo evidencia a atemporalidade de sua abordagem minimalista. O jogo da cobrinha, apesar de sua simplicidade aparente, continua a ser um símbolo da criatividade e inovação nos primórdios da indústria de videogames. Sua capacidade de proporcionar diversão instantânea e de conectar gerações distintas de jogadores é um testemunho de como a simplicidade bem executada pode criar experiências de jogo verdadeiramente memoráveis. Este não é apenas um jogo clássico; é uma lembrança vívida de como os fundamentos simples podem resultar em entretenimento atemporal.',
       'https://bit.ly/3sTnCxF',
       'https://powerline.io'),
       
       ('Ispy',
       ' Spy é um jogo de intenções disfarçadas, manipulação política e jogos de espionagem que abrangem uma Europa pré-guerra espionada. Engane seus oponentes como um agente trabalhando secretamente por uma potência européia, recrutando ativos-chave, comprando políticos e instigando a sabotagem contra capitais estrangeiros.',
       'https://bit.ly/47iz3y1',
       'https://ispy.heihei.resn.co');

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
