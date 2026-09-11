// ─────────────────────────────────────────────────────────────
// Vantage Careers Data
// ─────────────────────────────────────────────────────────────

export const LOCATION = "Dubai, UAE";
export const WORK_MODEL = "Hybrid";
export const COMPENSATION = "Paid";

export const WHY_VANTAGE = [
  {
    id: "impact",
    icon: "Target",
    title: "Real-world impact",
    description:
      "Build technology designed to improve accessibility and independence for people who are visually impaired — contributing to a product with genuine human significance.",
  },
  {
    id: "ai-hardware",
    icon: "Cpu",
    title: "AI + Hardware",
    description:
      "Work across computer vision, embedded systems, sensors, wearable hardware and software — a rare opportunity to operate at the full depth of the stack.",
  },
  {
    id: "early-stage",
    icon: "Rocket",
    title: "Build from the beginning",
    description:
      "Work directly on technology moving from prototype toward real-world pilots. Your decisions shape the architecture.",
  },
  {
    id: "team",
    icon: "Users",
    title: "Small, multidisciplinary team",
    description:
      "Work closely across engineering, product and accessibility — no silos, no bureaucracy. You see the full picture.",
  },
];

const PROFESSIONALS = [
  {
    slug: "senior-embedded-engineer",
    title: "Senior Embedded Engineer / PCB Architect",
    type: "Professional",
    shortDescription:
      "Own the full hardware design cycle — from schematic to Gerber — for the Vantage Vision Halo wearable platform built around Raspberry Pi CM5.",
    aboutRole:
      "As our Senior Embedded Engineer / PCB Architect, you will lead the custom PCB design effort at Vantage. Working on the Vantage Vision Halo — a wearable AI-navigation device — you will translate system requirements into robust, manufacturable hardware. You will own the full cycle: schematic capture, component selection, PCB layout, design-for-manufacturability review and hardware debugging.",
    whatYoullWorkOn: [
      "Custom PCB architecture for the Raspberry Pi Compute Module 5 carrier board",
      "Schematic capture and component selection across power, compute, sensor and connectivity domains",
      "High-density PCB layout with signal integrity and thermal constraints",
      "DFM reviews and Gerber preparation for fabrication",
      "Hardware bring-up, debugging and validation with the firmware team",
      "Component library and footprint management",
    ],
    lookingFor: [
      "Strong experience designing and taping out custom PCBs (Altium, KiCad or equivalent)",
      "Hands-on experience with embedded SoC carrier board design",
      "Proficiency in schematic capture, layout, DRC and Gerber review",
      "Understanding of high-speed layout rules, EMC and signal integrity",
      "Experience with BOM management, DFM and working with fabrication houses",
      "Ability to work iteratively in a fast-moving hardware startup environment",
    ],
    niceToHave: [
      "Experience with Raspberry Pi Compute Module or similar SoM platforms",
      "Familiarity with wearable/portable electronics design constraints",
      "Prior experience with camera, LiDAR or ToF sensor integration on PCB",
      "Background in CE/FCC compliance and hardware certification",
    ],
  },
  {
    slug: "senior-electrical-engineer",
    title: "Senior Electrical Engineer — Power & Thermal Systems",
    type: "Professional",
    shortDescription:
      "Design the power delivery and thermal architecture for a compact wearable device that must run reliably, safely and all day.",
    aboutRole:
      "The Vantage Vision Halo is a wearable device that must deliver sustained AI inference, sensor operation and wireless connectivity from a compact battery — safely worn on the head. As our Senior Electrical Engineer, you will own power delivery, battery management, voltage regulation and thermal architecture across the full system.",
    whatYoullWorkOn: [
      "Power delivery architecture: multi-rail voltage regulation, power sequencing and efficiency optimisation",
      "Battery management system (BMS) design including protection, balancing and state-of-charge estimation",
      "Thermal modelling, heatsink and airflow design for wearable form factor",
      "Wearable electronics safety: surface temperature limits, overcurrent protection, fail-safe design",
      "Collaboration with the PCB architect on power domain layout",
      "Power and thermal validation testing and instrumentation",
    ],
    lookingFor: [
      "Demonstrated experience designing power delivery systems for portable/wearable electronics",
      "Strong knowledge of LiPo/LiFePO4 battery management systems",
      "Experience with DC-DC converters, LDOs and power sequencing",
      "Understanding of thermal management in compact enclosures",
      "Ability to model, simulate and validate power budgets",
      "Familiarity with relevant safety standards for wearable electronics",
    ],
    niceToHave: [
      "Experience with wireless charging or USB-C PD integration",
      "Thermal simulation experience (ANSYS, FLIR or equivalent)",
      "Background in medical or assistive device electronics",
    ],
  },
  {
    slug: "senior-firmware-engineer",
    title: "Senior Firmware / Embedded Engineer — Sensor Integration",
    type: "Professional",
    shortDescription:
      "Write and maintain the firmware that brings camera, LiDAR, ToF and AI inference together on the Raspberry Pi CM5 / Hailo-8L platform.",
    aboutRole:
      "The Vantage Vision Halo fuses data from a Sony IMX327 AI camera, TF Mini LiDAR, ToF sensors and the Hailo-8L AI accelerator. As our Senior Firmware / Embedded Engineer, you will own device drivers, sensor integration, real-time data pipelines and hardware-software interfaces — ensuring low-latency, reliable sensor fusion at the edge.",
    whatYoullWorkOn: [
      "Driver development for camera, LiDAR and ToF sensors on Raspberry Pi CM5 (Linux kernel / userspace)",
      "I2C, SPI and UART peripheral integration and protocol debugging",
      "Hailo-8L SDK integration and runtime inference pipeline optimisation",
      "Real-time sensor data pipelines with latency and throughput targets",
      "Signal integrity debugging and oscilloscope / logic-analyser work",
      "Hardware-in-the-loop testing and CI scripts for sensor validation",
    ],
    lookingFor: [
      "Strong Linux embedded C/C++ firmware experience",
      "Hands-on experience writing I2C/SPI/UART device drivers",
      "Experience with camera or MIPI CSI-2 interfaces",
      "Ability to debug signal integrity issues with oscilloscopes and logic analysers",
      "Familiarity with real-time constraints and low-latency data pipelines",
      "Strong understanding of embedded Linux BSP and boot chain",
    ],
    niceToHave: [
      "Prior experience with Hailo, Coral, or similar edge AI accelerators",
      "Experience with LiDAR or ToF sensor integration",
      "Python scripting for testing and automation",
      "Familiarity with ROS or similar robotics/sensor frameworks",
    ],
  },
  {
    slug: "senior-mechanical-engineer",
    title: "Senior Mechanical Engineer / Industrial Designer — 3D & Ergonomics",
    type: "Professional",
    shortDescription:
      "Design and iterate the physical form of the Vantage Vision Halo — a wearable AI device that must be safe, comfortable and manufacturable.",
    aboutRole:
      "The Vantage Vision Halo must fit comfortably on the head, protect sensitive electronics, distribute weight appropriately and support iterative manufacturing. As our Senior Mechanical Engineer / Industrial Designer, you will own enclosure design, internal component mounting, ergonomic refinement and the path from prototype to manufacturable product.",
    whatYoullWorkOn: [
      "Full 3D CAD design of the Vantage Vision Halo enclosure and internal structure",
      "Ergonomic design for head-worn wearable: weight distribution, pressure points and fit",
      "Internal component mounting and PCB retention design",
      "Iterative rapid prototyping via FDM, SLA and short-run fabrication",
      "Design-for-manufacturing review and tolerance stack-up analysis",
      "Material selection: lightweight, durable and skin-safe materials",
    ],
    lookingFor: [
      "Proficiency in parametric 3D CAD (Fusion 360, SolidWorks or equivalent)",
      "Experience designing consumer or wearable products with ergonomic constraints",
      "Hands-on rapid prototyping: FDM, SLA, model finishing and assembly",
      "Understanding of DFM principles and working with CM/tooling partners",
      "Ability to iterate quickly based on physical testing feedback",
      "Strong spatial reasoning and attention to fit, finish and assembly",
    ],
    niceToHave: [
      "Industrial design background or portfolio demonstrating consumer product work",
      "Experience with head-worn devices (AR/VR, medical, safety)",
      "Knowledge of IP ratings and environmental sealing for electronics enclosures",
      "Rendering and visualisation skills (Keyshot, Blender, etc.)",
    ],
  },
  {
    slug: "senior-ai-engineer",
    title: "Senior AI Engineer / Edge Computing Specialist",
    type: "Professional",
    shortDescription:
      "Deploy and optimise real-time computer vision models — object detection, depth estimation and OCR — on the Hailo-8L edge AI platform.",
    aboutRole:
      "The Vantage Vision Halo delivers real-time AI inference at the edge: detecting obstacles, reading text, estimating depth and fusing sensor streams — all on a compact wearable. As our Senior AI Engineer / Edge Computing Specialist, you will own the full ML pipeline from training through quantisation, compilation and on-device deployment.",
    whatYoullWorkOn: [
      "Object detection (YOLO-family) and scene understanding model development and fine-tuning",
      "OCR pipeline development and optimisation for real-world text recognition",
      "Depth estimation and LiDAR / camera sensor fusion",
      "Model quantisation, optimisation and Hailo-8L HEF compilation",
      "Real-time inference pipeline: latency profiling, FPS optimisation and accuracy benchmarking",
      "Dataset curation and annotation pipeline for accessibility-specific use cases",
    ],
    lookingFor: [
      "Strong Python and PyTorch/TensorFlow experience for vision model development",
      "Hands-on experience with YOLO or similar object detection architectures",
      "Experience with model quantisation, pruning and edge deployment",
      "Understanding of real-time inference constraints (latency, FPS, power)",
      "Ability to evaluate model accuracy/latency trade-offs systematically",
      "Experience with OCR pipelines (Tesseract, PaddleOCR or custom)",
    ],
    niceToHave: [
      "Prior experience with Hailo, Coral TPU, TensorRT or similar edge AI runtimes",
      "Experience with sensor fusion (camera + LiDAR/ToF)",
      "Background in accessibility, assistive technology or human-centred AI",
      "Familiarity with ROS or real-time embedded inference pipelines",
    ],
  },
  {
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack / IoT Engineer",
    type: "Professional",
    shortDescription:
      "Build the mobile app, device pairing system, calibration tools and cloud/IoT layer that connects the Vantage wearable to the user's smartphone.",
    aboutRole:
      "The Vantage ecosystem extends beyond the wearable. Users need a companion mobile app for device pairing, settings, calibration and accessibility preferences. As our Senior Full-Stack / IoT Engineer, you will own the mobile application, firmware/cloud data integration and the broader device ecosystem.",
    whatYoullWorkOn: [
      "Cross-platform mobile application development (iOS and Android) for device pairing and settings",
      "Device pairing, calibration and firmware update flows over Bluetooth/Wi-Fi",
      "REST and WebSocket APIs for device to cloud communication",
      "Haptic feedback control and accessibility-focused UI design",
      "IoT device management: telemetry, diagnostics and remote configuration",
      "Integration with firmware team for sensor data streaming and device state management",
    ],
    lookingFor: [
      "Strong React Native or Flutter experience for cross-platform mobile development",
      "Experience with Bluetooth (BLE) or Wi-Fi device pairing and communication",
      "Backend API development (Node.js, Python FastAPI or equivalent)",
      "Understanding of IoT protocols and device management patterns",
      "Ability to own full-stack features end-to-end",
      "Strong UX sensibility — especially for accessible, simple interfaces",
    ],
    niceToHave: [
      "Accessibility-focused mobile development experience (VoiceOver, TalkBack)",
      "Experience with embedded Linux device communication (D-Bus, gRPC, MQTT)",
      "Familiarity with Supabase, Firebase or similar backend-as-a-service platforms",
      "Prior experience shipping mobile apps to the App Store or Google Play",
    ],
  },
];

const INTERNSHIPS = [
  {
    slug: "embedded-hardware-intern",
    title: "Embedded Hardware Intern",
    type: "Internship",
    shortDescription:
      "Support the hardware team with schematic drafting, component sourcing, footprint creation and PCB routing under senior guidance.",
    aboutRole:
      "As our Embedded Hardware Intern, you will work alongside the Senior Embedded Engineer to contribute to the Vantage Vision Halo PCB design process. You will gain practical experience across the hardware design cycle — from schematic capture and component sourcing through to basic PCB routing and BOM management.",
    whatYoullWorkOn: [
      "Schematic drafting support under senior engineer guidance",
      "Component sourcing and evaluation — datasheets, alternatives and availability",
      "Footprint and symbol library creation and maintenance",
      "Basic PCB routing tasks and design rule verification",
      "BOM preparation and component documentation",
      "Hardware test support and lab documentation",
    ],
    lookingFor: [
      "Studying Electrical Engineering, Electronics or a related discipline",
      "Foundational understanding of electronic circuits and PCB design",
      "Exposure to any EDA tool (KiCad, Altium, Eagle or equivalent)",
      "Eagerness to learn hardware design in a real product environment",
      "Attention to detail and methodical working style",
    ],
    niceToHave: [
      "Any personal PCB project or coursework PCB design experience",
      "Basic soldering or hardware prototyping skills",
      "Familiarity with Raspberry Pi or Arduino hardware platforms",
    ],
  },
  {
    slug: "electrical-thermal-intern",
    title: "Electrical & Thermal Systems Intern",
    type: "Internship",
    shortDescription:
      "Support power system design and thermal validation — running calculations, testing battery and voltage regulator behaviour and logging metrics.",
    aboutRole:
      "As our Electrical & Thermal Systems Intern, you will work with the Senior Electrical Engineer on the power delivery and thermal management systems of the Vantage Vision Halo. You will perform power budget calculations, support voltage regulator selection, run thermal experiments and log real data from hardware prototypes.",
    whatYoullWorkOn: [
      "Power budget calculations and rail voltage/current requirement documentation",
      "Voltage regulator specification research and comparison",
      "Thermal testing on prototype hardware using IR cameras and probes",
      "Battery testing: charge/discharge cycles, capacity measurement and logging",
      "Temperature and power metric logging and analysis",
      "Supporting power domain schematic review and annotation",
    ],
    lookingFor: [
      "Studying Electrical Engineering, Power Electronics or a related discipline",
      "Foundational knowledge of DC circuits, voltage regulators and basic power electronics",
      "Comfort using multimeters, oscilloscopes and bench power supplies",
      "Willingness to work with physical hardware and run structured experiments",
    ],
    niceToHave: [
      "Exposure to LiPo battery systems or battery management concepts",
      "Basic thermal analysis or simulation experience",
      "Familiarity with data logging tools or Python for measurement analysis",
    ],
  },
  {
    slug: "embedded-firmware-intern",
    title: "Embedded Firmware Intern",
    type: "Internship",
    shortDescription:
      "Write test scripts, validate sensor drivers and run hardware-in-the-loop tests alongside the senior firmware team on Raspberry Pi CM5.",
    aboutRole:
      "As our Embedded Firmware Intern, you will support the Senior Firmware Engineer in testing and validating sensor drivers, communication interfaces and real-time data pipelines. You will write testing scripts, run structured sensor experiments and document results — contributing to the reliability of the Vantage Vision Halo firmware.",
    whatYoullWorkOn: [
      "I2C/SPI sensor communication testing and protocol verification",
      "Writing Python or C test scripts for sensor driver validation",
      "Hardware-in-the-loop testing and automated test execution",
      "Sensor data logging, analysis and anomaly identification",
      "Driver support tasks under senior engineer supervision",
      "Firmware documentation and test report preparation",
    ],
    lookingFor: [
      "Studying Computer Engineering, Embedded Systems, Electrical Engineering or CS",
      "Basic C or Python programming experience",
      "Curiosity about how hardware and software interact at a low level",
      "Methodical approach to testing and documentation",
    ],
    niceToHave: [
      "Any experience with Raspberry Pi, Arduino or microcontroller projects",
      "Exposure to I2C or SPI protocols",
      "Basic Linux command-line familiarity",
    ],
  },
  {
    slug: "industrial-design-intern",
    title: "Industrial Design & Prototyping Intern",
    type: "Internship",
    shortDescription:
      "Iterate physical prototypes of the Vision Halo — 3D printing, finishing, ergonomic testing and CAD updates alongside the mechanical team.",
    aboutRole:
      "As our Industrial Design & Prototyping Intern, you will work with the Senior Mechanical Engineer to iterate on the physical form of the Vantage Vision Halo. You will operate 3D printers, finish and assemble prototypes, conduct ergonomic fit tests and update CAD models based on physical test feedback.",
    whatYoullWorkOn: [
      "FDM and SLA 3D printing of enclosure iterations",
      "Prototype finishing: sanding, priming, painting and assembly",
      "Ergonomic testing: head-worn fit trials and feedback documentation",
      "CAD model updates based on test findings (Fusion 360 or SolidWorks)",
      "Physical component assembly and internal layout validation",
      "Enclosure refinement based on senior engineer direction",
    ],
    lookingFor: [
      "Studying Industrial Design, Product Design, Mechanical Engineering or a related field",
      "Hands-on experience with FDM 3D printing",
      "Basic 3D CAD proficiency (Fusion 360, SolidWorks or equivalent)",
      "Interest in physical product development and iterative prototyping",
      "Good spatial reasoning and attention to fit and finish",
    ],
    niceToHave: [
      "Experience with SLA/resin printing or CNC machining",
      "Prior consumer product or wearable design coursework or personal projects",
      "Basic material knowledge: plastics, foams, elastomers for wearable use",
    ],
  },
  {
    slug: "ai-firmware-intern",
    title: "AI / Firmware Development Intern",
    type: "Internship",
    shortDescription:
      "Test AI models, measure inference latency and accuracy, and support sensor + AI integration on the Hailo-8L edge platform.",
    aboutRole:
      "As our AI / Firmware Development Intern, you will work alongside the Senior AI Engineer to validate object detection, OCR and depth estimation models on the Vantage Vision Halo hardware. You will prepare datasets, run inference benchmarks, measure latency and FPS, and document the performance of AI models running on the Hailo-8L.",
    whatYoullWorkOn: [
      "Dataset preparation, annotation and curation for accessibility-focused CV tasks",
      "OCR and object detection model testing and benchmarking",
      "AI inference latency, FPS and accuracy measurement on device",
      "Sensor + AI integration testing: camera, LiDAR and ToF data pipelines",
      "Debugging model performance issues and documenting findings",
      "Technical documentation of AI pipeline behaviour and test results",
    ],
    lookingFor: [
      "Studying Computer Science, AI/ML, Electrical Engineering or a related discipline",
      "Basic Python and familiarity with ML frameworks (PyTorch or TensorFlow)",
      "Interest in computer vision, object detection or real-time AI systems",
      "Methodical approach to benchmarking and documentation",
    ],
    niceToHave: [
      "Any experience running YOLO, PaddleOCR, or similar CV models",
      "Exposure to edge AI hardware (Raspberry Pi, Coral, Hailo or similar)",
      "Familiarity with Jupyter notebooks or Python scripting for data analysis",
    ],
  },
  {
    slug: "fullstack-app-intern",
    title: "Full-Stack App Development Intern",
    type: "Internship",
    shortDescription:
      "Support mobile and web development, firmware API integration, sensor data display and device settings — contributing to the Vantage app ecosystem.",
    aboutRole:
      "As our Full-Stack App Development Intern, you will support the Senior Full-Stack Engineer in building and testing the Vantage companion mobile app and web ecosystem. You will work on frontend components, API integration, sensor data display and device settings flows — gaining end-to-end product development experience.",
    whatYoullWorkOn: [
      "Frontend component development for the Vantage mobile or web app",
      "API integration for device settings, sensor data and calibration flows",
      "Testing device pairing and Bluetooth/Wi-Fi communication flows",
      "Sensor data display and real-time UI updates",
      "Documentation of API endpoints and integration patterns",
      "Bug fixing and test case writing",
    ],
    lookingFor: [
      "Studying Computer Science, Software Engineering or a related discipline",
      "Basic React, React Native or Flutter experience",
      "Familiarity with REST APIs and JSON data formats",
      "Enthusiasm for building real mobile or IoT applications",
    ],
    niceToHave: [
      "Any personal app or web project experience",
      "Exposure to Supabase, Firebase or similar backend platforms",
      "Interest in accessibility-focused UX or assistive technology",
    ],
  },
];

export const PROFESSIONAL_ROLES = PROFESSIONALS;
export const INTERNSHIP_ROLES = INTERNSHIPS;
export const ALL_ROLES = [...PROFESSIONALS, ...INTERNSHIPS];
export const getRoleBySlug = (slug) => ALL_ROLES.find((r) => r.slug === slug) || null;
export const ROLE_TITLES = ALL_ROLES.map((r) => r.title);
