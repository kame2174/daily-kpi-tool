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

const UI = {

    input:null,

    reportTime:null,

    output1:null,

    output2:null,

    message:null

};

//======================================
// 起動処理
//======================================

window.addEventListener(
    "DOMContentLoaded",
    init
);

function init(){

    UI.input =
        document.getElementById("input");

    UI.reportTime =
        document.getElementById("reportTime");

    UI.output1 =
        document.getElementById("output1");

    UI.output2 =
        document.getElementById("output2");

    UI.message =
        document.getElementById("message");

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

        const result=[];

        APP.DEFAULT_KPI.forEach((item,index)=>{

            const data =
                getData(text,item.name);

            const rate =
                sim.actual===0
                ?0
                :data.actual/sim.actual*100;

            const need =
                Math.ceil(
                    sim.actual*
                    item.rate/
                    100
                );

            const gap =
                rate-item.rate;

            result.push({

                name:item.name,

                target:data.target,

                remain:data.remain,

                actual:data.actual,

                rate:rate,

                targetRate:item.rate,

                gap:gap,

                need:need

            });

        });

        makeOutput1(result,text);

		makeOutput2(result,text);

		showMessage("計算完了");

    }
    catch(e){

        showMessage(e.message);

    }

}

function clearInput(){

    UI.input.value="";

    UI.output1.innerText="計算待ち...";

    UI.output2.innerText="計算待ち...";

    showMessage("入力をクリアしました");

}

function copyOutput(outputId){

    const text =
        document.getElementById(outputId).innerText;

    navigator.clipboard.writeText(text);

    const buttonId =
        outputId === "output1"
        ? "copyOutput1"
        : "copyOutput2";

    const button =
        document.getElementById(buttonId);

    const original =
        button.innerText;

    button.innerText = "✅ コピーしました！";
    
    button.classList.add("copySuccess");

    setTimeout(function(){

        button.innerText = original;
        
        button.classList.remove("copySuccess");

    },800);

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

    UI.message.innerText=message;

}

function makeOutput1(result,text){

    const date =
        text.match(/\d+\/\d+/)[0];

    const time =
        UI.reportTime.value;

    let output = "";

    output += date + "単日付帯率\n";
    output += time + "時点\n\n";

    result.forEach(item=>{

        output +=
            "*" +
            item.name +
            "：" +
            item.rate.toFixed(1) +
            "%*\n";

    });

    output += "\n残数\n";

    result.forEach(item=>{

        if(item.actual > item.target){

            output +=
                "*" +
                item.name +
                "：+" +
                (item.actual-item.target) +
                "件*\n";

        }else{

            output +=
                "*" +
                item.name +
                "：" +
                item.remain +
                "件*\n";

        }

    });

    UI.output1.innerText=output;

}

function makeOutput2(result,text){

    const date =
        text.match(/\d+\/\d+/)[0];

    let output="";

    output += date + "単日注力KPI\n\n";

    result.forEach(item=>{

        output +=
            "*" +
            item.name +
            "：" +
            item.actual +
            "件(" +
            item.rate.toFixed(1) +
            "%)*\n";

        if(item.gap<0){

            output +=
                "→(目標との乖離：▲" +
                Math.abs(item.gap).toFixed(1) +
                "%)\n";

        }else{

            output +=
                "→(目標との乖離：+" +
                item.gap.toFixed(1) +
                "%)\n";

        }

        const lack =
            item.need-item.actual;

        if(lack>0){

            output +=
                "不足数：" +
                lack +
                "件";

        }else{

            output +=
                "達成：+" +
                Math.abs(lack) +
                "件";

        }

        output += "\n\n";

    });

    UI.output2.innerText=output;

}