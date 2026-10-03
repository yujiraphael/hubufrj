# Segurança Local-First — HubUFRJ

## Objetivo

Manter os dados acadêmicos sob controle do usuário, permitindo acesso pelo celular sem expor diretamente o banco de dados à internet.

## Arquitetura alvo

```
Celular
  ↓ HTTPS em rede privada
HubUFRJ / Next.js
  ↓ conexão local server-side
Banco local
```

O celular acessa a aplicação. Ele nunca recebe credenciais do banco e nunca abre conexão direta com SQLite/PostgreSQL.

## Modelo de ameaça do MVP

Proteger principalmente contra:
- varredura de portas e tentativas externas de conexão;
- roubo acidental de segredos via Git;
- vazamento de credenciais para o bundle do navegador;
- clickjacking e uso indevido de APIs do navegador;
- acesso de dispositivo não autorizado;
- perda do computador ou do arquivo de banco;
- backup sem criptografia.

## Regras de rede

- Não fazer port-forward da porta do banco.
- Não ativar UPnP para o banco.
- Banco deve aceitar apenas conexões locais ou de rede interna explicitamente controlada.
- Para acesso pelo celular, preferir Tailscale com política de menor privilégio.
- Expor somente a porta HTTPS da aplicação dentro da rede privada.
- Autenticação do Hub continua obrigatória mesmo dentro da VPN.

## Autenticação

Na etapa de persistência:
- senha nunca armazenada em texto puro;
- hash moderno e resistente a brute force;
- cookie de sessão HttpOnly;
- Secure quando servido por HTTPS;
- SameSite adequado;
- rotação/invalidação de sessão;
- rate limiting no login;
- mensagens de erro que não revelem existência de conta.

## Banco local

A implementação inicial deve privilegiar simplicidade e superfície de ataque mínima.
O banco não é uma API. Ele é uma dependência privada do servidor.

Arquivos de banco, WAL, dumps e backups ficam fora do Git.

## Segredos

Permitidos somente em variáveis de ambiente server-side:
- DATABASE_URL;
- SESSION_SECRET;
- chaves futuras de storage/integradores.

Nunca usar `NEXT_PUBLIC_` para segredos.

## Backup

Antes de considerar o MVP seguro:
1. criar rotina de backup;
2. criptografar o backup;
3. manter pelo menos uma cópia separada do host;
4. testar restauração;
5. documentar a recuperação.

## Checklist antes de liberar acesso móvel

- [ ] autenticação real ativa;
- [ ] banco não escuta interface pública;
- [ ] nenhuma porta do banco aberta no roteador;
- [ ] aplicação acessível via HTTPS/rede privada;
- [ ] política Tailscale limitada aos dispositivos/usuários autorizados;
- [ ] secrets fora do Git;
- [ ] headers de segurança ativos;
- [ ] dependências auditadas;
- [ ] backup criptografado testado;
- [ ] logs sem tokens, cookies ou credenciais.

## Próxima etapa

Conectar uma implementação real de `SubjectRepository` ao banco local e inserir somente dados acadêmicos confirmados pelo usuário.
