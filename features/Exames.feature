Feature: Mostrar exames filtrados para o dentista 
        As um dentista utilizando o sistema
	    I want to gerenciar os exames de meus pacientes

############################## GUI Scenarios  ##############################


Scenario: Adiciono um novo exame - Sucesso
        Given Eu estou na página de "Exames"
        And Eu não vejo o exame com nome "Pedro Manoel" e Exame "IRN" na lista
        When Eu seleciono a opção para adicionar um exame
        And Eu tento cadastrar os dados do exame "01, Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0"
        Then Eu posso ver uma mensagem de confirmação
        And Eu vejo o exame "01" com nome "Pedro Manoel", dentista examinador "Marcos" e data para 16 do mês 7 às 14:00 horas na lista de exames

Scenario: Adiciono um novo exame - Falha
        Given Eu estou na página de "Exames"
        And Eu não vejo o exame com nome "Pedro Manoel" e Exame "IRN" na lista
        When Eu seleciono a opção para adicionar um exame
        And Eu tento cadastrar os dados do exame "01, Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0"
        Then Recebo uma mensagem indicando a falha da criação devido a problemas com os dados passados
        And Não consigo visualizar os dados do exame na base de dados

############################## Service Scenarios ##############################

Scenario: Filtro de exame por Exame.
	Given Os exames "01, Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0" e " "05, Sonia Maria, 02-08-2020, Antonio, TGO, 3.24" estão armazenadas no sistema.
	When Eu solicita o filtro Exame por "IRN"
	And Eu requisito o sistema para "filtrar"
	Then o sistema retorna um atendimento incluindo informações com nome do paciente, destista, data, exame e resultado com os valores "Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0"

Scenario: Filtro exame por nome e Exane invalido.
	Given Os exames "01, Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0" esta armazenadas no sistema.
	When Eu solicita o filtro nome por nome "Pedro Manoel"
	And Eu solicita o filtro Exame por "TGO"
    And Eu requisito o sistema para "filtrar"
    Then Recebo uma mensagem indicando a falha no consulta devido a problemas com os parametros passados
    And Não consigo visualizar os dados do exame requisitado na base de dados
