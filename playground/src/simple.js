
const geomList = ['box', 'sphere', 'cylinder', 'cone', 'torus', 'capsule'];

const scene = new cc.Scene();
const cameraNode = new cc.Node('Camera');
cameraNode.parent = scene;
cameraNode.setPosition(-2.2, 3.6, -5.3);
cameraNode.setRotationFromEuler(-13.6, -165.5, 0);
cameraNode.addComponent(FirstPersonCamera);
const camComp = cameraNode.addComponent(cc.CameraComponent);

const skybox = scene.globals.skybox;
skybox.enabled = true;
camComp.clearFlags = cc.CameraComponent.CameraClearFlag.SKYBOX;

const lightNode = new cc.Node('Light');
lightNode.parent = scene;
lightNode.setRotationFromEuler(-40, 0, 0);
lightNode.addComponent(cc.DirectionalLightComponent);

// parsed effect file is embedded in cocos/3d/builtin/effects.js
const material = new cc.Material();
material.initialize({
  /* *
  effectName: 'builtin-standard',
  /* */
  effectName: 'builtin-unlit',
  defines: { USE_COLOR: true },
  /* */
});

const len = 50;
const models = [], passes = [];
const color = cc.color();
for (let i = 0; i < len; i++) {
  const modelNode = new cc.Node(`${i}`);
  modelNode.parent = scene;
  const modelCom = modelNode.addComponent('cc.ModelComponent');
  modelCom.material = material;
  modelCom.mesh = cc.utils.createMesh(cc.primitives[geomList[i % geomList.length]]());
  modelNode.setPosition(0, 0, i * 2);
  models.push(modelNode);
  // material instance initialized here
  passes.push(modelCom.material.passes[0]);
}
const handle = passes[0].getHandle('mainColor');

const canvasNode = new cc.Node('Canvas');
canvasNode.parent = scene;
canvasNode.addComponent(cc.CanvasComponent);

const spriteNode = new cc.Node('test-sprite');
spriteNode.parent = canvasNode;
const spriteComp = spriteNode.addComponent('cc.SpriteComponent');
spriteComp.sizeMode = cc.SpriteComponent.SizeMode.CUSTOM;
spriteNode.getComponent('cc.UITransformComponent').contentSize = cc.size(64, 64);
const widgetComp = spriteNode.addComponent(cc.WidgetComponent);
widgetComp.isAlignBottom = widgetComp.isAlignLeft = true;
widgetComp.bottom = widgetComp.left = 10;

const img = document.createElement('img');
img.src = './common/texture.png';
img.onload = () => {
  const textureCube = new cc.TextureCube();
  textureCube.image = {
    right:  new cc.ImageAsset(img),
    left:   new cc.ImageAsset(img),
    top:    new cc.ImageAsset(img),
    bottom: new cc.ImageAsset(img),
    front:  new cc.ImageAsset(img),
    back:   new cc.ImageAsset(img),
  };
  skybox.envmap = textureCube;
  const texture = new cc.Texture2D();
  texture.image = new cc.ImageAsset(img);
  const originalSize = cc.size(img.width, img.height);
  const rect = cc.rect(0, 0, img.width, img.height);
  const spriteFrame = new cc.SpriteFrame();
  spriteFrame.reset({ texture, originalSize, rect });
  spriteComp.spriteFrame = spriteFrame;
};

const material2 = new cc.Material();
material2.initialize({ effectName: 'builtin-standard' });
const modelNode2 = new cc.Node('test2');
modelNode2.parent = scene;
const modelCom2 = modelNode2.addComponent('cc.ModelComponent');
modelCom2.material = material2;
const shape2 = cc.primitives.sphere();
modelCom2.mesh = cc.utils.createMesh(shape2);

let buttonDown = false, pos = cc.v2();
cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, (e) => buttonDown = true);
cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, (e) => buttonDown = false);
cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, (e) => e.getLocation(pos));

cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, () => {
  if (buttonDown) {
    const ray = camComp.screenPointToRay(pos.x, pos.y);
    const scene = cc.director.getScene().renderScene;
    const res = scene.raycastAllModels(ray);
    if (res) scene.rayResultModels.forEach((r) => console.log(r.node.name, r.distance));
  }
  models.forEach((m, i) => {
    const dt = cc.director._deltaTime;
    const t = cc.director._totalFrames / (60);
    const rad = i * Math.PI * 8 / len;
    const x = Math.cos(rad + t), y = Math.sin(rad + t);
    let z = m.position.z + dt; if (z > len * 2) z = 0;
    m.setPosition(x * 2, y * 2, z);
    color.fromHSV((x + 1) * 0.5, 0.5, 1);
    passes[i].setUniform(handle, color);
  });
});

cc.director.runSceneImmediate(scene);
