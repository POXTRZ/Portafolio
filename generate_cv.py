from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

OUTPUT = "assets/Hugo_Romero_CV.pdf"
PAGE_W, PAGE_H = letter
INK = HexColor("#151712")
PAPER = HexColor("#F4E8C8")
OLIVE = HexColor("#6F763F")
ORANGE = HexColor("#D56B32")
MUTED = HexColor("#5E6257")
LIGHT = HexColor("#D7D0BC")
REGULAR = "CV-Regular"
BOLD = "CV-Bold"

pdfmetrics.registerFont(TTFont(REGULAR, r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont(BOLD, r"C:\Windows\Fonts\arialbd.ttf"))

def wrap(text, font, size, max_width):
    words = text.split()
    lines, line = [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if line and stringWidth(candidate, font, size) > max_width:
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    return lines

def paragraph(pdf, text, x, y, width, size=8.4, leading=11.2, color=MUTED, font=REGULAR):
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    for line in wrap(text, font, size, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y

def section_label(pdf, text, x, y, width):
    pdf.setStrokeColor(OLIVE)
    pdf.setLineWidth(2)
    pdf.line(x, y + 4, x + width, y + 4)
    pdf.setFillColor(INK)
    pdf.setFont(BOLD, 8.2)
    pdf.drawString(x, y - 9, text.upper())
    return y - 28

def bullet(pdf, text, x, y, width):
    pdf.setFillColor(ORANGE)
    pdf.circle(x + 2.5, y + 2.5, 1.7, fill=1, stroke=0)
    return paragraph(pdf, text, x + 10, y + 6, width - 10, size=7.7, leading=10.1)

pdf = canvas.Canvas(OUTPUT, pagesize=letter)
pdf.setTitle("Hugo Ivan Romero Duarte - Junior Software Developer CV")
pdf.setAuthor("Hugo Ivan Romero Duarte")

pdf.setFillColor(INK)
pdf.rect(0, PAGE_H - 132, PAGE_W, 132, fill=1, stroke=0)
pdf.setFillColor(ORANGE)
pdf.rect(0, PAGE_H - 132, 13, 132, fill=1, stroke=0)
pdf.setFillColor(PAPER)
pdf.setFont(BOLD, 24)
pdf.drawString(42, PAGE_H - 46, "HUGO IVAN ROMERO DUARTE")
pdf.setFillColor(HexColor("#D6A842"))
pdf.setFont(BOLD, 10.4)
pdf.drawString(43, PAGE_H - 71, "JUNIOR SOFTWARE DEVELOPER")
pdf.setFont(BOLD, 9.2)
pdf.drawString(43, PAGE_H - 88, "WEB  /  BACKEND  /  MOBILE  /  CLOUD")
pdf.setFillColor(LIGHT)
pdf.setFont(REGULAR, 8.2)
pdf.drawString(43, PAGE_H - 112, "Querétaro, Mexico")
pdf.drawString(147, PAGE_H - 112, "hugo.romero.dev@gmail.com")
pdf.drawString(310, PAGE_H - 112, "github.com/POXTRZ")
pdf.drawString(421, PAGE_H - 112, "linkedin.com/in/hugo-ivan-romero-dev")
pdf.linkURL("mailto:hugo.romero.dev@gmail.com", (147, PAGE_H - 117, 299, PAGE_H - 103), relative=0, thickness=0)
pdf.linkURL("https://github.com/POXTRZ", (310, PAGE_H - 117, 408, PAGE_H - 103), relative=0, thickness=0)
pdf.linkURL("https://www.linkedin.com/in/hugo-ivan-romero-dev/", (421, PAGE_H - 117, 570, PAGE_H - 103), relative=0, thickness=0)

left_x, left_w = 42, 158
right_x, right_w = 226, 344
left_y = right_y = PAGE_H - 154

left_y = section_label(pdf, "Education", left_x, left_y, left_w)
pdf.setFillColor(INK)
pdf.setFont(BOLD, 9.2)
pdf.drawString(left_x, left_y, "BACHELOR'S DEGREE")
pdf.drawString(left_x, left_y - 12, "IN INFORMATICS")
left_y -= 28
left_y = paragraph(pdf, "Universidad Autónoma de Querétaro", left_x, left_y, left_w, 7.6, 9.8)
left_y -= 3
left_y = paragraph(pdf, "2023 - 2027", left_x, left_y, left_w, 7.8, 10, INK, BOLD)
left_y = paragraph(pdf, "7th semester", left_x, left_y - 1, left_w, 7.5, 9.8)
left_y = paragraph(pdf, "Expected graduation: December 2027", left_x, left_y - 1, left_w, 7.5, 9.8)
left_y -= 10

left_y = section_label(pdf, "Technical skills", left_x, left_y, left_w)
skills = [
    ("LANGUAGES", "Java, JavaScript, TypeScript, Python, Kotlin, HTML, CSS, SQL"),
    ("WEB & BACKEND", "React, Next.js, Node.js, NestJS, Tailwind CSS"),
    ("DATABASES & SERVICES", "MySQL, MongoDB, Firebase"),
    ("MOBILE", "Kotlin, Android Studio, Firebase Authentication, Cloud Firestore"),
    ("CLOUD & TOOLS", "AWS, Azure, Google Cloud, Git, GitHub, Figma, VS Code"),
]
for heading, text in skills:
    pdf.setFillColor(INK)
    pdf.setFont(BOLD, 7.4)
    pdf.drawString(left_x, left_y, heading)
    left_y -= 11
    left_y = paragraph(pdf, text, left_x, left_y, left_w, 7.35, 9.5)
    left_y -= 8

left_y = section_label(pdf, "Certifications", left_x, left_y, left_w)
certifications = [
    "AWS Academy Graduate - Cloud Foundations - AWS Academy (2026)",
    "Cisco Networking Academy - Introduction to Cybersecurity (2025)",
    "Web Development with CSS, Sass & Bootstrap - UAQ (2024)",
]
for item in certifications:
    left_y = bullet(pdf, item, left_x, left_y, left_w)
    left_y -= 6

left_y = section_label(pdf, "Languages", left_x, left_y, left_w)
left_y = paragraph(pdf, "Spanish - Native", left_x, left_y, left_w, 7.8, 10.5, INK, BOLD)
paragraph(pdf, "English - Intermediate / conversational", left_x, left_y - 3, left_w, 7.6, 10)

pdf.setStrokeColor(HexColor("#D8CFB7"))
pdf.setLineWidth(.7)
pdf.line(211, 43, 211, PAGE_H - 140)

right_y = section_label(pdf, "Profile", right_x, right_y, right_w)
profile = ("Software development student with hands-on experience building web and mobile "
           "applications through real-client, academic, collaborative, hackathon and freelance "
           "projects. Experienced with modern web technologies, backend foundations, databases, "
           "Firebase and Android development, with growing interests in cloud computing and "
           "software architecture.")
right_y = paragraph(pdf, profile, right_x, right_y, right_w, 8.25, 11.1)
right_y -= 14
right_y = section_label(pdf, "Experience", right_x, right_y, right_w)

def role(title, organization, period, bullets, y):
    pdf.setFillColor(INK)
    pdf.setFont(BOLD, 10.5)
    pdf.drawString(right_x, y, title)
    pdf.setFillColor(ORANGE)
    pdf.setFont(BOLD, 7.6)
    pdf.drawRightString(right_x + right_w, y + 1, period)
    y -= 13
    pdf.setFillColor(OLIVE)
    pdf.setFont(BOLD, 7.6)
    pdf.drawString(right_x, y, organization.upper())
    y -= 13
    for item in bullets:
        y = bullet(pdf, item, right_x, y, right_w)
        y -= 4
    return y - 8

right_y = role("Frontend Developer - Social Service",
    "Portal FIF, Universidad Autónoma de Querétaro", "SEP 2026 - PRESENT",
    ["Develop responsive interfaces, role-based authentication, protected routes and form validation.",
     "Handle errors and UX improvements while collaborating through Git and GitHub."], right_y)
right_y = role("Freelance Software & Digital Services",
    "Self-employed / independent client work", "LATE 2025 - PRESENT",
    ["Deliver websites, small software solutions, Excel dashboards, presentations and document formatting.",
     "Manage direct client communication, requirements, revisions and final delivery across transcription and video editing needs."], right_y)

right_y = section_label(pdf, "Selected projects", right_x, right_y, right_w)
projects = [
    ("Colegio Miguel Hidalgo", "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP",
     "Real-client institutional website with responsive design, reusable components, academic sections, school history, events and structured navigation."),
    ("Hackathon 2026", "React, TypeScript, Vite, Zustand, Axios, Recharts, Socket.IO, Tailwind CSS",
     "Collaborative healthcare platform frontend. Contributed initial structure and configuration, reusable components, patient interfaces, reporting views, data visualization and UI work."),
    ("Changarro Android", "Kotlin, Firebase Authentication, Cloud Firestore",
     "Collaborative native Android marketplace. Contributed Firebase integration, authentication, application functionality, debugging, testing and UI improvements."),
    ("E-commerce Marketplace", "PHP, MySQL, HTML, CSS, JavaScript",
     "Academic web application with registration, login, profiles, catalog, product detail, categories, cart and MySQL persistence."),
]
for name, stack, description in projects:
    pdf.setFillColor(INK)
    pdf.setFont(BOLD, 8.5)
    pdf.drawString(right_x, right_y, name)
    right_y -= 10
    pdf.setFillColor(OLIVE)
    pdf.setFont(BOLD, 6.8)
    for line in wrap(stack, BOLD, 6.8, right_w):
        pdf.drawString(right_x, right_y, line)
        right_y -= 8.4
    right_y = paragraph(pdf, description, right_x, right_y - 1, right_w, 7.25, 9.2)
    right_y -= 7

pdf.setStrokeColor(OLIVE)
pdf.setLineWidth(2)
pdf.line(42, 31, 570, 31)
pdf.setFillColor(MUTED)
pdf.setFont(REGULAR, 6.9)
pdf.drawString(42, 18, "GitHub: github.com/POXTRZ  |  Open to junior, intern and freelance opportunities")
pdf.drawRightString(570, 18, "Updated 2026")
pdf.linkURL("https://github.com/POXTRZ", (69, 13, 157, 25), relative=0, thickness=0)
pdf.save()
print(OUTPUT)
