// US10: shows one study group's details so a student can decide whether to join it
function GroupDetails({ group, onBack }) {
  return (
    <section className="results-section" aria-labelledby="details-heading">
      <div className="results-heading">
        <h2 id="details-heading">Study Group Details</h2>
      </div>

      <article className="group-card">
        <div className="group-card-top">
          <span className="course-tag">{group.course}</span>
        </div>

        <h3>{group.subject}</h3>

        {/* six details required by US10 */}
        <div className="group-details">
          <p>
            <strong>Subject:</strong> {group.subject}
          </p>
          <p>
            <strong>Meeting time:</strong> {group.day}, {group.time}
          </p>
          <p>
            <strong>Location:</strong> {group.location}
          </p>
          <p>
            <strong>Maximum size:</strong> {group.maxSize} students
          </p>
          <p>
            <strong>Expertise level:</strong> {group.expertise}
          </p>
          <p>
            <strong>Study preference:</strong> {group.preference}
          </p>
        </div>

        <div className="search-actions">
          {/* sending request is US11 so for now the button only says so */}
          <button
            type="button"
            className="search-button"
            onClick={() => alert("Requesting an invitation is coming soon.")}
          >
            Request an invitation
          </button>

          {/* goes back to search page, the filters chose by student are still kept */}
          <button type="button" className="reset-button" onClick={onBack}>
            Back to search results
          </button>
        </div>
      </article>
    </section>
  );
}

export default GroupDetails;
