# Traço Mágico

App infantil (PWA) para ensinar o traçado correto das letras bastão e dos números.

**Jogar online:** [https://flpgst.github.io/traco-magico/](https://flpgst.github.io/traco-magico/)

## Como usar no celular

1. Abra o app no navegador do celular (Chrome ou Safari).
2. No Chrome: menu → **Adicionar à tela inicial** / **Instalar app**.
3. No iPhone (Safari): Compartilhar → **Adicionar à Tela de Início**.
4. Pronto — funciona como um app, inclusive offline depois da primeira abertura.

## Como jogar

1. Escolha **Alfabeto** ou **Números**.
2. Toque em uma letra/número.
3. Comece na **bolinha vermelha** e siga a **setinha**.
4. Acertou o traço → brilha e avança.
5. Errou → o app balança de leve e pede para tentar de novo.
6. Completou a letra → **Parabéns!** e estrelas ⭐

A dica 💡 mostra o caminho uma vez.

## Publicação (GitHub Pages)

O site é publicado automaticamente em `main` via GitHub Actions.

Se ainda não estiver no ar, ative uma vez em
[Settings → Pages](https://github.com/flpgst/traco-magico/settings/pages):
**Source** = **GitHub Actions**.

## Rodar no computador

```bash
cd traco-magico
python3 -m http.server 8080
```

Abra `http://localhost:8080` (no celular da mesma rede, use o IP do computador).
