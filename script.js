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

    showMessage(
        "Daily KPI Dashboard Ready."
    );

}

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