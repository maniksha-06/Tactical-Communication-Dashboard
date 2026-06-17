async function updateDashboard() {

    const response = await fetch('/live-data');

    const data = await response.json();

    document.getElementById("signal-value").innerText =
        data.signal_strength + "%";

    document.getElementById("units-value").innerText =
        data.active_units + " CONNECTED";

    document.getElementById("threat-value").innerText =
        data.threat;
}

setInterval(updateDashboard, 3000);
const alerts = [

    "🚨 HIGH THREAT DETECTED",

    "⚠ Unauthorized Signal Activity",

    "🛰 Satellite Link Stable",

    "🔒 Secure Communication Active",

    "📡 Monitoring Enemy Frequency",

    "🚨 Intrusion Attempt Blocked"

];

function updateAlerts(){

    const randomAlert =
        alerts[Math.floor(Math.random() * alerts.length)];

    document.getElementById("alert-box").innerText =
        randomAlert;
}

setInterval(updateAlerts, 4000);
const unitA = document.querySelector(".unit1");
const unitB = document.querySelector(".unit2");
const unitC = document.querySelector(".unit3");

let position = 80;
let direction = 1;

setInterval(() => {
    position += direction * 5;

    if(position > 500){
        direction = -1;
    }

    if(position < 80){
        direction = 1;
    }

    unitA.style.left = position + "px";

unitB.style.left = (position - 120) + "px";

unitC.style.left = "80px";
}, 100);
setInterval(() => {

    const threatValue =
        document.getElementById("threat-value");

    const alertBox =
        document.getElementById("alert-box");

    const accessCount =
        document.getElementById("access-count");

    if(position > 450){

        threatValue.innerText = "HIGH";

        threatValue.style.color = "red";

        alertBox.innerText =
            "🚨 ENEMY MOVEMENT DETECTED";

        accessCount.innerText =
            "3 DETECTED";
document.querySelector(".danger-zone").style.background = "rgba(255,0,0,0.5)";
    }

    else{

    threatValue.innerText = "LOW";
    threatValue.style.color = "lime";

    accessCount.innerText =
        "0 DETECTED";

   document.querySelector(".danger-zone").style.background = "rgba(0,255,0,0.2)";
}
},100);
function updateIntelBriefing() {

    document.getElementById("defence-update").innerText =
        "Defence surveillance systems operating normally.";

    document.getElementById("threat-update").innerText =
        "Threat level LOW. No hostile units near Base HQ.";

    document.getElementById("mission-update").innerText =
        "3 patrol units active. Communication link stable.";
}

setInterval(updateIntelBriefing, 5000);
updateIntelBriefing();
const threatLevels = ["LOW", "MEDIUM", "HIGH"];
const recommendations = [
    "Continue Surveillance",
    "Deploy BRAVO for Reconnaissance",
    "Deploy CHARLIE for Rapid Response"
];

function updateAIAnalysis() {

    if(position > 450){

        document.querySelector(".ai-panel p:nth-child(2)").innerHTML =
        "<strong>Threat Level:</strong> HIGH";

        document.querySelector(".ai-panel p:nth-child(5)").innerHTML =
        "<strong>Recommendation:</strong> Deploy CHARLIE for Rapid Response";

    }
    else{

        document.querySelector(".ai-panel p:nth-child(2)").innerHTML =
        "<strong>Threat Level:</strong> LOW";

        document.querySelector(".ai-panel p:nth-child(5)").innerHTML =
        "<strong>Recommendation:</strong> Continue Surveillance";
    }
}

setInterval(updateAIAnalysis, 8000);
const intelUpdates = [
    "Alpha Unit completed patrol sweep.",
    "Drone surveillance active in Sector Delta.",
    "Communication relay synchronized.",
    "Bravo Unit monitoring eastern perimeter.",
    "Suspicious signal detected near Threat Zone.",
    "Thermal scan completed successfully.",
    "All tactical channels encrypted."
];

function updateIntelFeed(){

    const intelLog =
        document.getElementById("intel-log");

    if(position > 450){

        intelLog.innerText =
            "🚨 Alpha Unit entered Threat Zone. Enemy movement detected.";
document.querySelector(".unit2").style.left = "900px";
document.querySelector(".unit2").style.top = "50px";
document.querySelector(".unit3").style.left = "1000px";
document.querySelector(".unit3").style.top = "300px";

    }
    else{

        intelLog.innerText =
            "🛰 Alpha Unit patrolling sector. Area secure.";
document.querySelector(".unit2").style.left = "250px";
document.querySelector(".unit2").style.top = "150px";
document.querySelector(".unit3").style.left = "80px";
document.querySelector(".unit3").style.top = "80px";
    }
}

setInterval(updateIntelFeed,5000);
async function sendMessage() {

    let message =
        document.getElementById("user-input").value;

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    document.getElementById("chat-box").innerHTML =
    "<b>AI:</b> Thinking...";

const data = await response.json();

setTimeout(() => {
    document.getElementById("chat-box").innerHTML =
        "<b>AI:</b> " + data.response;
}, 1000);

    document.getElementById("user-input").value = "";
}
