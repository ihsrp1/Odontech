Feature: Agendamento de horários do dentista

    A fim de agendar horários de atendimentos
    Como o recepcionista
    Eu quero ser capaz de gerenciar e criar novos agendamentos

#################### GUI SCENARIOS ####################

    Scenario: Criar um novo agendamento
        Given Eu estou na página de agendamentos
        And Eu não vejo o agendamento de nome "Maria" na lista
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "12345678910" com nome "Maria"
        And Com horário para o dia 16 do mês 5 às 10:00 horas
        And Com dentista responsável sendo "Felipe"
        Then Eu posso ver uma mensagem de confirmação
        And Eu vejo o agendamento "12345678910" com nome "Maria", dentista "Felipe" e data para 16 do mês 5 às 10:00 horas na lista de agendamentos