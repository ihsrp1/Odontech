
Feature: Mostrar exames filtrados para o dentista 
        As um dentista utilizando o sistema
	    I want to gerenciar os exames de meus pacientes
  ############################## Service Scenarios ##############################

  Scenario: Filtro de exame por Exame.
    Given Os exames "01, Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0" e " "05, Sonia Maria, 02-08-2020, Antonio, TGO, 3.24" estão armazenadas no sistema.
    When Eu solicita o filtro Exame por "IRN"
    Then o sistema retorna um atendimento incluindo informações com nome do paciente, destista, data, exame e resultado com os valores "Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0"

  Scenario: Filtro exame por nome e Exane invalido.
    Given Os exames "01, Pedro Manoel, 16-07-2020, Marcos,IRN, 3.0" esta armazenadas no sistema.
    When Eu solicita o filtro por nome "Pedro Manoel"
    And Eu solicita o filtro Exame por "TGO"
    Then Recebo uma mensagem indicando a falha no consulta devido a problemas com os parametros passados
