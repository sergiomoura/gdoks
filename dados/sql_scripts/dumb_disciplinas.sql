/* = = = = = = = INSERINDO DISCIPLINAS = = = = = = = = = */
	INSERT INTO gdoks_disciplinas
	(id,sigla,nome,ativa,id_empresa)
	VALUES
	(1, "A","Direção / Gestão",1,1),
	(2, "B","Administração",    1,1),
	(3, "C","Civil",1,1),
	(4, "ELE","Elétrica",1,1),
	(5, "TEL","Telecomunicações",1,1),
	(6, "I","Instrumentação",1,1),
	(7, "H","Suprimentos",1,1),
	(8, "M","Mecânica",1,1),
	(9, "P","Processo",1,1),
	(10,"J","Tecnologia",1,1),
	(11,"K","Estimativas e Controle de Custos",1,1),
	(12,"T","Tubulações",1,1),
	(13,"X","Informática",1,1),
	(14,"S","Planejamento",1,1),
	(15,"U","Automação",1,1);
/*FIM*/

/* = INSERINDO DISCIPLINAS DE DIREÇÃO / GESTÃO = */
	INSERT INTO gdoks_subdisciplinas
	(sigla,nome,ativa,id_disciplina)
	VALUES
	("A01","Direção",1,1),
	("A02","Gestão de Contratos",1,1),
	("A03","Comercialização",1,1),
	("A04","Coordenação",1,1),
	("A05","Supervisão",1,1),
	("A06","Secretaria",1,1),
	("A07","Arquivo Técnico",1,1),
	("A08","Proc. Coordenação / Doc. QSSMA",1,1),
	("A09","QSSMA",1,1),
	("A20","Retrabalho",1,1);
/* FIM */

/* = INSERINDO SUBS DE ADMINISTRAÇÃO = */
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
	("B01","Direção",1,2),
	("B02","Supervisão",1,2),
	("B03","Treinamento",1,2),
	("B04","Disponibilidade",1,2),
	("B05","Administração Geral",1,2),
	("B10","Folga",1,2),
	("B20","Retrabalho",1,2),
	("B91","Doença",1,2),
	("B92","Permitidas",1,2),
	("B93","Férias",1,2),
	("B94","A compensar",1,2),
	("B96","Descanso em Férias",1,2),
	("B97","Ausências Cargos de Gestão",1,2);
/**/

/* INSERINDO SUBS DE CIVIL */
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("C01","Supervisão",1,3),
		("C02","Levantamento de Campo / Levantamento de Documentos)",1,3),
		("C03","Especificação Técnica, Critérios de Projeto",1,3),
		("C04","Des. Terraplenagem",1,3),
		("C05","Des. Implantação (Locação Geral, Arrumento,Pavimentação e Urbanização, Sist. Subterr. e Drenagem)",1,3),
		("C07","Especificação para Cotação e Compra (RM)",1,3),
		("C09","Lista Material (Levant. Quantitativos)",1,3),
		("C10","Comentários DF's",1,3),
		("C11","Memorial Descritivo / Relatório",1,3),
		("C12","Memória Cálculo",1,3),
		("C13","Des. Concreto (Formas, Armaduras e Estaqueamento)",1,3),
		("C14","Des. Arquit. (Plantas, Cortes, Fachadas)",1,3),
		("C15","Des. Instal. Hidráulicas",1,3),
		("C16","Desenhos Unifilares Metálica",1,3),
		("C17","Desenhos Detalhamento Metálica",1,3),
		("C18","Bancos de Dados do Projeto Civil",1,3),
		("C20","Retrabalho",1,3),
		("C80","Reunião",1,3),
		("C90","Estágio",1,3);
/*fim*/

/* INSERINDO DISCIPLINAS DE ELÉTRICA */
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("E00","Especificações Técnicas de Equipamentos",1,4),
		("E01","Folha de Dados de Equipamentos",1,4),
		("E02","Requisições de Equipamentos",1,4),
		("E03","Parecer Técnico de Propostas para Equipamentos",1,4),
		("E04","Verificação de Documentos de Fornecedores",1,4),
		("E05","Diagramas Unifilares",1,4),
		("E06","Diagramas Trifilares Funcionais",1,4),
		("E07","Diagramas de Interligação e Conexão",1,4),
		("E08","Desenhos de Detalhes Típicos de Instalações",1,4),
		("E09","Planta de Subestações / Salas de Equipamentos",1,4),
		("E10","Planta de Distribuição de Força e Aterramento",1,4),
		("E11","Planta de Aterramento / SPDA",1,4),
		("E12","Planta de Iluminação",1,4),
		("E13","Listas de Materiais de Instalação",1,4),
		("E14","Análise Técnica de Propostas para Materiais de Instalação",1,4),
		("E15","Listas de Eletrodutos e Cabos",1,4),
		("E16","Listas de Consumidores Elétricos (Lista de Carga)",1,4),
		("E17","Planta de Classificação de Áreas",1,4),
		("E18","Relatórios Técnicos",1,4),
		("E19","Análise Técnica e Concepção de Projeto Básico",1,4),
		("E20","Memoriais Descritivos",1,4),
		("E21","Condicionamento / Preservação",1,4),
		("E22","Plano de Pré-Operação / Partida",1,4),
		("E23","Apoio a Parecer Técnico de Equipamentos Mecânicos",1,4),
		("E24","Apoio à Verificação de Docs. de Fornecedores de Eqptos. Mecânicos",1,4),
		("E25","Cálculos para Projeto (Cabos, Aterramentos, CC, etc.)",1,4),
		("E26","Diagrama Trifilar (Iluminação, CC, Instrumentação)",1,4),
		("E27","Listas em Geral",1,4),
		("E28","vago",1,4),
		("E29","Modelagem Elétrica",1,4),
		("E30","vago",1,4),
		("E31","vago",1,4),
		("E32","vago",1,4),
		("E33","vago",1,4),
		("E34","vago",1,4),
		("E35","vago",1,4),
		("E36","vago",1,4),
		("E37","vago",1,4),
		("E38","vago",1,4),
		("E39","vago",1,4),
		("E40","Gerenciamento, Planejamento e Programação",1,4),
		("E41","vago",1,4),
		("E42","vago",1,4),
		("E43","Assistência Técnica",1,4),
		("E44","Embarque (offshore)",1,4),
		("E45","As-built",1,4),
		("E46","Levantamento de Campo",1,4),
		("E47","vago",1,4),
		("E48","vago",1,4),
		("E49","vago",1,4),
		("F20","Gerência de Empreendimentos",1,4),
		("F01","Supervisão - Escritório Central",1,4),
		("F02","Supervisão/Administração - Escritório de Campo",1,4),
		("F03","Serviços Preparatórios de Construção",1,4),
		("F04","Coordenação de Campo",1,4),
		("F05","Planejamento e Controle de Custos",1,4),
		("F06","Fiscalização, Testes e Medição",1,4),
		("F07","Engenharia de Campo",1,4),
		("F08","Controles de Materiais",1,4),
		("F09","Partida",1,4),
		("F10","Viagem Residência/ Obra / Residência",1,4),
		("F11","Assistência Técnica ao Cliente",1,4),
		("F30","Retrabalho",1,4);
/*fim*/

/* INSERINDO DISCIPLINAS DE TELECOMUNICAÇÕES*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("E50","Especificações Técnicas",1,5),
		("E51","Memorial de Cálculo",1,5),
		("E52","Requisições de Equipamentos / Serviços",1,5),
		("E53","Parecer Técnico de Propostas dos Sistemas",1,5),
		("E54","Verificação de Documentos de Fornecedor",1,5),
		("E55","Diagramas de Blocos",1,5),
		("E56","Arquitetura de Sistemas",1,5),
		("E57","Critério de Projeto de Telecomunicações",1,5),
		("E58","Detalhes Típicos de Instalação",1,5),
		("E59","Arranjo de Salas de Equipamentos",1,5),
		("E60","Plantas de Distribuição",1,5),
		("E61","Listas de Materiais",1,5),
		("E62","Listas em Geral",1,5),
		("E63","Memorial Descritivo Sistema de Comunicação (Telefonia e Alta Voz)",1,5),
		("E64","Memorial Descritivo Sistema de Acesso (Satélite, Rádio Enlace e Fibra Óptica)",1,5),
		("E65","Memorial Descritivo Sistema de Rádio Comunicação (Ponto a Ponto e Ponto Multiponto)",1,5),
		("E66","Memorial Descritivo Sistema de Segurança Controle de Acesso (CFTV, Controle de Perímetro)",1,5),
		("E67","Relatórios Técnicos",1,5),
		("E68","Análise Técnica, Desenvolvimento e Concepção de Projeto Básico",1,5),
		("E69","Memorial Descritivo Sistema de Rede de Dados (Conectividade, Armazenamento e Sala de TI)",1,5),
		("E70","Memorial Descritivo Sistema de Monitoração (CFTV - Processo Wall)",1,5),
		("E71","Memorial Descritivo Sistemas Especiais",1,5),
		("E72","Projeto de Viabilidade Técnica",1,5),
		("E73","Modelagem de Sistemas de Telecomunicação",1,5),
		("E74","vago",1,5),
		("E75","vago",1,5),
		("E76","vago",1,5),
		("E77","vago",1,5),
		("E98","vago",1,5),
		("E90","Gerenciamento, Planejamento e Programação",1,5),
		("E91","vago",1,5),
		("E92","vago",1,5),
		("E93","Assistência Técnica",1,5),
		("E94","Embarque (offshore)",1,5),
		("E95","As-built",1,5),
		("E96","Levantamento de Campo",1,5),
		("E97","vago",1,5),
		("E99","vago",1,5);
/*FIM*/

/*INSERINDO SUBS DE INSTRUMENTAÇÃO*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("I01","Supervisão",1,6),
		("I02","Levantamento de Campo",1,6),
		("I03","Especificação Técnica, Critérios de Projeto",1,6),
		("I04","Plantas de Locação Instrumentos/ Plantas Salas (LayOut)",1,6),
		("I05","Arquitetura e Carregamento de Hardware",1,6),
		("I06","Folha de Dados (FD) / Folha de Especificação (FE)",1,6),
		("I07","Especificação para Cotação e Compra (RM)",1,6),
		("I08","Análise Técnica",1,6),
		("I09","Lista de Material (Cabos /Instrumentos/Entradas,Saidas)",1,6),
		("I10","Comentários DF´s",1,6),
		("I11","Memorial Descritivo / Relatórios",1,6),
		("I12","Memória de Cálculo",1,6),
		("I13","Diagramas",1,6),
		("I15","Arranjos Painéis",1,6),
		("I16","Detalhes Típicos",1,6),
		("I17","Bases de Dados de Instrumentação - até 2007",1,6),
		("I18","Bancos de Dados do Projeto de Instrumentação",1,6),
		("I20","Retrabalho",1,6),
		("I80","Reunião",1,6),
		("I90","Estágio",1,6);
/*FIM*/

/*INSERINDO SUBS DE SUPRIMENTOS (7)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("H01","Supervisão",1,7),
		("H02","Mapa comparativo de compras",1,7),
		("H03","Pedido de Compra",1,7),
		("H04","Carta-Convite",1,7),
		("H05","Fax de Intenção",1,7),
		("H06","Mapa de acompanhamento de compras",1,7),
		("H07","Controle de diligenciamento / inspeção",1,7),
		("H08","Lista de fornecedores potenciais",1,7),
		("H20","Retrabalho",1,7);
/*FIM*/

/*INSERINDO SUBS DE MECÂNICA (8)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
	("M01","Supervisão",1,8),
	("M02","Levantamento de Campo / Atividades no Cliente",1,8),
	("M03","Especificação Técnica, Critérios de Projeto",1,8),
	("M06","Folhas de Dados (FD) / Folha de Especificação (FE)",1,8),
	("M07","Especific. para Cotação e Compra (RM)",1,8),
	("M08","Análise Técnica de Propostas (ATP) / Parecer Técnico (PT)",1,8),
	("M09","Lista de Materiais / Lista de Sobressalentes",1,8),
	("M10","Comentários DF´s",1,8),
	("M11","Memorial Descritivo / Relatórios",1,8),
	("M12","Memória de Cálculo",1,8),
	("M13","Desenhos de Fabricação",1,8),
	("M14","Desenho de Projeto / Setting Plan",1,8),
	("M18","Bancos de Dados do Projeto Mecânico",1,8),
	("M20","Retrabalho",1,8),
	("M80","Reunião",1,8),
	("M90","Estágio",1,8);
/*FIM*/

/*INSERINDO SUBS DE PROCESSO (9)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("P01","Supervisão",1,9),
		("P02","Levantamento de Campo",1,9),
		("P03","Especific Técnica, Critérios de Projeto",1,9),
		("P04","Fluxograma de Processo (Engenharia Básica)",1,9),
		("P05","Fluxograma de Processo e Intrumentação P&I (Engenharia de Detalhamento)",1,9),
		("P06","Folhas de Dados (FD) / Folha de Especificação (FE)",1,9),
		("P09","Listas de Linhas / Equipamentos",1,9),
		("P10","Comentários DF´s",1,9),
		("P11","Memorial Descritivo / Relatório",1,9),
		("P12","Memória de Cálculo",1,9),
		("P13","Manuais de Operação",1,9),
		("P14","Análise de Risco",1,9),
		("P15","Tabela Causa e Efeito",1,9),
		("P18","Bancos de Dados do Projeto de Processo",1,9),
		("P19","Manual de Engenharia",1,9),
		("P20","Retrabalho",1,9),
		("P80","Reunião",1,9),
		("P90","Estágio",1,9);
/*FIM*/

/*INSERINDO SUBS DE TECNOLOGIA (10)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("J01","Supervisão",1,10),
		("J02","Bancos de Materiais",1,10),
		("J03","Espec. Técnic. e Critérios de Modelagem",1,10),
		("J04","Administração de Banco de Dados",1,10),
		("J05","Suporte ao Usuário",1,10),
		("J06","Customização",1,10),
		("J07","Padronização",1,10),
		("J08","Análise Técnica de Softwares e Equipamentos",1,10),
		("J09","Listas em Geral",1,10),
		("J10","Pesquisa e Desenvolvimento",1,10),
		("J11","Memoriais e Relatórios",1,10),
		("J12","Criação de Peças de Catálogo e Símbolos",1,10),
		("J18","Bancos de Dados de Projeto",1,10),
		("J20","Retrabalho",1,10),
		("J80","Reunião",1,10),
		("J90","Estágio",1,10);
/*FIM*/

/*INSERINDO SUBS DE TECNOLOGIA (11)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("K01","Supervisão",1,11),
		("K02","Estimativas de Custos de Empreendimento",1,11),
		("K03","Controle de Custos de Empreendimentos",1,11),
		("K04","Controle de Custos de Projetos",1,11),
		("K20","Retrabalho",1,11);
/*FIM*/

/*INSERINDO SUB DE TUBULAÇÃO (12)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("T01","Supervisão",1,12),
		("T02","Levantamento de Campo",1,12),
		("T03","Especificação Técnica, Critérios de Projeto",1,12),
		("T04","Plantas de Tubulação",1,12),
		("T05","Isométricos",1,12),
		("T07","Requisições de Materiais",1,12),
		("T08","Análise Técnica",1,12),
		("T09","Lista de Materiais, Suportes",1,12),
		("T10","Comentários DF´s",1,12),
		("T11","Memorial Descritivos / Relatórios",1,12),
		("T12","Memória de Cálculo",1,12),
		("T13","Detalhes Típicos (Suportes)",1,12),
		("T14","Arranjos de Equipamentos (Layout)",1,12),
		("T15","Maquetes - até 2007",1,12),
		("T18","Bancos de Dados do Projeto de Tubulação",1,12),
		("T20","Retrabalho",1,12),
		("T80","Reunião",1,12),
		("T90","Estágio",1,12);
/*FIM*/

/*INSERINDO SUBS DE INFORMÁTICA (13)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("X01","Chefia",1,13),
		("X02","Desenvolvimento",1,13),
		("X03","Produção",1,13),
		("X04","Suporte ao Usuário",1,13),
		("X20","Retrabalho",1,13);
/*FIM*/

/*INSERINDO SUBS DE PLANEJAMENTO (14)*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("S01","Supervisão",1,14),
		("S02","EAP – Estrutura Analítica de Projeto",1,14),
		("S03","Cronogramas",1,14),
		("S04","Programação e Acompanhamento de prazos",1,14),
		("S05","Curva de Progresso Físico",1,14),
		("S06","Mapa de Progresso Físico",1,14),
		("S07","Lista de Pendências",1,14),
		("S08","Punch List",1,14),
		("S09","Controle de Progresso de Documentos",1,14),
		("S10","Estimativa de Custos e Empreendimentos",1,14),
		("S11","Controle de Custos de Projetos",1,14),
		("S12","Boletim de Medição",1,14),
		("S13","Back-log",1,14),
		("S14","Relatório Mensal",1,14),
		("S20","Retrabalho",1,14);
/*fim*/

/*INSERINDO SUBS DE AUTOMAÇÃO*/
	INSERT INTO gdoks_subdisciplinas
		(sigla,nome,ativa,id_disciplina)
	VALUES
		("U01","Supervisão",1,15),
		("U02","Levantamento de Campo",1,15),
		("U03","Especificação Técnica / Funcional",1,15),
		("U04","Plantas - Rede",1,15),
		("U05","Arquitetura e Carregamento de Hardware",1,15),
		("U06","Folha de Dados - FD",1,15),
		("U07","Requisição de Material - RM",1,15),
		("U08","Análise Técnica de Proposta - ATP",1,15),
		("U09","Listas",1,15),
		("U10","Análise de Documento de Fornecedor - ADF",1,15),
		("U11","Memorial Descritivo - MD",1,15),
		("U12","Memória de Cálculo - MC",1,15),
		("U13","Diagramas",1,15),
		("U15","Arranjos",1,15),
		("U16","Detalhes Típicos",1,15),
		("U18","Banco de Dados de Projeto de Automação",1,15),
		("U20","Retrabalho",1,15),
		("U80","Reunião",1,15),
		("U90","Estágio",1,15);
/*FIM*/