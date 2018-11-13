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

// ファイルアップロードイベント登録
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
    // ファイルをロードした後のコールバックを登録
    fr.onload = evt => {
        // 画像をロードした後のコールバックを登録
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
        // base64に変換されたurlをimageのsrcに設定
        // 読み込み後先ほど登録したコールバックが実行されます
        image.src = evt.target.result;
    }
    // ファイルをdata urlとして読み込みます
    // 読み込み後先ほど設定したコールバックが実行されます
    fr.readAsDataURL(files[0]);
});
