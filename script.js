/* ============================================================
   DADOS — base única que alimenta FAQ + assistente.
   Edite/adicione itens aqui; tudo se atualiza automaticamente.
   ============================================================ */
const DOCS = {
  // Links diretos para os documentos oficiais (Google Drive)
  duvidas:'https://drive.google.com/file/d/16tiqZ3iAN8WxIimdH_krgtWOLiWSXOAK/view',
  erros:'https://drive.google.com/file/d/1eek0hb_b5TSTw1txpCIv47rGqjIQC7k_/view',
  credenciamento:'https://drive.google.com/file/d/1FnTXlzBSLM5AsXTFOuEa-SReBwLMABHI/view',
  // Manual "Credenciamento de Terminais via Middleware — DX8000 (v1.56.11)"
  dx8000:'https://drive.google.com/file/d/1Bn45ePzN7ULbsv--2cTPIR1fpNFc01n_/view',
};
// A FAQ de Adquirência e a de Erros fazem parte do mesmo PDF "FAQ - ADQUIRÊNCIA":
DOCS.adq = DOCS.erros;
const CAT_LABEL = {
  dx8000:'DX8000 · Credenciamento via Middleware',
  adquirencia:'Adquirência & Serviços',
  erros:'Erros POS',
  portal:'Portal & App',
  equipamentos:'Equipamentos & Operação'
};

const FAQ = [
  /* ===================== DX8000 — CREDENCIAMENTO VIA API ===================== */
  {cat:'dx8000', q:'O que muda no credenciamento do DX8000 (v1.56.11)?',
   a:'A versão v1.56.11 do terminal DX inicia a expansão do credenciamento via middleware, com terminais atualizados distribuídos por todos os DDDs de atuação. O objetivo é padronizar o fluxo e reduzir falhas: SAC e Relacionamento seguem uma sequência de validações (proposta → Intraflex → SGV → disponibilidade do terminal) antes de concluir o credenciamento.',
   doc:DOCS.dx8000, fluxo:true, kw:'dx8000 dx api v1.56.11 novo credenciamento atualizacao versao terminal ddd cobertura fluxo'},
  {cat:'dx8000', q:'Etapa 1 — Qual status a proposta precisa ter?',
   a:'A proposta deve estar com o status "Terminal Ativado" — é o critério de aceite. Só propostas nesse status seguem no fluxo, o que garante que as etapas anteriores foram concluídas. Se o status estiver divergente, mesmo com o terminal já ativo, encaminhe para a área de cadastro para o ajuste cadastral antes de prosseguir.',
   doc:DOCS.dx8000, kw:'status proposta terminal ativado criterio aceite cadastro divergente ajuste etapa 1'},
  {cat:'dx8000', q:'Etapa 2 — Como validar os dados no Intraflex?',
   a:'O Intraflex é a fonte oficial do fluxo. Caminho: Redeflex Mobile > Cliente > Gestão de Cliente RFM. Os campos críticos — Documento (CPF/CNPJ), E-mail e Telefone — precisam ser idênticos aos da proposta. Qualquer divergência pode comprometer o credenciamento e afetar a ativação do POS. Havendo divergência com erro no credenciamento, a demanda vai para a OPCOM, que atualiza os dados da proposta via banco para sincronizar as informações.',
   doc:DOCS.dx8000, kw:'intraflex base cliente rfm redeflex mobile cpf cnpj email telefone divergencia dados cadastrais opcom etapa 2'},
  {cat:'dx8000', q:'Etapa 3 — Como deve estar o cadastro no SGV?',
   a:'No SGV, o Tipo de cadastro deve estar como "eletrônico" e o Status deve estar "ativo". Esses parâmetros são essenciais para a vinculação correta na base customer_data_rec, que dá sequência ao credenciamento. Atenção a duplicidade: não pode haver cadastro físico e eletrônico ativos ao mesmo tempo — mantenha o eletrônico e solicite a inativação do físico. Se o eletrônico estiver inativo, encaminhe para ativação, pois sem isso o credenciamento não conclui. Casos persistentes vão para a OPCOM (tratativa cadastral, regularização no SGV e testes de integração).',
   doc:DOCS.dx8000, kw:'sgv tipo cadastro eletronico status ativo customer_data_rec vinculacao duplicidade fisico inativo etapa 3'},
  {cat:'dx8000', q:'Etapa 4 — Disponibilidade do terminal e erro "máquina já alocada"',
   a:'O terminal precisa estar disponível para vinculação: ID existente e válido, não vinculado a outro cliente e com status liberado no sistema de gestão. Além disso, há um controle de alocação no middleware — um terminal pode estar liberado no sistema de gestão mas não no middleware, o que gera o erro "máquina já alocada". Hoje a checagem é por consulta em banco, e a OPCOM já estruturou um projeto para expor esse status no FlexForce. Quando o erro ocorrer, encaminhe para a OPCOM validar o terminal no middleware e tratar a alocação.',
   doc:DOCS.dx8000, kw:'disponibilidade terminal vinculacao id maquina ja alocada middleware flexforce alocacao etapa 4'},
  {cat:'dx8000', q:'Resumo — critérios para certificar o credenciamento',
   a:'Para o credenciamento ocorrer com sucesso: proposta com status "Terminal Ativado"; dados consistentes entre proposta e Intraflex; cadastro SGV "Eletrônico e Ativo"; sem duplicidades cadastrais; e terminal disponível no sistema. Persistindo divergência, ajuste antes de uma nova tentativa para evitar retrabalho. Em caso de dúvida após todas as validações, a OPCOM apoia na análise e tratativa.',
   doc:DOCS.dx8000, kw:'criterios certificacao resumo checklist terminal ativado intraflex sgv duplicidade disponivel'},
  {cat:'dx8000', q:'Como funciona a remoção/desvinculação do DX8000?',
   a:'O DX8000 ainda não está integrado ao PowerApps. Por isso, toda remoção e desvinculação do POS é feita exclusivamente via Central de Atendimento, que executa o descredenciamento do equipamento junto ao estabelecimento. (No MOVE, a troca pode ser solicitada pelo PowerApps no RFM.)',
   doc:DOCS.dx8000, kw:'remocao desvinculacao descredenciamento dx8000 powerapps central atendimento troca pos'},

  /* ===================== ERROS POS ===================== */
  {cat:'erros', q:'NO SERVICE (SIM CARD IS LOCKED) — chip pede PIN',
   a:'O terminal solicita o PIN do chip porque está sendo usado um chip não homologado para o DX8000 (homologado para MOVE, IWL ou ICT). Solução: substituir por um chip homologado do tipo Allcom, específico para o DX8000. O atendente verifica a disponibilidade da troca com o consultor.',
   doc:DOCS.erros, kw:'no service sim card locked chip pin allcom homologado dx8000 nao compativel'},
  {cat:'erros', q:'Falha na comunicação / "Processando" travado',
   a:'A transação fica em processamento ou não conclui. Causas comuns: desfazimento de uma transação anterior ou instabilidade de conexão (Wi-Fi ou chip). Verifique no sistema de gestão a última transação — se estiver desfeita, pode ser a causa. Faça a limpeza de configurações do equipamento, um novo credenciamento e avalie alternar entre Wi-Fi e chip.',
   doc:DOCS.erros, kw:'falha comunicacao processando desfazimento conexao wifi chip limpeza credenciamento'},
  {cat:'erros', q:'Erro PIX ID 16 — valor abaixo da taxa mínima',
   a:'Ocorre ao gerar o QR Code Pix quando o valor informado é inferior à taxa mínima configurada. Oriente a refazer com valor igual ou superior à taxa mínima vigente (ex.: R$ 0,36) e confira as taxas no sistema de gestão de transações. O consultor pode usar a taxa PIX combinada na prospecção do cliente.',
   doc:DOCS.erros, kw:'erro pix id 16 valor inferior taxa minima qr code 0,36 gestao'},
  {cat:'erros', q:'Erro PIX ID 42 — associação Voucher ausente',
   a:'Erro ao tentar transações Pix quando a associação Voucher não está cadastrada no sistema de gestão, deixando o terminal vinculado à rede adquirente incorreta. Solução: no cadastro do usuário, incluir a rede adquirente Voucher na aba de associações, inserir o código do estabelecimento e salvar.',
   doc:DOCS.erros, kw:'erro pix id 42 voucher associacao rede adquirente codigo estabelecimento'},
  {cat:'erros', q:'Mais de um cartão detectado / leitura por aproximação (CTLS)',
   a:'Quando mais de um cartão é aproximado ao mesmo tempo, oriente a verificar a carteira digital ou cartões próximos e repetir com apenas um, ou usar a inserção do cartão. Para falha de CTLS (aproximação), solicite nova tentativa mantendo o cartão estável; persistindo, oriente o uso do cartão inserido.',
   doc:DOCS.erros, kw:'mais de um cartao detectado ctls aproximacao contactless leitura inserir cartao'},
  {cat:'erros', q:'Terminal travado / chave de criptografia / "Realize o credenciamento"',
   a:'"Terminal is Locked" e "Chave de Criptografia Ausente" indicam perda da aplicação/chaves — a tratativa é a troca do equipamento e liberação do ID para o novo. Já o erro "Realize o credenciamento" ocorre quando a máquina credencia automaticamente sem integração correta: faça a limpeza de arquivos via Android (Configurações com senha 350000 > Apps > Redeflex > Armazenamento e Cache > Limpar Cache e Armazenamento) e refaça o credenciamento.',
   doc:DOCS.erros, kw:'terminal locked chave criptografia ausente troca equipamento realize credenciamento limpeza android 350000 cache'},
  {cat:'erros', q:'Falhas de credenciamento — parâmetro inválido / cartão inválido (FIS/TMS7)',
   a:'Falha ao conectar no credenciamento: solicite o número de série (SN), verifique se o ID anterior segue ativo e libere para nova tentativa. "Parâmetro Inválido" e "Cartão Inválido" decorrem de ausência dos arranjos de bandeira no cadastro, não sincronizados com a FIS: no TMS7, confira se cada bandeira tem os quatro arranjos criados; havendo pendência, acione a OPCOM para intermediar o ajuste manual.',
   doc:DOCS.erros, kw:'credenciamento falha conectar parametro invalido cartao invalido arranjos bandeira fis tms7 opcom sn'},
  {cat:'erros', q:'Transação negada pelo Host (credenciamento/transação)',
   a:'Ocorre quando o cadastro não está integrado à FIS. Valide os dados cadastrais no sistema de gestão, em especial endereço e contato (no Gestão Solver, sem letras maiúsculas e sem nomes extensos no endereço). Após alterar, o cadastro leva até ~5 minutos para integrar com o TMS7 — acompanhe a subida antes de nova tentativa.',
   doc:DOCS.erros, kw:'transacao negada host fis cadastro endereco contato gestao solver tms7 integracao 5 minutos'},
  {cat:'erros', q:'Erro 42 (PIX) — terminal inoperante para PIX',
   a:'Esse erro impacta as transações via PIX, deixando o terminal inoperante nessa modalidade. Confira os dados cadastrais e a taxa PIX para verificar se o valor é mesmo inferior à taxa; se for superior, acione a OPCOM para análise de instabilidade. O consultor pode tentar uma transação acima da taxa PIX cadastrada e, persistindo, acionar a central.',
   doc:DOCS.erros, kw:'erro 42 pix inoperante taxa instabilidade opcom valor inferior modalidade'},

  /* (Mensageria Transacional agora é uma tabela dedicada — ver MSG_CODES) */

  /* ===================== ADQUIRÊNCIA & SERVIÇOS ===================== */
  {cat:'adquirencia', q:'O que é uma Adquirente e como ela atua?',
   a:'A Adquirente (ou Credenciadora) habilita estabelecimentos a aceitarem cartões de crédito, débito e outras formas eletrônicas, processando e liquidando as transações. Ela intermedia estabelecimento, bandeira e banco emissor, viabilizando a autorização da venda, o processamento e o repasse financeiro ao lojista.',
   doc:DOCS.adq, kw:'adquirente credenciadora intermediadora bandeira emissor autorizacao processamento repasse'},
  {cat:'adquirencia', q:'O que é o MDR e por que a taxa varia?',
   a:'MDR (Merchant Discount Rate) é o percentual cobrado sobre cada transação de crédito/débito, referente a processamento, captura e liquidação. Varia conforme a bandeira (Visa, Mastercard, Elo etc.), o tipo de transação (débito, crédito à vista ou parcelado) e as condições comerciais negociadas com a Redeflex.',
   doc:DOCS.adq, kw:'mdr merchant discount rate taxa bandeira credito debito parcelado condicoes comerciais'},
  {cat:'adquirencia', q:'Como funcionam débito, crédito à vista e parcelado?',
   a:'Débito: valor debitado na hora e liquidado no próximo dia útil (recebimento mais rápido). Crédito à vista: pagamento ao estabelecimento em até 30 dias, ou conforme acordo. Crédito parcelado: até 12x conforme bandeira/condições, com repasse mês a mês conforme as parcelas são cobradas do cliente.',
   doc:DOCS.adq, kw:'debito credito vista parcelado liquidacao 30 dias 12x repasse modalidade'},
  {cat:'adquirencia', q:'Parcelado com e sem juros — qual a diferença?',
   a:'Sem juros: o estabelecimento assume a taxa da operação e o cliente paga parcelas iguais. Com juros: os encargos são definidos pelo banco emissor e pagos pelo cliente, e o estabelecimento recebe o valor integral, como num crédito à vista. A Redeflex não controla nem tem acesso à taxa de juros/valor das parcelas no parcelado com juros — isso é do emissor.',
   doc:DOCS.adq, kw:'parcelado com sem juros emissor encargos estabelecimento taxa integral cliente'},
  {cat:'adquirencia', q:'Antecipação de recebíveis e RAV',
   a:'É possível antecipar recebíveis do crédito parcelado. A RAV (Antecipação Automática) antecipa os valores das vendas parceladas com crédito em conta no próximo dia útil, mediante uma taxa por parcela antecipada, previamente acordada. A taxa de antecipação pode ser consultada no Portal do Cliente (menu Meu Plano) ou pela Central 0800 647 0002.',
   doc:DOCS.adq, kw:'antecipacao recebiveis rav automatica parcelas taxa proximo dia util meu plano'},
  {cat:'adquirencia', q:'Recebimento das vendas e conta bancária',
   a:'Os valores caem automaticamente na conta informada no credenciamento, desde que os dados estejam corretos. A conta deve ser válida, ativa e vinculada ao mesmo CPF/CNPJ da proposta. Conta salário não é aceita; conta conjunta só se o titular principal for o mesmo CPF. Conta incorreta/ inválida impede o repasse até a regularização cadastral.',
   doc:DOCS.adq, kw:'recebimento conta bancaria cpf cnpj salario conjunta repasse credenciamento titularidade'},
  {cat:'adquirencia', q:'Horários de crédito e vendas via PIX',
   a:'Débito/crédito dependem do fluxo de liberação do banco domicílio; recomenda-se aguardar até as 18h (horário local) para confirmar o valor em conta. Não creditou até as 18h? Acione a Central Redeflex. PIX: a maquininha gera QR Code e o recebimento é imediato, com crédito na conta cadastrada.',
   doc:DOCS.adq, kw:'horario credito 18h banco domicilio pix qr code imediato recebimento'},
  {cat:'adquirencia', q:'Vouchers, aluguel da maquininha e estorno',
   a:'Vouchers (alimentação/refeição) são exclusivos para PJ e credenciados direto com a empresa do voucher (Alelo, Sodexo, Ticket etc.) — a Redeflex não credencia esses produtos. As maquininhas têm aluguel mensal (varia por modelo/condições; pode haver isenção por faturamento ou acordo), consultável em Meu Plano. Estorno: direto na maquininha no mesmo dia da venda; após isso, via Central 0800 647 0002.',
   doc:DOCS.adq, kw:'voucher pj alelo sodexo ticket aluguel mensal isencao meu plano estorno cancelamento'},
  {cat:'adquirencia', q:'POS adicional e reativação (recredenciamento)',
   a:'POS adicional: solicite à Central um ID de Terminal (Número Lógico); criado o ID, o novo POS é credenciado ao mesmo estabelecimento, operando de forma independente porém vinculado ao mesmo cadastro. Reativação (estabelecimento inativo): valide com a Central, suba nova proposta no Intraflex com tipo de cliente ADQ e notifique a OPCOM (opcom@redeflex.com.br); após a liberação, o time faz os ajustes e confirma para novo credenciamento.',
   doc:DOCS.adq, kw:'pos adicional id terminal numero logico reativacao recredenciamento intraflex adq opcom inativo'},

  /* ===================== PORTAL & APP ===================== */
  {cat:'portal', q:'Como acessar o Portal e recuperar a senha?',
   a:'O Portal fica em portal.solverpag.com.br. Login e senha são enviados automaticamente para o e-mail cadastrado no lançamento da proposta. Não recebeu? Confirme o e-mail no sistema e a caixa de spam; use "Esqueci minha senha", informe e-mail e CPF/CNPJ para gerar uma nova (depois pode trocar por uma de preferência no perfil).',
   doc:DOCS.duvidas, portal:'https://portal.solverpag.com.br/', kw:'portal solverpag acesso login senha esqueci email cpf cnpj credenciais spam link'},
  {cat:'portal', q:'Consultar vendas, pagamentos, dados e taxas no Portal',
   a:'Vendas: aba "Vendas" (canto superior esquerdo), com filtros de data. Pagamentos: aba "Pagamentos", por calendário ou período (conciliação). Dados cadastrais/bancários/endereço: ícone ao lado do nome fantasia > Meu Perfil. Taxas (MDR e PIX por bandeira): ícone Redeflex > Meu Plano. Alterar senha: Meu Perfil > Alterar Senha (5 dígitos).',
   doc:DOCS.duvidas, sim:true, kw:'portal vendas pagamentos conciliacao dados cadastrais meu perfil taxas mdr pix meu plano senha simulador tutorial'},
  {cat:'portal', q:'App Redeflex — primeiro acesso e uso',
   a:'No app, use "Primeiro Acesso" e responda as perguntas de autenticação de segurança (depois elas não aparecem mais). Movimentações (vendas, pagamentos, taxas) ficam na aba VendasADQ — se não aparecer, acione a Central. Download: buscar "Redeflex" na loja (iOS/Android). O app é de uso em 1 dispositivo apenas (segurança) e mostra a movimentação em tempo real.',
   doc:DOCS.duvidas, kw:'app appflex primeiro acesso vendasadq download ios android um dispositivo tempo real cms'},

  /* ===================== EQUIPAMENTOS & OPERAÇÃO ===================== */
  {cat:'equipamentos', q:'Quais são os modelos: DX8000 e MOVE5000?',
   a:'DX8000: terminal Android moderno, interface intuitiva e navegação simplificada, ideal para quem quer agilidade e uma experiência mais tecnológica. MOVE5000: terminal legado com teclado físico, operação simples e rápida, para quem prefere o modelo clássico. Ambos oferecem conexões Wi-Fi, chip de dados e cabeada, e aceitam débito, crédito à vista, parcelado e PIX.',
   doc:DOCS.duvidas, kw:'modelos dx8000 move5000 android teclado fisico conexao wifi chip pagamento'},
  {cat:'equipamentos', q:'Como vender (débito/crédito e PIX) no terminal?',
   a:'Débito/crédito: MENU > PAGAMENTOS > escolha a modalidade > INSERIR O VALOR > CONFIRMAR. PIX: MENU > PIX > INSERIR O VALOR > CONFIRMAR (gera o QR Code).',
   doc:DOCS.duvidas, kw:'venda debito credito pix menu pagamentos inserir valor confirmar qr code passo a passo'},
  {cat:'equipamentos', q:'Reimpressão, relatórios e estorno na maquininha',
   a:'2ª via débito/crédito: MENU > REIMPRESSÃO > via do cliente ou do estabelecimento. 2ª via PIX: MENU > PIX > REIMPRESSÃO > CONFIRMAR. Relatório de vendas: MENU > RELATÓRIO. Relatório PIX: MENU > PIX > RELATÓRIO PIX. Estorno: MENU > ESTORNO > senha de segurança 123456 > aproxime/insira o cartão da venda > selecione o valor > CONFIRMAR.',
   doc:DOCS.duvidas, kw:'reimpressao segunda via relatorio estorno menu senha 123456 pix comprovante'},
  {cat:'equipamentos', q:'Configurar Wi-Fi, testar conexão e inicializar o POS',
   a:'Informações do terminal: MENU > CONFIGURAR > INFORMAÇÕES. Wi-Fi: MENU > CONFIGURAR > CONFIGURAR CONEXÃO > escolha a rede > senha > CONFIRMAR. Teste de conexão: MENU > CONFIGURAR > TESTE DE CONEXÃO > IMPRIMIR. Inicialização/atualização de tabelas: MENU > CONFIGURAR > (senha informada pela Central) > CONFIRMAR.',
   doc:DOCS.duvidas, kw:'configurar wifi conexao teste inicializacao tabelas menu informacoes imprimir senha central'},
  {cat:'equipamentos', q:'Onde busco suporte se enfrentar erros?',
   a:'Em erros do dia a dia, acione o suporte Redeflex para análise e resolução: 0800 647 0002. O atendimento também é feito por WhatsApp, que costuma ser mais acessível, pelo mesmo número.',
   doc:DOCS.duvidas, kw:'suporte erro central atendimento 0800 647 0002 whatsapp'},
];

/* ============================================================
   MENSAGERIA TRANSACIONAL — códigos de retorno da FIS.
   type: 'ok' (aprovada) | 'card' (central do cartão) | 'int' (tratativa interna)
   ============================================================ */
const MSG_CODES = [
  {c:'00', type:'ok',   d:'Transação processada e autorizada pela FIS.', t:'APROVADA — nenhuma ação necessária.'},
  {c:'01', type:'card', d:'O emissor solicita validação adicional da transação.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'02', type:'card', d:'O emissor não autorizou a transação.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'03', type:'int',  d:'Estabelecimento não reconhecido ou não habilitado para transacionar.', t:'Verificar o status do cadastro do estabelecimento e certificar que está ativo; acionar a central Redeflex para avaliar o status.'},
  {c:'04', type:'card', d:'Transação sem garantia de pagamento conforme regras do emissor.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'05', type:'card', d:'Transação não permitida para o cartão utilizado.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'06', type:'card', d:'Falha transacional durante o processamento.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'07', type:'card', d:'Transação não permitida para o cartão.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'08', type:'card', d:'Transação não permitida conforme política do emissor.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'09', type:'int',  d:'Erro transacional identificado pela FIS.', t:'Verificar o emissor do cartão e conferir as tabelas das bandeiras parametrizadas no TMS7.'},
  {c:'10', type:'int',  d:'Erro durante o processamento da transação.', t:'Verificar a conexão do POS e a parametrização no TMS7; reinicializar o POS e refazer um teste.'},
  {c:'11', type:'int',  d:'Falha sistêmica na autorização da transação.', t:'Verificar a conexão do POS e a parametrização no TMS7; reinicializar o POS e refazer um teste.'},
  {c:'12', type:'ok',   d:'Transação aprovada parcialmente pelo emissor.', t:'APROVADA — confirmar a aprovação.'},
  {c:'13', type:'card', d:'Erro identificado no cartão utilizado.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'14', type:'int',  d:'Valor informado não permitido para a transação.', t:'Refazer com valor superior a R$ 0,10. Obs.: alguns emissores não autorizam valor inferior a R$ 0,10 (ex.: Mercado Pago).'},
  {c:'15', type:'card', d:'Cartão inválido ou não reconhecido pelo emissor.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'16', type:'card', d:'Cartão inválido para processamento da transação.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'17', type:'card', d:'Transação aprovada parcialmente com restrições.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'18', type:'card', d:'Data capturada inválida para processamento.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'19', type:'card', d:'Transação cancelada pelo usuário.', t:'Orientar o cliente a acionar a central do cartão — a transação foi cancelada.'},
  {c:'20', type:'card', d:'Erro identificado no cartão durante a transação.', t:'Orientar o cliente a acionar a central do cartão.'},
  {c:'21', type:'card', d:'Conta de origem inexistente ou inválida.', t:'Acionar a central do cartão para verificar a situação da conta.'},
  {c:'22', type:'card', d:'Conta de origem inexistente ou inválida.', t:'Acionar a central do cartão para verificar a situação da conta.'},
  {c:'23', type:'card', d:'Conta corrente inexistente ou inválida.', t:'Acionar a central do cartão para verificar a conta corrente.'},
  {c:'24', type:'card', d:'Parcelamento inválido para a transação.', t:'Acionar a central do cartão para verificar a modalidade de parcelamento e a disponibilidade.'},
  {c:'25', type:'card', d:'Conta de crédito inexistente ou inválida.', t:'Acionar a central do cartão para verificar a conta de crédito.'},
  {c:'30', type:'int',  d:'Estorno ou desfazimento parcial identificado.', t:'Verificar no sistema de gestão se há estorno/desfazimento vinculado ao cartão.'},
  {c:'38', type:'card', d:'Erro transacional retornado pelo emissor.', t:'Acionar a central do cartão para verificar a conta corrente.'},
  {c:'39', type:'card', d:'Excedido o número de tentativas de senha.', t:'Acionar a central do cartão para verificar a situação da conta.'},
  {c:'41', type:'card', d:'Transação não permitida conforme regras do emissor.', t:'Acionar a central do cartão para verificar a conta corrente.'},
  {c:'42', type:'card', d:'Cartão bloqueado pelo emissor.', t:'Acionar a central do cartão para verificar a situação do cartão usado na tentativa.'},
  {c:'43', type:'card', d:'Cartão reportado como perdido.', t:'Acionar a central do cartão para verificação.'},
  {c:'44', type:'int',  d:'Transação não permitida para o cartão.', t:'Verificar modalidade e valor via gestão e as parametrizações de bandeira no TMS7; persistindo, orientar o cliente a acionar a central do cartão.'},
  {c:'46', type:'card', d:'Transação não permitida conforme regras do cartão.', t:'Acionar a central do cartão para verificar a conta corrente.'},
  {c:'50', type:'card', d:'Falha de autorização retornada pelo emissor.', t:'Acionar a central do cartão para verificar a conta corrente.'},
  {c:'51', type:'card', d:'Saldo insuficiente para realizar a transação.', t:'Orientar o cliente a verificar se há saldo igual/superior ao valor da transação.'},
  {c:'54', type:'card', d:'Cartão expirado ou fora da validade.', t:'Acionar a central do cartão e verificar os dados e o status do cartão.'},
  {c:'55', type:'card', d:'Senha informada incorretamente.', t:'A transação não foi aprovada pela senha incorreta; refazer e inserir a senha correta.'},
  {c:'62', type:'card', d:'Restrição no cartão utilizado.', t:'Acionar a central do cartão e verificar os dados e o status do cartão.'},
];

/* ============================================================
   DOCUMENTOS OFICIAIS — fonte completa (consulta).
   ============================================================ */
const DOC_LIST = [
  {nome:'Credenciamento de Terminais — DX8000 (v1.56.11)', desc:'Fluxo via middleware: proposta, Intraflex, SGV, disponibilidade do terminal e tratativas.', url:DOCS.dx8000, tag:'DX8000'},
  {nome:'FAQ — Adquirência & Serviços', desc:'Adquirência, MDR, modalidades, antecipação, recebimentos, vouchers, aluguel e fluxos.', url:DOCS.adq, tag:'Adquirência'},
  {nome:'Erros POS & Mensageria Transacional', desc:'Mensagens do terminal, erros PIX e os códigos de retorno da FIS.', url:DOCS.erros, tag:'Erros'},
  {nome:'Orientações Gerais (Portal, App e Equipamentos)', desc:'Acesso ao portal/app, operação do terminal, reimpressão, estorno e configuração.', url:DOCS.duvidas, tag:'Geral'},
];

/* ---------- utils ---------- */
const norm = s => s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const esc  = s => s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const highlight = (text, term) => {
  if(!term) return esc(text);
  const t = norm(term);
  let out='', i=0; const low=norm(text);
  while(i<text.length){
    const idx = low.indexOf(t, i);
    if(idx<0){ out+=esc(text.slice(i)); break; }
    out += esc(text.slice(i,idx)) + '<mark>' + esc(text.slice(idx,idx+t.length)) + '</mark>';
    i = idx+t.length;
  }
  return out;
};

/* ---------- estado ---------- */
let activeCat = null;   // categoria selecionada
let term = '';          // termo de busca

const elFaq = document.getElementById('faq');
const elEmpty = document.getElementById('faqEmpty');
const elCount = document.getElementById('qCount');
const elSub = document.getElementById('faqSubtitle');

/* ---------- contadores das categorias ---------- */
Object.keys(CAT_LABEL).forEach(c=>{
  const n = FAQ.filter(f=>f.cat===c).length;
  const tgt = document.querySelector(`[data-count="${c}"]`);
  if(tgt) tgt.textContent = n + (n===1?' artigo':' artigos');
});

/* ---------- render da FAQ ---------- */
function render(){
  const list = FAQ.filter(f=>{
    if(activeCat && f.cat!==activeCat) return false;
    if(!term) return true;
    const t = norm(term);
    return norm(f.q).includes(t) || norm(f.a).includes(t) || norm(f.kw).includes(t);
  });

  // subtítulo
  elSub.textContent = activeCat ? CAT_LABEL[activeCat] : 'Todas as categorias';

  // contador de busca
  if(term){
    elCount.innerHTML = list.length
      ? `<b>${list.length}</b> resultado${list.length>1?'s':''} para “${esc(term)}”`
      : `Nenhum resultado para “${esc(term)}”`;
  } else { elCount.textContent=''; }

  // vazio
  if(!list.length){
    elFaq.innerHTML='';
    document.getElementById('emptyTerm').textContent = term || (activeCat?CAT_LABEL[activeCat]:'');
    elEmpty.classList.add('is-on');
    return;
  }
  elEmpty.classList.remove('is-on');

  // agrupa por categoria
  const groups = {};
  list.forEach(f=>{ (groups[f.cat] ||= []).push(f); });

  let html='';
  Object.keys(groups).forEach(cat=>{
    if(!activeCat) html += `<div class="faq__group-label">${CAT_LABEL[cat]}</div>`;
    groups[cat].forEach((f)=>{
      const id = 'qa-'+Math.random().toString(36).slice(2,8);
      html += `
        <div class="qa" data-cat="${f.cat}">
          <button class="qa__btn" aria-expanded="false" aria-controls="${id}">
            <span>${highlight(f.q, term)}</span>
            <span class="qa__plus" aria-hidden="true">+</span>
          </button>
          <div class="qa__panel"><div class="qa__panel-inner"><div class="qa__body" id="${id}">
            ${highlight(f.a, term)}
            <div class="qa__actions">
              <a class="qa__doc" href="${f.doc}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Abrir documento oficial
              </a>
              ${f.fluxo ? `<button type="button" class="qa__flow-btn" data-flow="1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/></svg>
                Ver fluxo do credenciamento
              </button>` : ''}
              ${f.portal ? `<a class="qa__portal-btn" href="${f.portal}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                Acessar o Portal
              </a>` : ''}
              ${f.sim ? `<button type="button" class="qa__flow-btn" data-sim="1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/></svg>
                Abrir simulador do Portal
              </button>` : ''}
            </div>
            <div class="qa__useful">
              <span>Esta resposta foi útil?</span>
              <button type="button" data-v="1">Sim</button>
              <button type="button" data-v="0">Não</button>
              <span class="qa__useful-thanks">Obrigado pelo retorno!</span>
            </div>
          </div></div></div>
        </div>`;
    });
  });
  elFaq.innerHTML = html;
}

/* ---------- accordion + feedback (delegação) ---------- */
elFaq.addEventListener('click', e=>{
  const btn = e.target.closest('.qa__btn');
  if(btn){
    const qa = btn.closest('.qa');
    const open = qa.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open?'true':'false');
    return;
  }
  const flow = e.target.closest('.qa__flow-btn');
  if(flow){ if(flow.dataset.sim) openSim(); else openFlow(); return; }
  const fb = e.target.closest('.qa__useful button');
  if(fb){ fb.closest('.qa__useful').dataset.done='1'; }
});

/* ---------- busca ---------- */
const input = document.getElementById('q');
let deb;
input.addEventListener('input', ()=>{
  clearTimeout(deb);
  deb = setTimeout(()=>{ term = input.value; render(); }, 120);
});
document.getElementById('qBtn').addEventListener('click', ()=>{
  term = input.value; render();
  document.getElementById('perguntas').scrollIntoView({behavior:'smooth'});
});
input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); document.getElementById('qBtn').click(); }});

/* ---------- chips populares ---------- */
document.querySelectorAll('.chip').forEach(c=>{
  c.addEventListener('click', ()=>{
    input.value = c.dataset.q; term = c.dataset.q; activeCat=null;
    document.querySelectorAll('.cat').forEach(x=>x.classList.remove('is-active'));
    render();
    document.getElementById('perguntas').scrollIntoView({behavior:'smooth'});
  });
});

/* ---------- categorias ---------- */
document.querySelectorAll('.cat').forEach(cat=>{
  cat.addEventListener('click', ()=>{
    const c = cat.dataset.cat;
    if(activeCat===c){ activeCat=null; cat.classList.remove('is-active'); }
    else {
      activeCat=c;
      document.querySelectorAll('.cat').forEach(x=>x.classList.toggle('is-active', x===cat));
    }
    render();
    document.getElementById('perguntas').scrollIntoView({behavior:'smooth'});
    if(c==='dx8000') openFlow();
    if(c==='portal') openSim();
  });
});

/* ============================================================
   VÍDEOS — base única por modelo. Para adicionar, inclua um item
   com o "yt" = ID do vídeo do YouTube. Sem "yt" vira placeholder.
   ============================================================ */
/* ════════════════════════════════════════════════════════════
   ►►►  VÍDEOS DO DX8000 — ADICIONE / EDITE AQUI  ◄◄◄
   Para cada vídeo, preencha os 3 campos:
     yt    = ID do vídeo no YouTube (o trecho depois de "v=" na URL).
             Ex.: https://www.youtube.com/watch?v=ABC123xyz  →  yt:'ABC123xyz'
     title = título que aparece no card
     desc  = descrição curta
   Enquanto "yt" estiver como null, o card aparece como "Vídeo em breve".
   Para incluir mais vídeos, é só copiar uma linha e colar abaixo.
   ════════════════════════════════════════════════════════════ */
const VIDEOS_DX8000 = [
  { yt:null, title:'Credenciamento via Middleware · DX8000',       desc:'Novo fluxo da versão v1.56.11.' },
  { yt:null, title:'Erro "máquina já alocada" · tratativa', desc:'Identificação e encaminhamento.' },
  // { yt:'COLE_O_ID_AQUI', title:'Título do vídeo', desc:'Descrição curta.' },
];

/* Vídeos do MOVE5000 (mesmo formato do bloco acima) */
const VIDEOS_MOVE5000 = [
  { yt:'wUWJWiLE_sc', title:'Instalação do pacote · Pen drive', desc:'Passo a passo de instalação no terminal.' },
  { yt:'nPQlx7qiykM', title:'Credenciamento do terminal',        desc:'Como habilitar a maquininha do zero.' },
];

const VIDEO_MODELS = ['MOVE5000','DX8000'];
const VIDEOS = [
  ...VIDEOS_MOVE5000.map(v => ({ ...v, model:'MOVE5000' })),
  ...VIDEOS_DX8000.map(v  => ({ ...v, model:'DX8000'  })),
];

const elVideos = document.getElementById('videos');

function renderVideos(filter='todos'){
  let html='';
  VIDEO_MODELS.forEach(model=>{
    if(filter!=='todos' && filter!==model) return;
    const items = VIDEOS.filter(v=>v.model===model);
    if(!items.length) return;
    html += `<div class="video__group-label">${model}</div><div class="videos">`;
    items.forEach((v,i)=>{
      if(v.yt){
        const vid = `vd-${model}-${i}`;
        html += `
          <article class="video-card">
            <div class="video-card__player" id="${vid}">
              <button class="video-card__thumb" type="button"
                data-embed="https://www.youtube.com/embed/${v.yt}?autoplay=1" data-target="${vid}"
                style="background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1)),url('https://img.youtube.com/vi/${v.yt}/hqdefault.jpg')"
                aria-label="Reproduzir: ${esc(v.title)}">
                <span class="video-card__play"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg></span>
              </button>
            </div>
            <div class="video-card__body">
              <span class="video-card__tag">${model}</span>
              <h3>${esc(v.title)}</h3><p>${esc(v.desc)}</p>
            </div>
          </article>`;
      } else {
        html += `
          <article class="video-card video-card--empty">
            <div class="video-card__player"><span>Vídeo em breve</span></div>
            <div class="video-card__body">
              <span class="video-card__tag">${model}</span>
              <h3>${esc(v.title)}</h3><p>${esc(v.desc)}</p>
            </div>
          </article>`;
      }
    });
    html += `</div>`;
  });
  elVideos.innerHTML = html;
}

// play (delegação)
elVideos.addEventListener('click', e=>{
  const t = e.target.closest('.video-card__thumb');
  if(!t) return;
  document.getElementById(t.dataset.target).innerHTML =
    `<iframe class="video-card__iframe" src="${t.dataset.embed}" title="Manual em vídeo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
});

// abas de modelo
document.querySelectorAll('.vtab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.vtab').forEach(x=>{
      const on = x===tab;
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-selected', on?'true':'false');
    });
    renderVideos(tab.dataset.model);
  });
});
renderVideos('todos');

/* ============================================================
   AGENTE OPCOM
   Por padrão roda 100% no navegador, fundamentado na base de
   conhecimento abaixo (FAQ + trechos do manual DX8000). Recupera
   o trecho mais relevante e responde citando a seção de origem.

   ── Para virar um LLM de verdade (interpreta texto livre): ──
   ligue AGENT.useLLM = true e aponte AGENT.endpoint para o SEU
   backend. NUNCA coloque a API key aqui no front — ela ficaria
   exposta. O endpoint deve ser um proxy no servidor que recebe
   {question, context} e chama o modelo (Claude/OpenAI) com a key
   guardada no servidor, retornando { answer: "..." }.
   ============================================================ */
const AGENT = {
  useLLM:false,
  endpoint:'/api/assistente-opcom',
  systemHint:'Você é o agente da central OPCOM da Redeflex. Responda só com base no contexto fornecido (manual DX8000 e FAQ). Se não houver base, oriente a falar com o suporte.'
};

// Fatos operacionais de referência rápida (complementam a FAQ no agente)
const MANUAL_DX8000 = [
  {title:'Contatos do suporte', link:DOCS.adq,
   text:'Suporte / Central de Atendimento Redeflex: 0800 647 0002 (também atende por WhatsApp no mesmo número). E-mail da OPCOM: opcom@redeflex.com.br. Portal do Cliente: https://portal.solverpag.com.br/.',
   kw:'suporte central atendimento telefone 0800 647 0002 whatsapp opcom email portal contato'},
  {title:'Senhas operacionais do terminal', link:DOCS.duvidas,
   text:'Estorno na maquininha: senha de segurança 123456. Limpeza de cache/armazenamento via Android: senha 350000 (Configurações > Apps > Redeflex > Armazenamento e Cache). Inicialização/atualização de tabelas: a senha é informada pela Central de Atendimento.',
   kw:'senha estorno 123456 limpeza android 350000 inicializacao tabelas terminal configuracoes'},
  {title:'Para quem encaminhar (DX8000)', link:DOCS.dx8000,
   text:'Status divergente da proposta: área de cadastro. Divergência proposta x Intraflex: OPCOM (update via banco). Duplicidade/inatividade no SGV: OPCOM. Erro "máquina já alocada": OPCOM (validação no middleware). Parâmetro/cartão inválido (arranjos de bandeira no TMS7 pendentes): OPCOM.',
   kw:'encaminhar area cadastro opcom divergencia sgv maquina alocada middleware tms7 arranjos bandeira'}
];

// Base de conhecimento = FAQ (já fundamentada) + trechos do manual
const KNOWLEDGE = [
  ...FAQ.map(f=>({title:f.q, text:f.a, link:f.doc, kw:f.kw})),
  ...MANUAL_DX8000
];

const STOP = new Set(['como','qual','para','com','dos','das','que','uma','que','sobre','pelo','pela','meu','minha','onde','quais','tem','faco','fazer','devo','preciso','isso','esse','essa','está','esta','não','sim']);

function retrieve(question, n=2){
  const qTokens = norm(question).split(/\W+/).filter(w=>w.length>2 && !STOP.has(w));
  const scored = KNOWLEDGE.map(k=>{
    const hay = norm(k.title+' '+k.text+' '+k.kw);
    let s = 0;
    qTokens.forEach(w=>{ if(hay.includes(w)) s++; });
    return {k, s};
  }).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);
  return scored.slice(0,n);
}

const chat = document.getElementById('chat');
const msgs = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');

document.getElementById('chatToggle').addEventListener('click', ()=>{
  const open = chat.classList.toggle('is-open');
  if(open) chatInput.focus();
});
document.getElementById('chatClose').addEventListener('click', ()=> chat.classList.remove('is-open'));

function addMsg(html, from='bot'){
  const d=document.createElement('div');
  d.className='msg msg--'+from; d.innerHTML=html;
  msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
  return d;
}
function typing(on){
  let t = document.getElementById('typing');
  if(on && !t){ t=addMsg('<span style="opacity:.6">digitando…</span>'); t.id='typing'; }
  if(!on && t){ t.remove(); }
}

function answerLocal(question){
  const hits = retrieve(question, 2);
  if(!hits.length){
    addMsg('Não encontrei essa dúvida no manual nem na FAQ. Tente termos como <b>credenciamento</b>, <b>Intraflex</b>, <b>SGV</b>, <b>máquina já alocada</b> ou <b>pen drive</b> — ou <a href="https://wa.me/5508006470002" target="_blank" rel="noopener noreferrer">fale com o suporte</a>.');
    return;
  }
  const top = hits[0].k;
  let html = esc(top.text);
  if(top.link && !top.link.startsWith('#')){
    html += `<br><a href="${top.link}" target="_blank" rel="noopener noreferrer">Abrir conteúdo relacionado</a>`;
  }
  html += `<br><span style="font-size:12px;opacity:.6">Fonte: ${esc(top.title)}</span>`;
  if(hits[1]){
    html += `<br><span style="font-size:12px;opacity:.6">Veja também: ${esc(hits[1].k.title)}</span>`;
  }
  addMsg(html);
}

async function askAgent(question){
  typing(true);
  if(AGENT.useLLM){
    try{
      const r = await fetch(AGENT.endpoint, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          question,
          system: AGENT.systemHint,
          context: KNOWLEDGE.map(k=>`# ${k.title}\n${k.text}`).join('\n\n')
        })
      });
      const data = await r.json();
      typing(false);
      addMsg(data && data.answer ? esc(data.answer) : 'Não consegui responder agora. Tente novamente ou fale com o suporte.');
    }catch(err){
      typing(false);
      addMsg('Não consegui falar com o agente agora. Use a busca acima ou <a href="https://wa.me/5508006470002" target="_blank" rel="noopener noreferrer">fale com o suporte</a>.');
    }
    return;
  }
  // modo local (sem backend)
  setTimeout(()=>{ typing(false); answerLocal(question); }, 320);
}

document.getElementById('chatForm').addEventListener('submit', e=>{
  e.preventDefault();
  const v = chatInput.value.trim(); if(!v) return;
  addMsg(esc(v),'user'); chatInput.value='';
  askAgent(v);
});

// sugestões (uma de cada tema, incluindo DX8000)
const chips = document.getElementById('chatChips');
[
  'O que é o erro "máquina já alocada"?',
  'O que significa o erro NO SERVICE?',
  'O que é MDR e por que a taxa varia?',
  'Como o cliente acessa o Portal?',
  'Qual o telefone do suporte?'
].forEach(q=>{
  const b=document.createElement('button'); b.type='button'; b.textContent=q;
  b.addEventListener('click', ()=>{ addMsg(esc(q),'user'); askAgent(q); });
  chips.appendChild(b);
});
addMsg('Olá! Sou o agente da OPCOM. Respondo com base nos documentos oficiais (DX8000, Adquirência, Erros e Mensageria) e na FAQ. Escolha uma sugestão ou digite sua dúvida.');

/* ---------- primeira renderização ---------- */
render();

/* ============================================================
   POP-UP: FLUXO DE CREDENCIAMENTO DX8000 (animado)
   ============================================================ */
const flowOverlay = document.getElementById('flowOverlay');
const flowSvg     = document.getElementById('flowSvg');
const flowPath    = document.getElementById('flowPath');
const flowDot     = document.getElementById('flowDot');
const flowSuccess = document.getElementById('flowSuccess');
let flowTimers = [];

// pontos de "chegada" do pacote em cada nó (x,y no viewBox) + qual nó acende
const FLOW_POINTS = [
  {at:0.00, node:1, step:1},  // POS
  {at:0.27, node:2, step:2},  // Middleware
  {at:0.50, node:3, step:3},  // Alocação
  {at:0.62, node:4, step:4},  // TMS7
  {at:0.80, node:5, step:5},  // Gestão Solver
  {at:1.00, node:1, step:6},  // volta ao POS -> sucesso
];

function clearFlow(){
  flowTimers.forEach(t=>clearTimeout(t)); flowTimers = [];
  flowSvg.querySelectorAll('.flow-node').forEach(n=>n.classList.remove('on'));
  document.querySelectorAll('#flowSteps li').forEach(li=>li.classList.remove('on'));
  flowSuccess.classList.remove('show');
  flowDot.classList.remove('run');
}

function runFlow(){
  clearFlow();
  const len = flowPath.getTotalLength();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // posiciona o ponto no início
  const p0 = flowPath.getPointAtLength(0);
  flowDot.setAttribute('cx', p0.x); flowDot.setAttribute('cy', p0.y);
  flowDot.classList.add('run');

  const STEP_MS = reduce ? 0 : 900;

  FLOW_POINTS.forEach((pt, i)=>{
    flowTimers.push(setTimeout(()=>{
      // acende nó e passo
      flowSvg.querySelector(`.flow-node[data-step="${pt.node}"]`)?.classList.add('on');
      document.querySelector(`#flowSteps li[data-step="${pt.step}"]`)?.classList.add('on');

      // anima o pacote do ponto anterior até o atual
      if(i>0 && !reduce){
        const from = FLOW_POINTS[i-1].at * len;
        const to   = pt.at * len;
        const dur  = STEP_MS - 120;
        const t0   = performance.now();
        const tick = (now)=>{
          const k = Math.min(1, (now - t0)/dur);
          const e = k<.5 ? 2*k*k : -1+(4-2*k)*k; // easeInOut
          const pos = flowPath.getPointAtLength(from + (to-from)*e);
          flowDot.setAttribute('cx', pos.x); flowDot.setAttribute('cy', pos.y);
          if(k<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }

      // último passo: mostra selo de sucesso e some com o pacote
      if(i === FLOW_POINTS.length-1){
        flowTimers.push(setTimeout(()=>{
          flowSuccess.classList.add('show');
          flowDot.classList.remove('run');
        }, reduce?0:500));
      }
    }, i*STEP_MS));
  });
}

function openFlow(){
  flowOverlay.hidden = false;
  // espera o layout para medir o path corretamente
  requestAnimationFrame(()=> setTimeout(runFlow, 60));
}
function closeFlow(){
  clearFlow();
  flowOverlay.hidden = true;
}

document.getElementById('flowClose').addEventListener('click', closeFlow);
document.getElementById('flowReplay').addEventListener('click', runFlow);
flowOverlay.addEventListener('click', e=>{ if(e.target===flowOverlay) closeFlow(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !flowOverlay.hidden) closeFlow(); });

/* ============================================================
   MENSAGERIA — render da tabela + filtro
   ============================================================ */
const msgBody   = document.getElementById('msgBody');
const msgEmpty  = document.getElementById('msgEmpty');
const msgFilter = document.getElementById('msgFilter');
const TYPE_LABEL = {ok:'Aprovada', card:'Central do cartão', int:'Tratativa interna'};

function renderMsg(filter=''){
  const f = norm(filter);
  const rows = MSG_CODES.filter(m=>{
    if(!f) return true;
    return norm(`${m.c} ${m.d} ${m.t} ${TYPE_LABEL[m.type]}`).includes(f);
  });
  msgEmpty.hidden = rows.length>0;
  msgBody.innerHTML = rows.map(m=>`
    <tr class="mrow mrow--${m.type}">
      <td class="mrow__code"><span class="mcode">${m.c}</span></td>
      <td class="mrow__d">${esc(m.d)}<span class="mrow__tag mtag mtag--${m.type}">${TYPE_LABEL[m.type]}</span></td>
      <td class="mrow__t">${esc(m.t)}</td>
    </tr>`).join('');
}
if(msgFilter){
  let dm; msgFilter.addEventListener('input', ()=>{ clearTimeout(dm); dm=setTimeout(()=>renderMsg(msgFilter.value),100); });
}
renderMsg();

/* ============================================================
   DOCUMENTOS — render dos cards
   ============================================================ */
const elDocs = document.getElementById('docs');
if(elDocs){
  const portalCard = `
    <a class="doc-card doc-card--portal" href="https://portal.solverpag.com.br/" target="_blank" rel="noopener noreferrer">
      <span class="doc-card__ico doc-card__ico--portal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></span>
      <span class="doc-card__tag doc-card__tag--portal">Portal</span>
      <h3>Acessar o Portal do Cliente</h3>
      <p>portal.solverpag.com.br — consulta de vendas, pagamentos, taxas e antecipação.</p>
      <span class="doc-card__cta doc-card__cta--portal">Abrir portal →</span>
    </a>`;
  elDocs.innerHTML = portalCard + DOC_LIST.map(d=>`
    <a class="doc-card" href="${d.url}" target="_blank" rel="noopener noreferrer">
      <span class="doc-card__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
      <span class="doc-card__tag">${esc(d.tag)}</span>
      <h3>${esc(d.nome)}</h3>
      <p>${esc(d.desc)}</p>
      <span class="doc-card__cta">Abrir PDF →</span>
    </a>`).join('');
}

/* ============================================================
   NAVBAR — atalhos, busca expansível e menu mobile
   ============================================================ */
const topnav      = document.getElementById('topnav');
const navSearchBtn= document.getElementById('navSearchBtn');
const navSearch   = document.getElementById('navSearch');
const navSearchIn = document.getElementById('navSearchInput');
const navSearchX  = document.getElementById('navSearchClose');
const navBurger   = document.getElementById('navBurger');

// links de categoria na nav → filtram a FAQ (reusa activeCat/render)
topnav.querySelectorAll('.topnav__link[data-cat]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const c = a.dataset.cat;
    activeCat = c;
    document.querySelectorAll('.cat').forEach(x=>x.classList.toggle('is-active', x.dataset.cat===c));
    render();
    closeMobileNav();
    document.getElementById('perguntas').scrollIntoView({behavior:'smooth'});
    if(c==='dx8000') openFlow();
    if(c==='portal') openSim();
  });
});
// âncoras simples (Mensageria, Documentos, etc.) fecham o menu mobile
topnav.querySelectorAll('.topnav__link:not([data-cat])').forEach(a=>{
  a.addEventListener('click', closeMobileNav);
});

// busca da nav espelha a busca do hero
function openNavSearch(){
  navSearch.hidden = false;
  navSearchBtn.setAttribute('aria-expanded','true');
  navSearchIn.focus();
}
function closeNavSearch(){
  navSearch.hidden = true;
  navSearchBtn.setAttribute('aria-expanded','false');
}
navSearchBtn.addEventListener('click', ()=> navSearch.hidden ? openNavSearch() : closeNavSearch());
navSearchX.addEventListener('click', closeNavSearch);
navSearchIn.addEventListener('input', ()=>{
  // joga o termo na busca principal e rola até a FAQ
  const v = navSearchIn.value;
  input.value = v; term = v; activeCat = null;
  document.querySelectorAll('.cat').forEach(x=>x.classList.remove('is-active'));
  render();
});
navSearchIn.addEventListener('keydown', e=>{
  if(e.key==='Enter'){ closeNavSearch(); document.getElementById('perguntas').scrollIntoView({behavior:'smooth'}); }
  if(e.key==='Escape') closeNavSearch();
});

// menu mobile
function closeMobileNav(){
  topnav.classList.remove('is-open');
  navBurger.classList.remove('is-open');
  navBurger.setAttribute('aria-expanded','false');
}
navBurger.addEventListener('click', ()=>{
  const open = topnav.classList.toggle('is-open');
  navBurger.classList.toggle('is-open', open);
  navBurger.setAttribute('aria-expanded', open?'true':'false');
});

/* ============================================================
   SIMULADOR DO PORTAL — tutorial guiado com spotlight
   ============================================================ */
const simOverlay = document.getElementById('simOverlay');
const simApp     = document.getElementById('simApp');
const simSpot    = document.getElementById('simSpotlight');

// roteiro de passos por tela (spot = data-spot do elemento a destacar)
const SIM_STEPS = {
  dashboard:[
    {spot:null,           title:'Tela inicial', text:'Ao entrar no Portal, o cliente vê o resumo do dia. Use as abas ao lado para seguir o tutorial de Vendas e Pagamentos.'},
    {spot:'dash-receb',   title:'Recebimentos de hoje', text:'Aqui aparece o total que o cliente recebe no dia atual.'},
    {spot:'dash-trans',   title:'Últimas transações', text:'As vendas mais recentes aparecem com bandeira, tipo (débito/crédito) e valor.'},
    {spot:'nav-vendas',   title:'Abrir Vendas', text:'No menu lateral, em “Vendas”, o cliente acessa o detalhamento por dia. Vá para a aba Vendas acima.'},
  ],
  vendas:[
    {spot:'nav-vendas',   title:'Menu Vendas', text:'A consulta de vendas fica em Menu principal › Vendas (canto superior esquerdo).'},
    {spot:'vendas-filtro',title:'Selecionar a data', text:'Escolha a data e clique em “Buscar”. Para baixar os dados, use “Exportar”.'},
    {spot:'vendas-kpis',  title:'Resumo do dia', text:'Os indicadores mostram Total Vendido, Vendas Capturadas, Cancelado e Ticket Médio.'},
    {spot:'vendas-modal', title:'Vendas por modalidade', text:'Logo abaixo, o valor é separado por PIX, Débito e Crédito, com a bandeira de cada um.'},
  ],
  pagamentos:[
    {spot:'nav-pag',      title:'Menu Pagamentos', text:'Em Pagamentos › Calendário, o cliente vê os valores a receber por dia.'},
    {spot:'pag-cal',      title:'Calendário de recebimentos', text:'Cada dia mostra o valor previsto. Verde = Efetivado, amarelo = A Receber, vermelho = Rejeitado.'},
    {spot:'pag-cal',      title:'Conciliação', text:'O dia de hoje fica destacado. Também é possível consultar por período em vez do calendário.'},
  ]
};

let simScreen = 'dashboard';
let simIdx = 0;

function showScreen(name){
  simScreen = name; simIdx = 0;
  simApp.querySelectorAll('.pa-screen').forEach(s=>s.classList.toggle('is-active', s.dataset.screen===name));
  simApp.querySelectorAll('.pa-nav[data-screen]').forEach(n=>n.classList.toggle('is-active', n.dataset.screen===name));
  document.querySelectorAll('.sim-tab').forEach(t=>t.classList.toggle('is-active', t.dataset.screen===name));
  renderStep();
}

function renderStep(){
  const steps = SIM_STEPS[simScreen];
  const st = steps[simIdx];
  document.getElementById('simStepCount').textContent = `Passo ${simIdx+1} de ${steps.length}`;
  document.getElementById('simStepTitle').textContent = st.title;
  document.getElementById('simStepText').textContent = st.text;
  document.getElementById('simPrev').disabled = simIdx===0;
  document.getElementById('simNext').textContent = (simIdx===steps.length-1) ? 'Concluir ✓' : 'Próximo ›';
  // dots
  document.getElementById('simDots').innerHTML = steps.map((_,i)=>`<span class="${i===simIdx?'on':''}"></span>`).join('');
  // spotlight
  placeSpot(st.spot);
}

function placeSpot(spot){
  if(!spot){ simSpot.hidden = true; return; }
  const el = simApp.querySelector(`[data-spot="${spot}"]`);
  if(!el){ simSpot.hidden = true; return; }
  // garante visibilidade
  el.scrollIntoView({block:'center', behavior:'smooth'});
  requestAnimationFrame(()=>{
    const a = simApp.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = 6;
    simSpot.hidden = false;
    simSpot.style.left   = (r.left - a.left - pad) + 'px';
    simSpot.style.top    = (r.top  - a.top  - pad) + 'px';
    simSpot.style.width  = (r.width  + pad*2) + 'px';
    simSpot.style.height = (r.height + pad*2) + 'px';
  });
}

function openSim(){
  simOverlay.hidden = false;
  requestAnimationFrame(()=> setTimeout(()=> showScreen('dashboard'), 80));
}
function closeSim(){ simSpot.hidden = true; simOverlay.hidden = true; }

document.getElementById('simClose').addEventListener('click', closeSim);
simOverlay.addEventListener('click', e=>{ if(e.target===simOverlay) closeSim(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !simOverlay.hidden) closeSim(); });

document.getElementById('simNext').addEventListener('click', ()=>{
  const steps = SIM_STEPS[simScreen];
  if(simIdx < steps.length-1){ simIdx++; renderStep(); }
  else { // avança para a próxima tela do roteiro
    const order = ['dashboard','vendas','pagamentos'];
    const ni = order.indexOf(simScreen)+1;
    if(ni < order.length) showScreen(order[ni]); else closeSim();
  }
});
document.getElementById('simPrev').addEventListener('click', ()=>{
  if(simIdx>0){ simIdx--; renderStep(); }
});
document.querySelectorAll('.sim-tab').forEach(t=> t.addEventListener('click', ()=> showScreen(t.dataset.screen)) );
simApp.querySelectorAll('.pa-nav[data-screen]').forEach(n=> n.addEventListener('click', ()=> showScreen(n.dataset.screen)) );

// reposiciona o spotlight se a janela mudar de tamanho
window.addEventListener('resize', ()=>{ if(!simOverlay.hidden){ const s=SIM_STEPS[simScreen][simIdx]; placeSpot(s && s.spot); } });
