import { getImageData } from "./module.js";

const moduleNames = ['toGrayscale', 'invertColors', 'edgeDetection', 'sharp', 'Blur'];
const moduleURL = './modules/'; // モジュールが存在するディレクトリのパス

const modules = {};

async function importModules() {
  for (let i = 0; i < moduleNames.length; i++) {
    const moduleName = moduleNames[i];
    const modulePath = `${moduleURL}${moduleName}.js`;
    console.log(`Importing module from: ${modulePath}`);
    const module = await import(modulePath);
    modules[i] = module.default; // デフォルトエクスポートを取得
  }
}

// モジュールをインポート
await importModules(); // ここでimportModules関数を呼び出して、モジュールをインポートします

// HTML要素とのリンク付け
const fileInput = document.getElementById('fileInput');
const imageDataText = document.getElementById('imageDataText');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 実行するモジュールのナンバーが書かれた変数
const moduleChose = [];
const moduleChoseNum = [];

// リストボックスに項目を追加
const moduleList = document.getElementById('moduleList');
moduleNames.forEach(module => {
    const option = document.createElement('option');
    option.value = module;
    option.text = module;
    moduleList.appendChild(option);
});

let listCircumstance = 0;

// 項目がクリックされたときの処理
moduleList.addEventListener('click', () => {
    if (listCircumstance === 0) {
        listCircumstance = 1;
    } else if (listCircumstance === 1) {
        const selectedModule = moduleList.value;
        const selectedIndex = moduleList.selectedIndex;
        moduleChose.push(selectedModule);
        moduleChoseNum.push(selectedIndex);
        console.log(moduleChoseNum);
        document.getElementById('selectedText').innerText = moduleChose;
        listCircumstance = 0;
        executeModules(); // モジュールを実行してキャンバスを更新
    }
});

// マウスカーソルがオブジェクトから離れたときの処理
moduleList.addEventListener('mouseleave', () => {
    listCircumstance = 0;
});

// 消去ボタンが押されたときの処理
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('selectedText').innerText = '';
    moduleChose.length = 0; // 配列を空にする
    moduleChoseNum.length = 0;
    executeModules(); // モジュールを実行してキャンバスを更新
}); // UI終

// ファイル選択されたら、、、
fileInput.addEventListener('change', async function(e) {
    const file = e.target.files[0];
    const { imageData } = await getImageData(file);

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let ImageData = imageData; // 初期のイメージデータ

    // moduleChose 配列に基づいてモジュールを実行
    for (let i = 0; i < moduleChoseNum.length; i++) {
        const moduleNumber = moduleChoseNum[i];
        ImageData = modules[moduleNumber](ImageData)
    }
  
    // イメージデータのtxt表示と画像表示
    /*const text = ImageData.data.join(', ');
    imageDataText.textContent = text; */
  
    canvas.width = imageData.width; // imageData内のキャンバスサイズをひとまず使う
    canvas.height = imageData.height;
    ctx.putImageData(ImageData, 0, 0);
});

// モジュールを実行してキャンバスを更新する関数
async function executeModules() {
    const file = fileInput.files[0];
    if (!file) return;

    const { imageData } = await getImageData(file);

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let ImageData = imageData; // 初期のイメージデータ

    // moduleChose 配列に基づいてモジュールを実行
    for (let i = 0; i < moduleChoseNum.length; i++) {
        const moduleNumber = moduleChoseNum[i];
        ImageData = modules[moduleNumber](ImageData)
      }
  
    // イメージデータのtxt表示と画像表示
    /*const text = ImageData.data.join(', ');
    imageDataText.textContent = text; */
  
    canvas.width = imageData.width; // imageData内のキャンバスサイズをひとまず使う
    canvas.height = imageData.height;
    ctx.putImageData(ImageData, 0, 0);
}
