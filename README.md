# 🗂️ Paperless-NGX Integração Intranet

<div align="center">

![Paperless-NGX](https://img.shields.io/badge/Paperless--NGX-Latest-blue?style=for-the-badge&logo=files)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

**Solução completa para integração do Paperless-NGX com sistemas de intranet corporativa**

[📖 Documentação](#-documentação) • [🚀 Instalação](#-instalação-rápida) • [💡 Exemplos](#-exemplos) • [🔧 Configuração](#-configuração)

</div>

---

## 🎯 Visão Geral

Este projeto fornece uma **solução empresarial completa** para integração do Paperless-NGX com sistemas de intranet corporativa, permitindo:

- 📄 **Gestão eletrônica de documentos** centralizada
- 🔍 **Busca inteligente** com OCR em português
- 🔒 **Segurança corporativa** com SSL/TLS e CORS
- 🌐 **Integração via API** ou iframe
- 📊 **Interface moderna** e responsiva
- 🐳 **Deploy com Docker** em minutos

## ✨ Características Principais

### 🏗️ Arquitetura Robusta
- **Paperless-NGX** - Sistema principal de gestão documental
- **PostgreSQL 15** - Banco de dados confiável
- **Redis 7** - Cache e filas de alta performance
- **Nginx** - Proxy reverso com SSL
- **Apache Tika** - Extração de texto avançada
- **Gotenberg** - Conversão de documentos

### 🔐 Segurança Empresarial
- ✅ Autenticação por token API
- ✅ CORS configurável para intranet
- ✅ SSL/TLS com certificados personalizados
- ✅ Headers de segurança (HSTS, XSS Protection)
- ✅ Firewall e isolamento de rede

### 🚀 Performance Otimizada
- ⚡ Cache Redis para consultas rápidas
- ⚡ Compressão Gzip automática
- ⚡ Lazy loading de imagens
- ⚡ CDN-ready para arquivos estáticos

## 🚀 Instalação Rápida

### Pré-requisitos
- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB RAM mínimo
- 20GB espaço em disco

### 1️⃣ Clone e Configure

```bash
# Clone o repositório
git clone https://github.com/ailtondba/integracao-intranet.git
cd integracao-intranet

# Configure as variáveis de ambiente
cp docker-compose.env docker-compose.env.local
nano docker-compose.env.local
```

### 2️⃣ Personalize a Configuração

```bash
# Edite as configurações principais
PAPERLESS_SECRET_KEY="sua-chave-secreta-muito-longa"
PAPERLESS_ALLOWED_HOSTS="seu-dominio.com,localhost"
PAPERLESS_ADMIN_USER="admin"
PAPERLESS_ADMIN_PASSWORD="senha-segura"
```

### 3️⃣ Inicie os Serviços

```bash
# Suba todos os containers
docker-compose up -d

# Verifique o status
docker-compose ps

# Acompanhe os logs
docker-compose logs -f webserver
```

### 4️⃣ Acesse o Sistema

- **Interface Web**: http://localhost:8000
- **API Endpoint**: http://localhost:8000/api/
- **Documentação API**: http://localhost:8000/api/schema/swagger-ui/

## 💡 Exemplos de Integração

### 🌐 Widget para Intranet

Veja o exemplo completo em [`exemplos/exemplo-intranet.html`](exemplos/exemplo-intranet.html):

```html
<!-- Widget de busca integrado -->
<div class="paperless-widget">
    <input type="text" id="search-input" placeholder="Buscar documentos...">
    <div id="results-container"></div>
</div>

<script>
const API_URL = 'https://paperless.empresa.com/api';
const API_TOKEN = 'seu-token-aqui';

// Busca em tempo real
function searchDocuments(query) {
    fetch(`${API_URL}/documents/?query=${query}`, {
        headers: { 'Authorization': `Token ${API_TOKEN}` }
    })
    .then(response => response.json())
    .then(data => displayResults(data.results));
}
</script>
```

### 📱 Iframe Responsivo

```html
<!-- Embed completo do sistema -->
<iframe 
    src="https://paperless.empresa.com" 
    style="width: 100%; height: 800px; border: none; border-radius: 8px;"
    sandbox="allow-same-origin allow-scripts allow-forms">
</iframe>
```

### 🔌 API JavaScript

```javascript
// Cliente JavaScript completo
class PaperlessClient {
    constructor(apiUrl, token) {
        this.apiUrl = apiUrl;
        this.headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
    }

    async searchDocuments(query, page = 1) {
        const response = await fetch(
            `${this.apiUrl}/documents/?query=${query}&page=${page}`,
            { headers: this.headers }
        );
        return response.json();
    }

    async getDocument(id) {
        const response = await fetch(
            `${this.apiUrl}/documents/${id}/`,
            { headers: this.headers }
        );
        return response.json();
    }
}
```

## 🔧 Configuração Avançada

### 🌍 Configuração CORS

```bash
# Para múltiplos domínios de intranet
PAPERLESS_CORS_ALLOWED_HOSTS="https://intranet.empresa.com,https://portal.empresa.com,http://localhost:3000"
```

### 🔒 SSL/TLS Personalizado

```bash
# Gerar certificados SSL
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/paperless.key \
  -out nginx/ssl/paperless.crt
```

### 📊 Monitoramento

```bash
# Health check
curl -f http://localhost:8000/api/ || exit 1

# Métricas de performance
docker stats paperless-webserver

# Logs estruturados
docker-compose logs --tail=100 webserver | jq .
```

## 📁 Estrutura do Projeto

```
integracao-intranet/
├── 📄 README.md                    # Este arquivo
├── 📄 INSTALACAO.md                # Guia de instalação detalhado
├── 📄 DOCUMENTACAO_TECNICA.md      # Documentação técnica completa
├── 🐳 docker-compose.yml           # Configuração dos containers
├── ⚙️ docker-compose.env           # Variáveis de ambiente
├── 📁 config/
│   └── 📄 config.example.js        # Configuração JavaScript
├── 📁 exemplos/
│   ├── 🌐 exemplo-intranet.html    # Widget de integração
│   └── 📊 DGE-PROJETO-VISUAL.html  # Dashboard visual
└── 📁 nginx/
    └── ⚙️ nginx.conf               # Configuração do proxy
```

## 🛠️ Comandos Úteis

```bash
# Backup completo
docker-compose exec webserver python manage.py document_exporter /export

# Reindexar documentos
docker-compose exec webserver python manage.py document_index reindex

# Atualizar sistema
docker-compose pull && docker-compose up -d

# Logs em tempo real
docker-compose logs -f --tail=50

# Limpeza de cache
docker-compose exec redis redis-cli FLUSHALL
```

## 📊 Status do Projeto

| Componente | Status | Versão | Notas |
|------------|--------|-----------|-------|
| 🐳 **Docker** | ✅ Ativo | Latest | Containerização completa |
| 🗄️ **PostgreSQL** | ✅ Ativo | 15 | Banco principal |
| ⚡ **Redis** | ✅ Ativo | 7 | Cache e filas |
| 🌐 **Nginx** | ✅ Ativo | Alpine | Proxy reverso |
| 📄 **Paperless-NGX** | ✅ Ativo | Latest | Sistema principal |
| 🔍 **Apache Tika** | ✅ Ativo | Latest | OCR e extração |
| 📑 **Gotenberg** | ✅ Ativo | 7 | Conversão de docs |
| 🔒 **SSL/TLS** | ✅ Configurado | - | Certificados incluídos |
| 🌍 **CORS** | ✅ Configurado | - | Intranet ready |
| 📱 **Responsivo** | ✅ Ativo | - | Mobile friendly |

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. 🍴 Faça um fork do projeto
2. 🌟 Crie uma branch para sua feature
3. 💻 Commit suas mudanças
4. 📤 Push para a branch
5. 🔄 Abra um Pull Request

## 📞 Suporte

- 📧 **Issues**: [GitHub Issues](https://github.com/ailtondba/integracao-intranet/issues)
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/ailtondba/integracao-intranet/wiki)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/ailtondba/integracao-intranet/discussions)

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE) - veja o arquivo LICENSE para detalhes.

## 🙏 Agradecimentos

- [Paperless-NGX Team](https://github.com/paperless-ngx/paperless-ngx) pelo excelente sistema
- [Docker](https://docker.com) pela plataforma de containerização
- Comunidade open source pelos feedbacks e contribuições

---

<div align="center">

**Desenvolvido com ❤️ para gestão documental corporativa**

[⬆️ Voltar ao topo](#️-paperless-ngx-integração-intranet)

</div>
