Feature: Agendamento de horários do dentista

    A fim de agendar horários de atendimentos
    Como o recepcionista
    Eu quero ser capaz de gerenciar e criar novos agendamentos

#################### GUI SCENARIOS ####################

    Scenario: Criar um agendamento com informações incompletas
        Given Eu estou na página de "agendamentos"
        And Eu não vejo o agendamento de nome "Maria" na lista
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "12345678910" com nome "Maria"
        And Com dentista responsável sendo "Felipe"
        And Sem hora para o agendamento
        Then Eu posso ver uma mensagem de agendamento inválido
        And Eu não vejo o nome "Maria" na lista de agendamentos

    Scenario: Criar um novo agendamento
        Given Eu estou na página de "agendamentos"
        And Eu não vejo o agendamento de nome "Maria" na lista
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "12345678910" com nome "Maria"
        And Com dentista responsável sendo "Felipe"
        And Com horário para o dia "27" do mês "8" às "10:00" horas
        Then Eu posso ver uma mensagem de confirmação
        And Eu vejo o agendamento com nome "Maria", dentista "Felipe" e data para "27" do mês "8" às "10" horas na lista de agendamentos

    Scenario: Criar um agendamento com horário já indisponível
        Given Eu estou na página de "agendamentos"
        And Eu não vejo o agendamento de nome "Karla" na lista
        And Eu vejo o agendamento com nome "Maria", dentista "Felipe" e data para "27" do mês "8" às "10" horas na lista de agendamentos
        When Eu seleciono a opção para adicionar um agendamento
        And Eu tento cadastrar o agendamento "14725836910" com nome "Karla"
        And Com dentista responsável sendo "Felipe"
        And Com horário para o dia "27" do mês "8" às "10:00" horas
        Then Eu posso ver uma mensagem de agendamento inválido
        And Eu não vejo o nome "Karla" na lista de agendamentos

################## SERVICE SCENARIOS ##################

    Scenario: Retornar o tempo restante até o agendamento
        Given O agendamento "45214756586" é armazenado no sistema para o dia "28" do mês "8" às "10:00" horas no nome de "Carlos" com destista "Felipe"
        When Eu solicito ao sistema o tempo restante até o agendamento "45214756586"
        Then O sistema retorna o tempo restante para o atendimento

    Scenario: Impedir a criação de um agendamento inválido 
        Given Já existe um agendamento para o dia "29" do mês "8" às "14:00" horas no nome de "Carla Alves" com dentista "Felipe" no sistema
        When Eu solicito ao sistema a criação do agendamento "56247856596" para o dia "29" do mês "8" às "14:00" horas no nome de "Karla" com dentista "Felipe" no sistema
        Then O sistema retorna que o agendamento é inválido por conflito de horários
        And O agendamento no nome de "Karla" não é armazenado
