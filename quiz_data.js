import json

quiz_data = [
    {
        "id": "kuis-ulser",
        "title": "Diagnosis Ulser Mulut & Red Flags",
        "description": "Uji kemampuan deteksi dini lesi maligna vs lesi benigna pada rongga mulut.",
        "duration": 600,
        "questions": [
            {
                "id": 1,
                "question": "Seorang pasien datang dengan ulser tunggal di lateral lidah yang tidak sembuh selama 4 minggu. Ulser terasa keras saat dipalpasi dan tidak sakit. Apa tindakan pertama yang paling tepat?",
                "options": [
                    "A. Memberikan kortikosteroid topikal dan dievaluasi 2 minggu lagi",
                    "B. Melakukan rujukan segera untuk biopsi karena dicurigai lesi keganasan (Red Flag)",
                    "C. Memberikan antibiotik oral dan obat kumur antiseptik",
                    "D. Menginstruksikan pasien untuk memotong gigi yang tajam di dekat ulser"
                ],
                "correctAnswer": 1,
                "explanation": "Ulser tunggal yang menetap lebih dari 2-3 minggu tanpa faktor etiologi yang jelas, serta memiliki konsistensi keras (indurasi) dan tidak sakit, merupakan tanda 'Red Flag' utama Karsinoma Sel Skuamosa (SCC). Penundaan rujukan untuk biopsi dapat memperburuk prognosis pasien."
            },
            {
                "id": 2,
                "question": "Manakah dari karakteristik berikut yang membedakan Stomatitis Aftosa Rekuren (SAR) tipe Mayor dari tipe Minor?",
                "options": [
                    "A. SAR Mayor sembuh tanpa meninggalkan jaringan parut",
                    "B. SAR Mayor memiliki diameter lebih besar (>1 cm), lebih dalam, dan sembuh dalam hitungan minggu hingga bulan dengan risiko jaringan parut",
                    "C. SAR Mayor selalu berjumlah lebih dari 20 ulser sekaligus",
                    "D. SAR Mayor hanya terjadi pada mukosa cekat seperti gingiva cekat"
                ],
                "correctAnswer": 1,
                "explanation": "SAR tipe Mayor (Sutton's disease) ditandai dengan ulser yang besar (>1 cm), lebih dalam, sangat nyeri, bertahan selama 2-6 minggu, dan sering kali meninggalkan jaringan parut (scarring) setelah sembuh."
            }
        ]
    },
    {
        "id": "kuis-infeksi",
        "title": "Infeksi Jamur & Virus Rongga Mulut",
        "description": "Evaluasi klinis manifestasi kandidiasis dan infeksi herpes virus di rongga mulut.",
        "duration": 600,
        "questions": [
            {
                "id": 1,
                "question": "Seorang pasien dengan riwayat penggunaan inhaler kortikosteroid jangka panjang mengeluhkan rasa tidak nyaman dan lapisan putih pada langit-langit mulutnya. Lapisan tersebut dapat dikerok dan meninggalkan dasar kemerahan yang agak berdarah. Apa diagnosis klinis yang paling tepat?",
                "options": [
                    "A. Leukoplakia",
                    "B. Kandidiasis Pseudomembran Akut (Thrush)",
                    "C. Lichen Planus Tipe Plak",
                    "D. Linea Alba"
                ],
                "correctAnswer": 1,
                "explanation": "Kandidiasis Pseudomembran Akut ditandai dengan adanya plak/lapisan putih seperti dadih susu yang *dapat dikerok* (wipeable), meninggalkan permukaan eritematosa atau berdarah. Faktor risiko klasiknya meliputi penggunaan kortikosteroid inhaler tanpa berkumur setelahnya."
            },
            {
                "id": 2,
                "question": "Gingivostomatitis Herpetika Primer paling sering disebabkan oleh infeksi virus apa, dan apa manifestasi klinis khasnya pada gingiva?",
                "options": [
                    "A. Epstein-Barr Virus; gingiva membesar dan berwarna keunguan",
                    "B. Herpes Simplex Virus Tipe 1 (HSV-1); gingiva eritematosa parah, edema, dengan ulser multipel kecil yang menyebar",
                    "C. Cytomegalovirus; ulserasi tunggal yang sangat dalam pada gingiva",
                    "D. Human Papillomavirus; lesi seperti jengger ayam pada seluruh gingiva"
                ],
                "correctAnswer": 1,
                "explanation": "Gingivostomatitis Herpetika Primer adalah manifestasi klinis utama dari infeksi HSV-1 pertama kali. Gejalanya meliputi demam tinggi, limfadenopati, serta gingiva yang meradang hebat (kemerahan, bengkak) disertai ulser vesikuloulseratif multipel di seluruh rongga mulut."
            }
        ]
    }
]

with open('quiz_data.js', 'w', encoding='utf-8') as f:
    f.write("const QUIZ_DATA = " + json.dumps(quiz_data, indent=2, ensure_ascii=False) + ";")

print("quiz_data.js generated successfully")
