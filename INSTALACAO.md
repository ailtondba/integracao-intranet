# Guia de Instalação - Integração Paperless-NGX com Intranet

## Pré-requisitos

### Conhecimentos Necessários
- Administração básica de servidores Linux/Windows
- Conceitos de API REST
- HTML, CSS e JavaScript básico
- Docker (opcional, mas recomendado)

### Requisitos do Sistema
- Paperless-NGX funcionando (versão 1.17.0 ou superior)
- Servidor web (Apache, Nginx, IIS)
- Acesso à rede onde o Paperless-NGX está rodando
- Token de API válido do Paperless-NGX

## Opções de Integração

### 1. Integração Simples (iframe)
**Vantagens:**
- Implementação rápida (5-10 minutos)
- Mantém todas as funcionalidades do Paperless-NGX
- Atualizações automáticas da interface

**Desvantagens:**
- Menos controle sobre o layout
- Pode ter problemas de responsividade
- Limitações de personalização

### 2. Integração Avançada (API REST)
**Vantagens:**
- Controle total sobre a interface
- Integração com sistemas existentes
- Personalização completa

**Desvantagens:**
- Desenvolvimento mais complexo
- Manutenção necessária
- Conhecimento técnico maior

## Instalação Passo a Passo

### Etapa 1: Preparação do Ambiente

1. **Verificar se o Paperless-NGX está funcionando:**
   ```bash
   curl http://localhost:8000/api/
   ```

2. **Criar diretório para a integração:**
   ```bash
   mkdir /var/www/paperless-intranet
   cd /var/www/paperless-intranet
   ```

### Etapa 2: Configuração do Paperless-NGX

1. **Obter Token de API:**
   - Acesse: `http://seu-servidor:8000/admin/authtoken/tokenproxy/`
   - Ou via interface: Settings → API Tokens
   - Gere um novo token e anote-o

2. **Configurar CORS (Cross-Origin Resource Sharing):**
   
   Adicione no arquivo `docker-compose.env`:
   ```env
   PAPERLESS_CORS_ALLOWED_HOSTS=http://localhost,http://seu-servidor-intranet
   PAPERLESS_ALLOWED_HOSTS=localhost,seu-servidor-intranet
   ```

   Ou se usando instalação direta, no `paperless.conf`:
   ```ini
   PAPERLESS_CORS_ALLOWED_HOSTS=http://localhost,http://seu-servidor-intranet
   PAPERLESS_ALLOWED_HOSTS=localhost,seu-servidor-intranet
   ```

3. **Reiniciar o Paperless-NGX:**
   ```bash
   docker-compose restart  # Se usando Docker
   # ou
   systemctl restart paperless-ngx  # Se instalação direta
   ```

### Etapa 3: Configuração da Integração

1. **Baixar os arquivos de exemplo:**
   ```bash
   wget https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/main/docs/examples/intranet-integration.html
   ```

2. **Configurar o arquivo de configuração:**
   
   Crie `config.js`:
   ```javascript
   const CONFIG = {
       // URL base do Paperless-NGX
       PAPERLESS_URL: 'http://localhost:8000',
       
       // Token de API (NUNCA commitar em repositórios públicos)
       API_TOKEN: 'seu-token-aqui',
       
       // Configurações da interface
       ITEMS_PER_PAGE: 25,
       SEARCH_DELAY: 300, // ms
       
       // Personalização
       COMPANY_NAME: 'Sua Empresa',
       LOGO_URL: '/assets/logo.png'
   };
   ```

3. **Personalizar a interface (opcional):**
   
   Edite o arquivo HTML para incluir:
   - Logo da empresa
   - Cores corporativas
   - Layout específico

### Etapa 4: Configuração do Servidor Web

#### Apache
```apache
<VirtualHost *:80>
    ServerName intranet.suaempresa.com
    DocumentRoot /var/www/paperless-intranet
    
    # Habilitar CORS se necessário
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Authorization, Content-Type"
    
    # Configurações de segurança
    <Directory "/var/www/paperless-intranet">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name intranet.suaempresa.com;
    root /var/www/paperless-intranet;
    index index.html;
    
    # Configurações CORS
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "Authorization, Content-Type";
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Etapa 5: Teste da Integração

1. **Teste básico da API:**
   ```bash
   curl -H "Authorization: Token SEU_TOKEN" \
        http://localhost:8000/api/documents/
   ```

2. **Teste via navegador:**
   - Acesse: `http://intranet.suaempresa.com`
   - Verifique se a busca funciona
   - Teste o download de documentos

3. **Verificar logs:**
   ```bash
   # Logs do Paperless-NGX
   docker-compose logs paperless
   
   # Logs do servidor web
   tail -f /var/log/apache2/error.log
   # ou
   tail -f /var/log/nginx/error.log
   ```

## Configurações Avançadas

### Opções de Servidor

#### Apache com SSL
```apache
<VirtualHost *:443>
    ServerName intranet.suaempresa.com
    DocumentRoot /var/www/paperless-intranet
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Configurações de segurança
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
</VirtualHost>
```

#### Nginx com SSL
```nginx
server {
    listen 443 ssl http2;
    server_name intranet.suaempresa.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Configurações de segurança
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    
    root /var/www/paperless-intranet;
    index index.html;
}
```

### Personalização da Interface

1. **Cores corporativas:**
   ```css
   :root {
       --primary-color: #your-brand-color;
       --secondary-color: #your-secondary-color;
       --background-color: #f5f5f5;
   }
   ```

2. **Logo da empresa:**
   ```html
   <div class="header">
       <img src="/assets/logo.png" alt="Logo da Empresa" class="logo">
       <h1>Sistema de Documentos</h1>
   </div>
   ```

### Integração com SSO (Single Sign-On)

#### OAuth2 com Active Directory
```javascript
// Exemplo de integração com OAuth2
function authenticateUser() {
    const authUrl = 'https://login.microsoftonline.com/tenant-id/oauth2/v2.0/authorize';
    const params = new URLSearchParams({
        client_id: 'your-client-id',
        response_type: 'code',
        redirect_uri: window.location.origin + '/callback',
        scope: 'openid profile email'
    });
    
    window.location.href = `${authUrl}?${params}`;
}
```

### Monitoramento e Logs

1. **Google Analytics (opcional):**
   ```html
   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

2. **Logs customizados:**
   ```javascript
   function logSearch(query, results) {
       fetch('/api/log', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               action: 'search',
               query: query,
               results_count: results.length,
               timestamp: new Date().toISOString()
           })
       });
   }
   ```

## Segurança

### Boas Práticas

1. **HTTPS obrigatório em produção**
2. **Validação de entrada:**
   ```javascript
   function sanitizeInput(input) {
       return input.replace(/[<>"'&]/g, function(match) {
           const escape = {
               '<': '&lt;',
               '>': '&gt;',
               '"': '&quot;',
               "'": '&#39;',
               '&': '&amp;'
           };
           return escape[match];
       });
   }
   ```

3. **Rate limiting:**
   ```javascript
   const rateLimiter = {
       requests: new Map(),
       limit: 100, // requests per minute
       
       check(ip) {
           const now = Date.now();
           const requests = this.requests.get(ip) || [];
           const recent = requests.filter(time => now - time < 60000);
           
           if (recent.length >= this.limit) {
               return false;
           }
           
           recent.push(now);
           this.requests.set(ip, recent);
           return true;
       }
   };
   ```

4. **Configuração de CORS restritiva:**
   ```env
   PAPERLESS_CORS_ALLOWED_HOSTS=https://intranet.suaempresa.com
   ```

## Solução de Problemas

### Problemas Comuns

#### 1. Erro de CORS
**Sintoma:** Console do navegador mostra erro "blocked by CORS policy"

**Solução:**
```bash
# Verificar configuração CORS
grep CORS /path/to/docker-compose.env

# Adicionar domínio correto
echo "PAPERLESS_CORS_ALLOWED_HOSTS=https://seu-dominio.com" >> docker-compose.env

# Reiniciar serviço
docker-compose restart
```

#### 2. Token de API inválido
**Sintoma:** Erro 401 Unauthorized

**Solução:**
```bash
# Verificar token via API
curl -H "Authorization: Token SEU_TOKEN" http://localhost:8000/api/

# Gerar novo token se necessário
docker-compose exec paperless python manage.py drf_create_token username
```

#### 3. Documentos não aparecem
**Sintoma:** Busca retorna vazia mesmo com documentos no sistema

**Verificações:**
1. Verificar permissões do usuário
2. Confirmar que os documentos foram processados
3. Testar busca diretamente na interface do Paperless-NGX

#### 4. Erro de rede
**Sintoma:** "Network Error" ou timeout

**Diagnóstico:**
```bash
# Testar conectividade
telnet paperless-server 8000

# Verificar firewall
sudo ufw status

# Verificar logs do servidor
docker-compose logs paperless
```

### Debug Avançado

1. **Console do navegador:**
   - Abrir DevTools (F12)
   - Verificar aba Console para erros JavaScript
   - Verificar aba Network para requisições falhando

2. **Logs do Paperless-NGX:**
   ```bash
   # Aumentar nível de log
   echo "PAPERLESS_LOGGING_DIR=/usr/src/paperless/logs" >> docker-compose.env
   echo "PAPERLESS_LOGROTATE_MAX_SIZE=1024000" >> docker-compose.env
   
   # Visualizar logs em tempo real
   docker-compose logs -f paperless
   ```

3. **Teste de API manual:**
   ```bash
   # Listar documentos
   curl -v -H "Authorization: Token SEU_TOKEN" \
        "http://localhost:8000/api/documents/?query=test"
   
   # Verificar metadados
   curl -H "Authorization: Token SEU_TOKEN" \
        "http://localhost:8000/api/documents/1/"
   ```

## Recursos de Suporte

### Documentação Oficial
- [API do Paperless-NGX](https://docs.paperless-ngx.com/api/)
- [Configuração CORS](https://docs.paperless-ngx.com/configuration/#cors)
- [Tokens de API](https://docs.paperless-ngx.com/api/#authorization)

### Comunidade
- [GitHub Issues](https://github.com/paperless-ngx/paperless-ngx/issues)
- [Reddit r/paperless](https://reddit.com/r/paperless)
- [Discord Server](https://discord.gg/paperless)

### Ferramentas de Debug
- [Postman](https://www.postman.com/) - Teste de APIs
- [curl](https://curl.se/) - Linha de comando
- [Browser DevTools](https://developer.chrome.com/docs/devtools/) - Debug frontend

## Checklist Final de Instalação

- [ ] Paperless-NGX funcionando e acessível
- [ ] Token de API gerado e testado
- [ ] CORS configurado corretamente
- [ ] Arquivos da integração no servidor web
- [ ] Configuração do servidor web (Apache/Nginx)
- [ ] Teste de busca funcionando
- [ ] Download de documentos funcionando
- [ ] HTTPS configurado (produção)
- [ ] Logs configurados
- [ ] Backup da configuração realizado
- [ ] Documentação entregue à equipe

---

**Nota:** Este guia assume conhecimento básico de administração de sistemas. Para ambientes de produção, sempre consulte sua equipe de segurança antes da implementação.