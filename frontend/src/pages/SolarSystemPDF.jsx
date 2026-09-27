import jsPDF from "jspdf";
import { getCurrentUser } from "../services/api";


const SolarSystemPDF = () => {
  const generatePDF = async () => {
  const userData = await getCurrentUser();

  const user = userData?.user || userData;

  const studentName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "Student";

  const studentEmail = user?.email || "";

    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    let pageNumber = 0;

    // ---------------------------------------------------------
    // BASIC PAGE DESIGN
    // ---------------------------------------------------------

    const addPage = () => {
      if (pageNumber > 0) {
        doc.addPage();
      }

      pageNumber++;

      doc.setDrawColor(60, 70, 90);
      doc.setLineWidth(0.5);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

      doc.setDrawColor(180, 185, 195);
      doc.setLineWidth(0.25);
      doc.rect(11, 11, pageWidth - 22, pageHeight - 22);

      return pageNumber;
    };

    const footer = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 105, 115);

      doc.text(
        `SOLARIS - Explore - Learn - Discover - Page ${pageNumber}`,
        pageWidth / 2,
        pageHeight - 13,
        { align: "center" }
      );
    };

    const title = (text, y = 25) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(19);
      doc.setTextColor(25, 35, 55);
      doc.text(text, margin, y);

      doc.setDrawColor(70, 90, 120);
      doc.setLineWidth(0.6);
      doc.line(margin, y + 3, pageWidth - margin, y + 3);
    };

    const sectionTitle = (text, y) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12.5);
      doc.setTextColor(35, 55, 80);
      doc.text(text, margin, y);

      return y + 7;
    };

    const paragraph = (text, x, y, width, size = 10) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(45, 45, 50);

      const lines = doc.splitTextToSize(text, width);
      doc.text(lines, x, y);

      return y + lines.length * (size * 0.48 + 1.5);
    };

    const bulletList = (items, x, y, width, size = 9.5) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(45, 45, 50);

      items.forEach((item) => {
        const lines = doc.splitTextToSize(item, width - 7);

        doc.text("-", x, y);
        doc.text(lines, x + 5, y);

        y += lines.length * (size * 0.48 + 2.2);
      });

      return y;
    };

    const box = (x, y, w, h, heading, lines) => {
      doc.setDrawColor(120, 130, 145);
      doc.setLineWidth(0.35);
      doc.rect(x, y, w, h);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(35, 55, 80);
      doc.text(heading, x + 5, y + 7);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.8);
      doc.setTextColor(50, 50, 55);

      let yy = y + 14;

      lines.forEach((line) => {
        const wrapped = doc.splitTextToSize(line, w - 10);
        doc.text(wrapped, x + 5, yy);
        yy += wrapped.length * 4.5 + 1.5;
      });
    };

    const table = (headers, rows, x, y, widths) => {
      const rowHeight = 8;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);

      let xx = x;

      headers.forEach((header, i) => {
        doc.setFillColor(45, 65, 90);
        doc.rect(xx, y, widths[i], rowHeight, "F");
        doc.text(header, xx + 2, y + 5.3);
        xx += widths[i];
      });

      let yy = y + rowHeight;

      rows.forEach((row) => {
        xx = x;

        row.forEach((cell, i) => {
          doc.setDrawColor(170, 175, 185);
          doc.rect(xx, yy, widths[i], rowHeight);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.setTextColor(45, 45, 50);

          const wrapped = doc.splitTextToSize(
            String(cell),
            widths[i] - 4
          );

          doc.text(wrapped.slice(0, 2), xx + 2, yy + 4.8);

          xx += widths[i];
        });

        yy += rowHeight;
      });

      return yy;
    };

    // ---------------------------------------------------------
    // DIAGRAMS
    // ---------------------------------------------------------

    const drawSolarSystemDiagram = (cx, cy) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(35, 55, 80);
      doc.text("SOLAR SYSTEM ORBIT DIAGRAM", cx, cy - 50, {
        align: "center",
      });

      const orbits = [10, 16, 22, 28, 34, 40];

      orbits.forEach((r) => {
        doc.setDrawColor(180, 185, 195);
        doc.circle(cx, cy, r);
      });

      doc.setFillColor(240, 175, 45);
      doc.circle(cx, cy, 6, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(40, 40, 40);
      doc.text("SUN", cx, cy + 2, { align: "center" });

      const planets = [
        ["Mercury", 10, 0],
        ["Venus", 16, 40],
        ["Earth", 22, 90],
        ["Mars", 28, 140],
        ["Jupiter", 34, 190],
        ["Saturn", 40, 240],
      ];

      planets.forEach(([name, radius, angle]) => {
        const rad = (angle * Math.PI) / 180;

        const px = cx + Math.cos(rad) * radius;
        const py = cy + Math.sin(rad) * radius;

        doc.setFillColor(100, 115, 135);
        doc.circle(px, py, name === "Jupiter" ? 2.5 : 1.7, "F");

        doc.text(name, px + 3, py + 1.5);
      });

      doc.setFontSize(6.5);
      doc.text(
        "Schematic diagram - not to scale",
        cx,
        cy + 48,
        { align: "center" }
      );
    };

    const drawPlanetDiagram = (name, x, y, radius) => {
      const colors = {
        Mercury: [125, 125, 125],
        Venus: [205, 165, 95],
        Earth: [70, 120, 180],
        Mars: [190, 95, 65],
        Jupiter: [185, 150, 110],
        Saturn: [200, 175, 120],
        Uranus: [110, 185, 195],
        Neptune: [65, 95, 190],
        Sun: [240, 175, 45],
      };

      const c = colors[name] || [130, 130, 130];

      doc.setFillColor(c[0], c[1], c[2]);
      doc.circle(x, y, radius, "F");

      if (name === "Saturn") {
        doc.setDrawColor(150, 125, 90);
        doc.setLineWidth(2);
        doc.ellipse(x, y, radius + 7, radius * 0.35);
        doc.setLineWidth(0.7);
        doc.ellipse(x, y, radius + 10, radius * 0.48);
      }

      if (name === "Jupiter") {
        doc.setDrawColor(120, 90, 70);
        doc.setLineWidth(0.7);

        for (let i = -2; i <= 2; i++) {
          doc.line(
            x - radius + 1,
            y + i * 3,
            x + radius - 1,
            y + i * 3
          );
        }

        doc.setFillColor(160, 90, 75);
        doc.ellipse(
          x + radius * 0.25,
          y + radius * 0.25,
          2.5,
          1.5,
          "F"
        );
      }

      if (name === "Earth") {
        doc.setFillColor(70, 145, 80);
        doc.ellipse(
          x - radius * 0.2,
          y - radius * 0.15,
          radius * 0.3,
          radius * 0.2,
          "F"
        );
        doc.ellipse(
          x + radius * 0.25,
          y + radius * 0.2,
          radius * 0.25,
          radius * 0.15,
          "F"
        );
      }

      if (name === "Mars") {
        doc.setFillColor(125, 65, 50);
        doc.circle(
          x - radius * 0.3,
          y - radius * 0.2,
          1.2,
          "F"
        );
        doc.circle(
          x + radius * 0.25,
          y + radius * 0.15,
          1,
          "F"
        );
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(40, 45, 50);
      doc.text(name, x, y + radius + 8, { align: "center" });
    };

    const drawStructureDiagram = (type, x, y) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(35, 55, 80);

      doc.text("STRUCTURE DIAGRAM", x, y);

      const cx = x + 35;
      const cy = y + 38;

      if (type === "terrestrial") {
        doc.setFillColor(150, 90, 60);
        doc.circle(cx, cy, 19, "F");

        doc.setFillColor(200, 150, 90);
        doc.circle(cx, cy, 12, "F");

        doc.setFillColor(220, 190, 150);
        doc.circle(cx, cy, 6, "F");

        doc.setFontSize(7);
        doc.setTextColor(40, 40, 40);
        doc.text("Crust", cx + 23, cy - 10);
        doc.text("Mantle", cx + 23, cy);
        doc.text("Core", cx + 23, cy + 10);
      } else if (type === "gas") {
        doc.setFillColor(190, 160, 125);
        doc.circle(cx, cy, 20, "F");

        doc.setDrawColor(130, 100, 75);

        for (let i = -2; i <= 2; i++) {
          doc.line(
            cx - 18,
            cy + i * 5,
            cx + 18,
            cy + i * 5
          );
        }

        doc.setFontSize(7);
        doc.setTextColor(40, 40, 40);
        doc.text("Hydrogen", cx + 23, cy - 8);
        doc.text("Helium", cx + 23, cy + 1);
        doc.text("Deep interior", cx + 23, cy + 10);
      } else {
        doc.setFillColor(95, 155, 175);
        doc.circle(cx, cy, 20, "F");

        doc.setFillColor(60, 100, 125);
        doc.circle(cx, cy, 11, "F");

        doc.setFillColor(105, 75, 65);
        doc.circle(cx, cy, 5, "F");

        doc.setFontSize(7);
        doc.setTextColor(40, 40, 40);
        doc.text("Ice-rich interior", cx + 23, cy - 5);
        doc.text("Rocky core", cx + 23, cy + 7);
      }
    };

    const missionCard = (
      mission,
      type,
      period,
      purpose,
      work,
      result,
      y
    ) => {
      const h = 43;

      doc.setDrawColor(120, 130, 145);
      doc.setLineWidth(0.35);
      doc.rect(margin, y, contentWidth, h);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(35, 55, 80);
      doc.text(mission, margin + 5, y + 7);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(50, 50, 55);

      doc.text(`Type: ${type}`, margin + 5, y + 14);
      doc.text(`Period: ${period}`, margin + 75, y + 14);

      const left = [
        `Purpose: ${purpose}`,
        `Work: ${work}`,
      ];

      let yy = y + 20;

      left.forEach((text) => {
        const lines = doc.splitTextToSize(text, 85);
        doc.text(lines, margin + 5, yy);
        yy += lines.length * 4;
      });

      const resultLines = doc.splitTextToSize(
        `Result / importance: ${result}`,
        contentWidth - 100
      );

      doc.text(resultLines, margin + 98, y + 20);

      return y + h + 6;
    };

   // Cover page
addPage();

doc.setFont("helvetica", "bold");
doc.setTextColor(40, 55, 80);

// Title
doc.setFontSize(27);
doc.text("SOLARIS", pageWidth / 2, 42, {
  align: "center",
});

doc.setFontSize(17);
doc.text("COMPLETE SOLAR SYSTEM", pageWidth / 2, 58, {
  align: "center",
});

doc.setFontSize(14);
doc.text("ILLUSTRATED STUDY NOTES", pageWidth / 2, 70, {
  align: "center",
});

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text("Explore • Learn • Discover", pageWidth / 2, 84, {
  align: "center",
});

// Sun illustration
doc.setFillColor(245, 166, 60);
doc.circle(pageWidth / 2, 115, 24, "F");

doc.setTextColor(40, 55, 80);
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Sun", pageWidth / 2, 145, {
  align: "center",
});

// Student information
doc.setFontSize(12);

const nameLines = doc.splitTextToSize(
  `Student Name: ${studentName}`,
  contentWidth
);

doc.text(nameLines, margin, 162);

const nameHeight = nameLines.length * 6;

doc.text(
  `Email: ${studentEmail}`,
  margin,
  162 + nameHeight + 10
);

// Scope
doc.setFont("helvetica", "bold");
doc.setFontSize(10);

const scopeText =
  "Scope: Sun • Mercury • Venus • Earth • Mars • Jupiter • Saturn • Uranus • Neptune";

const scopeLines = doc.splitTextToSize(
  scopeText,
  contentWidth
);

doc.text(scopeLines, pageWidth / 2, 215, {
  align: "center",
  lineHeightFactor: 1.5,
});

// Description
doc.setFont("helvetica", "normal");
doc.setFontSize(9);

const descriptionText =
  "Includes planet facts, diagrams, structures, atmospheres, moons, exploration and mission details.";

const descriptionLines = doc.splitTextToSize(
  descriptionText,
  contentWidth
);

doc.text(descriptionLines, pageWidth / 2, 235, {
  align: "center",
  lineHeightFactor: 1.5,
});

footer();

    // ---------------------------------------------------------
    // SUN
    // ---------------------------------------------------------

    addPage();
    title("THE SUN");

    drawPlanetDiagram("Sun", 48, 58, 20);

     let y = 52;

    y = paragraph(
      "The Sun is the star at the center of the Solar System. Its gravity holds the planets and many other objects in orbit. It provides the light and energy that drive many processes on Earth.",
      82,
      y,
      105
    );

    y += 8;

    table(
      ["Parameter", "Details"],
      [
        ["Type", "G-type main-sequence star"],
        ["Role", "Central star of the Solar System"],
        ["Energy", "Produced by nuclear fusion"],
        ["Main elements", "Hydrogen and helium"],
        ["Importance", "Main source of energy for Earth"],
      ],
      margin,
      88,
      [48, 130]
    );

    y = 145;

    y = sectionTitle("LAYERS OF THE SUN", y);

    y = bulletList(
      [
        "Core - region where nuclear fusion produces energy.",
        "Radiative zone - energy moves outward mainly through radiation.",
        "Convective zone - hot plasma transports energy through convection.",
        "Photosphere - visible surface of the Sun.",
        "Chromosphere and corona - outer atmospheric regions.",
      ],
      margin + 4,
      y,
      contentWidth
    );

    y += 3;

    box(
      margin,
      y,
      contentWidth,
      39,
      "IMPORTANT POINTS",
      [
        "The Sun is a star, not a planet.",
        "Its gravity dominates the motion of the Solar System.",
        "Solar energy supports life and influences space weather.",
      ]
    );

    footer();

    // ---------------------------------------------------------
    // PLANET DATA
    // ---------------------------------------------------------

    const planets = [
      {
        name: "MERCURY",
        order: "1ST PLANET",
        type: "Rocky terrestrial planet",
        intro:
          "Smallest planet and closest to the Sun; heavily cratered rocky surface.",
        facts: [
          ["Diameter", "4,879 km"],
          ["Day", "58.6 Earth days"],
          ["Year", "88 Earth days"],
          ["Moons", "0"],
          ["Distance", "57.9 million km"],
        ],
        structure: [
          "Crust: rocky outer layer.",
          "Mantle: silicate-rich layer.",
          "Core: unusually large metallic core.",
        ],
        atmosphere: [
          "Extremely thin exosphere.",
          "Contains small amounts of oxygen, sodium, hydrogen and helium.",
        ],
        surface: [
          "Many impact craters.",
          "Caloris Basin is a major impact feature.",
          "Long cliffs record planetary contraction.",
        ],
        moons: [
          "No natural moons.",
        ],
        missions: [
          [
            "Mariner 10",
            "Flyby spacecraft",
            "1973-1975",
            "First close study of Mercury",
            "Made the first close flybys and photographed much of the surface.",
            "Provided the first detailed close-up observations of Mercury."
          ],
          [
            "MESSENGER",
            "Orbiter",
            "2011-2015",
            "Map and study Mercury",
            "Orbited Mercury and mapped its surface, composition and environment.",
            "Greatly expanded scientific knowledge of Mercury."
          ],
          [
            "BepiColombo",
            "Orbiter mission",
            "Launched 2018",
            "Detailed Mercury investigation",
            "Uses two orbiters to study Mercury's surface, interior, magnetosphere and environment.",
            "Provides a new generation of Mercury observations."
          ],
        ],
        important: [
          "Closest planet to the Sun.",
          "Smallest planet.",
          "No moons.",
          "Very thin exosphere.",
          "88-day orbit.",
        ],
      },

      {
        name: "VENUS",
        order: "2ND PLANET",
        type: "Rocky terrestrial planet",
        intro:
          "Second planet from the Sun; dense carbon-dioxide atmosphere creates an extreme greenhouse effect.",
        facts: [
          ["Diameter", "12,104 km"],
          ["Day", "243 Earth days"],
          ["Year", "225 Earth days"],
          ["Moons", "0"],
          ["Distance", "108.2 million km"],
        ],
        structure: [
          "Rocky crust.",
          "Hot mantle.",
          "Metallic core.",
        ],
        atmosphere: [
          "Mostly carbon dioxide.",
          "Thick sulfuric-acid cloud layers.",
          "Very high surface pressure and temperature.",
        ],
        surface: [
          "Volcanic plains and mountains.",
          "Many volcanic features.",
          "Surface hidden beneath dense clouds.",
        ],
        moons: [
          "No natural moons.",
        ],
        missions: [
          [
            "Venera Missions",
            "Landers and orbiters",
            "1960s-1980s",
            "Study Venus directly",
            "Returned atmospheric and surface measurements, including data from landers.",
            "Provided important direct information about the Venusian environment."
          ],
          [
            "Magellan",
            "Radar orbiter",
            "1990-1994",
            "Map the surface",
            "Used radar to map Venus through its dense cloud cover.",
            "Produced a detailed global radar map of Venus."
          ],
          [
            "DAVINCI",
            "Atmospheric probe mission",
            "Planned",
            "Study Venus atmosphere",
            "Designed to investigate atmospheric composition during descent.",
            "Will improve understanding of Venus's atmosphere and evolution."
          ],
          [
            "VERITAS",
            "Orbiter mission",
            "Planned",
            "Study geology and surface",
            "Designed to map Venus and investigate its geological history.",
            "Will provide new high-resolution observations of Venus."
          ],
        ],
        important: [
          "2nd planet.",
          "Hottest planet.",
          "Dense atmosphere.",
          "Mostly carbon dioxide.",
          "No moons.",
        ],
      },

      {
        name: "EARTH",
        order: "3RD PLANET",
        type: "Rocky terrestrial planet",
        intro:
          "Third planet from the Sun and the only world currently known to support life; liquid water covers most of its surface.",
        facts: [
          ["Diameter", "12,742 km"],
          ["Day", "23.9 hours"],
          ["Year", "365.25 days"],
          ["Moons", "1"],
          ["Surface water", "About 71%"],
        ],
        structure: [
          "Crust: thin solid outer layer.",
          "Mantle: thick hot-rock layer.",
          "Outer core: liquid iron-rich layer.",
          "Inner core: solid metal-rich region.",
        ],
        atmosphere: [
          "About 78% nitrogen and 21% oxygen.",
          "Also argon, carbon dioxide and water vapour.",
          "Supports life and moderates climate.",
        ],
        surface: [
          "Oceans and continents.",
          "Mountains, valleys and deserts.",
          "Active plate tectonics continually reshapes the surface.",
        ],
        moons: [
          "One natural satellite: the Moon.",
          "The Moon influences ocean tides.",
        ],
        missions: [
          [
            "Earth Observation Satellites",
            "Orbital satellites",
            "Ongoing",
            "Monitor Earth",
            "Observe atmosphere, oceans, land, ice and environmental changes.",
            "Provide data for Earth science, weather and climate studies."
          ],
          [
            "International Space Station",
            "Crewed orbital laboratory",
            "Ongoing program",
            "Study Earth and space",
            "Provides direct orbital observations and a laboratory for scientific experiments.",
            "Supports long-duration human spaceflight research."
          ],
          [
            "Earth Science Missions",
            "Scientific satellites",
            "Ongoing",
            "Study Earth's systems",
            "Measure climate, land, oceans, atmosphere and other planetary processes.",
            "Help scientists understand changes occurring on Earth."
          ],
        ],
        important: [
          "3rd planet.",
          "Liquid surface water.",
          "One Moon.",
          "Nitrogen-oxygen atmosphere.",
          "Only known planet with life.",
        ],
      },

      {
        name: "MARS",
        order: "4TH PLANET",
        type: "Rocky terrestrial planet",
        intro:
          "Fourth planet from the Sun, called the Red Planet because oxidized iron minerals give its surface a reddish appearance.",
        facts: [
          ["Diameter", "6,779 km"],
          ["Day", "24.6 hours"],
          ["Year", "687 Earth days"],
          ["Moons", "2"],
          ["Distance", "227.9 million km"],
        ],
        structure: [
          "Rocky crust.",
          "Rocky mantle.",
          "Metallic central core.",
        ],
        atmosphere: [
          "Very thin atmosphere.",
          "Mostly carbon dioxide.",
          "Dust can produce large storms.",
        ],
        surface: [
          "Olympus Mons is a giant volcano.",
          "Valles Marineris is a huge canyon system.",
          "Surface shows evidence of ancient water activity.",
        ],
        moons: [
          "Phobos: larger and closer.",
          "Deimos: smaller and farther.",
        ],
        missions: [
          [
            "Viking 1 and 2",
            "Landers and orbiters",
            "1975-1982",
            "Study Mars directly",
            "Performed surface experiments and returned images and scientific measurements.",
            "Provided major early evidence about the Martian surface and environment."
          ],
          [
            "Mars Pathfinder",
            "Lander and rover",
            "1997",
            "Demonstrate rover exploration",
            "Delivered the Sojourner rover to explore the Martian surface.",
            "Demonstrated mobile robotic exploration on Mars."
          ],
          [
            "Spirit and Opportunity",
            "Rovers",
            "2004 onward",
            "Study rocks and geology",
            "Investigated rocks, soil and evidence of past water activity.",
            "Greatly expanded knowledge of Martian geology and ancient environments."
          ],
          [
            "Curiosity",
            "Rover",
            "2012-present",
            "Study habitability and geology",
            "Investigates rocks, minerals, atmosphere and environmental history.",
            "Found evidence of ancient environments that could have supported microbial life."
          ],
          [
            "Perseverance",
            "Rover",
            "2021-present",
            "Search for signs of ancient life",
            "Studies Jezero Crater and collects scientifically important rock samples.",
            "Supports sample-return planning and detailed study of ancient Martian environments."
          ],
        ],
        important: [
          "4th planet.",
          "Red Planet.",
          "Two moons.",
          "Olympus Mons.",
          "Valles Marineris.",
        ],
      },

      {
        name: "JUPITER",
        order: "5TH PLANET",
        type: "Gas giant",
        intro:
          "Fifth planet from the Sun and largest planet; it has powerful storms and a strong magnetic field.",
        facts: [
          ["Diameter", "139,820 km"],
          ["Day", "About 9.9 hours"],
          ["Year", "11.86 years"],
          ["Moons", "Many"],
          ["Distance", "778.5 million km"],
        ],
        structure: [
          "Hydrogen-helium cloud layers.",
          "Deep compressed hydrogen.",
          "Dense central region.",
        ],
        atmosphere: [
          "Mostly hydrogen and helium.",
          "Banded cloud layers.",
          "Great Red Spot is a giant storm.",
        ],
        surface: [
          "No solid surface.",
          "Cloud bands and storms dominate the visible appearance.",
          "Rapid rotation shapes the bands.",
        ],
        moons: [
          "Many moons.",
          "Io, Europa, Ganymede and Callisto are the Galilean moons.",
          "Ganymede is the largest moon in the Solar System.",
        ],
        missions: [
          [
            "Voyager 1 and 2",
            "Flyby spacecraft",
            "1979",
            "Close study of Jupiter system",
            "Observed Jupiter, its atmosphere, rings and moons.",
            "Returned detailed images and discoveries about the Jovian system."
          ],
          [
            "Galileo",
            "Orbiter and atmospheric probe",
            "1995-2003",
            "Long-term Jupiter study",
            "Orbited Jupiter and studied the planet and Galilean moons.",
            "Expanded knowledge of Jupiter's atmosphere, magnetic field and moons."
          ],
          [
            "Juno",
            "Orbiter",
            "2016-present",
            "Study Jupiter's interior and atmosphere",
            "Studies gravity, magnetic field, atmosphere and polar regions.",
            "Provides detailed information about Jupiter's internal structure and atmosphere."
          ],
        ],
        important: [
          "5th planet.",
          "Largest planet.",
          "Gas giant.",
          "Great Red Spot.",
          "Galilean moons.",
        ],
      },

      {
        name: "SATURN",
        order: "6TH PLANET",
        type: "Gas giant",
        intro:
          "Sixth planet from the Sun and second-largest planet; its extensive rings are made largely of ice and rocky material.",
        facts: [
          ["Diameter", "116,460 km"],
          ["Day", "About 10.7 hours"],
          ["Year", "29.45 years"],
          ["Moons", "Many"],
          ["Distance", "1.43 billion km"],
        ],
        structure: [
          "Hydrogen-helium atmosphere.",
          "Deep high-pressure interior.",
          "Dense central region.",
        ],
        atmosphere: [
          "Mostly hydrogen and helium.",
          "Cloud bands and strong winds.",
          "Large storms can develop.",
        ],
        surface: [
          "No solid surface.",
          "Extensive ring system.",
          "Rings contain countless icy and rocky particles.",
        ],
        moons: [
          "Titan is the largest moon.",
          "Enceladus has icy plumes.",
          "Many other moons have diverse properties.",
        ],
        missions: [
          [
            "Pioneer 11",
            "Flyby spacecraft",
            "1979",
            "First close Saturn observations",
            "Studied Saturn and its rings from close range.",
            "Provided early close-up observations of Saturn's system."
          ],
          [
            "Voyager 1 and 2",
            "Flyby spacecraft",
            "1980-1981",
            "Study Saturn system",
            "Observed atmosphere, rings and moons in detail.",
            "Returned major discoveries about Saturn and its satellites."
          ],
          [
            "Cassini",
            "Orbiter",
            "2004-2017",
            "Long-term Saturn study",
            "Studied Saturn, its rings, atmosphere and moons for many years.",
            "Transformed scientific understanding of the Saturn system."
          ],
          [
            "Huygens",
            "Titan lander",
            "2005",
            "Study Titan surface",
            "Separated from Cassini and descended through Titan's atmosphere to the surface.",
            "Returned the first direct surface observations from Titan."
          ],
        ],
        important: [
          "6th planet.",
          "Second-largest planet.",
          "Famous ring system.",
          "Titan.",
          "Enceladus.",
        ],
      },

      {
        name: "URANUS",
        order: "7TH PLANET",
        type: "Ice giant",
        intro:
          "Seventh planet from the Sun; an ice giant with a blue-green appearance and an extreme axial tilt.",
        facts: [
          ["Diameter", "50,724 km"],
          ["Day", "About 17.2 hours"],
          ["Year", "84 years"],
          ["Moons", "Many"],
          ["Distance", "2.87 billion km"],
        ],
        structure: [
          "Hydrogen-helium upper atmosphere.",
          "Water-, ammonia- and methane-rich interior.",
          "Rocky core.",
        ],
        atmosphere: [
          "Methane contributes to blue-green colour.",
          "Hydrogen and helium dominate.",
          "Very cold cloud tops.",
        ],
        surface: [
          "No solid surface.",
          "Faint ring system.",
          "Clouds and storms occur in the atmosphere.",
        ],
        moons: [
          "Many known moons.",
          "Several are named after literary characters.",
        ],
        missions: [
          [
            "Voyager 2",
            "Flyby spacecraft",
            "1986",
            "First close study of Uranus",
            "Made the only close flyby and studied atmosphere, rings and moons.",
            "Discovered additional details about Uranus's rings, moons and magnetic environment."
          ],
        ],
        important: [
          "7th planet.",
          "Ice giant.",
          "Blue-green appearance.",
          "Extreme axial tilt.",
          "Faint rings.",
        ],
      },

      {
        name: "NEPTUNE",
        order: "8TH PLANET",
        type: "Ice giant",
        intro:
          "Eighth and most distant major planet from the Sun; known for powerful winds, storms and a deep blue appearance.",
        facts: [
          ["Diameter", "49,244 km"],
          ["Day", "About 16 hours"],
          ["Year", "164.8 years"],
          ["Moons", "Many"],
          ["Distance", "4.50 billion km"],
        ],
        structure: [
          "Hydrogen-helium-methane atmosphere.",
          "Water-, ammonia- and methane-rich interior.",
          "Dense rocky core.",
        ],
        atmosphere: [
          "Methane contributes to blue colour.",
          "Extremely strong winds.",
          "Large storm systems can appear and disappear.",
        ],
        surface: [
          "No solid surface.",
          "Atmospheric features dominate the visible planet.",
          "Faint ring system.",
        ],
        moons: [
          "Triton is the largest moon.",
          "Triton follows a retrograde orbit and has an active icy surface.",
        ],
        missions: [
          [
            "Voyager 2",
            "Flyby spacecraft",
            "1989",
            "First close study of Neptune",
            "Made the only close flyby and observed atmosphere, rings and moons.",
            "Provided the most detailed close-up observations of Neptune and Triton."
          ],
          [
            "Earth and Space Telescopes",
            "Remote observation",
            "Ongoing",
            "Continue Neptune studies",
            "Observe atmospheric activity, storms, rings and seasonal changes.",
            "Continue monitoring a planet that has not received another close spacecraft visit."
          ],
        ],
        important: [
          "8th planet.",
          "Farthest major planet.",
          "Ice giant.",
          "Powerful winds.",
          "Triton.",
        ],
      },
    ];

    // ---------------------------------------------------------
    // PLANET PAGES
    // ---------------------------------------------------------

    planets.forEach((planet) => {
      // Main planet page
      addPage();

      title(`${planet.name} - ${planet.order}`);

      drawPlanetDiagram(
        planet.name.charAt(0) + planet.name.slice(1).toLowerCase(),
        48,
        58,
        20
      );

      y = 92;

      y = paragraph(
        planet.intro,
        82,
        y,
        105,
        9.5
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(`Type: ${planet.type}`, 82, y + 5);

      y += 18;

      table(
        ["Parameter", "Details"],
        planet.facts,
        margin,
        y,
        [48, 130]
      );

      y += 52;

      y = sectionTitle("02 - STRUCTURE", y);

      y = bulletList(
        planet.structure,
        margin + 4,
        y,
        contentWidth
      );

      y += 2;

      y = sectionTitle("03 - ATMOSPHERE", y);

      y = bulletList(
        planet.atmosphere,
        margin + 4,
        y,
        contentWidth
      );

      drawStructureDiagram(
        planet.type.includes("terrestrial")
          ? "terrestrial"
          : planet.type.includes("Gas")
          ? "gas"
          : "ice",
        115,
        175
      );

      footer();

      // Continued page
      addPage();

      title(`${planet.name} - CONTINUED`);

      y = 45;

      y = sectionTitle("04 - SURFACE FEATURES", y);

      y = bulletList(
        planet.surface,
        margin + 4,
        y,
        contentWidth
      );

      y += 4;

      y = sectionTitle("05 - MOONS / SATELLITES", y);

      y = bulletList(
        planet.moons,
        margin + 4,
        y,
        contentWidth
      );

      y += 7;

      box(
        margin,
        y,
        contentWidth,
        43,
        "PLANET DIAGRAM",
        [
          `${planet.name} is classified as a ${planet.type.toLowerCase()}.`,
          "The diagram above the section illustrates its basic planetary form.",
          "Planet dimensions in the fact table are actual reference values; diagrams are schematic and not to scale.",
        ]
      );

      y += 53;

      y = sectionTitle("07 - IMPORTANT POINTS", y);

      y = bulletList(
        planet.important,
        margin + 4,
        y,
        contentWidth
      );

      y += 5;

      box(
        margin,
        y,
        contentWidth,
        34,
        "QUICK REVISION",
        [
          planet.important.join(" -> "),
        ]
      );

      footer();

      // Mission pages
      planet.missions.forEach((mission) => {
        addPage();

        title(`${planet.name} - MISSION DETAILS`);

        y = 43;

        y = paragraph(
          `Exploration of ${planet.name.toLowerCase()} has used spacecraft, orbiters, landers, rovers or remote observations depending on the environment and scientific objectives.`,
          margin,
          y,
          contentWidth,
          9.5
        );

        y += 8;

        y = missionCard(
          mission[0],
          mission[1],
          mission[2],
          mission[3],
          mission[4],
          mission[5],
          y
        );

        y += 2;

        y = sectionTitle("WHY THIS MISSION MATTERS", y);

        y = paragraph(
          `${mission[0]} is an important part of the exploration history of ${planet.name.toLowerCase()}. Mission observations help scientists understand planetary structure, atmosphere, surface processes, moons or the broader planetary environment.`,
          margin,
          y,
          contentWidth,
          9.5
        );

        y += 8;

        box(
          margin,
          y,
          contentWidth,
          42,
          "MISSION STUDY NOTE",
          [
            `Mission: ${mission[0]}`,
            `Type: ${mission[1]}`,
            `Period: ${mission[2]}`,
            `Primary purpose: ${mission[3]}`,
            `Key contribution: ${mission[5]}`,
          ]
        );

        footer();
      });
    });

    // ---------------------------------------------------------
    // MAJOR MISSIONS TIMELINE
    // ---------------------------------------------------------

    addPage();
    title("MAJOR SPACE MISSIONS - QUICK TIMELINE");

    const timeline = [
      ["1950s-1960s", "Early planetary exploration", "First spacecraft explored nearby worlds."],
      ["1962", "Mariner 2", "First successful close exploration of another planet, Venus."],
      ["1969", "Apollo 11", "First human landing on the Moon."],
      ["1970s", "Venera", "Important direct exploration of Venus."],
      ["1970s", "Mariner 10", "First close Mercury flybys."],
      ["1977", "Voyager 1 and 2", "Grand tour of the outer planets began."],
      ["1990s", "Galileo", "Long-term exploration of Jupiter."],
      ["1997", "Mars Pathfinder", "Rover-based surface exploration of Mars."],
      ["1997", "Cassini-Huygens", "Major Saturn and Titan exploration mission."],
      ["2011", "MESSENGER", "Long-term orbital study of Mercury."],
      ["2011", "Juno launch", "Jupiter-focused mission launched."],
      ["2012", "Curiosity", "Long-term Mars surface exploration."],
      ["2021", "Perseverance", "Mars rover studying ancient environments and samples."],
    ];

    table(
      ["Period", "Mission / Program", "Main significance"],
      timeline,
      margin,
      42,
      [29, 55, 94]
    );

    footer();

    // ---------------------------------------------------------
    // COMPARISON
    // ---------------------------------------------------------

    addPage();
    title("SOLAR SYSTEM COMPARISON");

    const comparison = [
      ["Mercury", "Rocky", "0", "88 days", "Very thin exosphere"],
      ["Venus", "Rocky", "0", "225 days", "Dense CO2 atmosphere"],
      ["Earth", "Rocky", "1", "365.25 days", "Nitrogen and oxygen"],
      ["Mars", "Rocky", "2", "687 days", "Thin CO2 atmosphere"],
      ["Jupiter", "Gas giant", "Many", "11.86 years", "Hydrogen and helium"],
      ["Saturn", "Gas giant", "Many", "29.45 years", "Hydrogen and helium"],
      ["Uranus", "Ice giant", "Many", "84 years", "Hydrogen, helium, methane"],
      ["Neptune", "Ice giant", "Many", "164.8 years", "Hydrogen, helium, methane"],
    ];

    table(
      ["Planet", "Type", "Moons", "Year", "Atmosphere"],
      comparison,
      margin,
      42,
      [29, 29, 20, 30, 70]
    );

    y = 125;

    drawSolarSystemDiagram(pageWidth / 2, 170);

    footer();

    // ---------------------------------------------------------
    // QUICK REVISION
    // ---------------------------------------------------------

    addPage();
    title("QUICK REVISION");

    const revision = [
      "Mercury -> Closest to the Sun and smallest planet.",
      "Venus -> Hottest planet with a dense carbon-dioxide atmosphere.",
      "Earth -> Liquid surface water and one natural Moon.",
      "Mars -> Red Planet with Olympus Mons and Valles Marineris.",
      "Jupiter -> Largest planet and home of the Great Red Spot.",
      "Saturn -> Famous for its extensive ring system.",
      "Uranus -> Ice giant with extreme axial tilt.",
      "Neptune -> Farthest major planet with powerful winds.",
      "Galileo -> Major long-term Jupiter exploration mission.",
      "Juno -> Studies Jupiter's atmosphere, magnetic field and interior.",
      "Cassini -> Major long-term Saturn exploration mission.",
      "Huygens -> Landed on Titan.",
      "Voyager 2 -> Only close flyby of Uranus and Neptune.",
      "MESSENGER -> Major orbital study of Mercury.",
      "Perseverance -> Mars rover studying ancient environments and collecting samples.",
    ];

    y = 45;

    y = bulletList(
      revision,
      margin + 4,
      y,
      contentWidth,
      9.5
    );

    y += 6;

    box(
      margin,
      y,
      contentWidth,
      55,
      "EXAM REVISION METHOD",
      [
        "Remember the planet order from the Sun.",
        "Classify planets as terrestrial, gas giant or ice giant.",
        "Learn one or two identifying features for every planet.",
        "Remember major missions and their target worlds.",
        "Use the comparison table for quick last-minute revision.",
      ]
    );

    footer();

    // ---------------------------------------------------------
    // FINAL PAGE
    // ---------------------------------------------------------

    addPage();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 45, 70);

    doc.text(
      "SOLARIS",
      pageWidth / 2,
      75,
      { align: "center" }
    );

    doc.setFontSize(15);

    doc.text(
      "EXPLORE - LEARN - DISCOVER",
      pageWidth / 2,
      90,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
      "Complete Solar System Illustrated Study Notes",
      pageWidth / 2,
      112,
      { align: "center" }
    );

    drawSolarSystemDiagram(pageWidth / 2, 170);

    doc.setFontSize(9);
    doc.text(
      "End of Study Notes",
      pageWidth / 2,
      225,
      { align: "center" }
    );

    footer();

    // ---------------------------------------------------------
    // OPEN PDF IN BROWSER
    // ---------------------------------------------------------

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");

    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 60000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #07111f, #111c31)",
        padding: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          maxWidth: "700px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            letterSpacing: "8px",
            marginBottom: "10px",
          }}
        >
          SOLARIS
        </h1>

        <h2>
          Complete Solar System Study Notes
        </h2>

        <p
          style={{
            color: "#b9c4d5",
            lineHeight: "1.7",
            marginBottom: "28px",
          }}
        >
          Illustrated study material with planet facts,
          diagrams, structures, moons, exploration and
          detailed mission information.
        </p>

        <button
          onClick={generatePDF}
          style={{
            padding: "15px 30px",
            borderRadius: "10px",
            border: "none",
            background: "#18bfff",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Generate Complete Solar System PDF
        </button>
      </div>
    </div>
  );
};

export default SolarSystemPDF;