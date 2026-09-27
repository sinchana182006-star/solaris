import { useState } from "react";
import jsPDF from "jspdf";

const planetData = {
  Mercury: {
    intro:
      "Mercury is the smallest planet in the Solar System and the closest planet to the Sun. It is a rocky planet with a heavily cratered surface.",
    facts: [
      "1st planet from the Sun",
      "Smallest planet in the Solar System",
      "Rocky terrestrial planet",
      "Day length: about 59 Earth days",
      "Year length: about 88 Earth days",
      "No natural moons",
    ],
    structure: [
      "Crust: rocky outer surface covered with many impact craters.",
      "Mantle: rocky layer beneath the crust.",
      "Core: unusually large metallic core compared with the planet's size.",
    ],
    atmosphere: [
      "Mercury has an extremely thin exosphere rather than a thick atmosphere.",
      "It contains small amounts of oxygen, sodium, hydrogen, helium and other gases.",
      "The thin exosphere cannot retain heat effectively.",
    ],
    surface: [
      "Mercury's surface contains many impact craters.",
      "Large plains and cliffs are found across the planet.",
      "The Caloris Basin is one of its major impact features.",
    ],
    moons: ["Mercury has no natural moons."],
    movement: [
      "Mercury rotates slowly compared with Earth.",
      "It completes one orbit around the Sun in about 88 Earth days.",
      "A solar day on Mercury lasts about 176 Earth days.",
    ],
  },

  Venus: {
    intro:
      "Venus is the second planet from the Sun and is similar in size to Earth. It has a very thick atmosphere and is the hottest planet in the Solar System.",
    facts: [
      "2nd planet from the Sun",
      "Rocky terrestrial planet",
      "Similar in size to Earth",
      "Hottest planet in the Solar System",
      "Year length: about 225 Earth days",
      "No natural moons",
    ],
    structure: [
      "Crust: rocky outer layer.",
      "Mantle: thick layer of hot rocky material.",
      "Core: metallic core located at the center.",
    ],
    atmosphere: [
      "Venus has a very thick atmosphere dominated by carbon dioxide.",
      "Clouds contain sulfuric acid droplets.",
      "The dense atmosphere creates an extreme greenhouse effect.",
    ],
    surface: [
      "Venus has volcanic plains, mountains and large highland regions.",
      "Its surface contains many volcanoes and lava flows.",
      "The thick atmosphere makes direct surface observation difficult.",
    ],
    moons: ["Venus has no natural moons."],
    movement: [
      "Venus rotates very slowly.",
      "It rotates in the opposite direction to most planets.",
      "It completes one orbit around the Sun in about 225 Earth days.",
    ],
  },

  Earth: {
    intro:
      "Earth is the third planet from the Sun and the only planet currently known to support life. It has liquid surface water and a protective atmosphere.",
    facts: [
      "3rd planet from the Sun",
      "Rocky terrestrial planet",
      "About 71% of the surface is covered by water",
      "One natural moon",
      "Day length: about 24 hours",
      "Year length: about 365.25 days",
    ],
    structure: [
      "Crust: thin solid outer layer where we live.",
      "Mantle: thick layer of hot, slowly moving rock.",
      "Outer core: liquid metallic layer.",
      "Inner core: solid metallic central region.",
    ],
    atmosphere: [
      "Earth's atmosphere is mainly nitrogen and oxygen.",
      "It protects life from harmful radiation and helps regulate temperature.",
      "The atmosphere also contains smaller amounts of carbon dioxide, water vapour and other gases.",
    ],
    surface: [
      "Earth has oceans, continents, mountains, valleys, deserts and polar regions.",
      "Liquid water is widespread on the surface.",
      "Earth has an active system of plate tectonics.",
    ],
    moons: ["Earth has one natural satellite: the Moon."],
    movement: [
      "Earth rotates once approximately every 24 hours.",
      "Earth revolves around the Sun once approximately every 365.25 days.",
      "Earth's axial tilt contributes to the seasons.",
    ],
  },

  Mars: {
    intro:
      "Mars is the fourth planet from the Sun and is commonly called the Red Planet because iron minerals on its surface give it a reddish appearance.",
    facts: [
      "4th planet from the Sun",
      "Rocky terrestrial planet",
      "Known as the Red Planet",
      "Two natural moons",
      "Day length: about 24.6 hours",
      "Year length: about 687 Earth days",
    ],
    structure: [
      "Crust: solid rocky outer layer.",
      "Mantle: rocky layer below the crust.",
      "Core: central metallic region containing iron and other elements.",
    ],
    atmosphere: [
      "Mars has a very thin atmosphere.",
      "Carbon dioxide is the main atmospheric gas.",
      "The thin atmosphere makes the planet much colder than Earth overall.",
    ],
    surface: [
      "Mars contains volcanoes, valleys, plains and impact craters.",
      "Olympus Mons is a huge volcano on Mars.",
      "Valles Marineris is a giant canyon system.",
      "Evidence of ancient water activity can be found on the surface.",
    ],
    moons: [
      "Phobos is the larger and closer moon.",
      "Deimos is smaller and farther from Mars.",
    ],
    movement: [
      "Mars rotates once in about 24.6 hours.",
      "It completes one orbit around the Sun in about 687 Earth days.",
      "Its axial tilt produces seasons.",
    ],
  },

  Jupiter: {
    intro:
      "Jupiter is the fifth planet from the Sun and the largest planet in the Solar System. It is a gas giant with a powerful magnetic field.",
    facts: [
      "5th planet from the Sun",
      "Largest planet in the Solar System",
      "Gas giant",
      "Has many moons",
      "Very rapid rotation",
      "Year length: about 11.86 Earth years",
    ],
    structure: [
      "Upper atmosphere: layers of hydrogen and helium clouds.",
      "Deep interior: hydrogen becomes increasingly compressed.",
      "Central region: scientists believe Jupiter has a dense core region.",
    ],
    atmosphere: [
      "Jupiter's atmosphere is mainly hydrogen and helium.",
      "It contains colourful cloud bands.",
      "Powerful storms occur in its atmosphere.",
    ],
    surface: [
      "Jupiter does not have a solid surface like Earth.",
      "Its visible cloud tops show bands, storms and turbulent atmospheric activity.",
      "The Great Red Spot is a long-lasting giant storm.",
    ],
    moons: [
      "Jupiter has many known moons.",
      "The four largest are Io, Europa, Ganymede and Callisto.",
      "Ganymede is the largest moon in the Solar System.",
    ],
    movement: [
      "Jupiter rotates very quickly, completing one rotation in roughly 10 hours.",
      "It takes nearly 12 Earth years to orbit the Sun.",
    ],
  },

  Saturn: {
    intro:
      "Saturn is the sixth planet from the Sun and the second-largest planet. It is famous for its extensive system of bright rings.",
    facts: [
      "6th planet from the Sun",
      "Second-largest planet",
      "Gas giant",
      "Famous ring system",
      "Many known moons",
      "Year length: about 29.5 Earth years",
    ],
    structure: [
      "Saturn has a deep atmosphere made mainly of hydrogen and helium.",
      "Below the atmosphere, pressure increases dramatically.",
      "Its interior contains a dense central region surrounded by metallic and molecular hydrogen.",
    ],
    atmosphere: [
      "Saturn's atmosphere is mainly hydrogen and helium.",
      "It contains cloud layers and large atmospheric storms.",
      "Strong winds occur near the upper atmosphere.",
    ],
    surface: [
      "Saturn has no solid surface that could be stood upon.",
      "Its visible appearance comes from its cloud layers.",
      "The planet is surrounded by a complex ring system made largely of ice and rocky particles.",
    ],
    moons: [
      "Saturn has many moons.",
      "Titan is its largest moon and has a thick atmosphere.",
      "Enceladus is known for icy activity and water-rich plumes.",
    ],
    movement: [
      "Saturn rotates rapidly.",
      "It takes about 29.5 Earth years to orbit the Sun.",
    ],
  },

  Uranus: {
    intro:
      "Uranus is the seventh planet from the Sun. It is an ice giant with a blue-green appearance and an unusual sideways rotation.",
    facts: [
      "7th planet from the Sun",
      "Ice giant",
      "Blue-green appearance",
      "Has a faint ring system",
      "Many known moons",
      "Year length: about 84 Earth years",
    ],
    structure: [
      "Upper atmosphere contains hydrogen and helium.",
      "The interior contains large amounts of water, ammonia and methane-rich material.",
      "A rocky core lies deep inside the planet.",
    ],
    atmosphere: [
      "Uranus has an atmosphere mainly containing hydrogen and helium.",
      "Methane absorbs red light and contributes to its blue-green colour.",
      "The planet has very cold atmospheric conditions.",
    ],
    surface: [
      "Uranus does not have a solid surface like Earth.",
      "Its visible appearance comes from its atmosphere.",
      "It has a faint system of rings.",
    ],
    moons: [
      "Uranus has many known moons.",
      "Several of its moons have unusual names from literature.",
    ],
    movement: [
      "Uranus has an extreme axial tilt.",
      "It appears to rotate almost on its side.",
      "It takes about 84 Earth years to orbit the Sun.",
    ],
  },

  Neptune: {
    intro:
      "Neptune is the eighth and most distant major planet from the Sun. It is an ice giant known for its deep blue appearance and powerful winds.",
    facts: [
      "8th planet from the Sun",
      "Most distant major planet",
      "Ice giant",
      "Very strong atmospheric winds",
      "Has rings and many moons",
      "Year length: about 165 Earth years",
    ],
    structure: [
      "Upper atmosphere contains hydrogen, helium and methane.",
      "The interior contains water, ammonia and methane-rich material.",
      "A dense rocky core lies deep inside.",
    ],
    atmosphere: [
      "Neptune's atmosphere contains hydrogen, helium and methane.",
      "Methane contributes to its blue appearance.",
      "Neptune experiences extremely strong winds and storms.",
    ],
    surface: [
      "Neptune has no solid surface like Earth.",
      "Its visible features are atmospheric.",
      "Dark storm systems have been observed in its atmosphere.",
    ],
    moons: [
      "Neptune has several known moons.",
      "Triton is its largest moon.",
      "Triton has a retrograde orbit around Neptune.",
    ],
    movement: [
      "Neptune rotates in roughly 16 hours.",
      "It takes about 165 Earth years to complete one orbit around the Sun.",
    ],
  },
};

const difficultyInfo = {
  beginner: "Beginner Study Notes",
  medium: "Intermediate Study Notes",
  detailed: "Advanced Study Notes",
};

function CosmicNotes() {
  const [planet, setPlanet] = useState("Earth");
  const [length, setLength] = useState("short");
  const [difficulty, setDifficulty] = useState("beginner");
  const [generatedNote, setGeneratedNote] = useState(null);

  const generateNotes = () => {
    setGeneratedNote({
      planet,
      difficulty,
      length,
      data: planetData[planet],
    });

    setTimeout(() => {
      document
        .getElementById("cosmic-generated-notes")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const getSections = () => {
    if (length === "short") {
      return [
        ["Introduction", generatedNote.data.intro],
        ["Quick Facts", generatedNote.data.facts],
        ["Important Points", generatedNote.data.surface],
      ];
    }

    if (length === "medium") {
      return [
        ["Introduction", generatedNote.data.intro],
        ["Quick Facts", generatedNote.data.facts],
        ["Planetary Structure", generatedNote.data.structure],
        ["Atmosphere", generatedNote.data.atmosphere],
        ["Surface Features", generatedNote.data.surface],
        ["Moons", generatedNote.data.moons],
        ["Rotation & Revolution", generatedNote.data.movement],
      ];
    }

    return [
      ["Introduction", generatedNote.data.intro],
      ["Quick Facts", generatedNote.data.facts],
      ["Planetary Structure", generatedNote.data.structure],
      ["Atmosphere", generatedNote.data.atmosphere],
      ["Surface Features", generatedNote.data.surface],
      ["Moons", generatedNote.data.moons],
      ["Rotation & Revolution", generatedNote.data.movement],
      [
        "Important Points to Remember",
        [
          ...generatedNote.data.facts.slice(0, 4),
          ...generatedNote.data.moons.slice(0, 2),
        ],
      ],
      [
        "Quick Revision",
        `Remember: ${generatedNote.planet} is ${generatedNote.data.facts[0].toLowerCase()}. Review its structure, atmosphere, surface features, moons and movement.`,
      ],
    ];
  };

  const downloadPDF = () => {
    if (!generatedNote) return;

    const doc = new jsPDF();
    const sections = getSections();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const addText = (
      text,
      x,
      fontSize,
      maxWidth,
      lineHeight = 7
    ) => {
      doc.setFontSize(fontSize);

      const lines = doc.splitTextToSize(
        String(text),
        maxWidth
      );

      if (y + lines.length * lineHeight > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, x, y);
      y += lines.length * lineHeight + 4;
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SOLARIS", pageWidth / 2, y, {
      align: "center",
    });

    y += 12;

    doc.setFontSize(18);
    doc.text(
      `${generatedNote.planet.toUpperCase()} - STUDY NOTES`,
      pageWidth / 2,
      y,
      { align: "center" }
    );

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      difficultyInfo[generatedNote.difficulty],
      pageWidth / 2,
      y,
      { align: "center" }
    );

    y += 15;

    sections.forEach(([title, content], index) => {
      if (y > pageHeight - 35) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${title}`, 15, y);

      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      if (Array.isArray(content)) {
        content.forEach((item) => {
          const lines = doc.splitTextToSize(
            `• ${item}`,
            pageWidth - 30
          );

          if (
            y + lines.length * 6 >
            pageHeight - 20
          ) {
            doc.addPage();
            y = 20;
          }

          doc.text(lines, 18, y);
          y += lines.length * 6 + 3;
        });
      } else {
        addText(
          content,
          15,
          10,
          pageWidth - 30,
          6
        );
      }

      y += 6;
    });

    doc.setFontSize(9);
    doc.text(
      "Generated by SOLARIS • Explore • Learn • Discover",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    doc.save(
      `SOLARIS_${generatedNote.planet}_Study_Notes.pdf`
    );
  };

  return (
    <div className="cosmic-notes-page">
      <main className="cosmic-notes-main">
        <div className="cosmic-notes-container">

          <div className="cosmic-notes-header">
            <p className="cosmic-notes-label">
              SOLARIS / LEARNING
            </p>

            <h1>Cosmic Notes</h1>

            <p className="cosmic-notes-intro">
              Create structured astronomy study notes
              based on your selected planet.
            </p>
          </div>

          <section className="cosmic-create-card">
            <h2>Create Your Notes</h2>

            <div className="cosmic-controls">

              <div className="cosmic-control">
                <label>Planet</label>

                <select
                  value={planet}
                  onChange={(e) =>
                    setPlanet(e.target.value)
                  }
                >
                  {Object.keys(planetData).map(
                    (name) => (
                      <option
                        key={name}
                        value={name}
                      >
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>

              

              <div className="cosmic-control">
                <label>Length</label>

                <select
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value)
                  }
                >
                  <option value="short">
                    Short
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="detailed">
                    Detailed
                  </option>
                </select>
              </div>

            </div>

            <button
              className="cosmic-generate-button"
              onClick={generateNotes}
            >
              ✦ Generate Notes
            </button>
          </section>

          {generatedNote && (
            <section
              id="cosmic-generated-notes"
              className="cosmic-generated-notes"
            >
              <div className="cosmic-document-toolbar">
                <div>
                  <span className="cosmic-document-label">
                    GENERATED STUDY MATERIAL
                  </span>

                  <h2>
                    {generatedNote.planet} Study Notes
                  </h2>
                </div>

                <button
                  className="cosmic-download-button"
                  onClick={downloadPDF}
                >
                  ⬇ Download Notes
                </button>
              </div>

              <article className="cosmic-notes-document">

                <div className="cosmic-document-heading">
                  <span>✦ SOLARIS ✦</span>

                  <h1>
                    {generatedNote.planet.toUpperCase()}
                  </h1>

                  <h3>
                    {difficultyInfo[
                      generatedNote.difficulty
                    ]}
                  </h3>

                  <p>
                    Astronomy Study Material
                  </p>
                </div>

                {getSections().map(
                  ([title, content], index) => (
                    <section
                      className="cosmic-note-section"
                      key={title}
                    >
                      <h2>
                        <span>
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>
                        {title}
                      </h2>

                      {Array.isArray(content) ? (
                        <ul>
                          {content.map(
                            (item, itemIndex) => (
                              <li key={itemIndex}>
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>{content}</p>
                      )}
                    </section>
                  )
                )}

                <div className="cosmic-revision-box">
                  <strong>
                    ✦ SOLARIS QUICK REVISION
                  </strong>

                  <p>
                    Study the highlighted facts,
                    structure, atmosphere, surface,
                    moons and movement of{" "}
                    {generatedNote.planet}.
                  </p>
                </div>

              </article>

              <div className="cosmic-download-bottom">
                <button
                  className="cosmic-download-button"
                  onClick={downloadPDF}
                >
                  ⬇ Download These Notes as PDF
                </button>
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default CosmicNotes;