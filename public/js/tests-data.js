// Meditech Laboratory test catalogue, built from the lab's requisition sheet.
// Each test: n = name, s = usual sample, d = what it is commonly used for, p = preparation (optional), f = fasting flag (optional)
// Guidance is general and conservative. The referring doctor's and the lab's instructions always take priority.
window.CATEGORIES = [
{id:"haem",name:"Haematology & Blood Group",code:"Hb",about:"Blood cells, clotting and inherited blood disorders.",tests:[
  {n:"CBC (Complete Blood Count)",s:"EDTA whole blood",d:"Haemoglobin, red cells, white cells, platelets and indices. Used to look for anaemia, infection and blood disorders."},
  {n:"Reticulocyte Count",s:"EDTA whole blood",d:"Young red cells. Shows how actively the bone marrow is making red cells."},
  {n:"ESR",s:"EDTA or citrated blood (as per lab method)",d:"Non-specific marker of inflammation."},
  {n:"Blood Group",s:"EDTA whole blood",d:"ABO and Rh (D) typing."},
  {n:"G6PD",s:"EDTA whole blood",d:"Screens for G6PD enzyme deficiency.",p:"Results can be falsely normal soon after a haemolytic episode or a blood transfusion. Tell the lab if either happened recently."},
  {n:"Sickle Cell",s:"EDTA whole blood",d:"Screens for sickle haemoglobin (HbS)."},
  {n:"Hb Electrophoresis",s:"EDTA whole blood",d:"Identifies haemoglobin variants such as thalassaemia trait and sickle cell.",p:"Tell the lab about any blood transfusion in the last 3 months, as it can affect the result."},
  {n:"Bleeding Time",s:"Performed at the lab (skin prick)",d:"Basic screening of platelet function."},
  {n:"Clotting Time",s:"Performed at the lab",d:"Basic screening of blood clotting."},
  {n:"PT + INR",s:"Sodium citrate blood",d:"Clotting test. Used to monitor warfarin / acenocoumarol and assess liver function and bleeding risk.",p:"Tell the lab about any blood thinner you take, its dose and the time of your last dose."},
  {n:"APTT",s:"Sodium citrate blood",d:"Clotting test of the intrinsic pathway. Used in bleeding work-up and heparin monitoring.",p:"Tell the lab about any blood thinner you take."}
]},
{id:"clin",name:"Urine, Stool & Semen",code:"Ur",about:"Routine examination and culture of body fluids.",note:"Use only the sterile container supplied by the lab. For cultures, give the sample before starting antibiotics unless your doctor advises otherwise.",tests:[
  {n:"Urine Routine / Culture",s:"Mid-stream urine in a sterile container",d:"Routine: physical, chemical and microscopic examination. Culture: identifies bacteria and the antibiotics that work against them.",p:"First morning urine is preferred. Clean the area, pass the first part into the toilet and collect the middle part. Bring it to the lab within 1 hour."},
  {n:"Stool Routine / Culture",s:"Fresh stool in a sterile container",d:"Looks for parasites, blood, pus cells; culture identifies bacterial causes of diarrhoea.",p:"Do not let the sample mix with urine or water. Bring it to the lab within 1 hour."},
  {n:"Semen Routine / Culture",s:"Semen in a sterile container",d:"Count, motility and morphology of sperm; culture for infection.",p:"Avoid ejaculation for 2–7 days before the test. Collect by masturbation, without lubricant or condom. If collected at home, bring it to the lab within 1 hour, kept close to body temperature."},
  {n:"Urine Albumin : Creatinine Ratio",s:"Spot urine (early morning preferred)",d:"Detects small amounts of albumin. Used to screen for kidney damage in diabetes and hypertension.",p:"Avoid heavy exercise for 24 hours before the test."},
  {n:"Urine Protein : Creatinine Ratio",s:"Spot urine",d:"Estimates protein loss in urine without a 24-hour collection."}
]},
{id:"diab",name:"Diabetes",code:"Glu",about:"Blood sugar control and insulin function.",note:"For a fasting sample, do not eat or drink anything except plain water for at least 8 hours (usually 8–12 hours). Take your regular medicines only as your doctor advises.",tests:[
  {n:"Glucose – Fasting / PP / Random",s:"Fluoride blood",d:"Blood sugar level. Fasting (FBS), post-prandial (PP, about 2 hours after a meal) or random.",p:"Fasting: at least 8 hours with water only. PP: the sample is taken 2 hours after you start your meal — note the time you started eating.",f:true},
  {n:"Glycosylated Hb (HbA1c)",s:"EDTA whole blood",d:"Average blood sugar over the last 2–3 months.",p:"No fasting needed. Results may be unreliable with recent blood loss, transfusion, pregnancy or some haemoglobin variants."},
  {n:"Glucose Tolerance Test (GTT)",s:"Fluoride blood, timed samples",d:"Measures how your body handles a 75 g glucose drink. Used to diagnose diabetes and gestational diabetes.",p:"Eat normal meals with carbohydrates for 3 days before. Fast at least 8 hours (water allowed). The test takes about 2–3 hours; stay seated at the lab, do not eat, smoke or walk around. Book in the morning.",f:true},
  {n:"Insulin – Fasting / PP / Antibodies",s:"Serum",d:"Insulin level, used to assess insulin resistance and some causes of low blood sugar.",p:"Fasting insulin: at least 8 hours with water only.",f:true},
  {n:"C-Peptide",s:"Serum",d:"Reflects the body's own insulin production.",p:"Usually a fasting sample. Follow your doctor's instruction.",f:true}
]},
{id:"lipid",name:"Lipid Profile (Heart Risk)",code:"Lp",about:"Cholesterol and fats in the blood, used to assess cardiovascular risk.",note:"Many guidelines accept a non-fasting sample for routine checks. Your doctor may ask for a 10–12 hour fast, especially if triglycerides were high before. Confirm when booking.",tests:[
  {n:"Lipid Profile",s:"Serum",d:"Total cholesterol, triglycerides, HDL, LDL and VLDL.",p:"Fast 10–12 hours (water allowed) only if your doctor asks. Avoid alcohol and very fatty meals the evening before.",f:true},
  {n:"Cholesterol",s:"Serum",d:"Total cholesterol."},
  {n:"Triglycerides",s:"Serum",d:"Blood fats affected strongly by recent meals and alcohol.",p:"Usually done fasting (10–12 hours).",f:true},
  {n:"HDL, LDL, VLDL",s:"Serum",d:"Cholesterol fractions: HDL (protective), LDL and VLDL."}
]},
{id:"liver",name:"Liver Function Tests",code:"LFT",about:"Shows how well the liver is working.",tests:[
  {n:"Liver Function Tests (LFT)",s:"Serum",d:"Bilirubin, liver enzymes (SGOT, SGPT, ALP, GGT), total protein and albumin.",p:"No fasting usually needed. Avoid alcohol for 24 hours before."},
  {n:"Bilirubin – Total & Direct",s:"Serum",d:"Used in jaundice evaluation."},
  {n:"SGOT (AST)",s:"Serum",d:"Enzyme found in liver, heart and muscle."},
  {n:"SGPT (ALT)",s:"Serum",d:"Enzyme mostly found in the liver."},
  {n:"Gamma GT",s:"Serum",d:"Liver and bile-duct enzyme; also raised by alcohol and some medicines."},
  {n:"Alkaline Phosphatase",s:"Serum",d:"Liver, bile-duct and bone enzyme. Normally higher in children and in pregnancy."}
]},
{id:"kidney",name:"Kidney, Electrolytes & Minerals",code:"RFT",about:"Kidney function, body salts and minerals.",tests:[
  {n:"Renal Function Tests (RFT)",s:"Serum",d:"Urea, creatinine, uric acid and electrolytes."},
  {n:"Urea (BUN)",s:"Serum",d:"Waste product cleared by the kidneys."},
  {n:"Creatinine",s:"Serum",d:"Main marker of kidney function; used to estimate eGFR.",p:"Avoid a heavy meat meal and intense exercise for 24 hours before."},
  {n:"Uric Acid",s:"Serum",d:"Used in gout and kidney stone evaluation."},
  {n:"Electrolytes (Na, K, Cl, iCa)",s:"Serum / blood",d:"Sodium, potassium, chloride and ionised calcium."},
  {n:"Total Protein",s:"Serum",d:"Albumin plus globulins."},
  {n:"Albumin",s:"Serum",d:"Main blood protein; reflects nutrition, liver and kidney status."},
  {n:"Calcium",s:"Serum",d:"Bone, parathyroid and kidney evaluation."},
  {n:"Phosphorus",s:"Serum",d:"Bone and kidney evaluation."}
]},
{id:"fever",name:"Fever & Tropical Infections",code:"Fv",about:"Tests commonly ordered for fever.",note:"The right test depends on the day of fever. Tell the lab how many days you have had fever. High fever with bleeding, severe abdominal pain, drowsiness or breathlessness needs urgent medical care.",tests:[
  {n:"Widal Slide",s:"Serum",d:"Antibody test for typhoid. Most meaningful after the first week of fever; interpreted by the doctor with symptoms."},
  {n:"Typhi Card",s:"Serum",d:"Rapid antibody card test for typhoid."},
  {n:"MP Slide (Malaria Parasite)",s:"EDTA blood / finger-prick smear",d:"Microscopy for malaria parasites. Best taken during fever; may need repeating."},
  {n:"MP Antigen (Malaria)",s:"EDTA whole blood",d:"Rapid antigen test for P. falciparum and P. vivax."},
  {n:"Dengue Ag + Ab",s:"Serum",d:"NS1 antigen (most useful in the first 5 days of fever) with IgM / IgG antibodies (usually detectable from about day 5)."},
  {n:"Leptospira",s:"Serum",d:"Antibody test for leptospirosis, common after exposure to flood water or mud."},
  {n:"Chikungunya",s:"Serum",d:"Antibody test for chikungunya (IgM usually detectable from about day 5–7 of illness)."}
]},
{id:"sero",name:"Infection Screening & TB",code:"Sr",about:"Serology and tuberculosis tests.",note:"HIV testing is done only with informed consent, and all results are kept confidential.",tests:[
  {n:"3H Screen (HIV, HBsAg, HCV)",s:"Serum",d:"Screening for HIV, hepatitis B and hepatitis C. Often required before surgery. A reactive screen needs confirmatory testing."},
  {n:"VDRL",s:"Serum",d:"Screening test for syphilis. A positive result needs a confirmatory test."},
  {n:"HCG – Urine Pregnancy",s:"Urine (first morning preferred)",d:"Detects pregnancy hormone in urine; most reliable from the day of the missed period."},
  {n:"Mantoux Test (TT)",s:"Small injection in the forearm",d:"Tuberculin skin test for TB infection.",p:"You must return to the lab 48–72 hours after the injection for the reading. Do not scratch or cover the site."},
  {n:"TB Gold (IGRA)",s:"Whole blood (special tubes)",d:"Interferon-gamma release assay for TB infection. Not affected by previous BCG vaccination."}
]},
{id:"imm",name:"Immunology & Allergy",code:"Im",about:"Inflammation, autoimmune markers and allergy.",tests:[
  {n:"CRP",s:"Serum",d:"C-reactive protein, a marker of inflammation and infection."},
  {n:"RA / Rh Factor",s:"Serum",d:"Rheumatoid factor; used in arthritis evaluation."},
  {n:"ASO",s:"Serum",d:"Anti-streptolysin O; shows recent streptococcal infection."},
  {n:"Anti-CCP",s:"Serum",d:"Specific marker for rheumatoid arthritis."},
  {n:"ANA",s:"Serum",d:"Antinuclear antibodies; screening for autoimmune diseases such as lupus."},
  {n:"HLA B27",s:"EDTA whole blood",d:"Genetic marker associated with ankylosing spondylitis and related conditions."},
  {n:"IgE",s:"Serum",d:"Total IgE; raised in allergy and some parasitic infections."},
  {n:"Allergy – Food / Drugs / Inhalation / Contact",s:"Serum",d:"Blood test for specific IgE to selected allergens. Antihistamine tablets do not affect this blood test."}
]},
{id:"enz",name:"Cardiac Markers & Enzymes",code:"Cd",about:"Heart, muscle and pancreatic markers.",note:"Chest pain, breathlessness, sweating or fainting is an emergency. Go to the nearest hospital immediately — do not wait for a lab report.",tests:[
  {n:"Troponin T / I",s:"Serum / plasma",d:"Marker of heart muscle injury. Interpreted with ECG and symptoms; may need repeating after a few hours."},
  {n:"CK-MB",s:"Serum",d:"Heart-related fraction of creatine kinase."},
  {n:"CPK",s:"Serum",d:"Muscle enzyme.",p:"Avoid strenuous exercise and intramuscular injections for 48 hours before, as they raise CPK."},
  {n:"LDH",s:"Serum",d:"Enzyme raised in tissue damage and haemolysis."},
  {n:"Amylase",s:"Serum",d:"Pancreatic enzyme; used in suspected pancreatitis."},
  {n:"Lipase",s:"Serum",d:"More specific pancreatic enzyme for pancreatitis."},
  {n:"Homocysteine",s:"Serum / plasma",d:"Amino acid linked with B12 / folate status and vascular risk.",p:"A fasting sample is commonly preferred. Follow the lab's instruction.",f:true}
]},
{id:"thy",name:"Thyroid",code:"Th",about:"Thyroid hormones and thyroid antibodies.",note:"No fasting is needed. If you take biotin (vitamin B7) or hair/skin supplements, tell the lab — high doses can falsely change thyroid results. If you take thyroxine, ask your doctor whether to take it before or after the sample.",tests:[
  {n:"TSH",s:"Serum",d:"Main screening test for thyroid function."},
  {n:"T3, T4, TSH",s:"Serum",d:"Total thyroid hormones with TSH."},
  {n:"FT3, FT4, TSH",s:"Serum",d:"Free (active) thyroid hormones with TSH."},
  {n:"ATPO / ATG",s:"Serum",d:"Thyroid antibodies; used in Hashimoto's and Graves' disease evaluation."},
  {n:"Thyroglobulin Level",s:"Serum",d:"Used mainly in follow-up after treatment of thyroid cancer."}
]},
{id:"horm",name:"Hormones & Fertility",code:"Hm",about:"Reproductive and stress hormones.",note:"Some hormones depend on the day of the menstrual cycle or the time of day. Ask the lab or your doctor when to come.",tests:[
  {n:"FSH",s:"Serum",d:"Ovarian and testicular function.",p:"For fertility assessment in women, usually taken on day 2–5 of the cycle, or as advised by your doctor."},
  {n:"LH",s:"Serum",d:"Ovulation and reproductive function.",p:"Usually taken on day 2–5 of the cycle, or as advised by your doctor."},
  {n:"Prolactin",s:"Serum",d:"Used in irregular periods, infertility and milk discharge.",p:"Give the sample in the morning, a few hours after waking, after resting quietly for 15–30 minutes. Stress and breast stimulation can raise prolactin."},
  {n:"Testosterone",s:"Serum",d:"Male and female hormone evaluation.",p:"Men: give a morning sample, ideally before 10 AM."},
  {n:"AMH",s:"Serum",d:"Anti-Müllerian hormone; estimates ovarian reserve.",p:"Can be done on any day of the cycle."},
  {n:"Beta HCG",s:"Serum",d:"Pregnancy hormone in blood; confirms and monitors early pregnancy."},
  {n:"Cortisol (AM / PM)",s:"Serum",d:"Stress hormone with a daily rhythm.",p:"Morning sample usually around 8–9 AM; evening sample at the time your doctor specifies. Tell the lab about any steroid medicines."}
]},
{id:"preg",name:"Pregnancy & TORCH",code:"An",about:"Antenatal and infection screening during pregnancy and pregnancy planning.",tests:[
  {n:"TORCH (4 / 8)",s:"Serum",d:"Antibodies to Toxoplasma, Rubella, CMV and HSV (and others in the extended panel)."},
  {n:"Toxoplasma IgG / IgM",s:"Serum",d:"Toxoplasma antibodies."},
  {n:"Rubella IgG / IgM",s:"Serum",d:"Rubella immunity and recent infection."},
  {n:"CMV IgG / IgM",s:"Serum",d:"Cytomegalovirus antibodies."},
  {n:"HSV IgG / IgM",s:"Serum",d:"Herpes simplex virus antibodies."},
  {n:"ANC Profile",s:"Blood and urine",d:"Routine antenatal panel as requested by your obstetrician."},
  {n:"Dual / Triple / Quad Marker",s:"Serum",d:"Maternal serum screening for chromosomal risk. A screening result, not a diagnosis.",p:"Dual marker: 11 to 13 weeks 6 days, with the NT scan. Triple / Quad: second trimester, usually 15–20 weeks. Bring your latest ultrasound report and know your weight and date of birth."}
]},
{id:"vit",name:"Vitamins & Iron",code:"Vt",about:"Nutritional status and anaemia work-up.",tests:[
  {n:"Vitamin B12",s:"Serum",d:"B12 level; used in anaemia and nerve symptoms.",p:"Tell the lab if you take B12 supplements or injections."},
  {n:"Vitamin D",s:"Serum",d:"25-hydroxy vitamin D level. No fasting needed."},
  {n:"Iron / Iron Studies",s:"Serum",d:"Serum iron with related tests for iron deficiency or overload.",p:"Morning sample preferred. Stop iron tablets for 24 hours before, if your doctor agrees."},
  {n:"TIBC / Iron Saturation",s:"Serum",d:"Iron-binding capacity and transferrin saturation."},
  {n:"Ferritin",s:"Serum",d:"Body iron stores. Can be raised by inflammation or infection."}
]},
{id:"onco",name:"Tumour Markers",code:"Tm",about:"Used to support diagnosis and monitor treatment. They are not stand-alone cancer screening tests and must be interpreted by a doctor.",tests:[
  {n:"CA 19.9 (Pancreatic)",s:"Serum",d:"Used mainly in pancreatic and biliary cancer follow-up."},
  {n:"CA 15.3 (Breast)",s:"Serum",d:"Used in breast cancer monitoring."},
  {n:"CA 125 (Ovarian)",s:"Serum",d:"Used in ovarian cancer evaluation; also raised in benign conditions and during periods."},
  {n:"CA 72.4 (Gastric)",s:"Serum",d:"Used in gastric cancer monitoring."},
  {n:"AFP",s:"Serum",d:"Alpha-fetoprotein; liver and germ-cell tumours, and in pregnancy screening."},
  {n:"CEA",s:"Serum",d:"Used mainly in colorectal cancer follow-up. Can be raised in smokers."},
  {n:"PSA – Total / Ratio",s:"Serum",d:"Prostate-specific antigen; free/total ratio helps interpretation.",p:"Avoid ejaculation and vigorous cycling for 48 hours before. Give the sample before, or several weeks after, a prostate examination or procedure."}
]},
{id:"path",name:"Histopathology & Cytology",code:"Hp",about:"Tissue and cell examination under the microscope.",tests:[
  {n:"Histopathology",s:"Tissue in 10% neutral buffered formalin",d:"Microscopic diagnosis of biopsy and surgical specimens.",p:"Use formalin about 10 times the tissue volume. Label the container and send the clinical details and requisition form."},
  {n:"Cytology",s:"Fluids, smears or FNAC material",d:"Examination of cells from fluids, smears and fine-needle aspirates.",p:"Send fluids fresh to the lab as soon as possible with clinical details."}
]},
{id:"ref",name:"Referral Lab Network",code:"Rf",about:"Specialised tests not done in-house are sent to partner reference laboratories. Ask us for any test not listed here.",referral:true,tests:[
  {n:"Metropolis"},{n:"Agilus"},{n:"Suburban"},{n:"Bhide"},{n:"Medgenome"}
]}
];
