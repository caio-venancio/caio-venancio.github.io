// SpectatorScene.ts
import Phaser from 'phaser'
import { EventBus } from '../EventBus'

type Ctx = {
  main: Phaser.Scene & {
    cameras: Phaser.Cameras.Scene2D.CameraManager
    player?: Phaser.Physics.Arcade.Sprite
    playersGroup?: Phaser.GameObjects.Group
    respawnAt?: (x: number, y: number) => void
  }
}

export default class SpectatorScene extends Phaser.Scene {
  private ctx!: Ctx
  private backdrop!: Phaser.GameObjects.Rectangle
  private panel!: Phaser.GameObjects.Rectangle
  private titleTxt!: Phaser.GameObjects.Text
  private infoTxt!: Phaser.GameObjects.Text
  private hintTxt!: Phaser.GameObjects.Text
  private btnRespawn!: Phaser.GameObjects.Text
  private btnMenu!: Phaser.GameObjects.Text

  private spectatable: Phaser.GameObjects.Sprite[] = []
  private currentIndex = 0

  constructor() {
    super({ key: 'SpectatorUI' })
  }

  init(data: Ctx) {
    // recebe a MainGame por parâmetro: this.scene.launch('SpectatorUI', { main: this });
    this.ctx = data
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    // === fundo semi-transparente (não se move com a câmera) ===
    this.backdrop = this.add
      .rectangle(0, 0, w, h, 0x000000, 0.45)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(1000)

    // === painel central ===
    const pw = Math.min(520, Math.floor(w * 0.9))
    const ph = 220
    this.panel = this.add
      .rectangle(w / 2, h / 2, pw, ph, 0x111111, 0.85)
      .setStrokeStyle(2, 0xffffff, 0.22)
      .setDepth(1001)
      .setScrollFactor(0)

    this.titleTxt = this.add
      .text(w / 2, h / 2 - ph / 2 + 28, 'MODO ESPECTADOR', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5)
      .setDepth(1002)
      .setScrollFactor(0)

    // monta a lista de alvos espectáveis (outros players/NPCs, etc.)
    this.spectatable = this.getSpectatableTargets()
    if (this.spectatable.length === 0) {
      // fallback: nada para seguir
      this.spectatable = []
    }

    this.infoTxt = this.add
      .text(w / 2, h / 2 - 12, this.getInfoLine(), {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#dddddd',
        wordWrap: { width: pw - 40 },
        align: 'center',
      })
      .setOrigin(0.5, 0.5)
      .setDepth(1002)
      .setScrollFactor(0)

    this.hintTxt = this.add
      .text(
        w / 2,
        h / 2 + 18,
        '← / → troca alvo   •   ENTER: Respawn   •   ESC: Menu',
        { fontFamily: 'monospace', fontSize: '14px', color: '#bbbbbb' },
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1002)
      .setScrollFactor(0)

    // === “botões” simples com Text interativo ===
    this.btnRespawn = this.addBtn(w / 2 - 90, h / 2 + ph / 2 - 36, '[ Respawn ]', () => {
      this.handleRespawn()
    })

    this.btnMenu = this.addBtn(w / 2 + 90, h / 2 + ph / 2 - 36, '[ Voltar ao Menu ]', () => {
      this.handleBackToMenu()
    })

    // === atalhos de teclado ===
    this.input.keyboard!.on('keydown-LEFT', () => this.stepTarget(-1))
    this.input.keyboard!.on('keydown-RIGHT', () => this.stepTarget(1))
    this.input.keyboard!.on('keydown-ENTER', () => this.handleRespawn())
    this.input.keyboard!.on('keydown-ESC', () => this.handleBackToMenu())

    // se houver um alvo válido, segue já de início
    this.followCurrentTarget()
  }

  // cria um "botão" de texto padrão
  private addBtn(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Text {
    const t = this.add
      .text(x, y, label, {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#222222',
        padding: { left: 8, right: 8, top: 4, bottom: 4 },
      })
      .setOrigin(0.5, 0.5)
      .setDepth(1002)
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true })

    t.on('pointerover', () => t.setStyle({ backgroundColor: '#2a2a2a' }))
    t.on('pointerout', () => t.setStyle({ backgroundColor: '#222222' }))
    t.on('pointerup', onClick)
    return t
  }

  // descobre quem dá pra seguir (sem any)
  private getSpectatableTargets(): Phaser.GameObjects.Sprite[] {
    const { main } = this.ctx
    const list: Phaser.GameObjects.Sprite[] = []

    // 1) preferir um grupo de players (multiplayer)
    const group = main.playersGroup
    if (group) {
      group.getChildren().forEach((obj) => {
        if (obj instanceof Phaser.GameObjects.Sprite && obj.active && obj.visible) {
          list.push(obj)
        }
      })
    }

    // 2) se não tiver grupo, tenta o player principal
    if (list.length === 0 && main.player) {
      const p = main.player
      if (p.active && p.visible) list.push(p)
    }

    // 3) poderia também procurar por tags, layers, etc.
    return list
  }

  private stepTarget(delta: number) {
    if (this.spectatable.length === 0) return
    this.currentIndex = (this.currentIndex + delta + this.spectatable.length) % this.spectatable.length
    this.followCurrentTarget()
    this.refreshInfo()
  }

  private followCurrentTarget() {
    if (this.spectatable.length === 0) return
    const target = this.spectatable[this.currentIndex]
    this.ctx.main.cameras.main.startFollow(target, true, 0.1, 0.1)
  }

  private getInfoLine(): string {
    if (this.spectatable.length === 0) return 'Nenhum alvo disponível para espectar.'
    const target = this.spectatable[this.currentIndex]
    const name = target.name && target.name.length > 0
      ? target.name
      : `Entidade #${this.currentIndex + 1}`
    return `Espectando: ${name}  (${this.currentIndex + 1}/${this.spectatable.length})`
  }

  private refreshInfo() {
    this.infoTxt.setText(this.getInfoLine())
  }

  private handleRespawn() {
    // Se a sua MainGame expõe um método de respawn:
    if (this.ctx.main.respawnAt) {
      this.ctx.main.respawnAt(450, 300) // ajuste spawn point
    } else {
      // fallback: reativa player básico, se exposto
      const me = this.ctx.main.player
      if (me?.body) {
        const body = me.body as Phaser.Physics.Arcade.Body
        body.enable = true
        me.setAlpha(1).clearTint().setActive(true).setVisible(true).setPosition(100, 100)
        this.ctx.main.cameras.main.startFollow(me)
        EventBus.emit('hp:update', 100)
      }
    }

    // fecha o overlay
    this.scene.stop()
  }

  private handleBackToMenu() {
    // encerra a cena principal e volta ao menu/lobby
    this.ctx.main.scene.stop()
    this.scene.stop()
    this.scene.start('MainGame')
  }

  shutdown() {
    // limpeza de listeners se necessário
    this.input.keyboard?.removeAllListeners()
  }

  // destroy() {
  //   super.destroy(true)
  // }
}
