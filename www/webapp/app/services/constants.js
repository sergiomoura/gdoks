var API_ROOT = '../api/v1';
var TOKEN_REFRESH_IN = 600000; //10 MINUTOS
var DURACAO_DA_BUSCA = 1800000; //30 MINUTOS
var HISTORICO_MAX_SIZE = 5;
var COOKIE_KEY_HISTORICO = 'historico';

// Constantes de status de documento;
var DOCSTATUS_INVALIDO = 'invalido';
var DOCSTATUS_VIRGEM = 'virgem';
var DOCSTATUS_CHECKOUT = 'checkout';
var DOCSTATUS_AGUARDANDO_VALIDACAO = 'paravalidacao';
var DOCSTATUS_VALIDADO = 'validado';
var DOCSTATUS_CONCLUIDO = 'concluido';