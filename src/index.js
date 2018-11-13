import * as PIXI from 'pixi.js'

const SC_WIDTH = 500;
const SC_HEIGHT = 500;
const SC_BG_COLOR = 0x0000000;

// pixiアプリケーション作成
const app = new PIXI.Application(SC_WIDTH, SC_HEIGHT, {
    backgroundColor : SC_BG_COLOR,
    preserveDrawingBuffer: true
});

// ファイルアップロードイベント登録
document.getElementById('uploadFile').addEventListener('change', evt => {
    // ファイルを読み取る
    const files = evt.target.files;
    if (!files.length) {
        console.log('error! file are not uploaded.');
        return;
    }
    // ImageとFileRaederを使って画像を読み込む
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
        // base64に変換したものをimageのsrcとして登録
        image.src = evt.target.result;
    }
    fr.readAsDataURL(files[0]);
});

const pixiview = document.getElementById('pixiview');
// 開発環境用対応に子要素を全て削除
pixiview.textContent = null;
// pixiviewにcanvasのdomを追加
pixiview.appendChild(app.view);
