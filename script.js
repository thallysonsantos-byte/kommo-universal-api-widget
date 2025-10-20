define(['jquery', 'underscore'], function ($, _) {
  return {
    /**
     * Quando o usuário salva o bloco no designer
     */
    onSalesbotDesignerSave: function (settings, context) {
      const apiUrl = settings.api_url;
      const method = settings.method || 'GET';
      let body = settings.body ? settings.body.trim() : '';

      /**
       * ⚙️ Transformar variáveis do bot em placeholders compatíveis
       * O Kommo substitui automaticamente as variáveis quando o bot executa o bloco.
       * Ex: "{{lead.id}}" -> será substituído pelo ID real do lead.
       */
      if (body && this.isJsonString(body)) {
        body = JSON.parse(body);
      } else if (!body) {
        body = null;
      }

      // Retorna o JSON do bloco para o Salesbot
      return JSON.stringify({
        type: 'api_request',
        name: 'API Request Widget',
        exits: ['success', 'error'],
        action: {
          type: 'webhook',
          url: apiUrl,
          method: method,
          body: body,
          headers: {
            'Content-Type': 'application/json'
          },
          success_exit: 'success',
          error_exit: 'error'
        }
      });
    },

    /**
     * Verifica se o corpo é um JSON válido
     */
    isJsonString: function (str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * Configuração dinâmica do designer
     */
    salesbotDesignerSettings: function (context) {
      return {
        title: 'Configuração da Chamada API',
        description: 'Suporta variáveis do bot, como {{lead.id}}, {{contact.name}} etc.'
      };
    }
  };
});
