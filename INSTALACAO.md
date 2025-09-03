# 🚀 Guia de Instalação Completo - Paperless-NGX Intranet

<div align="center">

![Installation Guide](https://img.shields.io/badge/Guia-Instalação-blue?style=for-the-badge&logo=docker)
![Difficulty](https://img.shields.io/badge/Dificuldade-Intermediário-orange?style=for-the-badge)
![Time](https://img.shields.io/badge/Tempo-30--45min-green?style=for-the-badge&logo=clock)

**Guia passo a passo para instalação e configuração completa**

</div>

---

## 📋 Pré-requisitos

### 🖥️ Requisitos de Sistema

| Componente | Mínimo | Recomendado | Observações |
|------------|--------|-------------|-------------|
| **CPU** | 2 cores | 4+ cores | Para OCR e processamento |
| **RAM** | 4GB | 8GB+ | PostgreSQL + Redis + Paperless |
| **Disco** | 20GB | 100GB+ | Documentos + backups |
| **OS** | Ubuntu 20.04+ | Ubuntu 22.04 LTS | Debian/CentOS também suportados |

### 🐳 Software Necessário

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y curl wget git nano

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker --version
docker-compose --version
```

### 🔧 Configurações de Sistema

```bash
# Aumentar limites de arquivo (recomendado)
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf

# Configurar swap (se necessário)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 📦 Instalação Passo a Passo

### 1️⃣ Preparação do Ambiente

```bash
# Criar diretório do projeto
sudo mkdir -p /opt/paperless-ngx
sudo chown $USER:$USER /opt/paperless-ngx
cd /opt/paperless-ngx

# Clonar o repositório
git clone https://github.com/ailtondba/integracao-intranet.git .

# Verificar estrutura
ls -la
```

### 2️⃣ Configuração de Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp docker-compose.env docker-compose.env.local

# Gerar chave secreta
echo "PAPERLESS_SECRET_KEY=$(openssl rand -base64 32)" >> docker-compose.env.local

# Editar configurações
nano docker-compose.env.local
```

#### 🔑 Configurações Essenciais

```bash
# === CONFIGURAÇÕES BÁSICAS ===
PAPERLESS_SECRET_KEY="sua-chave-gerada-automaticamente"
PAPERLESS_URL="https://paperless.suaempresa.com"
PAPERLESS_ALLOWED_HOSTS="paperless.suaempresa.com,localhost,127.0.0.1"

# === USUÁRIO ADMINISTRADOR ===
PAPERLESS_ADMIN_USER="admin"
PAPERLESS_ADMIN_PASSWORD="SenhaSegura123!"
PAPERLESS_ADMIN_MAIL="admin@suaempresa.com"

# === BANCO DE DADOS ===
POSTGRES_DB="paperless"
POSTGRES_USER="paperless"
POSTGRES_PASSWORD="SenhaBanco123!"

# === CORS PARA INTRANET ===
PAPERLESS_CORS_ALLOWED_HOSTS="https://intranet.suaempresa.com,https://portal.suaempresa.com"

# === OCR E IDIOMAS ===
PAPERLESS_OCR_LANGUAGE="por+eng"
PAPERLESS_OCR_MODE="skip_archive"

# === TIMEZONE ===
PAPERLESS_TIME_ZONE="America/Sao_Paulo"
```

### 3️⃣ Configuração SSL/TLS (Produção)

```bash
# Criar diretório SSL
mkdir -p nginx/ssl

# Opção 1: Certificado Let's Encrypt (Recomendado)
sudo apt install certbot
sudo certbot certonly --standalone -d paperless.suaempresa.com
sudo cp /etc/letsencrypt/live/paperless.suaempresa.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/paperless.suaempresa.com/privkey.pem nginx/ssl/

# Opção 2: Certificado Auto-assinado (Desenvolvimento)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/paperless.key \
  -out nginx/ssl/paperless.crt \
  -subj "/C=BR/ST=SP/L=SaoPaulo/O=SuaEmpresa/CN=paperless.suaempresa.com"
```

### 4️⃣ Configuração do Nginx

```bash
# Editar configuração do Nginx
nano nginx/nginx.conf
```

**Ajustar domínio e certificados:**

```nginx
server {
    listen 443 ssl http2;
    server_name paperless.suaempresa.com;  # ← Alterar aqui
    
    # Certificados SSL
    ssl_certificate /etc/nginx/ssl/paperless.crt;      # ← Verificar caminho
    ssl_certificate_key /etc/nginx/ssl/paperless.key;  # ← Verificar caminho
    
    # CORS para intranet
    add_header Access-Control-Allow-Origin "https://intranet.suaempresa.com" always;
    # ... resto da configuração
}
```

### 5️⃣ Inicialização dos Serviços

```bash
# Verificar configuração
docker-compose config

# Baixar imagens
docker-compose pull

# Iniciar em modo detached
docker-compose up -d

# Verificar status
docker-compose ps
```

### 6️⃣ Verificação da Instalação

```bash
# Aguardar inicialização (pode levar alguns minutos)
sleep 60

# Verificar logs
docker-compose logs webserver

# Testar conectividade
curl -f http://localhost:8000/api/ || echo "Aguardando inicialização..."

# Verificar saúde dos containers
docker-compose ps
```

---

## 🔧 Configuração Pós-Instalação

### 1️⃣ Primeiro Acesso

1. **Acesse a interface web**: `https://paperless.suaempresa.com`
2. **Login**: Use as credenciais definidas em `PAPERLESS_ADMIN_USER/PASSWORD`
3. **Configurações iniciais**:
   - Vá em **Settings** → **General**
   - Configure timezone, idioma, etc.

### 2️⃣ Configurar API Token

```bash
# Via interface web
# Settings → API Tokens → Generate Token

# Ou via comando
docker-compose exec webserver python manage.py shell -c "
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
user = User.objects.get(username='admin')
token, created = Token.objects.get_or_create(user=user)
print(f'Token: {token.key}')
"
```

### 3️⃣ Configurar Consumo de Documentos

```bash
# Criar diretórios de consumo
sudo mkdir -p /opt/paperless-data/{consume,media,data,export}
sudo chown -R 1000:1000 /opt/paperless-data

# Configurar no docker-compose.env.local
echo "PAPERLESS_CONSUMPTION_DIR=/usr/src/paperless/consume" >> docker-compose.env.local

# Reiniciar para aplicar
docker-compose restart webserver
```

### 4️⃣ Configurar Backup Automático

```bash
# Criar script de backup
sudo tee /opt/paperless-ngx/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/paperless-backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup do banco de dados
docker-compose exec -T db pg_dump -U paperless paperless > $BACKUP_DIR/db_$DATE.sql

# Backup dos documentos
docker-compose exec -T webserver python manage.py document_exporter $BACKUP_DIR/documents_$DATE

# Compactar
tar -czf $BACKUP_DIR/paperless_backup_$DATE.tar.gz $BACKUP_DIR/db_$DATE.sql $BACKUP_DIR/documents_$DATE

# Limpar backups antigos (manter 7 dias)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup concluído: paperless_backup_$DATE.tar.gz"
EOF

# Tornar executável
sudo chmod +x /opt/paperless-ngx/backup.sh

# Configurar cron (backup diário às 2h)
echo "0 2 * * * /opt/paperless-ngx/backup.sh" | sudo crontab -
```

---

## 🔍 Testes e Validação

### 1️⃣ Teste de API

```bash
# Definir variáveis
API_URL="https://paperless.suaempresa.com/api"
API_TOKEN="seu-token-aqui"

# Testar autenticação
curl -H "Authorization: Token $API_TOKEN" $API_URL/documents/ | jq .

# Testar upload
curl -X POST \
  -H "Authorization: Token $API_TOKEN" \
  -F "document=@exemplo.pdf" \
  -F "title=Documento de Teste" \
  $API_URL/documents/post_document/
```

### 2️⃣ Teste de Integração Intranet

```bash
# Testar CORS
curl -H "Origin: https://intranet.suaempresa.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Authorization" \
     -X OPTIONS \
     $API_URL/documents/
```

### 3️⃣ Teste de Performance

```bash
# Monitorar recursos
docker stats --no-stream

# Testar tempo de resposta
time curl -s $API_URL/documents/ > /dev/null

# Verificar logs de erro
docker-compose logs --tail=50 webserver | grep ERROR
```

---

## 🚨 Solução de Problemas

### ❌ Problemas Comuns

#### 1. Container não inicia

```bash
# Verificar logs
docker-compose logs webserver

# Verificar recursos
df -h
free -h

# Reiniciar serviços
docker-compose restart
```

#### 2. Erro de permissão

```bash
# Corrigir permissões
sudo chown -R 1000:1000 /opt/paperless-data
sudo chmod -R 755 /opt/paperless-data
```

#### 3. Problema de SSL

```bash
# Verificar certificados
openssl x509 -in nginx/ssl/paperless.crt -text -noout

# Testar SSL
openssl s_client -connect paperless.suaempresa.com:443
```

#### 4. Erro de CORS

```bash
# Verificar configuração
grep CORS docker-compose.env.local

# Adicionar domínio
echo "PAPERLESS_CORS_ALLOWED_HOSTS=https://seu-novo-dominio.com" >> docker-compose.env.local
docker-compose restart webserver
```

### 🔧 Comandos de Manutenção

```bash
# Reindexar documentos
docker-compose exec webserver python manage.py document_index reindex

# Limpar cache
docker-compose exec redis redis-cli FLUSHALL

# Atualizar sistema
docker-compose pull
docker-compose up -d

# Verificar integridade do banco
docker-compose exec db psql -U paperless -c "\dt"
```

---

## 📊 Monitoramento

### 1️⃣ Health Checks

```bash
# Script de monitoramento
sudo tee /opt/paperless-ngx/monitor.sh << 'EOF'
#!/bin/bash

# Verificar API
if ! curl -f -s https://paperless.suaempresa.com/api/ > /dev/null; then
    echo "ERRO: API não responde"
    exit 1
fi

# Verificar banco
if ! docker-compose exec -T db pg_isready -U paperless > /dev/null; then
    echo "ERRO: Banco não responde"
    exit 1
fi

# Verificar espaço em disco
USAGE=$(df /opt/paperless-data | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $USAGE -gt 90 ]; then
    echo "AVISO: Disco com ${USAGE}% de uso"
fi

echo "Sistema OK"
EOF

sudo chmod +x /opt/paperless-ngx/monitor.sh
```

### 2️⃣ Logs Centralizados

```bash
# Configurar logrotate
sudo tee /etc/logrotate.d/paperless << 'EOF'
/opt/paperless-ngx/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF
```

---

## 🎯 Próximos Passos

1. **📚 Leia a documentação técnica**: [`DOCUMENTACAO_TECNICA.md`](DOCUMENTACAO_TECNICA.md)
2. **🧪 Teste os exemplos**: Pasta [`exemplos/`](exemplos/)
3. **🔧 Configure integrações**: Adapte para sua intranet
4. **📊 Configure monitoramento**: Implemente alertas
5. **👥 Treine usuários**: Documente processos internos

---

## 📞 Suporte

Se encontrar problemas durante a instalação:

- 📧 **Issues**: [GitHub Issues](https://github.com/ailtondba/integracao-intranet/issues)
- 📖 **Documentação**: [Paperless-NGX Docs](https://docs.paperless-ngx.com/)
- 💬 **Comunidade**: [Discord Paperless-NGX](https://discord.gg/paperless)

---

<div align="center">

**✅ Instalação concluída com sucesso!**

[⬆️ Voltar ao README](README.md) • [📖 Documentação Técnica](DOCUMENTACAO_TECNICA.md)

</div>
