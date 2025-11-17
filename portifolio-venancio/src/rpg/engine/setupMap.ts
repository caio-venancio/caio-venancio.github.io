// engine/setupMap.ts
import { GameScene } from '../scenes/GameScene'; // ajuste o caminho se precisar

// você pode tipar direto com GameScene:
export function setupMap(scene: GameScene) {
  // 1) criar o tilemap a partir do JSON
  const map = scene.make.tilemap({ key: "map" });

  // debug: listar tilesets presentes no JSON
  console.debug("map.tilesets:", map.tilesets.map(ts => ts.name));

  // tenta usar o nome esperado; se não existir, usa o primeiro tileset do JSON
  let tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  if (!tileset && map.tilesets.length > 0) {
    const fallbackName = map.tilesets[0].name;
    console.warn(
      `Tileset 'tuxmon-sample-32px' não encontrado no map.json — usando '${fallbackName}' como fallback`
    );
    tileset = map.addTilesetImage(fallbackName, "tiles");
  }

  if (!tileset) {
    throw new Error(
      "Tileset não encontrado: verifique o nome do tileset no JSON e a chave do asset carregado."
    );
  }

  scene.belowLayer = map.createLayer("Below Player", tileset, 0, 0)!;
  scene.worldLayer = map.createLayer("World", tileset, 0, 0)!;
  scene.aboveLayer = map.createLayer("Above Player", tileset, 0, 0)!;

  if (!scene.worldLayer) {
    throw new Error("WorldLayer não retornado por map.createLayer");
  } else if (!scene.aboveLayer) {
    throw new Error("AboveLayer não retornado por map.createLayer");
  }

  scene.aboveLayer.setDepth(10);
  scene.worldLayer.setCollisionByProperty({ collides: true });

    // -------- Sempre que quiser ver as colisões atuais, descomente: -------
    // const debugGraphics = scene.add.graphics().setAlpha(0.75);
    // scene.worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
}
