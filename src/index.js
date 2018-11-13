import * as PIXI from 'pixi.js'

const SC_WIDTH = 500;
const SC_HEIGHT = 500;
const SC_BG_COLOR = 0x0000000;

const app = new PIXI.Application(SC_WIDTH, SC_HEIGHT, {
    backgroundColor : SC_BG_COLOR,
    preserveDrawingBuffer: true
});
const pixiview = document.getElementById('pixiview');
pixiview.textContent = null;
pixiview.appendChild(app.view);

// ----- 以下の部分が本題 -----

// ファイルアッップロード時のリスナーを登録
document.getElementById('uploadFile').addEventListener('change', evt => {
    // ファイルを読み取る
    const files = evt.target.files;
    if (!files.length) {
        console.log('error! file are not uploaded.');
        return;
    }
    // ImageとFileRaederを使ってアップロードされた画像を読み込む
    const image = new Image();
    const fr = new FileReader();
    // ファイルをdata urlとして読み込みます
    fr.readAsDataURL(files[0]);
    // ファイルをロードした後のイベントリスナを登録
    fr.onload = evt => {
        // base64に変換されたurlをimageのsrcに設定
        image.src = evt.target.result;
        // 画像をロードした後のイベントリスナを登録
        image.onload = () => {
            // アップロードした画像をtextureとして読み込みspriteに貼り付ける
            const loadTexture = new PIXI.Texture(new PIXI.BaseTexture(image));
            const loadSprite = new PIXI.Sprite(loadTexture);
            // 位置調整
            loadSprite.anchor.set(0.5);
            loadSprite.x = app.screen.width / 2;
            loadSprite.x = app.screen.height / 2;
            // 画面にスプライトを追加
            app.stage.addChild(loadSprite);
        };
    }
});
