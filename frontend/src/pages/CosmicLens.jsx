import { useState } from "react";

function CosmicLens() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;

    window.open(googleUrl, "_blank");
  };

  const handleSuggestion = (topic) => {
    setSearch(topic);
  };

  return (
    <main className="cosmic-lens-page">
      <section className="cosmic-lens-container">
        <div className="cosmic-lens-heading">
          <p>SOLARIS DISCOVERY</p>

          <h1>COSMIC LENS</h1>

          <span>Search the universe</span>

          <div className="cosmic-lens-description">
            Search anything about space, astronomy, planets, missions...
          </div>
        </div>

        <form
          className="cosmic-search-form"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What do you want to discover?"
          />

          <button type="submit">
            SEARCH ✦
          </button>
        </form>

        <div className="cosmic-suggestions">
          <p>EXPLORE TOPICS</p>

          <div className="cosmic-suggestion-list">
            <button
              type="button"
              onClick={() => handleSuggestion("Mars")}
            >
              Mars
            </button>

            <button
              type="button"
              onClick={() => handleSuggestion("Jupiter")}
            >
              Jupiter
            </button>

            <button
              type="button"
              onClick={() => handleSuggestion("Black Holes")}
            >
              Black Holes
            </button>

            <button
              type="button"
              onClick={() =>
                handleSuggestion("Voyager 1 mission")
              }
            >
              Voyager 1
            </button>

            <button
              type="button"
              onClick={() =>
                handleSuggestion("James Webb Space Telescope")
              }
            >
              James Webb Telescope
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CosmicLens;