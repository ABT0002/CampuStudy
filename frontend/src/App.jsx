
import { useState } from "react";
import "./App.css";

const studyGroups = [
  {
    id: 1,
    course: "CS 1501",
    subject: "Algorithms and Data Structures",
    day: "Wednesday",
    time: "3:00 PM",
    period: "Afternoon",
    location: "Hillman Library",
    maxSize: 4,
    members: 2,
    expertise: "Beginner",
    preference: "Collaborative",
  },
  {
    id: 2,
    course: "CS 1530",
    subject: "Software Engineering",
    day: "Thursday",
    time: "5:00 PM",
    period: "Evening",
    location: "Hillman Library",
    maxSize: 6,
    members: 3,
    expertise: "Intermediate",
    preference: "Collaborative",
  },
  {
    id: 3,
    course: "CS 1550",
    subject: "Operating Systems",
    day: "Monday",
    time: "2:00 PM",
    period: "Afternoon",
    location: "Sennott Square",
    maxSize: 4,
    members: 3,
    expertise: "Intermediate",
    preference: "Quiet",
  },
  {
    id: 4,
    course: "MATH 0220",
    subject: "Calculus",
    day: "Tuesday",
    time: "10:00 AM",
    period: "Morning",
    location: "Posvar Hall",
    maxSize: 5,
    members: 2,
    expertise: "Beginner",
    preference: "Collaborative",
  },
  {
    id: 5,
    course: "CS 1501",
    subject: "Algorithms Exam Review",
    day: "Friday",
    time: "1:00 PM",
    period: "Afternoon",
    location: "Hillman Library",
    maxSize: 4,
    members: 3,
    expertise: "Advanced",
    preference: "Quiet",
  },
  {
    id: 6,
    course: "INFSCI 0610",
    subject: "Networks and Information",
    day: "Wednesday",
    time: "6:00 PM",
    period: "Evening",
    location: "Information Sciences Building",
    maxSize: 6,
    members: 4,
    expertise: "Beginner",
    preference: "Collaborative",
  },
];

const emptyFilters = {
  course: "",
  day: "",
  period: "",
  location: "",
  maxSize: "",
  expertise: "",
  preference: "",
};

function App() {
  const [filters, setFilters] = useState({ ...emptyFilters });
  const [appliedFilters, setAppliedFilters] = useState({ ...emptyFilters });

  function updateFilter(event) {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSearch(event) {
    event.preventDefault();
    setAppliedFilters({ ...filters });
  }

  function handleReset() {
    setFilters({ ...emptyFilters });
    setAppliedFilters({ ...emptyFilters });
  }

  const matchingGroups = studyGroups.filter((group) => {
    const query = appliedFilters.course.trim().toLowerCase();

    const matchesCourse =
      !query ||
      group.course.toLowerCase().includes(query) ||
      group.subject.toLowerCase().includes(query);

    const matchesDay =
      !appliedFilters.day || group.day === appliedFilters.day;

    const matchesPeriod =
      !appliedFilters.period ||
      group.period === appliedFilters.period;

    const matchesLocation =
      !appliedFilters.location ||
      group.location === appliedFilters.location;

    const matchesSize =
      !appliedFilters.maxSize ||
      group.maxSize <= Number(appliedFilters.maxSize);

    const matchesExpertise =
      !appliedFilters.expertise ||
      group.expertise === appliedFilters.expertise;

    const matchesPreference =
      !appliedFilters.preference ||
      group.preference === appliedFilters.preference;

    return (
      matchesCourse &&
      matchesDay &&
      matchesPeriod &&
      matchesLocation &&
      matchesSize &&
      matchesExpertise &&
      matchesPreference
    );
  });

  return (
    <main className="campus-app">
      <header className="campus-header">
        <div className="campus-brand">
          <span className="brand-symbol" aria-hidden="true">
            C
          </span>
          <span>CampuStudy</span>
        </div>
        <span className="prototype-label">Pitt Study Groups</span>
      </header>

      <div className="campus-container">
        <section className="welcome-section">
          <span className="section-eyebrow">STUDY TOGETHER</span>
          <h1>Find your study group.</h1>
          <p>
            Connect with Pitt students studying the same subjects.
            Search for groups that match your schedule and preferences.
          </p>
        </section>

        <section className="search-panel" aria-labelledby="search-heading">
          <div className="panel-heading">
            <h2 id="search-heading">Search Study Groups</h2>
            <p>Choose your preferences to find compatible groups.</p>
          </div>

          <form onSubmit={handleSearch}>
            <div className="filters-grid">
              <div className="filter-field">
                <label htmlFor="course">Course or Subject</label>
                <input
                  id="course"
                  name="course"
                  type="search"
                  placeholder="e.g. CS 1501"
                  value={filters.course}
                  onChange={updateFilter}
                />
              </div>

              <div className="filter-field">
                <label htmlFor="day">Meeting Day</label>
                <select
                  id="day"
                  name="day"
                  value={filters.day}
                  onChange={updateFilter}
                >
                  <option value="">Any day</option>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="period">Meeting Time</label>
                <select
                  id="period"
                  name="period"
                  value={filters.period}
                  onChange={updateFilter}
                >
                  <option value="">Any time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={updateFilter}
                >
                  <option value="">Any location</option>
                  {[...new Set(studyGroups.map((g) => g.location))]
                    .sort()
                    .map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="maxSize">Maximum Group Size</label>
                <select
                  id="maxSize"
                  name="maxSize"
                  value={filters.maxSize}
                  onChange={updateFilter}
                >
                  <option value="">Any size</option>
                  <option value="4">Up to 4 students</option>
                  <option value="5">Up to 5 students</option>
                  <option value="6">Up to 6 students</option>
                  <option value="8">Up to 8 students</option>
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="expertise">Expertise Level</label>
                <select
                  id="expertise"
                  name="expertise"
                  value={filters.expertise}
                  onChange={updateFilter}
                >
                  <option value="">Any level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="filter-field">
                <label htmlFor="preference">Study Preference</label>
                <select
                  id="preference"
                  name="preference"
                  value={filters.preference}
                  onChange={updateFilter}
                >
                  <option value="">Any preference</option>
                  <option value="Quiet">Quiet</option>
                  <option value="Collaborative">Collaborative</option>
                </select>
              </div>
            </div>

            <div className="search-actions">
              <button type="submit" className="search-button">
                Search Groups
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </section>

        <section className="results-section" aria-labelledby="results-heading">
          <div className="results-heading">
            <div>
              <h2 id="results-heading">Available Study Groups</h2>
              <p>Showing sample groups for the frontend prototype.</p>
            </div>
            <span className="results-count" role="status" aria-live="polite">
              {matchingGroups.length}{" "}
              {matchingGroups.length === 1 ? "group" : "groups"} found
            </span>
          </div>

          {matchingGroups.length === 0 ? (
            <div className="empty-results">
              <h3>No matching groups found</h3>
              <p>
                Try changing your search filters or clearing them to
                see more available study groups.
              </p>
              <button
                type="button"
                className="search-button"
                onClick={handleReset}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="groups-grid">
              {matchingGroups.map((group) => (
                <article className="group-card" key={group.id}>
                  <div className="group-card-top">
                    <span className="course-tag">{group.course}</span>
                    <span className="availability-tag">
                      {group.maxSize - group.members} spots left
                    </span>
                  </div>

                  <h3>{group.subject}</h3>

                  <div className="group-details">
                    <p>
                      <strong>When:</strong> {group.day},{" "}
                      {group.time}
                    </p>
                    <p>
                      <strong>Where:</strong> {group.location}
                    </p>
                    <p>
                      <strong>Members:</strong> {group.members}/
                      {group.maxSize}
                    </p>
                    <p>
                      <strong>Level:</strong> {group.expertise}
                    </p>
                    <p>
                      <strong>Style:</strong> {group.preference}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="campus-footer">
          CampuStudy · University of Pittsburgh · Frontend Prototype
        </footer>
      </div>
    </main>
  );
}

export default App;
