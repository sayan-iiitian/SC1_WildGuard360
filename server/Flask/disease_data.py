disease_data = [
    {
        "disease_name": "Tick Fever",
        "Disease Description": "Tick fever, also known as ehrlichiosis, is a bacterial infection transmitted by ticks that affects dogs and can cause symptoms like fever, lethargy, and weight loss.",
        "Severity and Urgency Analysis": "Moderate to Severe. Requires prompt treatment to prevent complications such as anemia and organ failure.",
        "Treatment Options": "Antibiotics (doxycycline), supportive care, and tick control measures.",
        "Prevention Tips": "Regular tick prevention using topical treatments or collars and regular tick checks.",
        "Reference Link": "https://www.merckvetmanual.com/generalized-conditions/ehrlichiosis/ehrlichiosis-in-dogs"
    },
    {
        "disease_name": "Distemper",
        "Disease Description": "Canine distemper is a highly contagious viral disease that affects the respiratory, gastrointestinal, and nervous systems of dogs.",
        "Severity and Urgency Analysis": "Severe. Often fatal if not treated promptly, especially in puppies.",
        "Treatment Options": "Supportive care, including fluids, antibiotics for secondary infections, and antipyretics. No specific antiviral treatment.",
        "Prevention Tips": "Vaccination is the most effective prevention method.",
        "Reference Link": "https://www.merckvetmanual.com/generalized-conditions/canine-distemper/canine-distemper"
    },
    {
        "disease_name": "Parvovirus",
        "Disease Description": "Canine parvovirus is a highly contagious viral disease that affects the gastrointestinal tract of dogs, causing severe vomiting and diarrhea.",
        "Severity and Urgency Analysis": "Severe. Highly fatal if untreated, especially in puppies.",
        "Treatment Options": "Intensive supportive care, including fluids, antiemetics, and antibiotics to prevent secondary infections.",
        "Prevention Tips": "Vaccination and maintaining good hygiene practices.",
        "Reference Link": "https://www.merckvetmanual.com/digestive-system/diseases-of-the-stomach-and-intestines-in-small-animals/canine-parvovirus"
    },
    {
        "disease_name": "Hepatitis",
        "Disease Description": "Canine hepatitis is a viral infection that affects the liver and other organs in dogs.",
        "Severity and Urgency Analysis": "Moderate to Severe. Requires prompt treatment to prevent liver damage.",
        "Treatment Options": "Supportive care, including fluids, antibiotics for secondary infections, and liver protectants.",
        "Prevention Tips": "Vaccination against canine adenovirus, which causes hepatitis.",
        "Reference Link": "https://www.merckvetmanual.com/generalized-conditions/infectious-canine-hepatitis/overview-of-infectious-canine-hepatitis"
    },
    {
        "disease_name": "Tetanus",
        "Disease Description": "Tetanus is a bacterial infection caused by Clostridium tetani, which produces a toxin affecting the nervous system.",
        "Severity and Urgency Analysis": "Severe. Requires immediate veterinary intervention.",
        "Treatment Options": "Antitoxin, antibiotics, and supportive care to manage symptoms.",
        "Prevention Tips": "Prevent wounds from getting contaminated and keep up-to-date on tetanus vaccinations.",
        "Reference Link": "https://www.merckvetmanual.com/generalized-conditions/tetanus/tetanus-in-dogs-and-cats"
    },
    {
        "disease_name": "Chronic Kidney Disease",
        "Disease Description": "Chronic Kidney Disease (CKD) is a progressive condition where the kidneys lose function over time.",
        "Severity and Urgency Analysis": "Moderate to Severe. Requires ongoing management to slow progression and maintain quality of life.",
        "Treatment Options": "Dietary management, medications to control symptoms, and regular monitoring.",
        "Prevention Tips": "Regular check-ups, especially for older dogs, and managing conditions like hypertension and diabetes.",
        "Reference Link": "https://www.merckvetmanual.com/kidney-and-urinary-tract-disorders/chronic-kidney-disease-in-dogs-and-cats/overview-of-chronic-kidney-disease-in-dogs-and-cats"
    },
    {
        "disease_name": "Diabetes",
        "Disease Description": "Diabetes mellitus in dogs is a metabolic disorder characterized by high blood sugar levels due to insulin deficiency or resistance.",
        "Severity and Urgency Analysis": "Moderate to Severe. Requires lifelong management to prevent complications.",
        "Treatment Options": "Insulin therapy, dietary management, and regular monitoring of blood glucose levels.",
        "Prevention Tips": "Maintaining a healthy weight and regular veterinary check-ups.",
        "Reference Link": "https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats"
    },
    {
        "disease_name": "Gastrointestinal Disease",
        "Disease Description": "Gastrointestinal diseases in dogs encompass a variety of conditions that affect the stomach and intestines, leading to symptoms like vomiting, diarrhea, and weight loss.",
        "Severity and Urgency Analysis": "Mild to Severe. The severity depends on the specific condition and its progression.",
        "Treatment Options": "Depends on the underlying cause; may include dietary changes, medications, or surgery.",
        "Prevention Tips": "Maintaining a balanced diet and avoiding ingestion of harmful substances.",
        "Reference Link": "https://www.merckvetmanual.com/digestive-system/diseases-of-the-stomach-and-intestines-in-small-animals"
    },
    {
        "disease_name": "Allergies",
        "Disease Description": "Allergies in dogs can be caused by various factors, including food, environmental allergens, and fleas, leading to itching, redness, and skin irritation.",
        "Severity and Urgency Analysis": "Mild to Moderate. Requires management to alleviate discomfort and prevent complications.",
        "Treatment Options": "Antihistamines, corticosteroids, and identifying and avoiding allergens.",
        "Prevention Tips": "Avoidance of known allergens, regular grooming, and flea control.",
        "Reference Link": "https://www.merckvetmanual.com/integumentary-system/atopic-dermatitis-in-small-animals/atopic-dermatitis-in-dogs-and-cats"
    },
    {
        "disease_name": "Gingivitis",
        "Disease Description": "Gingivitis is the inflammation of the gums caused by plaque buildup, leading to redness, swelling, and bad breath.",
        "Severity and Urgency Analysis": "Mild to Moderate. Requires treatment to prevent progression to periodontal disease.",
        "Treatment Options": "Dental cleaning, plaque control, and maintaining oral hygiene.",
        "Prevention Tips": "Regular dental check-ups and teeth brushing.",
        "Reference Link": "https://www.merckvetmanual.com/digestive-system/dental-disease-and-oral-surgery/periodontal-disease-in-small-animals"
    },
    {
        "disease_name": "Cancers",
        "Disease Description": "Cancer in dogs can manifest in various forms, such as tumors, affecting different organs and systems.",
        "Severity and Urgency Analysis": "Severe. Early detection and treatment are crucial for the best outcome.",
        "Treatment Options": "Surgery, chemotherapy, radiation, or a combination of treatments.",
        "Prevention Tips": "Regular veterinary check-ups and monitoring for early signs.",
        "Reference Link": "https://www.merckvetmanual.com/cancer-in-dogs"
    },
    {
        "disease_name": "Skin Rashes",
        "Disease Description": "Skin rashes in dogs can be caused by various factors, including allergies, infections, and irritants.",
        "Severity and Urgency Analysis": "Mild to Moderate. Requires treatment to alleviate discomfort and prevent secondary infections.",
        "Treatment Options": "Topical treatments, antihistamines, and identifying and removing the cause.",
        "Prevention Tips": "Regular grooming, flea control, and avoiding known irritants.",
        "Reference Link": "https://www.merckvetmanual.com/integumentary-system/dermatologic-procedures/skin-rashes-in-dogs"
    }
]