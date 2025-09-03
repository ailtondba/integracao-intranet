/**
 * Configuração de Exemplo - Paperless-NGX Integração Intranet
 * 
 * Este arquivo contém exemplos de configuração para integração do Paperless-NGX
 * com sistemas de intranet corporativa.
 * 
 * IMPORTANTE: Copie este arquivo para 'config.js' e ajuste as configurações
 * conforme seu ambiente.
 */

// ============================================================================
// CONFIGURAÇÕES PRINCIPAIS
// ============================================================================

const PaperlessConfig = {
    // URL base da API do Paperless-NGX
    apiUrl: 'https://paperless.suaempresa.com/api',
    
    // Token de autenticação da API
    // ATENÇÃO: Nunca commite tokens reais no repositório!
    apiToken: 'SEU_TOKEN_AQUI',
    
    // Configurações de timeout
    timeout: 30000, // 30 segundos
    
    // Configurações de paginação
    pagination: {
        defaultPageSize: 25,
        maxPageSize: 100
    },
    
    // Configurações de cache
    cache: {
        enabled: true,
        duration: 300000 // 5 minutos
    }
};

// ============================================================================
// CONFIGURAÇÕES DE INTERFACE
// ============================================================================

const UIConfig = {
    // Tema da interface
    theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#64748b',
        successColor: '#059669',
        warningColor: '#d97706',
        errorColor: '#dc2626'
    },
    
    // Configurações de busca
    search: {
        placeholder: 'Buscar documentos...',
        minLength: 3,
        debounceDelay: 300,
        showSuggestions: true,
        maxSuggestions: 5
    },
    
    // Configurações de exibição
    display: {
        showThumbnails: true,
        showPreview: true,
        showMetadata: true,
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm'
    },
    
    // Configurações de download
    download: {
        enabled: true,
        showProgress: true,
        allowBulkDownload: false
    }
};

// ============================================================================
// CONFIGURAÇÕES DE SEGURANÇA
// ============================================================================

const SecurityConfig = {
    // Configurações CORS
    cors: {
        allowedOrigins: [
            'https://intranet.suaempresa.com',
            'https://portal.suaempresa.com'
        ],
        allowCredentials: true
    },
    
    // Configurações de CSP (Content Security Policy)
    csp: {
        enabled: true,
        directives: {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'https:'],
            'connect-src': ["'self'", 'https://paperless.suaempresa.com']
        }
    },
    
    // Configurações de rate limiting
    rateLimit: {
        enabled: true,
        maxRequests: 100,
        windowMs: 60000 // 1 minuto
    }
};

// ============================================================================
// CONFIGURAÇÕES DE LOGGING
// ============================================================================

const LoggingConfig = {
    level: 'info', // debug, info, warn, error
    console: true,
    file: false,
    remote: false,
    
    // Configurações para log remoto (opcional)
    remote_config: {
        url: 'https://logs.suaempresa.com/api/logs',
        apiKey: 'SEU_LOG_API_KEY'
    }
};

// ============================================================================
// CONFIGURAÇÕES DE INTEGRAÇÃO
// ============================================================================

const IntegrationConfig = {
    // Configurações para iframe
    iframe: {
        enabled: true,
        sandbox: 'allow-same-origin allow-scripts allow-forms',
        width: '100%',
        height: '800px',
        border: 'none',
        borderRadius: '8px'
    },
    
    // Configurações para widget
    widget: {
        enabled: true,
        container: '#paperless-widget',
        autoInit: true,
        responsive: true
    },
    
    // Configurações para SSO (Single Sign-On)
    sso: {
        enabled: false,
        provider: 'saml', // saml, oauth2, ldap
        config: {
            // Configurações específicas do provedor
        }
    }
};

// ============================================================================
// CONFIGURAÇÕES DE PERFORMANCE
// ============================================================================

const PerformanceConfig = {
    // Lazy loading
    lazyLoading: {
        enabled: true,
        threshold: 100, // pixels
        placeholder: '/assets/images/loading.svg'
    },
    
    // Compressão de imagens
    imageCompression: {
        enabled: true,
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1080
    },
    
    // Prefetch de recursos
    prefetch: {
        enabled: true,
        maxConcurrent: 3
    }
};

// ============================================================================
// CONFIGURAÇÕES DE DESENVOLVIMENTO
// ============================================================================

const DevelopmentConfig = {
    debug: false,
    mockData: false,
    showPerformanceMetrics: false,
    enableHotReload: false
};

// ============================================================================
// EXPORTAÇÃO DA CONFIGURAÇÃO
// ============================================================================

// Para uso em Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PaperlessConfig,
        UIConfig,
        SecurityConfig,
        LoggingConfig,
        IntegrationConfig,
        PerformanceConfig,
        DevelopmentConfig
    };
}

// Para uso no browser
if (typeof window !== 'undefined') {
    window.PaperlessConfig = PaperlessConfig;
    window.UIConfig = UIConfig;
    window.SecurityConfig = SecurityConfig;
    window.LoggingConfig = LoggingConfig;
    window.IntegrationConfig = IntegrationConfig;
    window.PerformanceConfig = PerformanceConfig;
    window.DevelopmentConfig = DevelopmentConfig;
}

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Valida se a configuração está correta
 * @returns {boolean} True se válida, false caso contrário
 */
function validateConfig() {
    const errors = [];
    
    // Validar URL da API
    if (!PaperlessConfig.apiUrl || !PaperlessConfig.apiUrl.startsWith('http')) {
        errors.push('URL da API inválida');
    }
    
    // Validar token
    if (!PaperlessConfig.apiToken || PaperlessConfig.apiToken === 'SEU_TOKEN_AQUI') {
        errors.push('Token da API não configurado');
    }
    
    // Validar timeout
    if (PaperlessConfig.timeout < 1000) {
        errors.push('Timeout muito baixo (mínimo 1000ms)');
    }
    
    if (errors.length > 0) {
        console.error('Erros de configuração:', errors);
        return false;
    }
    
    return true;
}

/**
 * Obtém a configuração completa mesclada
 * @returns {Object} Configuração completa
 */
function getFullConfig() {
    return {
        paperless: PaperlessConfig,
        ui: UIConfig,
        security: SecurityConfig,
        logging: LoggingConfig,
        integration: IntegrationConfig,
        performance: PerformanceConfig,
        development: DevelopmentConfig
    };
}

/**
 * Inicializa a configuração
 */
function initConfig() {
    if (!validateConfig()) {
        throw new Error('Configuração inválida. Verifique os parâmetros.');
    }
    
    console.log('Configuração inicializada com sucesso');
    
    if (DevelopmentConfig.debug) {
        console.log('Configuração completa:', getFullConfig());
    }
}

// Exportar funções utilitárias
if (typeof module !== 'undefined' && module.exports) {
    module.exports.validateConfig = validateConfig;
    module.exports.getFullConfig = getFullConfig;
    module.exports.initConfig = initConfig;
}

if (typeof window !== 'undefined') {
    window.validateConfig = validateConfig;
    window.getFullConfig = getFullConfig;
    window.initConfig = initConfig;
}

// ============================================================================
// EXEMPLO DE USO
// ============================================================================

/*
// 1. Incluir o arquivo de configuração
<script src="config/config.js"></script>

// 2. Inicializar
try {
    initConfig();
    console.log('Sistema pronto para uso!');
} catch (error) {
    console.error('Erro na inicialização:', error.message);
}

// 3. Usar as configurações
const apiClient = new PaperlessAPIClient({
    url: PaperlessConfig.apiUrl,
    token: PaperlessConfig.apiToken,
    timeout: PaperlessConfig.timeout
});

// 4. Buscar documentos
apiClient.searchDocuments('contrato')
    .then(results => {
        console.log('Documentos encontrados:', results);
    })
    .catch(error => {
        console.error('Erro na busca:', error);
    });
*/
