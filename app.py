from flask import Flask, render_template, request, redirect, url_for, send_file
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

app = Flask(__name__)

def calculate_category(score):
    if score <= 20:
        return ("Barely AI-Powered – You’re still relying on outdated, manual tools.",
                "Consider investing in AI-powered tools to automate your marketing processes.")
    elif score <= 50:
        return ("AI-Curious – Some automation, but still human-dependent.",
                "Explore advanced AI solutions to streamline your marketing operations.")
    elif score <= 80:
        return ("AI-Assisted – AI is helping, but you’re not fully optimized.",
                "Consider integrating more real-time AI personalization to boost efficiency.")
    else:
        return ("Fully AI-Powered – Your marketing runs on AI-driven automation and real-time optimization.",
                "Keep leveraging AI tools and stay updated with the latest innovations.")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    total_score = 0
    # Loop through questions q1 to q9
    for i in range(1, 10):
        total_score += int(request.form.get(f"q{i}", 0))
    category, recommendation = calculate_category(total_score)
    return redirect(url_for("results", score=total_score, category=category, recommendation=recommendation))

@app.route("/results")
def results():
    score = int(request.args.get("score", 0))
    category = request.args.get("category", "")
    recommendation = request.args.get("recommendation", "")
    share_message = f"I just discovered how AI-powered my marketing stack is! 🚀 Score: {score}. Take the quiz and see how your stack compares: {request.host_url}"
    return render_template("results.html", score=score, category=category, recommendation=recommendation, share_message=share_message)

@app.route("/share")
def share():
    score = request.args.get("score", "0")
    share_message = f"I just discovered how AI-powered my marketing stack is! 🚀 Score: {score}. Take the quiz and see how your stack compares: {request.host_url}"
    return render_template("share.html", share_message=share_message)

@app.route("/download")
def download():
    score = request.args.get("score", "0")
    category = request.args.get("category", "")
    recommendation = request.args.get("recommendation", "")
    # Generate a PDF using ReportLab
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.setFont("Helvetica", 12)
    text = p.beginText(40, 750)
    text.textLine("AI Marketing Stack Quiz Results")
    text.textLine(f"Score: {score}")
    text.textLine(f"Category: {category}")
    text.textLine("Recommendations:")
    text.textLine(recommendation)
    p.drawText(text)
    p.showPage()
    p.save()
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="quiz_results.pdf", mimetype="application/pdf")

if __name__ == "__main__":
    app.run(debug=True)
