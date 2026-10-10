/* ============================================================
   ExamPilot - AI Exam Preparation Planner
   ============================================================ */

// ===== CONSTANTS =====
const STORAGE_KEY = 'examPilot_data';
const SUBJECT_COLORS = ['#6C63FF','#FF6584','#2ECC71','#F39C12','#E74C3C','#00B894','#0984E3','#6C5CE7','#FD79A8','#00CEC9'];

// ===== QUESTION BANK =====
const QUESTION_BANK = {
  mathematics: {
    easy: [
      { question: "What is the value of 2³?", options: ["6","8","9","12"], correctIndex: 1, explanation: "2³ = 2 × 2 × 2 = 8" },
      { question: "Solve: 3x + 7 = 22", options: ["x = 3","x = 5","x = 7","x = 15"], correctIndex: 1, explanation: "3x = 22 - 7 = 15, so x = 5" },
      { question: "What is 25% of 200?", options: ["25","50","75","100"], correctIndex: 1, explanation: "25% × 200 = 0.25 × 200 = 50" },
      { question: "What is the area of a rectangle with length 8 and width 5?", options: ["13","26","40","80"], correctIndex: 2, explanation: "Area = length × width = 8 × 5 = 40" },
      { question: "Simplify: 4/8", options: ["1/4","1/3","1/2","2/3"], correctIndex: 2, explanation: "4/8 = 1/2 (divide both by 4)" },
    ],
    medium: [
      { question: "What is the derivative of x³?", options: ["x²","2x²","3x²","3x"], correctIndex: 2, explanation: "d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x²" },
      { question: "If log₁₀(x) = 3, what is x?", options: ["30","100","1000","10000"], correctIndex: 2, explanation: "log₁₀(x) = 3 means 10³ = x = 1000" },
      { question: "What is the sum of interior angles of a hexagon?", options: ["540°","600°","720°","1080°"], correctIndex: 2, explanation: "(6-2) × 180° = 4 × 180° = 720°" },
      { question: "Solve: x² - 5x + 6 = 0", options: ["x = 1, 6","x = 2, 3","x = -2, -3","x = -1, 6"], correctIndex: 1, explanation: "Factors: (x-2)(x-3) = 0, so x = 2 or x = 3" },
      { question: "What is the standard deviation measuring?", options: ["Central tendency","Spread of data","Median value","Data frequency"], correctIndex: 1, explanation: "Standard deviation measures how spread out data values are from the mean." },
    ],
    hard: [
      { question: "What is ∫ sin(x) dx?", options: ["cos(x) + C","-cos(x) + C","sin(x) + C","-sin(x) + C"], correctIndex: 1, explanation: "The integral of sin(x) is -cos(x) + C" },
      { question: "What is the determinant of matrix [[1,2],[3,4]]?", options: ["-2","2","10","-10"], correctIndex: 0, explanation: "det = (1)(4) - (2)(3) = 4 - 6 = -2" },
      { question: "lim(x→0) sin(x)/x = ?", options: ["0","1","∞","undefined"], correctIndex: 1, explanation: "This is a famous limit. lim(x→0) sin(x)/x = 1" },
      { question: "How many ways can 5 people be arranged in a line?", options: ["25","60","120","720"], correctIndex: 2, explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120" },
      { question: "What is the value of e^(iπ) + 1?", options: ["0","1","2","-1"], correctIndex: 0, explanation: "Euler's identity: e^(iπ) + 1 = 0" },
    ]
  },
  physics: {
    easy: [
      { question: "What is the SI unit of force?", options: ["Joule","Watt","Newton","Pascal"], correctIndex: 2, explanation: "The SI unit of force is Newton (N)." },
      { question: "What is the speed of light in vacuum (approx)?", options: ["3 × 10⁶ m/s","3 × 10⁸ m/s","3 × 10¹⁰ m/s","3 × 10⁴ m/s"], correctIndex: 1, explanation: "Speed of light ≈ 3 × 10⁸ m/s" },
      { question: "Which law states F = ma?", options: ["Newton's 1st Law","Newton's 2nd Law","Newton's 3rd Law","Law of Gravitation"], correctIndex: 1, explanation: "Newton's Second Law: Force = mass × acceleration" },
      { question: "What type of energy does a moving car have?", options: ["Potential","Kinetic","Thermal","Nuclear"], correctIndex: 1, explanation: "A moving object possesses kinetic energy." },
      { question: "What is the unit of electric current?", options: ["Volt","Ohm","Ampere","Watt"], correctIndex: 2, explanation: "Electric current is measured in Amperes (A)." },
    ],
    medium: [
      { question: "A 2 kg object accelerates at 5 m/s². What force is applied?", options: ["2.5 N","7 N","10 N","20 N"], correctIndex: 2, explanation: "F = ma = 2 × 5 = 10 N" },
      { question: "What is the total resistance of 4Ω and 6Ω resistors in parallel?", options: ["2.4 Ω","5 Ω","10 Ω","24 Ω"], correctIndex: 0, explanation: "1/R = 1/4 + 1/6 = 5/12, R = 12/5 = 2.4 Ω" },
      { question: "An object is thrown upward. At the highest point, its velocity is:", options: ["Maximum","Zero","Negative","Equal to initial"], correctIndex: 1, explanation: "At the highest point, velocity momentarily becomes zero before the object starts falling." },
      { question: "What phenomenon explains why a straw looks bent in water?", options: ["Reflection","Diffraction","Refraction","Dispersion"], correctIndex: 2, explanation: "Refraction (bending of light when passing between media) causes this effect." },
      { question: "What is the efficiency if input is 500J and useful output is 350J?", options: ["50%","60%","70%","85%"], correctIndex: 2, explanation: "Efficiency = (350/500) × 100 = 70%" },
    ],
    hard: [
      { question: "What is the de Broglie wavelength formula?", options: ["λ = h/p","λ = h/E","λ = p/h","λ = E/h"], correctIndex: 0, explanation: "de Broglie: λ = h/p, where h is Planck's constant and p is momentum." },
      { question: "In special relativity, what happens to mass as velocity approaches c?", options: ["Decreases","Remains same","Approaches infinity","Becomes zero"], correctIndex: 2, explanation: "Relativistic mass increases toward infinity as v→c." },
      { question: "What is the escape velocity from Earth (approx)?", options: ["7.9 km/s","9.8 km/s","11.2 km/s","15.0 km/s"], correctIndex: 2, explanation: "Earth's escape velocity ≈ 11.2 km/s" },
      { question: "Carnot efficiency for reservoirs at 600K and 300K?", options: ["25%","50%","75%","100%"], correctIndex: 1, explanation: "η = 1 - T_cold/T_hot = 1 - 300/600 = 0.5 = 50%" },
      { question: "What does Heisenberg's Uncertainty Principle state?", options: ["Energy is quantized","Position and momentum can't both be precisely known","Light is both wave and particle","Entropy always increases"], correctIndex: 1, explanation: "ΔxΔp ≥ ℏ/2 — you cannot simultaneously know exact position and momentum." },
    ]
  },
  chemistry: {
    easy: [
      { question: "What is the chemical symbol for Gold?", options: ["Go","Gd","Au","Ag"], correctIndex: 2, explanation: "Au comes from the Latin 'Aurum'." },
      { question: "How many elements are in H₂O?", options: ["1","2","3","4"], correctIndex: 1, explanation: "H₂O contains 2 elements: Hydrogen and Oxygen." },
      { question: "What is the pH of a neutral solution?", options: ["0","5","7","14"], correctIndex: 2, explanation: "A neutral solution has pH = 7." },
      { question: "What type of bond involves sharing electrons?", options: ["Ionic","Covalent","Metallic","Hydrogen"], correctIndex: 1, explanation: "Covalent bonds involve sharing of electron pairs." },
      { question: "What is the atomic number of Carbon?", options: ["4","6","8","12"], correctIndex: 1, explanation: "Carbon has 6 protons, giving it atomic number 6." },
    ],
    medium: [
      { question: "What is Avogadro's number?", options: ["6.022 × 10²³","6.022 × 10²⁴","3.14 × 10²³","1.602 × 10⁻¹⁹"], correctIndex: 0, explanation: "Avogadro's number = 6.022 × 10²³ mol⁻¹" },
      { question: "In the reaction 2H₂ + O₂ → 2H₂O, what is the mole ratio of H₂ to O₂?", options: ["1:1","1:2","2:1","2:2"], correctIndex: 2, explanation: "The coefficients show 2 moles H₂ per 1 mole O₂, ratio = 2:1" },
      { question: "What is the hybridization of carbon in methane (CH₄)?", options: ["sp","sp²","sp³","sp³d"], correctIndex: 2, explanation: "Carbon in CH₄ forms 4 sigma bonds → sp³ hybridization." },
      { question: "Which gas law relates pressure and volume at constant temperature?", options: ["Charles's Law","Boyle's Law","Avogadro's Law","Dalton's Law"], correctIndex: 1, explanation: "Boyle's Law: PV = constant (at constant temperature)." },
      { question: "What type of reaction is: Zn + CuSO₄ → ZnSO₄ + Cu?", options: ["Decomposition","Synthesis","Single displacement","Double displacement"], correctIndex: 2, explanation: "Zinc displaces copper — single displacement reaction." },
    ],
    hard: [
      { question: "What is the IUPAC name for CH₃CH₂CH₂OH?", options: ["Methanol","Ethanol","Propan-1-ol","Butanol"], correctIndex: 2, explanation: "3-carbon chain with OH at position 1 = propan-1-ol." },
      { question: "What is the electron configuration of Fe (Z=26)?", options: ["[Ar]3d⁶4s²","[Ar]3d⁸","[Ar]3d⁵4s²4p¹","[Ar]4s²3d⁶"], correctIndex: 0, explanation: "Iron: [Ar] 3d⁶ 4s² (note: 3d fills after 4s)." },
      { question: "Which thermodynamic quantity determines reaction spontaneity?", options: ["Enthalpy","Entropy","Gibbs Free Energy","Internal Energy"], correctIndex: 2, explanation: "ΔG < 0 means spontaneous. Gibbs Free Energy = ΔH - TΔS" },
      { question: "What is the bond angle in a trigonal planar molecule?", options: ["90°","109.5°","120°","180°"], correctIndex: 2, explanation: "Trigonal planar geometry has bond angles of 120°." },
      { question: "In electrochemistry, at which electrode does oxidation occur?", options: ["Cathode","Anode","Both","Neither"], correctIndex: 1, explanation: "Oxidation occurs at the Anode (AN OX — anode oxidation)." },
    ]
  },
  biology: {
    easy: [
      { question: "What is the powerhouse of the cell?", options: ["Nucleus","Ribosome","Mitochondria","Golgi apparatus"], correctIndex: 2, explanation: "Mitochondria produce ATP — the cell's energy currency." },
      { question: "What molecule carries genetic information?", options: ["RNA","Protein","DNA","ATP"], correctIndex: 2, explanation: "DNA (Deoxyribonucleic Acid) stores genetic information." },
      { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], correctIndex: 2, explanation: "Plants absorb CO₂ and release O₂ during photosynthesis." },
      { question: "How many chromosomes do human body cells have?", options: ["23","44","46","48"], correctIndex: 2, explanation: "Human somatic cells have 46 chromosomes (23 pairs)." },
      { question: "What is the largest organ of the human body?", options: ["Liver","Brain","Skin","Heart"], correctIndex: 2, explanation: "The skin is the largest organ by surface area." },
    ],
    medium: [
      { question: "What phase of mitosis do chromosomes line up at the cell's equator?", options: ["Prophase","Metaphase","Anaphase","Telophase"], correctIndex: 1, explanation: "During Metaphase, chromosomes align at the metaphase plate." },
      { question: "What is the complementary base pair for Adenine in DNA?", options: ["Guanine","Cytosine","Thymine","Uracil"], correctIndex: 2, explanation: "In DNA: A-T and G-C are the base pairs." },
      { question: "Which organelle is responsible for protein synthesis?", options: ["Lysosome","Ribosome","Vacuole","Nucleus"], correctIndex: 1, explanation: "Ribosomes translate mRNA into proteins." },
      { question: "What type of immunity is provided by vaccines?", options: ["Natural active","Natural passive","Artificial active","Artificial passive"], correctIndex: 2, explanation: "Vaccines provide artificial active immunity by stimulating immune response." },
      { question: "What is the process of converting glucose to energy without oxygen?", options: ["Aerobic respiration","Fermentation","Photosynthesis","Osmosis"], correctIndex: 1, explanation: "Fermentation (anaerobic respiration) breaks down glucose without oxygen." },
    ],
    hard: [
      { question: "What enzyme unzips DNA during replication?", options: ["DNA polymerase","RNA polymerase","Helicase","Ligase"], correctIndex: 2, explanation: "Helicase unwinds and separates the DNA double helix." },
      { question: "In genetics, what is an organism with two different alleles called?", options: ["Homozygous","Heterozygous","Hemizygous","Codominant"], correctIndex: 1, explanation: "Heterozygous = two different alleles (e.g., Aa)." },
      { question: "What is the Hardy-Weinberg equation?", options: ["p + q = 1","p² + 2pq + q² = 1","F = ma","E = mc²"], correctIndex: 1, explanation: "Hardy-Weinberg: p² + 2pq + q² = 1, describes allele frequencies in equilibrium." },
      { question: "Which trophic level has the most energy?", options: ["Primary consumers","Secondary consumers","Producers","Decomposers"], correctIndex: 2, explanation: "Producers (autotrophs) have the most energy — energy decreases at each level." },
      { question: "What is the role of tRNA in translation?", options: ["Copies DNA","Carries amino acids to ribosome","Degrades mRNA","Produces ATP"], correctIndex: 1, explanation: "tRNA carries specific amino acids to the ribosome during protein synthesis." },
    ]
  },
  "computer science": {
    easy: [
      { question: "What does CPU stand for?", options: ["Central Processing Unit","Computer Personal Unit","Central Program Utility","Core Processing Unit"], correctIndex: 0, explanation: "CPU = Central Processing Unit — the brain of the computer." },
      { question: "What number system uses only 0 and 1?", options: ["Decimal","Octal","Binary","Hexadecimal"], correctIndex: 2, explanation: "Binary uses base-2 with digits 0 and 1." },
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Tech Modern Language","Hyper Transfer Markup Language","Home Tool Markup Language"], correctIndex: 0, explanation: "HTML = HyperText Markup Language, used for web pages." },
      { question: "Which data structure follows FIFO?", options: ["Stack","Queue","Array","Tree"], correctIndex: 1, explanation: "Queue follows First-In-First-Out (FIFO) order." },
      { question: "What is 1 byte equal to?", options: ["4 bits","8 bits","16 bits","32 bits"], correctIndex: 1, explanation: "1 byte = 8 bits." },
    ],
    medium: [
      { question: "What is the time complexity of binary search?", options: ["O(n)","O(n²)","O(log n)","O(1)"], correctIndex: 2, explanation: "Binary search halves the search space each step → O(log n)." },
      { question: "Which sorting algorithm has the best average time complexity?", options: ["Bubble Sort - O(n²)","Selection Sort - O(n²)","Merge Sort - O(n log n)","Insertion Sort - O(n²)"], correctIndex: 2, explanation: "Merge Sort has O(n log n) average and worst case." },
      { question: "What does SQL stand for?", options: ["Structured Query Language","Simple Question Language","System Query Logic","Standard Query Language"], correctIndex: 0, explanation: "SQL = Structured Query Language, used for databases." },
      { question: "What is the purpose of an operating system?", options: ["Run games","Manage hardware and software resources","Create documents","Browse internet"], correctIndex: 1, explanation: "The OS manages hardware, memory, processes, and provides an interface." },
      { question: "Which data structure uses LIFO?", options: ["Queue","Array","Stack","Linked List"], correctIndex: 2, explanation: "Stack follows Last-In-First-Out (LIFO) order." },
    ],
    hard: [
      { question: "What is the worst-case time complexity of quicksort?", options: ["O(n)","O(n log n)","O(n²)","O(2ⁿ)"], correctIndex: 2, explanation: "Quicksort worst case is O(n²) when pivot selection is poor." },
      { question: "In OOP, what is polymorphism?", options: ["Hiding data","One interface, multiple forms","Single inheritance","Data abstraction"], correctIndex: 1, explanation: "Polymorphism allows objects to take many forms — same interface, different behaviors." },
      { question: "What type of tree is used in database indexing?", options: ["Binary Tree","AVL Tree","B-Tree","Red-Black Tree"], correctIndex: 2, explanation: "B-Trees (and B+ Trees) are widely used in database indexing." },
      { question: "What is a deadlock in operating systems?", options: ["A fast process","Circular wait where processes block each other","Memory overflow","CPU overheating"], correctIndex: 1, explanation: "Deadlock: processes wait for each other's resources in a circular chain." },
      { question: "What is the halting problem?", options: ["A sorting problem","Determining if a program will finish or run forever","A networking issue","A database query"], correctIndex: 1, explanation: "The halting problem asks whether a program will terminate — proven undecidable by Turing." },
    ]
  },
  english: {
    easy: [
      { question: "What is a noun?", options: ["An action word","A describing word","A person, place, or thing","A connecting word"], correctIndex: 2, explanation: "A noun is a word that represents a person, place, thing, or idea." },
      { question: "Which is a correct sentence?", options: ["Him went store.","He went to the store.","He goed to store.","Him goes store."], correctIndex: 1, explanation: "'He went to the store' uses correct subject pronoun and past tense." },
      { question: "What is the plural of 'child'?", options: ["Childs","Childes","Children","Childrens"], correctIndex: 2, explanation: "Child → Children (irregular plural)." },
      { question: "What type of word is 'quickly'?", options: ["Noun","Verb","Adjective","Adverb"], correctIndex: 3, explanation: "Quickly is an adverb — it describes how an action is performed." },
      { question: "What punctuation ends a question?", options: ["Period","Comma","Exclamation mark","Question mark"], correctIndex: 3, explanation: "Questions end with a question mark (?)." },
    ],
    medium: [
      { question: "What literary device is 'The wind whispered through the trees'?", options: ["Simile","Metaphor","Personification","Alliteration"], correctIndex: 2, explanation: "Personification gives human qualities (whispering) to non-human things (wind)." },
      { question: "What is the past participle of 'write'?", options: ["Wrote","Written","Writed","Writing"], correctIndex: 1, explanation: "Write → wrote (past) → written (past participle)." },
      { question: "Which sentence uses the active voice?", options: ["The cake was eaten by John.","The ball was thrown.","Sarah painted the fence.","The song was sung beautifully."], correctIndex: 2, explanation: "Active voice: subject (Sarah) performs the action (painted)." },
      { question: "'Break a leg' is an example of:", options: ["Simile","Idiom","Hyperbole","Oxymoron"], correctIndex: 1, explanation: "An idiom is a phrase with a figurative meaning different from its literal meaning." },
      { question: "What is the antonym of 'benevolent'?", options: ["Kind","Generous","Malevolent","Gentle"], correctIndex: 2, explanation: "Benevolent (kind) ↔ Malevolent (wishing harm) — they are antonyms." },
    ],
    hard: [
      { question: "What is a dangling modifier?", options: ["A misplaced adjective","A modifier without a clear subject","A type of verb","A punctuation error"], correctIndex: 1, explanation: "A dangling modifier is a phrase that doesn't clearly modify any word in the sentence." },
      { question: "Which is an example of synecdoche?", options: ["'All hands on deck'","'Quiet as a mouse'","'It's raining cats and dogs'","'The world is a stage'"], correctIndex: 0, explanation: "Synecdoche uses a part (hands) to refer to the whole (sailors/crew)." },
      { question: "In which person is 'One should always be prepared' written?", options: ["First person","Second person","Third person","Omniscient"], correctIndex: 2, explanation: "'One' is a third-person indefinite pronoun." },
      { question: "What is the subjunctive mood used for?", options: ["Stating facts","Giving commands","Expressing wishes or hypotheticals","Asking questions"], correctIndex: 2, explanation: "Subjunctive mood: 'If I were rich...' — expresses wishes, demands, hypotheticals." },
      { question: "What rhetorical device asks a question not expecting an answer?", options: ["Anaphora","Rhetorical question","Antithesis","Chiasmus"], correctIndex: 1, explanation: "A rhetorical question is asked for effect, not requiring a response." },
    ]
  },
  history: {
    easy: [
      { question: "In which year did World War II end?", options: ["1942","1944","1945","1950"], correctIndex: 2, explanation: "WWII ended in 1945 with the surrender of Germany and Japan." },
      { question: "Who was the first President of the United States?", options: ["Abraham Lincoln","Thomas Jefferson","George Washington","John Adams"], correctIndex: 2, explanation: "George Washington served as the first U.S. President (1789-1797)." },
      { question: "The Great Wall was built primarily in which country?", options: ["Japan","India","China","Korea"], correctIndex: 2, explanation: "The Great Wall of China was built over many centuries." },
      { question: "Which civilization built the pyramids of Giza?", options: ["Roman","Greek","Egyptian","Mayan"], correctIndex: 2, explanation: "The Ancient Egyptians built the pyramids of Giza around 2560 BC." },
      { question: "What was the Renaissance?", options: ["A war","A cultural rebirth in Europe","A disease","A type of government"], correctIndex: 1, explanation: "The Renaissance was a cultural and intellectual rebirth in Europe (14th-17th century)." },
    ],
    medium: [
      { question: "What event triggered World War I?", options: ["Pearl Harbor attack","Assassination of Archduke Franz Ferdinand","Fall of Berlin Wall","Treaty of Versailles"], correctIndex: 1, explanation: "The assassination of Archduke Franz Ferdinand in 1914 triggered WWI." },
      { question: "The French Revolution began in which year?", options: ["1776","1789","1804","1815"], correctIndex: 1, explanation: "The French Revolution began in 1789 with the storming of the Bastille." },
      { question: "Who led the Indian independence movement with nonviolent resistance?", options: ["Jawaharlal Nehru","Subhas Chandra Bose","Mahatma Gandhi","Bhagat Singh"], correctIndex: 2, explanation: "Mahatma Gandhi led India's nonviolent independence movement." },
      { question: "What was the Cold War primarily between?", options: ["USA and China","USA and USSR","UK and Germany","France and Russia"], correctIndex: 1, explanation: "The Cold War (1947-1991) was between the USA and the Soviet Union." },
      { question: "The Industrial Revolution started in which country?", options: ["France","Germany","United States","Great Britain"], correctIndex: 3, explanation: "The Industrial Revolution began in Great Britain in the late 18th century." },
    ],
    hard: [
      { question: "The Treaty of Westphalia (1648) is significant for establishing:", options: ["The United Nations","Modern state sovereignty","The European Union","Colonial empires"], correctIndex: 1, explanation: "The Treaty of Westphalia established the concept of state sovereignty in international law." },
      { question: "What was the significance of the Magna Carta (1215)?", options: ["Ended the Crusades","Limited the power of the English monarch","Started the Renaissance","United Europe"], correctIndex: 1, explanation: "The Magna Carta limited royal authority and established the principle that everyone is subject to law." },
      { question: "The Meiji Restoration in Japan occurred in which year?", options: ["1776","1848","1868","1912"], correctIndex: 2, explanation: "The Meiji Restoration of 1868 modernized Japan and ended feudal rule." },
      { question: "What was the Marshall Plan?", options: ["A military strategy","US economic aid to rebuild Europe after WWII","A peace treaty","A colonial expansion plan"], correctIndex: 1, explanation: "The Marshall Plan (1948) provided US economic aid to rebuild post-WWII Western Europe." },
      { question: "The Berlin Wall fell in which year?", options: ["1985","1987","1989","1991"], correctIndex: 2, explanation: "The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War." },
    ]
  },
  economics: {
    easy: [
      { question: "What is inflation?", options: ["Decrease in prices","General increase in prices","Stable prices","Government spending"], correctIndex: 1, explanation: "Inflation is a general increase in prices and fall in purchasing power." },
      { question: "What does GDP stand for?", options: ["General Domestic Price","Gross Domestic Product","Grand Development Plan","Growth Development Product"], correctIndex: 1, explanation: "GDP = Gross Domestic Product — total value of goods/services produced." },
      { question: "What is supply and demand?", options: ["A type of tax","Economic model of price determination","Government regulation","A banking term"], correctIndex: 1, explanation: "Supply and demand is the model explaining how prices are set in a market." },
      { question: "What is a monopoly?", options: ["Many sellers","Two sellers","One seller dominates market","Perfect competition"], correctIndex: 2, explanation: "A monopoly exists when one company dominates the entire market." },
      { question: "What is a recession?", options: ["Economic growth","A period of economic decline","Rising stock market","Low unemployment"], correctIndex: 1, explanation: "A recession is a significant decline in economic activity lasting months." },
    ],
    medium: [
      { question: "What is opportunity cost?", options: ["The price of goods","The next best alternative forgone","Production cost","Marketing expense"], correctIndex: 1, explanation: "Opportunity cost is the value of the next best alternative you give up." },
      { question: "What happens when demand increases and supply stays the same?", options: ["Price decreases","Price stays same","Price increases","Supply increases"], correctIndex: 2, explanation: "Increased demand with constant supply drives prices up." },
      { question: "What is fiscal policy?", options: ["Central bank actions","Government spending and taxation","Trade agreements","Stock market regulation"], correctIndex: 1, explanation: "Fiscal policy involves government decisions on spending and taxation." },
      { question: "What is the Consumer Price Index (CPI)?", options: ["Stock market index","Measure of average price changes","Interest rate","Employment rate"], correctIndex: 1, explanation: "CPI measures average change in prices paid by consumers over time." },
      { question: "What type of good has demand that increases as income increases?", options: ["Inferior good","Normal good","Giffen good","Public good"], correctIndex: 1, explanation: "Normal goods see increased demand as consumer income rises." },
    ],
    hard: [
      { question: "What is the Phillips Curve?", options: ["Relationship between GDP and trade","Inverse relationship between inflation and unemployment","Supply curve for monopolies","Demand elasticity curve"], correctIndex: 1, explanation: "The Phillips Curve shows an inverse relationship between inflation and unemployment." },
      { question: "What is the Keynesian multiplier effect?", options: ["Tax evasion","Initial spending creates larger total economic impact","Double taxation","Currency devaluation"], correctIndex: 1, explanation: "The multiplier effect: initial spending generates additional rounds of spending." },
      { question: "What does a Lorenz Curve measure?", options: ["Inflation","GDP growth","Income inequality","Trade balance"], correctIndex: 2, explanation: "The Lorenz Curve graphically represents income distribution and inequality." },
      { question: "What is moral hazard in economics?", options: ["Ethical business practices","Risk-taking when insulated from consequences","Government regulation","Market equilibrium"], correctIndex: 1, explanation: "Moral hazard: tendency to take more risk when protected from consequences." },
      { question: "What is the difference between nominal and real GDP?", options: ["No difference","Real GDP adjusts for inflation","Nominal GDP adjusts for inflation","Both are the same"], correctIndex: 1, explanation: "Real GDP is adjusted for inflation, giving a more accurate picture of growth." },
    ]
  }
};

// ===== APP STATE =====
let state = {
  subjects: [],
  dailyHours: 6,
  schedule: [],
  checklist: {},
  materials: [],
  streak: 0,
  lastStudyDate: null,
  setupComplete: false
};

let currentWeekOffset = 0;
let practiceAnswers = {};

// ===== DATE UTILITIES =====
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateLong(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function getDayName(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1 + 'T00:00:00');
  const d2 = new Date(date2 + 'T00:00:00');
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
}

function isToday(dateStr) {
  return dateStr === getToday();
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function getWeekDates(offset) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + (offset * 7));
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

// ===== LOCAL STORAGE =====
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state = JSON.parse(saved);
    if (!state.materials) state.materials = [];
    return true;
  }
  return false;
}

// ===== NAVIGATION =====
function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  if (viewName === 'setup') {
    document.getElementById('setupView').classList.remove('hidden');
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.main-content').style.marginLeft = '0';
    return;
  }

  document.querySelector('.sidebar').style.display = '';
  document.querySelector('.main-content').style.marginLeft = '';

  const viewEl = document.getElementById(viewName + 'View');
  if (viewEl) viewEl.classList.remove('hidden');

  const navLink = document.querySelector(`.nav-link[data-view="${viewName}"]`);
  if (navLink) navLink.classList.add('active');

  // Render the view
  if (viewName === 'dashboard') renderDashboard();
  else if (viewName === 'timetable') renderTimetable(currentWeekOffset);
  else if (viewName === 'checklist') renderChecklist();
  else if (viewName === 'practice') renderPracticeSetup();
  else if (viewName === 'materials') renderMaterials();

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.classList.remove('show');
}

// ===== SETUP =====
function initSetup() {
  const subjectsList = document.getElementById('subjectsList');
  subjectsList.innerHTML = '';
  addSubjectEntry();
  addSubjectEntry();
  updateSubjectNumbers();

  document.getElementById('dailyHours').addEventListener('input', function() {
    document.getElementById('hoursValue').textContent = this.value + ' hrs';
  });
}

function addSubjectEntry() {
  const template = document.getElementById('subjectTemplate');
  const clone = template.content.cloneNode(true);
  const entry = clone.querySelector('.subject-entry');

  entry.querySelector('.remove-subject-btn').addEventListener('click', function() {
    const list = document.getElementById('subjectsList');
    if (list.children.length > 1) {
      entry.remove();
      updateSubjectNumbers();
    } else {
      showToast('You need at least one subject!', 'warning');
    }
  });

  // Set min date to today
  const dateInput = entry.querySelector('.exam-date');
  dateInput.min = getToday();

  document.getElementById('subjectsList').appendChild(entry);
  updateSubjectNumbers();
}

function updateSubjectNumbers() {
  const entries = document.querySelectorAll('.subject-entry');
  entries.forEach((entry, i) => {
    entry.querySelector('.subject-number').textContent = 'Subject ' + (i + 1);
  });
}

function validateAndGeneratePlan() {
  const entries = document.querySelectorAll('.subject-entry');
  const subjects = [];
  let valid = true;

  entries.forEach((entry, i) => {
    const name = entry.querySelector('.subject-name').value.trim();
    const date = entry.querySelector('.exam-date').value;
    const difficulty = parseInt(entry.querySelector('.subject-difficulty').value);
    const topics = entry.querySelector('.subject-topics').value.trim();

    if (!name) {
      showToast(`Please enter a name for Subject ${i + 1}`, 'error');
      valid = false; return;
    }
    if (!date) {
      showToast(`Please select an exam date for "${name}"`, 'error');
      valid = false; return;
    }
    if (date < getToday()) {
      showToast(`Exam date for "${name}" must be in the future`, 'error');
      valid = false; return;
    }
    if (!topics) {
      showToast(`Please enter topics for "${name}"`, 'error');
      valid = false; return;
    }

    subjects.push({
      id: 'subj_' + Date.now() + '_' + i,
      name: name,
      examDate: date,
      difficulty: difficulty,
      topics: topics.split(',').map(t => t.trim()).filter(t => t),
      color: SUBJECT_COLORS[i % SUBJECT_COLORS.length]
    });
  });

  if (!valid || subjects.length === 0) return;

  state.subjects = subjects;
  state.dailyHours = parseInt(document.getElementById('dailyHours').value);
  state.setupComplete = true;

  // Generate schedule and checklist
  state.schedule = generateSchedule(subjects, state.dailyHours);
  state.checklist = generateChecklist(subjects);

  saveState();
  showToast('Study plan generated successfully! 🚀', 'success');
  showView('dashboard');
}

// ===== SCHEDULE GENERATION ALGORITHM =====
function generateSchedule(subjects, dailyHours) {
  const today = getToday();
  const sessions = [];
  let sessionId = 0;

  // Find the last exam date
  let lastExamDate = today;
  subjects.forEach(s => {
    if (s.examDate > lastExamDate) lastExamDate = s.examDate;
  });

  const totalDays = daysBetween(today, lastExamDate);
  if (totalDays <= 0) return sessions;

  // For each day from today to last exam
  for (let d = 0; d <= totalDays; d++) {
    const currentDate = addDays(today, d);
    let remainingHours = dailyHours;

    // Filter active subjects (exam not passed)
    const activeSubjects = subjects.filter(s => s.examDate >= currentDate);
    if (activeSubjects.length === 0) continue;

    // Calculate weights based on urgency and difficulty
    let totalWeight = 0;
    const weights = activeSubjects.map(s => {
      const daysUntilExam = daysBetween(currentDate, s.examDate);
      const urgency = daysUntilExam <= 0 ? 10 : Math.max(1, 10 / Math.sqrt(daysUntilExam));
      const weight = urgency * (s.difficulty / 3);
      totalWeight += weight;
      return { subject: s, weight, daysUntilExam };
    });

    // Allocate hours proportionally
    let startHour = 9; // 9 AM
    weights.forEach(({ subject, weight, daysUntilExam }) => {
      if (daysUntilExam < 0) return;

      let allocatedHours = Math.round((weight / totalWeight) * dailyHours * 2) / 2; // Round to 0.5
      allocatedHours = Math.max(0.5, Math.min(allocatedHours, remainingHours));
      if (allocatedHours <= 0 || remainingHours <= 0) return;

      // Split into sessions of max 2 hours
      while (allocatedHours > 0 && remainingHours > 0) {
        const duration = Math.min(allocatedHours, 2, remainingHours);
        if (duration < 0.5) break;

        // Pick topics for this session
        const topicIndex = sessionId % subject.topics.length;
        const sessionTopics = [subject.topics[topicIndex]];
        if (subject.topics.length > 1 && duration >= 1.5) {
          sessionTopics.push(subject.topics[(topicIndex + 1) % subject.topics.length]);
        }

        sessions.push({
          id: 'session_' + (sessionId++),
          date: currentDate,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectColor: subject.color,
          startHour: startHour,
          duration: duration,
          status: 'upcoming',
          topics: sessionTopics,
          isRescheduled: false
        });

        startHour += duration;
        allocatedHours -= duration;
        remainingHours -= duration;
      }
    });
  }

  return sessions;
}

// ===== SMART RESCHEDULING =====
function rescheduleAfterMiss(sessionId) {
  const session = state.schedule.find(s => s.id === sessionId);
  if (!session) return;

  session.status = 'missed';
  const missedHours = session.duration;
  const missedSubject = session.subjectName;
  const missedSubjectId = session.subjectId;
  const today = getToday();

  // Find next 5 days with room for extra sessions
  const futureDates = new Set();
  let checkDate = addDays(session.date, 1);
  const subject = state.subjects.find(s => s.id === missedSubjectId);
  const examDate = subject ? subject.examDate : addDays(today, 30);

  for (let i = 0; i < 30 && futureDates.size < 5; i++) {
    if (checkDate > examDate) break;
    const existingSessions = state.schedule.filter(s => s.date === checkDate && s.status !== 'missed');
    const usedHours = existingSessions.reduce((sum, s) => sum + s.duration, 0);
    if (usedHours < state.dailyHours) {
      futureDates.add(checkDate);
    }
    checkDate = addDays(checkDate, 1);
  }

  // Distribute missed hours across available dates
  const dates = Array.from(futureDates);
  if (dates.length === 0) {
    showToast('No available slots to reschedule. Consider increasing daily hours.', 'warning');
    saveState();
    return;
  }

  let hoursToDistribute = missedHours;
  const newSessions = [];

  dates.forEach(date => {
    if (hoursToDistribute <= 0) return;
    const existingSessions = state.schedule.filter(s => s.date === date && s.status !== 'missed');
    const usedHours = existingSessions.reduce((sum, s) => sum + s.duration, 0);
    const availableHours = state.dailyHours - usedHours;
    const extraHours = Math.min(hoursToDistribute, availableHours, 1.5);

    if (extraHours >= 0.5) {
      const lastSession = existingSessions[existingSessions.length - 1];
      const startHour = lastSession ? lastSession.startHour + lastSession.duration : 9;

      const newSession = {
        id: 'session_reschedule_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        date: date,
        subjectId: missedSubjectId,
        subjectName: missedSubject,
        subjectColor: session.subjectColor,
        startHour: startHour,
        duration: extraHours,
        status: 'upcoming',
        topics: session.topics,
        isRescheduled: true
      };

      newSessions.push(newSession);
      state.schedule.push(newSession);
      hoursToDistribute -= extraHours;
    }
  });

  // Sort schedule by date and time
  state.schedule.sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour);
  saveState();

  // Show alert
  const alertCard = document.getElementById('missedAlert');
  if (alertCard) {
    alertCard.classList.remove('hidden');
    const alertBody = document.getElementById('missedAlertBody');
    const rescheduledDates = newSessions.map(s => formatDate(s.date) + ' (' + s.duration + 'h)').join(', ');
    alertBody.innerHTML = `
      <p class="alert-text">
        <strong>📋 "${missedSubject}" session was missed.</strong><br>
        The ${missedHours}h of study time has been redistributed to: <strong>${rescheduledDates || 'N/A'}</strong>.<br>
        Your schedule has been automatically adjusted to keep you on track!
      </p>
    `;
  }

  showToast(`Schedule adjusted! ${missedSubject} hours redistributed.`, 'warning');
}

// ===== CHECKLIST GENERATION =====
function generateChecklist(subjects) {
  const checklist = {};
  subjects.forEach(subject => {
    checklist[subject.id] = {
      subjectName: subject.name,
      color: subject.color,
      topics: subject.topics.map(topic => ({
        name: topic,
        subtasks: [
          { label: 'Review notes on ' + topic, done: false },
          { label: 'Practice problems for ' + topic, done: false },
          { label: 'Summary & revision of ' + topic, done: false }
        ]
      }))
    };
  });
  return checklist;
}

// ===== DASHBOARD RENDERING =====
function renderDashboard() {
  const today = getToday();

  // Date display
  document.getElementById('dashboardDate').textContent = formatDateLong(today);

  // Stats
  document.getElementById('totalExams').textContent = state.subjects.length;

  // Days until next exam
  let minDays = Infinity;
  state.subjects.forEach(s => {
    const days = daysBetween(today, s.examDate);
    if (days >= 0 && days < minDays) minDays = days;
  });
  document.getElementById('daysUntilNext').textContent = minDays === Infinity ? '—' : minDays;

  // Overall progress
  const totalSessions = state.schedule.length;
  const completedSessions = state.schedule.filter(s => s.status === 'completed').length;
  const progress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
  document.getElementById('overallProgress').textContent = progress + '%';

  // Study streak
  calculateStreak();
  document.getElementById('studyStreak').textContent = state.streak;

  // Today's schedule
  renderTodaySchedule();

  // Upcoming exams
  renderUpcomingExams();

  // Subject progress
  renderSubjectProgress();
}

function calculateStreak() {
  let streak = 0;
  let checkDate = getToday();

  // Check if there's a completed session today
  const todaySessions = state.schedule.filter(s => s.date === checkDate);
  const todayHasCompleted = todaySessions.some(s => s.status === 'completed');
  const todayAllUpcoming = todaySessions.every(s => s.status === 'upcoming');

  // If today has no completed yet but has upcoming, check from yesterday
  if (!todayHasCompleted) {
    checkDate = addDays(checkDate, -1);
  }

  for (let i = 0; i < 365; i++) {
    const daySessions = state.schedule.filter(s => s.date === checkDate);
    if (daySessions.length === 0) break;
    const hasCompleted = daySessions.some(s => s.status === 'completed');
    if (!hasCompleted) break;
    streak++;
    checkDate = addDays(checkDate, -1);
  }

  state.streak = streak;
}

function renderTodaySchedule() {
  const container = document.getElementById('todaySchedule');
  const today = getToday();
  const todaySessions = state.schedule.filter(s => s.date === today);

  if (todaySessions.length === 0) {
    container.innerHTML = '<div class="no-sessions"><i class="fas fa-check-circle" style="font-size:2rem;display:block;margin-bottom:10px;color:var(--success)"></i>No sessions scheduled for today!</div>';
    return;
  }

  container.innerHTML = todaySessions.map(session => {
    const startTime = formatTime(session.startHour);
    const endTime = formatTime(session.startHour + session.duration);
    const statusClass = session.status === 'completed' ? 'completed' : session.status === 'missed' ? 'missed' : '';

    let actionHtml = '';
    if (session.status === 'upcoming') {
      actionHtml = `
        <div class="session-actions">
          <button class="session-btn complete-btn" onclick="completeSession('${session.id}')"><i class="fas fa-check"></i> Done</button>
          <button class="session-btn miss-btn" onclick="missSession('${session.id}')"><i class="fas fa-times"></i> Miss</button>
        </div>
      `;
    } else {
      actionHtml = `<span class="session-status-badge ${session.status}">${session.status}</span>`;
    }

    return `
      <div class="session-item ${statusClass}">
        <span class="session-time">${startTime} - ${endTime}</span>
        <span class="session-dot" style="background:${session.subjectColor}"></span>
        <div class="session-info">
          <div class="session-subject">${session.subjectName}${session.isRescheduled ? ' <i class="fas fa-redo" style="font-size:0.7rem;color:var(--warning)" title="Rescheduled"></i>' : ''}</div>
          <div class="session-topics">${session.topics.join(', ')}</div>
        </div>
        ${actionHtml}
      </div>
    `;
  }).join('');
}

function formatTime(hour) {
  const h = Math.floor(hour);
  const m = (hour % 1) * 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  return displayH + ':' + String(Math.round(m)).padStart(2, '0') + ' ' + period;
}

function renderUpcomingExams() {
  const container = document.getElementById('upcomingExams');
  const today = getToday();

  const upcoming = state.subjects
    .map(s => ({ ...s, daysLeft: daysBetween(today, s.examDate) }))
    .filter(s => s.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  if (upcoming.length === 0) {
    container.innerHTML = '<div class="no-sessions">All exams completed! 🎉</div>';
    return;
  }

  container.innerHTML = upcoming.map(exam => {
    const urgencyClass = exam.daysLeft <= 3 ? 'urgent' : exam.daysLeft <= 7 ? 'soon' : 'normal';
    return `
      <div class="exam-item">
        <span class="exam-color-dot" style="background:${exam.color}"></span>
        <div class="exam-info">
          <div class="exam-name">${exam.name}</div>
          <div class="exam-date">${formatDate(exam.examDate)}</div>
        </div>
        <span class="exam-countdown ${urgencyClass}">
          ${exam.daysLeft === 0 ? 'Today!' : exam.daysLeft + ' day' + (exam.daysLeft !== 1 ? 's' : '')}
        </span>
      </div>
    `;
  }).join('');
}

function renderSubjectProgress() {
  const container = document.getElementById('subjectProgress');

  container.innerHTML = state.subjects.map(subject => {
    const subjectSessions = state.schedule.filter(s => s.subjectId === subject.id);
    const completed = subjectSessions.filter(s => s.status === 'completed').length;
    const total = subjectSessions.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return `
      <div class="progress-item">
        <span class="progress-label" style="color:${subject.color}">${subject.name}</span>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width:${percentage}%;background:linear-gradient(90deg,${subject.color},${subject.color}aa)"></div>
        </div>
        <span class="progress-percentage">${percentage}%</span>
      </div>
    `;
  }).join('');
}

// ===== SESSION ACTIONS =====
function completeSession(sessionId) {
  const session = state.schedule.find(s => s.id === sessionId);
  if (!session) return;

  session.status = 'completed';
  state.lastStudyDate = getToday();
  saveState();

  showToast(`Great job! "${session.subjectName}" session completed! 🎉`, 'success');
  renderDashboard();
}

function missSession(sessionId) {
  rescheduleAfterMiss(sessionId);
  renderDashboard();
}

// ===== TIMETABLE =====
function renderTimetable(weekOffset) {
  const weekDates = getWeekDates(weekOffset);
  const grid = document.getElementById('timetableGrid');
  const today = getToday();

  // Week label
  document.getElementById('weekLabel').textContent =
    formatDate(weekDates[0]) + ' — ' + formatDate(weekDates[6]);

  grid.innerHTML = weekDates.map(date => {
    const daySessions = state.schedule.filter(s => s.date === date);
    const isTodayClass = isToday(date) ? 'is-today' : '';
    const dayName = getDayName(date);
    const dayNum = new Date(date + 'T00:00:00').getDate();

    let sessionsHtml = '';
    if (daySessions.length === 0) {
      sessionsHtml = '<div class="timetable-empty">No sessions</div>';
    } else {
      sessionsHtml = daySessions.map(session => {
        let statusClass = '';
        if (session.status === 'completed') statusClass = 'ts-completed';
        else if (session.status === 'missed') statusClass = 'ts-missed';
        if (session.isRescheduled && session.status === 'upcoming') statusClass = 'ts-rescheduled';

        return `
          <div class="timetable-session ${statusClass}"
               style="border-left-color:${session.subjectColor}"
               onclick="toggleSessionStatus('${session.id}')"
               title="Click to mark complete/miss">
            <div class="ts-time">${formatTime(session.startHour)}</div>
            <div class="ts-subject">${session.subjectName}</div>
            <div class="ts-duration">${session.duration}h · ${session.topics[0] || ''}</div>
          </div>
        `;
      }).join('');
    }

    return `
      <div class="timetable-day ${isTodayClass}">
        <div class="timetable-day-header">
          <div class="day-name">${dayName}</div>
          <div class="day-date">${dayNum}</div>
        </div>
        <div class="timetable-day-body">${sessionsHtml}</div>
      </div>
    `;
  }).join('');
}

function toggleSessionStatus(sessionId) {
  const session = state.schedule.find(s => s.id === sessionId);
  if (!session) return;

  if (session.status === 'upcoming') {
    session.status = 'completed';
    state.lastStudyDate = getToday();
    saveState();
    showToast(`"${session.subjectName}" marked as completed!`, 'success');
  } else if (session.status === 'completed') {
    session.status = 'upcoming';
    saveState();
    showToast(`"${session.subjectName}" marked as upcoming.`, 'info');
  }

  renderTimetable(currentWeekOffset);
}

// ===== CHECKLIST =====
function renderChecklist() {
  const container = document.getElementById('checklistContent');
  const filter = document.getElementById('checklistFilter').value;

  // Populate filter dropdown
  const filterSelect = document.getElementById('checklistFilter');
  if (filterSelect.options.length <= 1) {
    state.subjects.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name;
      filterSelect.appendChild(opt);
    });
  }

  let subjectIds = Object.keys(state.checklist);
  if (filter !== 'all') {
    subjectIds = subjectIds.filter(id => id === filter);
  }

  container.innerHTML = subjectIds.map(subjectId => {
    const subj = state.checklist[subjectId];
    const totalTasks = subj.topics.reduce((sum, t) => sum + t.subtasks.length, 0);
    const doneTasks = subj.topics.reduce((sum, t) => sum + t.subtasks.filter(st => st.done).length, 0);

    return `
      <div class="checklist-subject open" id="checklist-${subjectId}">
        <div class="checklist-subject-header" style="border-left-color:${subj.color}" onclick="toggleChecklist('${subjectId}')">
          <div class="checklist-subject-title">
            <span>${subj.subjectName}</span>
            <span class="checklist-subject-count">${doneTasks}/${totalTasks} completed</span>
          </div>
          <span class="checklist-subject-toggle"><i class="fas fa-chevron-down"></i></span>
        </div>
        <div class="checklist-items">
          ${subj.topics.map((topic, ti) => `
            <div class="checklist-topic">
              <div class="checklist-topic-name">${topic.name}</div>
              ${topic.subtasks.map((task, si) => `
                <div class="checklist-item ${task.done ? 'checked' : ''}" onclick="toggleChecklistItem('${subjectId}', ${ti}, ${si})">
                  <div class="checklist-checkbox"></div>
                  <span class="checklist-label">${task.label}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function toggleChecklist(subjectId) {
  const el = document.getElementById('checklist-' + subjectId);
  if (el) el.classList.toggle('open');
}

function toggleChecklistItem(subjectId, topicIndex, subtaskIndex) {
  state.checklist[subjectId].topics[topicIndex].subtasks[subtaskIndex].done =
    !state.checklist[subjectId].topics[topicIndex].subtasks[subtaskIndex].done;
  saveState();
  renderChecklist();
}

// ===== PRACTICE QUESTIONS =====
function renderPracticeSetup() {
  const subjectSelect = document.getElementById('practiceSubject');
  if (subjectSelect.options.length <= 1) {
    state.subjects.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      subjectSelect.appendChild(opt);
    });
  }
}

function generateQuestions() {
  const subjectName = document.getElementById('practiceSubject').value;
  const difficulty = document.getElementById('practiceDifficulty').value;

  if (!subjectName) {
    showToast('Please select a subject first!', 'warning');
    return;
  }

  const key = subjectName.toLowerCase();
  let questions = [];

  if (QUESTION_BANK[key]) {
    if (difficulty === 'all') {
      questions = [...(QUESTION_BANK[key].easy || []), ...(QUESTION_BANK[key].medium || []), ...(QUESTION_BANK[key].hard || [])];
    } else {
      questions = QUESTION_BANK[key][difficulty] || [];
    }
  }

  // If no questions found, generate generic ones
  if (questions.length === 0) {
    const subject = state.subjects.find(s => s.name === subjectName);
    const topics = subject ? subject.topics : [subjectName];
    questions = generateGenericQuestions(subjectName, topics);
  }

  // Shuffle and pick up to 10
  questions = shuffleArray(questions).slice(0, 10);
  practiceAnswers = {};
  renderPracticeQuestions(questions);
  document.getElementById('practiceScore').classList.add('hidden');
}

function generateGenericQuestions(subjectName, topics) {
  const questions = [];
  topics.forEach((topic, i) => {
    questions.push({
      question: `Which of the following best describes the key concept of "${topic}" in ${subjectName}?`,
      options: [
        `It involves fundamental principles of ${topic}`,
        `It is unrelated to ${subjectName}`,
        `It only applies to advanced studies`,
        `It was introduced in the 21st century`
      ],
      correctIndex: 0,
      explanation: `Understanding the fundamental principles of ${topic} is essential for ${subjectName}.`
    });
    questions.push({
      question: `What is the most effective way to study "${topic}"?`,
      options: [
        `Memorize everything without understanding`,
        `Practice problems and understand concepts`,
        `Only read the textbook once`,
        `Skip it entirely`
      ],
      correctIndex: 1,
      explanation: `Practicing problems and understanding concepts is the most effective study method.`
    });
    questions.push({
      question: `How does "${topic}" relate to the broader field of ${subjectName}?`,
      options: [
        `It is a foundational concept that connects to many areas`,
        `It has no connection to other topics`,
        `It is only used in examinations`,
        `It is an outdated concept`
      ],
      correctIndex: 0,
      explanation: `${topic} is a foundational concept in ${subjectName} that connects to many other areas of study.`
    });
  });
  return questions;
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderPracticeQuestions(questions) {
  const container = document.getElementById('practiceContent');
  const letters = ['A', 'B', 'C', 'D'];

  container.innerHTML = questions.map((q, qi) => `
    <div class="question-card" id="question-${qi}">
      <div class="question-number">${qi + 1}</div>
      <div class="question-text">${q.question}</div>
      <div class="question-options">
        ${q.options.map((opt, oi) => `
          <button class="option-btn" data-question="${qi}" data-option="${oi}" data-correct="${q.correctIndex}" onclick="selectAnswer(${qi}, ${oi}, ${q.correctIndex})">
            <span class="option-letter">${letters[oi]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="question-explanation" id="explanation-${qi}">
        <strong>Explanation:</strong> ${q.explanation}
      </div>
    </div>
  `).join('') + `
    <div style="text-align:center;padding:20px;">
      <button class="btn btn-primary btn-large" onclick="showPracticeScore(${questions.length})">
        <i class="fas fa-check-circle"></i> Submit Answers
      </button>
    </div>
  `;
}

function selectAnswer(questionIndex, optionIndex, correctIndex) {
  // Remove previous selection for this question
  const questionCard = document.getElementById('question-' + questionIndex);
  questionCard.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));

  // Select this option
  const selectedBtn = questionCard.querySelectorAll('.option-btn')[optionIndex];
  selectedBtn.classList.add('selected');

  practiceAnswers[questionIndex] = optionIndex;
}

function showPracticeScore(totalQuestions) {
  let correct = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const questionCard = document.getElementById('question-' + i);
    if (!questionCard) continue;

    const buttons = questionCard.querySelectorAll('.option-btn');
    const correctIndex = parseInt(buttons[0].dataset.correct);
    const selected = practiceAnswers[i];

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
      if (idx === correctIndex) {
        btn.classList.add('correct');
        btn.classList.add('show-correct');
      }
      if (selected === idx && idx !== correctIndex) {
        btn.classList.add('incorrect');
      }
    });

    // Show explanation
    const explanation = document.getElementById('explanation-' + i);
    if (explanation) explanation.classList.add('show');

    if (selected === correctIndex) correct++;
  }

  const scoreCard = document.getElementById('practiceScore');
  scoreCard.classList.remove('hidden');
  document.getElementById('scoreValue').textContent = correct + '/' + totalQuestions;

  showToast(`Score: ${correct}/${totalQuestions} — ${Math.round((correct/totalQuestions)*100)}%`, correct >= totalQuestions/2 ? 'success' : 'warning');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ===== MODAL =====
let modalCallback = null;

function showModal(title, body, onConfirm) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  document.getElementById('modalOverlay').classList.remove('hidden');
  modalCallback = onConfirm;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  modalCallback = null;
}

// ===== STUDY MATERIALS & PDF MANAGEMENT =====
function renderMaterials() {
  const filterSelect = document.getElementById('materialSubjectFilter');
  const uploadSelect = document.getElementById('uploadSubjectSelect');
  const container = document.getElementById('materialsContent');

  // Populate subject dropdown filters
  const currentFilter = filterSelect.value || 'all';
  filterSelect.innerHTML = '<option value="all">All Subjects</option>';
  uploadSelect.innerHTML = '<option value="">Select Subject</option>';

  state.subjects.forEach(s => {
    const optFilter = document.createElement('option');
    optFilter.value = s.id;
    optFilter.textContent = s.name;
    if (s.id === currentFilter) optFilter.selected = true;
    filterSelect.appendChild(optFilter);

    const optUpload = document.createElement('option');
    optUpload.value = s.id;
    optUpload.textContent = s.name;
    uploadSelect.appendChild(optUpload);
  });

  const materials = state.materials || [];
  const selectedFilter = filterSelect.value;
  const filteredMaterials = selectedFilter === 'all' 
    ? materials 
    : materials.filter(m => m.subjectId === selectedFilter);

  if (materials.length === 0) {
    container.innerHTML = `
      <div class="card text-center" style="padding:40px;color:var(--text-light);">
        <i class="fas fa-folder-open" style="font-size:2.5rem;color:#cbd5e1;margin-bottom:12px;display:block;"></i>
        <h3 style="margin-bottom:6px;">No Materials Uploaded Yet</h3>
        <p style="font-size:0.9rem;">Upload your lecture notes, past exam papers, formulas or summaries in PDF format above.</p>
      </div>
    `;
    return;
  }

  // Group materials by subject
  const subjectsToDisplay = selectedFilter === 'all' 
    ? state.subjects 
    : state.subjects.filter(s => s.id === selectedFilter);

  let html = '';
  subjectsToDisplay.forEach(subj => {
    const subjMaterials = filteredMaterials.filter(m => m.subjectId === subj.id);
    if (subjMaterials.length === 0) return;

    html += `
      <div class="material-subject-group">
        <div class="material-group-header" style="border-left: 4px solid ${subj.color};">
          <div class="material-group-title">
            <span style="color:${subj.color}"><i class="fas fa-book"></i></span>
            <span>${subj.name}</span>
          </div>
          <span class="material-group-count">${subjMaterials.length} item${subjMaterials.length > 1 ? 's' : ''}</span>
        </div>
        <div class="material-grid">
          ${subjMaterials.map(item => {
            const isPdf = item.name.toLowerCase().endsWith('.pdf');
            return `
              <div class="material-card">
                <div class="material-icon ${isPdf ? 'pdf' : 'doc'}">
                  <i class="fas ${isPdf ? 'fa-file-pdf' : 'fa-file-alt'}"></i>
                </div>
                <div class="material-info">
                  <div class="material-title" title="${item.name}">${item.name}</div>
                  <div class="material-meta">${formatFileSize(item.size)} • ${item.date}</div>
                </div>
                <div class="material-actions">
                  <button class="btn-icon" title="Preview / Read" onclick="previewMaterial('${item.id}')">
                    <i class="fas fa-eye"></i>
                  </button>
                  <a class="btn-icon" title="Download" href="${item.dataUrl}" download="${item.name}">
                    <i class="fas fa-download"></i>
                  </a>
                  <button class="btn-icon delete" title="Delete" onclick="deleteMaterial('${item.id}')">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  if (!html) {
    html = `
      <div class="card text-center" style="padding:40px;color:var(--text-light);">
        <p>No materials found for the selected subject.</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

function formatFileSize(bytes) {
  if (!bytes) return '0 KB';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function handleMaterialUpload(files) {
  if (!files || files.length === 0) return;
  const uploadSelect = document.getElementById('uploadSubjectSelect');
  let subjectId = uploadSelect.value;

  if (!subjectId) {
    if (state.subjects.length > 0) {
      subjectId = state.subjects[0].id;
      showToast(`No subject selected. Assigned to "${state.subjects[0].name}".`, 'info');
    } else {
      showToast('Please set up subjects before uploading study material.', 'warning');
      return;
    }
  }

  const subject = state.subjects.find(s => s.id === subjectId);
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (!state.materials) state.materials = [];
      const newMaterial = {
        id: 'mat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        subjectId: subjectId,
        subjectName: subject ? subject.name : 'General',
        date: formatDate(getToday()),
        dataUrl: e.target.result
      };
      state.materials.push(newMaterial);
      saveState();
      showToast(`Uploaded "${file.name}" successfully! 📄`, 'success');
      renderMaterials();
    };
    reader.readAsDataURL(file);
  });
}

function previewMaterial(id) {
  const item = (state.materials || []).find(m => m.id === id);
  if (!item) return;

  const modal = document.getElementById('pdfPreviewModal');
  const title = document.getElementById('pdfPreviewTitle');
  const frame = document.getElementById('pdfPreviewFrame');
  const downloadBtn = document.getElementById('pdfDownloadBtn');

  title.innerHTML = `<i class="fas fa-file-pdf" style="color:var(--danger)"></i> ${item.name}`;
  frame.src = item.dataUrl;
  downloadBtn.href = item.dataUrl;
  downloadBtn.download = item.name;

  modal.classList.remove('hidden');
}

function closePdfPreview() {
  const modal = document.getElementById('pdfPreviewModal');
  const frame = document.getElementById('pdfPreviewFrame');
  if (frame) frame.src = '';
  if (modal) modal.classList.add('hidden');
}

function deleteMaterial(id) {
  const item = (state.materials || []).find(m => m.id === id);
  if (!item) return;

  showModal(
    'Delete Material',
    `<p>Are you sure you want to delete <strong>"${item.name}"</strong>?</p>`,
    () => {
      state.materials = state.materials.filter(m => m.id !== id);
      saveState();
      showToast(`Removed "${item.name}".`, 'info');
      renderMaterials();
    }
  );
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved state
  const hasState = loadState();

  if (hasState && state.setupComplete) {
    showView('dashboard');
  } else {
    showView('setup');
    initSetup();
  }

  // ===== EVENT LISTENERS =====

  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showView(link.dataset.view);
    });
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
      let overlay = document.querySelector('.sidebar-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
          document.getElementById('sidebar').classList.remove('open');
          overlay.classList.remove('show');
        });
      }
      overlay.classList.toggle('show');
    });
  }

  // Add Subject button
  const addBtn = document.getElementById('addSubjectBtn');
  if (addBtn) addBtn.addEventListener('click', addSubjectEntry);

  // Generate Plan button
  const genBtn = document.getElementById('generatePlanBtn');
  if (genBtn) genBtn.addEventListener('click', validateAndGeneratePlan);

  // Timetable navigation
  const prevBtn = document.getElementById('prevWeek');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentWeekOffset--;
    renderTimetable(currentWeekOffset);
  });
  const nextBtn = document.getElementById('nextWeek');
  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentWeekOffset++;
    renderTimetable(currentWeekOffset);
  });

  // Checklist filter
  const checkFilter = document.getElementById('checklistFilter');
  if (checkFilter) checkFilter.addEventListener('change', renderChecklist);

  // Materials filter
  const materialFilter = document.getElementById('materialSubjectFilter');
  if (materialFilter) materialFilter.addEventListener('change', renderMaterials);

  // Materials file upload input
  const fileInput = document.getElementById('materialFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      handleMaterialUpload(e.target.files);
      e.target.value = '';
    });
  }

  // Drop zone drag and drop
  const dropZone = document.getElementById('dropZone');
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      });
    });
    dropZone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files) {
        handleMaterialUpload(e.dataTransfer.files);
      }
    });
  }

  // PDF Preview modal close buttons
  const pdfCloseBtn = document.getElementById('pdfPreviewClose');
  if (pdfCloseBtn) pdfCloseBtn.addEventListener('click', closePdfPreview);
  const pdfDoneBtn = document.getElementById('pdfPreviewDone');
  if (pdfDoneBtn) pdfDoneBtn.addEventListener('click', closePdfPreview);

  // Generate Questions button
  const genQBtn = document.getElementById('generateQuestionsBtn');
  if (genQBtn) genQBtn.addEventListener('click', generateQuestions);

  // Retry button
  const retryBtn = document.getElementById('retryBtn');
  if (retryBtn) retryBtn.addEventListener('click', generateQuestions);

  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      showModal(
        'Reset All Data',
        '<p>Are you sure you want to reset all your data? This will delete your study plan, progress, and checklist. This action cannot be undone.</p>',
        () => {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }
      );
    });
  }

  // Modal buttons
  const modalConfirm = document.getElementById('modalConfirm');
  if (modalConfirm) {
    modalConfirm.addEventListener('click', () => {
      if (modalCallback) modalCallback();
      closeModal();
    });
  }
  const modalCancel = document.getElementById('modalCancel');
  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  const modalClose = document.getElementById('modalClose');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
});

