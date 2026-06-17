from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import random
import re

app = Flask(__name__)
app.secret_key = "tacticomm_secret_key"

# Login credentials
ACCESS_KEY = "TAC-7821"

# Global variables for AI Assistant
current_threat = "LOW"
current_units = 10
alpha_position = "Unknown"
bravo_position = "Unknown"
charlie_position = "Unknown"

@app.route("/", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        officer_id = request.form["officer_id"]
        access_key = request.form["access_key"]

        pattern = r'^[A-Z]{3}-\d{4}$'

        if re.match(pattern, officer_id) and access_key == ACCESS_KEY:

            session["logged_in"] = True
            return redirect(url_for("dashboard"))

        else:
            return "ACCESS DENIED"

    return render_template("login.html")


@app.route("/dashboard")
def dashboard():

    if not session.get("logged_in"):
        return redirect(url_for("login"))

    signal_strength = random.randint(50, 100)
    active_units = random.randint(8, 20)

    threat_levels = ["LOW", "MEDIUM", "HIGH"]
    threat = random.choice(threat_levels)

    return render_template(
        "home.html",
        signal_strength=signal_strength,
        active_units=active_units,
        threat=threat
    )


@app.route("/logout")
def logout():

    session.clear()
    return redirect(url_for("login"))


@app.route("/live-data")
def live_data():

   
    global current_threat, current_units
    global alpha_position, bravo_position, charlie_position
    signal_strength = random.randint(50, 100)
    active_units = random.randint(8, 20)

    threat_levels = ["LOW", "MEDIUM", "HIGH"]
    alpha_positions = [
         "Eastern Patrol Sector",
         "Threat Zone Perimeter",
         "Forward Observation Point"
]

    bravo_positions = [
         "Recon Sector",
         "Northern Ridge",
         "Threat Zone"
]

    charlie_positions = [
        "Base HQ",
        "Rapid Response Point",
        "Reserve Sector"
]

    alpha_position = random.choice(alpha_positions)
    bravo_position = random.choice(bravo_positions)
    charlie_position = random.choice(charlie_positions)
    current_threat = random.choice(threat_levels)
    current_units = active_units
    return {
            "signal_strength": signal_strength,
            "active_units": active_units,
            "threat": current_threat,
            "alpha": alpha_position,
            "bravo": bravo_position,
            "charlie": charlie_position
    }


@app.route("/chat", methods=["POST"])
def chat():
    global alpha_position, bravo_position, charlie_position
    global current_threat, current_units
    user_message = request.json.get("message", "").lower()
    if user_message in ["hi", "hello", "hey"]:
       response = "Welcome to Tactical Command Center. How can I assist you today?"

    elif "good morning" in user_message:
        response = "Good morning, Commander. All systems are operational."

    elif "who are you" in user_message:
        response = "I am the Tactical Command AI Assistant. I can provide unit status, threat analysis, mission updates, and intelligence reports."

    elif "help" in user_message:
        response = (
        "Available Commands:\n"
        "- threat\n"
        "- status\n"
        "- mission\n"
        "- units\n"
        "- where is alpha\n"
        "- where is bravo\n"
        "- where is charlie\n"
        "- situation"
    )

    elif "threat" in user_message:
    
        response = f"Current threat level is {current_threat}. Threat zone is under surveillance."

    elif "alpha" in user_message:
        response = "Alpha Unit is conducting forward patrol operations."

    elif "bravo" in user_message:
        response = "Bravo Unit is performing reconnaissance."

    elif "charlie" in user_message:
        response = "Charlie Unit is on standby for rapid deployment."

    elif "base" in user_message:
        response = "Base HQ is secure and communication systems are operational."

    elif "units" in user_message:
        response = f"There are currently {current_units} active units in the field."
    elif "where is alpha" in user_message:
         response = f"Alpha Team current location: {alpha_position}"

    elif "where is bravo" in user_message:
        response = f"Bravo Team current location: {bravo_position}"

    elif "where is charlie" in user_message:
        response = f"Charlie Team current location: {charlie_position}"

    elif "status" in user_message:
         response = f"Threat Level: {current_threat}. Base HQ secure. {current_units} active units deployed."

    elif "mission" in user_message:
         response = "Mission objective: Monitor hostile activity and protect tactical sectors."       
    elif "situation" in user_message:
        response = (
            "Situation Report: "
            "Alpha Unit active. "
            "Bravo Unit monitoring eastern sector. "
            "Charlie Unit on standby. "
            "Base HQ secure. "
            "Threat zone under surveillance."
        )

    else:
        response = (
        "Command Center Online.\n"
        "Available Commands:\n\n"
        "- threat\n"
        "- alpha\n"
        "- bravo\n"
        "- charlie\n"
        "- base\n"
        "- units\n"
        "- situation\n\n"
        "Example: 'what is the threat level?'"
    )

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)