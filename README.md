# Integração Paperless-NGX com Intranet Corporativa

## Visão Geral

Este projeto documenta as opções para integrar o sistema de busca do Paperless-NGX em uma intranet corporativa, permitindo que funcionários pesquisem documentos através de uma interface personalizada.

## Estrutura do Projeto

```
integracao-intranet/
├── README.md                    # Este arquivo
├── documentacao.md             # Documentação técnica detalhada
├── exemplos/
│   ├── busca-simples.html      # Exemplo básico de integração
│   ├── busca-avancada.html     # Exemplo com filtros avançados
│   └── api-examples.js         # Exemplos de uso da API
└── assets/
    └── styles.css              # Estilos para os exemplos
```

## Pré-requisitos

- Paperless-NGX rodando localmente (Docker ou instalação direta)
- PostgreSQL configurado e funcionando
- Servidor web para hospedar a intranet
- Token de API do Paperless-NGX configurado

## Opções de Integração

### 1. Integração via iframe (Simples)
- Incorpora a interface nativa do Paperless
- Menor desenvolvimento necessário
- Mantém todas as funcionalidades originais

### 2. Integração via API REST (Flexível)
- Interface personalizada na intranet
- Controle total sobre layout e funcionalidades
- Requer desenvolvimento frontend

## Configuração Rápida

1. **Obter Token de API**:
   - Acesse o Paperless-NGX em `http://localhost:8000`
   - Vá em Settings → API Tokens
   - Gere um novo token

2. **Configurar CORS** (se necessário):
   - Adicione `PAPERLESS_CORS_ALLOWED_HOSTS` no docker-compose.env

3. **Testar API**:
   ```bash
   curl -H "Authorization: Token SEU_TOKEN" http://localhost:8000/api/documents/
   ```

## Próximos Passos

1. Revisar a documentação técnica em `documentacao.md`
2. Testar os exemplos na pasta `exemplos/`
3. Escolher a abordagem mais adequada para sua intranet
4. Implementar a solução escolhida

## Considerações de Segurança

- Use HTTPS em produção
- Configure autenticação adequada
- Limite o acesso por IP se necessário
- Monitore o uso da API

## Suporte

Para dúvidas sobre a API do Paperless-NGX, consulte:
- [Documentação oficial da API](https://docs.paperless-ngx.com/api/)
- [GitHub do Paperless-NGX](https://github.com/paperless-ngx/paperless-ngx)