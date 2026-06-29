/* =====================================
   Daily KPI Dashboard
   Version 2.1.0
   Created by kame2174
===================================== */

//======================================
// アプリ設定
//======================================

const APP = {

    VERSION: "2.1.0",

    STORAGE_KEY: "daily-kpi-dashboard",

    DEFAULT_KPI: [

        {
            name: "カケホ",
            rate: 35
        },

        {
            name: "最強保護",
            rate: 30
        },

        {
            name: "U-NEXT",
            rate: 13
        }

    ]

};

//======================================
// 起動処理
//======================================

window.addEventListener(
    "DOMContentLoaded",
    init
);

function init(){

    loadSetting();

    bindEvents();

    showMessage("Ready.");

}

//======================================
// イベント登録
//======================================

function bindEvents(){

    document
        .getElementById("calcBtn")
        .addEventListener(
            "click",
            calc
        );

    document
        .getElementById("clearBtn")
        .addEventListener(
            "click",
            clearInput
        );

    document
        .getElementById("copyOutput1")
        .addEventListener(
            "click",
            () => copyOutput("output1")
        );

    document
        .getElementById("copyOutput2")
        .addEventListener(
            "click",
            () => copyOutput("output2")
        );

    document
        .getElementById("saveBtn")
        .addEventListener(
            "click",
            saveSetting
        );

    document
        .getElementById("resetBtn")
        .addEventListener(
            "click",
            resetSetting
        );

}

//======================================
// 仮処理
//======================================

function calc(){

    try{

        const text =
            document
            .getElementById("input")
            .value;

        const sim =
            getData(text,"SIM");

        console.log(sim);

        showMessage("解析成功！");

    }
    catch(e){

        showMessage(e.message);

    }

}

function clearInput(){

    document.getElementById("input").value="";

    showMessage("入力をクリアしました");

}

function copyOutput(id){

    const text =
        document.getElementById(id).innerText;

    navigator.clipboard.writeText(text);

    showMessage("コピーしました");

}

function saveSetting(){

    if(!document.getElementById("saveSetting").checked){

        showMessage("保存をスキップしました");

        return;

    }

    const kpi = [

        {
            name:"カケホ",
            rate:Number(document.getElementById("rate0").value)
        },

        {
            name:"最強保護",
            rate:Number(document.getElementById("rate1").value)
        },

        {
            name:"U-NEXT",
            rate:Number(document.getElementById("rate2").value)
        }

    ];

    localStorage.setItem(

        APP.STORAGE_KEY,

        JSON.stringify(kpi)

    );

    showMessage("✅ KPI設定を保存しました");

}

function resetSetting(){

    document.getElementById("rate0").value=35;
    document.getElementById("rate1").value=30;
    document.getElementById("rate2").value=13;

    localStorage.removeItem(APP.STORAGE_KEY);

    showMessage("初期設定へ戻しました");

}

function getData(text, name){

    const targetMatch =
        text.match(
            new RegExp(name + "目標(\\d+)件")
        );

    const remainMatch =
        text.match(
            new RegExp(
                name +
                "目標\\d+件☆\\s*残([+]?\\d+)件"
            )
        );

    if(!targetMatch){

        throw new Error(
            name + " が見つかりません"
        );

    }

    if(!remainMatch){

        throw new Error(
            name + " が見つかりません"
        );

    }

    const target =
        Number(targetMatch[1]);

    const remainText =
        remainMatch[1];

    let remain;
    let actual;

    if(remainText.startsWith("+")){

        remain =
            Number(remainText.substring(1));

        actual =
            target + remain;

    }else{

        remain =
            Number(remainText);

        actual =
            target - remain;

    }

    return{

        target,

        remain,

        actual

    };

}

function loadSetting(){

    const data = localStorage.getItem(APP.STORAGE_KEY);

    if(data==null){

        return;

    }

    const kpi = JSON.parse(data);

    document.getElementById("rate0").value=kpi[0].rate;
    document.getElementById("rate1").value=kpi[1].rate;
    document.getElementById("rate2").value=kpi[2].rate;

}

function showMessage(message){

    document
        .getElementById("message")
        .innerText = message;

}