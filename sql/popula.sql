USE detrandb;

INSERT INTO TIPOMULTA (descricao) VALUES
	('Velocidade acima da máxima permitida'),
	('Estacionar em local proibido'),
	('Dirigir utilizando o celular'),
	('Dirigir sob efeito de álcool'),
	('Não utilizar cinto de segurança'),
	('Avançar o sinal vermelho');

INSERT INTO MOTORISTA (cpf, nome, dataVencimento, categoriaCNH) VALUES
	(12345678901, 'Maria José Silva', '2024-6-31', 'A'),
	(12345678902, 'José Maria Silva', '2024-1-1', 'B'),
	(12345678903, 'Silvio Maria José', '2030-12-31', 'AB');

INSERT INTO VEICULO (placa, marca, modelo, ano, corPredominante, cpf) VALUES
	('ABC8901', 'RENAULT', 'SANDERO', 2011, 'VERMELHO', 12345678901),
	('BCD8902', 'CHEVROLET', 'CORSA', 2009, 'PRETO', 12345678902),
	('CDE8903', 'FERRARI', 'FERRARI', 2022, 'VERMELHO', 12345678903);

INSERT INTO MULTA (placa, tipoInfracao, valor, dataMulta, pontosPenalidade) VALUES
	('CDE8903', 1, 880.41, '2022-12-24', 5),
	('CDE8903', 3, 293.47, '2022-12-24', 7),
	('ABC8901', 3, 293.47, '2023-11-30', 7);