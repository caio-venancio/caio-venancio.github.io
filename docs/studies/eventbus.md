# Sobre o eventbus

## O que é o EventBus?
No seu código, o EventBus funciona como um canal de comunicação central — uma espécie de mensageiro — que permite que partes diferentes do seu jogo (como componentes React e cenas do Phaser) enviem e escutem eventos umas das outras sem depender diretamente umas das outras.

```
import { Events } from 'phaser';

// Used to emit events between components, HTML and Phaser scenes
export const EventBus = new Events.EventEmitter();
```
Aqui é criado o EventBus com base no EventEmitter do Phaser (que é parecido com o EventEmitter do Node.js).
Ele permite fazer duas operações principais:
emitir eventos: EventBus.emit('evento', dados)
escutar eventos: EventBus.on('evento', callback)

O EventBus:
É um objeto compartilhado que todos os arquivos podem usar.
Facilita a comunicação desacoplada entre partes do código.
É muito útil para ligar o React (interface) ao Phaser (motor do jogo) sem que um conheça diretamente o outro.