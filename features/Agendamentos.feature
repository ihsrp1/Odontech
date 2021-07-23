Feature: Agendamento de horários do dentista

    A fim de agendar horários de atendimentos
    Como o recepcionista
    Eu quero ser capaz de gerenciar e criar novos agendamentos

#################### GUI SCENARIOS ####################

    Scenario: Criar um agendamento com informações incompletas
        Given Eu estou na página de agendamentos
        And Eu não vejo o agendamento de nome "Maria" na lista
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "12345678910" com nome "Maria"
        And Com dentista responsável sendo "Felipe"
        And Sem hora para o agendamento
        Then Eu posso ver uma mensagem de agendamento inválido
        And Eu não vejo o agendamento "12345678910" na lista de agendamentos

    Scenario: Criar um novo agendamento
        Given Eu estou na página de agendamentos
        And Eu não vejo o agendamento de nome "Maria" na lista
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "12345678910" com nome "Maria"
        And Com horário para o dia 16 do mês 5 às 10:00 horas
        And Com dentista responsável sendo "Felipe"
        Then Eu posso ver uma mensagem de confirmação
        And Eu vejo o agendamento "12345678910" com nome "Maria", dentista "Felipe" e data para 16 do mês 5 às 10:00 horas na lista de agendamentos

    Scenario: Criar um agendamento com horário já indisponível
        Given Eu estou na página de agendamentos
        And Eu não vejo o agendamento de nome "Karla" na lista
        And O agendamento no nome de "Maria" está marcado para o dia 16 do mês 5 às 10:00 horas com dentista responsável sendo "Felipe"
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "14725836910" com nome "Karla"
        And Com horário para o dia 16 do mês 5 às 10:00 horas
        And Com dentista responsável sendo "Felipe"
        Then Eu posso ver uma mensagem de agendamento inválido
        And Eu não vejo o agendamento "12345678910" na lista de agendamentos

################## SERVICE SCENARIOS ##################

    Scenario: Retornar o tempo restante até o agendamento
        Given O agendamento '12345678910' é armazenado no sistema para o dia 16 do mês 5 às 10:00 horas
        And Hoje é dia 15 o mês 5 às 09:00 horas
        When Eu solicito ao sistema o tempo restante até o agendamento '12345678910'
        Then O sistema retorna o tempo restante de 25 horas e 30 minutos

    Scenario: Impedir a criação de um agendamento inválido
        Given Eu desejo criar o agendamento no nome de 'Karla' no sistema para o dia 16 do mês 5 às 10:00 horas
        And Já existe um agendamento no nome de 'Maria' para esse mesmo horário
        When Eu solicito ao sistema a criação do agendamento no nome de 'Karla'
        Then O sistema retorna que o agendamento é inválido por conflito de horários
        And O agendamento no nome de 'Karla' não é armazenado
