/**
 * Configuração de Exemplo para Integração Paperless-NGX
 * 
 * Este arquivo contém as configurações necessárias para integrar
 * o Paperless-NGX com sua intranet corporativa.
 */

// Configuração da API do Paperless-NGX
const PAPERLESS_CONFIG = {
    // URL base do seu servidor Paperless-NGX
    BASE_URL: 'http://localhost:8000',
    
    // Token de API (obtenha em: Configurações > API Tokens)
    API_TOKEN: 'seu_token_aqui',
    
    // Configurações de paginação
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    
    // Timeout para requisições (em milissegundos)
    REQUEST_TIMEOUT: 30000,
    
    // Configurações de cache
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
    
    // Endpoints da API
    ENDPOINTS: {
        DOCUMENTS: '/api/documents/',
        TAGS: '/api/tags/',
        DOCUMENT_TYPES: '/api/document_types/',
        CORRESPONDENTS: '/api/correspondents/',
        SEARCH: '/api/documents/',
        DOWNLOAD: '/api/documents/{id}/download/',
        PREVIEW: '/api/documents/{id}/preview/',
        THUMBNAIL: '/api/documents/{id}/thumb/'
    }
};

// Configuração da Interface
const UI_CONFIG = {
    // Tema da interface
    THEME: {
        PRIMARY_COLOR: '#667eea',
        SECONDARY_COLOR: '#764ba2',
        SUCCESS_COLOR: '#28a745',
        WARNING_COLOR: '#ffc107',
        DANGER_COLOR: '#dc3545',
        INFO_COLOR: '#17a2b8'
    },
    
    // Textos da interface
    LABELS: {
        SEARCH_PLACEHOLDER: 'Digite um termo para buscar documentos...',
        NO_RESULTS: 'Nenhum documento encontrado para esta busca.',
        LOADING: 'Buscando documentos...',
        ERROR_TITLE: 'Erro ao buscar documentos',
        TOTAL_DOCS: 'Total de Documentos',
        CATEGORIES: 'Categorias',
        DOCUMENT_TYPES: 'Tipos',
        LAST_SEARCH: 'Última Busca'
    },
    
    // Configurações de exibição
    DISPLAY: {
        SHOW_PREVIEW: true,
        SHOW_TAGS: true,
        SHOW_METADATA: true,
        SHOW_STATISTICS: true,
        PREVIEW_LENGTH: 400,
        DATE_FORMAT: 'pt-BR'
    }
};

// Configuração de Segurança
const SECURITY_CONFIG = {
    // CORS - Configure no servidor Paperless-NGX
    ALLOWED_ORIGINS: [
        'http://localhost:3000',
        'http://sua-intranet.empresa.com',
        'https://sua-intranet.empresa.com'
    ],
    
    // Rate Limiting (implementar no servidor)
    RATE_LIMIT: {
        REQUESTS_PER_MINUTE: 60,
        REQUESTS_PER_HOUR: 1000
    },
    
    // Validação de entrada
    INPUT_VALIDATION: {
        MAX_QUERY_LENGTH: 500,
        ALLOWED_CHARACTERS: /^[a-zA-Z0-9\s\-_.,!?()\[\]"']+$/,
        SANITIZE_HTML: true
    }
};

// Configuração de Performance
const PERFORMANCE_CONFIG = {
    // Debounce para busca em tempo real (em milissegundos)
    SEARCH_DEBOUNCE: 300,
    
    // Cache de metadados
    METADATA_CACHE_DURATION: 10 * 60 * 1000, // 10 minutos
    
    // Lazy loading de imagens
    LAZY_LOAD_IMAGES: true,
    
    // Compressão de requisições
    ENABLE_COMPRESSION: true
};

// Configuração de Logging
const LOGGING_CONFIG = {
    // Nível de log (debug, info, warn, error)
    LOG_LEVEL: 'info',
    
    // Logs no console
    CONSOLE_LOGGING: true,
    
    // Logs para servidor (opcional)
    SERVER_LOGGING: {
        ENABLED: false,
        ENDPOINT: '/api/logs',
        BATCH_SIZE: 10
    }
};

// Configuração de Integração
const INTEGRATION_CONFIG = {
    // Modo de integração
    MODE: 'api', // 'api' ou 'iframe'
    
    // Configurações do iframe (se MODE = 'iframe')
    IFRAME: {
        WIDTH: '100%',
        HEIGHT: '600px',
        SANDBOX: 'allow-same-origin allow-scripts allow-forms',
        ALLOW_FULLSCREEN: true
    },
    
    // SSO (Single Sign-On)
    SSO: {
        ENABLED: false,
        PROVIDER: 'oauth2', // 'oauth2', 'saml', 'ldap'
        AUTO_LOGIN: false
    },
    
    // Webhooks (para sincronização)
    WEBHOOKS: {
        ENABLED: false,
        ENDPOINTS: {
            DOCUMENT_CREATED: '/webhook/document-created',
            DOCUMENT_UPDATED: '/webhook/document-updated',
            DOCUMENT_DELETED: '/webhook/document-deleted'
        }
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = {
        PAPERLESS_CONFIG,
        UI_CONFIG,
        SECURITY_CONFIG,
        PERFORMANCE_CONFIG,
        LOGGING_CONFIG,
        INTEGRATION_CONFIG
    };
} else {
    // Browser
    window.PaperlessIntegrationConfig = {
        PAPERLESS_CONFIG,
        UI_CONFIG,
        SECURITY_CONFIG,
        PERFORMANCE_CONFIG,
        LOGGING_CONFIG,
        INTEGRATION_CONFIG
    };
}

/**
 * Instruções de Uso:
 * 
 * 1. Copie este arquivo para config.js
 * 2. Ajuste as configurações conforme sua necessidade
 * 3. Configure o CORS no Paperless-NGX:
 *    - Adicione PAPERLESS_CORS_ALLOWED_HOSTS no docker-compose.env
 *    - Exemplo: PAPERLESS_CORS_ALLOWED_HOSTS=http://localhost:3000,http://sua-intranet.com
 * 
 * 4. Obtenha o Token da API:
 *    - Acesse o Paperless-NGX
 *    - Vá em Configurações > API Tokens
 *    - Crie um novo token
 *    - Cole o token em API_TOKEN
 * 
 * 5. Teste a integração:
 *    - Abra o arquivo busca-simples.html ou busca-avancada.html
 *    - Configure a URL e Token
 *    - Teste a busca
 * 
 * 6. Personalize a interface:
 *    - Ajuste as cores em UI_CONFIG.THEME
 *    - Modifique os textos em UI_CONFIG.LABELS
 *    - Configure a exibição em UI_CONFIG.DISPLAY
 * 
 * 7. Implemente segurança:
 *    - Configure CORS adequadamente
 *    - Implemente rate limiting
 *    - Valide todas as entradas do usuário
 *    - Use HTTPS em produção
 */

/**
 * Exemplo de uso no HTML:
 * 
 * <script src="config/config.js"></script>
 * <script>
 *     const config = window.PaperlessIntegrationConfig;
 *     
 *     // Usar configurações
 *     const apiUrl = config.PAPERLESS_CONFIG.BASE_URL;
 *     const token = config.PAPERLESS_CONFIG.API_TOKEN;
 *     
 *     // Fazer requisição
 *     fetch(`${apiUrl}/api/documents/`, {
 *         headers: {
 *             'Authorization': `Token ${token}`
 *         }
 *     });
 * </script>
 */

/**
 * Exemplo de configuração do CORS no Paperless-NGX:
 * 
 * No arquivo docker-compose.env, adicione:
 * 
 * # CORS Configuration
 * PAPERLESS_CORS_ALLOWED_HOSTS=http://localhost:3000,http://sua-intranet.empresa.com,https://sua-intranet.empresa.com
 * PAPERLESS_ALLOWED_HOSTS=localhost,sua-intranet.empresa.com
 * 
 * # Security Headers
 * PAPERLESS_FORCE_SCRIPT_NAME=/
 * PAPERLESS_STATIC_URL=/static/
 * 
 * # API Configuration
 * PAPERLESS_ENABLE_HTTP_REMOTE_USER=false
 * PAPERLESS_HTTP_REMOTE_USER_HEADER_NAME=HTTP_REMOTE_USER
 */