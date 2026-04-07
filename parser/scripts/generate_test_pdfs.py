#!/usr/bin/env python3
"""Generate synthetic test PDFs mimicking French bank statement formats.

Usage:
    python parser/scripts/generate_test_pdfs.py

Generates one PDF per bank in parser/tests/fixtures/.
"""

import os

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle

FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "..", "tests", "fixtures")
W, H = A4

# Common table style for two-column (debit/credit) banks
TWO_COL_STYLE = TableStyle([
    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
    ("BACKGROUND", (0, 0), (-1, 0), colors.Color(0.92, 0.92, 0.92)),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
    ("FONTSIZE", (0, 0), (-1, -1), 9),
    ("ALIGN", (3, 0), (-1, -1), "RIGHT"),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
])

TWO_COL_WIDTHS = [50, 50, 220, 80, 80]


def _draw_header(c: canvas.Canvas, lines: list[tuple[str, int, str]], y: float) -> float:
    """Draw header lines. Each tuple is (font, size, text). Returns new y."""
    for font, size, text in lines:
        c.setFont(font, size)
        c.drawString(50, y, text)
        y -= size + 6
    return y


def _draw_table(c: canvas.Canvas, data: list[list[str]], y: float,
                col_widths: list[float] | None = None,
                style: TableStyle | None = None) -> float:
    """Draw a table on the canvas. Returns y after the table."""
    cw = col_widths or TWO_COL_WIDTHS
    st = style or TWO_COL_STYLE
    table = Table(data, colWidths=cw)
    table.setStyle(st)
    tw, th = table.wrap(0, 0)
    table.drawOn(c, 50, y - th)
    return y - th - 10


# ---------------------------------------------------------------------------
# Crédit Agricole
# ---------------------------------------------------------------------------

def generate_credit_agricole():
    path = os.path.join(FIXTURES_DIR, "credit_agricole.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "CREDIT AGRICOLE"),
        ("Helvetica", 11, "CAISSE REGIONALE D'ILE DE FRANCE"),
        ("Helvetica", 11, "RELEVE DE COMPTE"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte N° 0001 23456 12345678901 12"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "Période du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé", "Débit", "Crédit"],
        ["01/03", "01/03", "ANCIEN SOLDE", "", "1 234,56"],
        ["05/03", "05/03", "PAIEMENT CB LECLERC", "67,50", ""],
        ["08/03", "08/03", "PRELEVEMENT FREE MOBILE", "19,99", ""],
        ["12/03", "12/03", "VIR SALAIRE ENTREPRISE X", "", "2 450,00"],
        ["15/03", "15/03", "RETRAIT DAB CA 15/03", "80,00", ""],
        ["25/03", "25/03", "VIR RECU CAF", "", "184,50"],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "3 701,57"],
    ]

    _draw_table(c, data, y - 20)
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# Société Générale
# ---------------------------------------------------------------------------

def generate_societe_generale():
    path = os.path.join(FIXTURES_DIR, "societe_generale.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "SOCIETE GENERALE"),
        ("Helvetica", 11, "Relevé de votre compte"),
        ("Helvetica", 10, "www.societegenerale.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte : 00012 00045 12345678901 12"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date opé", "Date valeur", "Libellé opération", "Débit EUR", "Crédit EUR"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "2 500,00"],
        ["05/03", "05/03", "CB MONOPRIX 05/03", "34,20", ""],
        ["07/03", "07/03", "PRLV SEPA EDF", "127,43", ""],
        ["10/03", "10/03", "VIR SALAIRE MARS", "", "1 890,00"],
        ["18/03", "18/03", "RETRAIT DAB SG", "200,00", ""],
        ["22/03", "22/03", "CB AMAZON PAYMENTS", "56,78", ""],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "3 971,59"],
    ]

    _draw_table(c, data, y - 20, col_widths=[55, 60, 210, 75, 80])
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# Caisse d'Épargne
# ---------------------------------------------------------------------------

def generate_caisse_epargne():
    path = os.path.join(FIXTURES_DIR, "caisse_epargne.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "CAISSE D'EPARGNE"),
        ("Helvetica", 11, "ILE DE FRANCE"),
        ("Helvetica", 11, "Relevé de compte"),
        ("Helvetica", 10, "www.caisse-epargne.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte N° 12345 67890 12345678901 12"),
        ("Helvetica", 10, "Titulaire : MME MARIE MARTIN"),
        ("Helvetica", 10, "du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé", "Débit", "Crédit"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "3 200,00"],
        ["03/03", "03/03", "CARTE BANCAIRE AUCHAN", "93,47", ""],
        ["10/03", "10/03", "PRLV ASSURANCE HABITATION", "45,00", ""],
        ["15/03", "15/03", "VIR RECU POLE EMPLOI", "", "1 234,00"],
        ["20/03", "20/03", "CHEQUE N° 8765432", "150,00", ""],
        ["28/03", "28/03", "INTERETS TRIMESTRIELS", "", "2,34"],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "4 147,87"],
    ]

    _draw_table(c, data, y - 20)
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# Crédit Mutuel
# ---------------------------------------------------------------------------

def generate_credit_mutuel():
    path = os.path.join(FIXTURES_DIR, "credit_mutuel.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "CREDIT MUTUEL"),
        ("Helvetica", 11, "CAISSE DE CREDIT MUTUEL DE STRASBOURG"),
        ("Helvetica", 11, "Relevé de compte"),
        ("Helvetica", 10, "www.creditmutuel.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte : 00012 00045 12345678901"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé de l'opération", "Débit", "Crédit"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "1 500,00"],
        ["08/03", "08/03", "CB DECATHLON 08/03", "89,99", ""],
        ["10/03", "10/03", "PRLV ORANGE", "39,99", ""],
        ["12/03", "12/03", "VIR M DUPONT LOYER", "", "850,00"],
        ["18/03", "18/03", "RETRAIT DAB CM", "100,00", ""],
        ["25/03", "25/03", "CB FNAC PARIS", "149,90", ""],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "1 970,12"],
    ]

    _draw_table(c, data, y - 20, col_widths=[50, 50, 230, 75, 75])

    # Footer typical of CM/CIC
    c.setFont("Helvetica", 8)
    c.drawString(50, 80, "Euro-Information - Informatique du Crédit Mutuel")

    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# CIC
# ---------------------------------------------------------------------------

def generate_cic():
    path = os.path.join(FIXTURES_DIR, "cic.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "CIC"),
        ("Helvetica", 11, "Banque CIC Est"),
        ("Helvetica", 11, "Relevé de compte"),
        ("Helvetica", 10, "www.cic.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte : 00030 00456 12345678901"),
        ("Helvetica", 10, "Titulaire : M. PIERRE DURAND"),
        ("Helvetica", 10, "du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé de l'opération", "Débit", "Crédit"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "4 000,00"],
        ["10/03", "10/03", "CB IKEA 10/03", "234,50", ""],
        ["12/03", "12/03", "PRLV IMPOTS", "456,00", ""],
        ["15/03", "15/03", "VIR SALAIRE MARS", "", "3 200,00"],
        ["20/03", "20/03", "REMISE CHEQUE", "", "500,00"],
        ["28/03", "28/03", "CB RESTAURANT LE PROVENCAL", "78,50", ""],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "6 931,00"],
    ]

    _draw_table(c, data, y - 20, col_widths=[50, 50, 230, 75, 75])

    c.setFont("Helvetica", 8)
    c.drawString(50, 80, "Euro-Information - Informatique du Crédit Mutuel")

    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# La Banque Postale
# ---------------------------------------------------------------------------

def generate_la_banque_postale():
    path = os.path.join(FIXTURES_DIR, "la_banque_postale.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "LA BANQUE POSTALE"),
        ("Helvetica", 11, "Relevé de votre compte"),
        ("Helvetica", 10, "www.labanquepostale.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte courant postal : 1234567 K 012"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé", "Débit EUR", "Crédit EUR"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "800,00"],
        ["04/03", "04/03", "PAIEMENT CB INTERMARCHE", "52,30", ""],
        ["09/03", "09/03", "PRLV GAZ DE FRANCE", "67,89", ""],
        ["15/03", "15/03", "VIR RECU CPAM", "", "24,50"],
        ["20/03", "20/03", "RETRAIT DAB LBP", "150,00", ""],
        ["26/03", "26/03", "CB PHARMACIE DURAND", "12,45", ""],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "541,86"],
    ]

    _draw_table(c, data, y - 20, col_widths=[50, 50, 220, 75, 85])
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# LCL
# ---------------------------------------------------------------------------

def generate_lcl():
    path = os.path.join(FIXTURES_DIR, "lcl.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "LCL"),
        ("Helvetica", 11, "LE CREDIT LYONNAIS"),
        ("Helvetica", 11, "Relevé de compte"),
        ("Helvetica", 10, "www.lcl.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte N° 12345678901"),
        ("Helvetica", 10, "Titulaire : MME SOPHIE BERNARD"),
        ("Helvetica", 10, "Période du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date opé", "Date val.", "Libellé", "Débit", "Crédit"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "1 800,00"],
        ["03/03", "03/03", "CB BOULANGERIE PAUL", "8,40", ""],
        ["10/03", "10/03", "PRLV SFR", "29,99", ""],
        ["12/03", "12/03", "VIR SALAIRE MARS", "", "2 100,00"],
        ["18/03", "18/03", "PAIEMENT CB TOTAL", "65,00", ""],
        ["24/03", "24/03", "VIR RECU REMBOURSEMENT", "", "45,80"],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "3 842,41"],
    ]

    _draw_table(c, data, y - 20, col_widths=[55, 55, 220, 75, 75])
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# Boursorama (single amount column, signed)
# ---------------------------------------------------------------------------

def generate_boursorama():
    path = os.path.join(FIXTURES_DIR, "boursorama.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "BOURSORAMA BANQUE"),
        ("Helvetica", 11, "Relevé de compte"),
        ("Helvetica", 10, "www.boursorama.com"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte : 12345678"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "Période du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    # Boursorama uses a single signed "Montant" column
    bourso_style = TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("BACKGROUND", (0, 0), (-1, 0), colors.Color(0.92, 0.92, 0.92)),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (3, 0), (3, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ])

    data = [
        ["Date", "Date valeur", "Libellé", "Montant"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "5 000,00"],
        ["05/03", "05/03", "CB UBER EATS", "-24,90"],
        ["08/03", "08/03", "PRLV NETFLIX", "-17,99"],
        ["12/03", "12/03", "VIR SALAIRE MARS", "3 500,00"],
        ["20/03", "20/03", "RETRAIT DAB", "-60,00"],
        ["27/03", "27/03", "CB STEAM", "-49,99"],
        ["31/03", "31/03", "NOUVEAU SOLDE", "8 347,12"],
    ]

    _draw_table(c, data, y - 20, col_widths=[55, 60, 250, 90], style=bourso_style)
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# Banque Populaire
# ---------------------------------------------------------------------------

def generate_banque_populaire():
    path = os.path.join(FIXTURES_DIR, "banque_populaire.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "BANQUE POPULAIRE"),
        ("Helvetica", 11, "Relevé de votre compte"),
        ("Helvetica", 10, "www.banquepopulaire.fr"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte N° 12345 67890 12345678901"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé", "Débit", "Crédit"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "2 000,00"],
        ["06/03", "06/03", "CB LEROY MERLIN", "178,90", ""],
        ["10/03", "10/03", "PRLV MUTUELLE", "95,00", ""],
        ["15/03", "15/03", "VIR RECU ALLOCATIONS", "", "520,00"],
        ["22/03", "22/03", "CHEQUE N° 1234567", "300,00", ""],
        ["28/03", "28/03", "CB SNCF CONNECT", "45,60", ""],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "1 900,50"],
    ]

    _draw_table(c, data, y - 20)
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# BNP Paribas
# ---------------------------------------------------------------------------

def generate_bnp_paribas(output_dir: str | None = None):
    dest = output_dir or FIXTURES_DIR
    path = os.path.join(dest, "bnp_paribas.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    y = _draw_header(c, [
        ("Helvetica-Bold", 16, "BNP PARIBAS"),
        ("Helvetica", 11, "Relevé de compte"),
        ("Helvetica", 10, "www.bnpparibas.net"),
        ("Helvetica", 10, ""),
        ("Helvetica", 10, "Compte N° 0001 00045 12345678901 12"),
        ("Helvetica", 10, "Titulaire : M. JEAN DUPONT"),
        ("Helvetica", 10, "Période du 01/03/2025 au 31/03/2025"),
    ], H - 50)

    data = [
        ["Date", "Date val.", "Libellé", "Débit", "Crédit"],
        ["01/03", "01/03", "SOLDE PRECEDENT", "", "1 500,00"],
        ["03/03", "03/03", "PAIEMENT CB MONOPRIX", "42,30", ""],
        ["07/03", "07/03", "PRELEVEMENT EDF", "89,10", ""],
        ["10/03", "10/03", "VIR SALAIRE MARS ACME SARL", "", "2 800,00"],
        ["15/03", "15/03", "RETRAIT DAB BNP 15/03", "60,00", ""],
        ["20/03", "22/03", "CB AMAZON PAYMENTS", "32,99", ""],
        ["25/03", "25/03", "VIR RECU REMBOURSEMENT SECU", "", "18,50"],
        ["31/03", "31/03", "NOUVEAU SOLDE", "", "4 094,11"],
    ]

    _draw_table(c, data, y - 20)
    c.save()
    print(f"  OK {path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    os.makedirs(FIXTURES_DIR, exist_ok=True)
    print("Generating test PDFs...")
    generate_bnp_paribas()
    generate_credit_agricole()
    generate_societe_generale()
    generate_caisse_epargne()
    generate_credit_mutuel()
    generate_cic()
    generate_la_banque_postale()
    generate_lcl()
    generate_boursorama()
    generate_banque_populaire()
    print(f"\nDone — {10} PDFs written to {FIXTURES_DIR}")


if __name__ == "__main__":
    main()
