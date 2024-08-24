import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudyGroupFinder() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/study-groups', {
        params: {
          query: search,
        },
      });
      setGroups(response.data);
    } catch (err) {
      setError('Failed to fetch study groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGroups();
  };

  return (
    <div className="study-group-finder">
      <h1>Study Group Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a subject, topic, or location..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Study Groups'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="group-list">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id} className="group-item">
              <h3>{group.name}</h3>
              <p>Topic: {group.topic}</p>
              <p>Location: {group.location}</p>
              <button>Join Group</button>
            </div>
          ))
        ) : (
          <p>No study groups found.</p>
        )}
      </div>
    </div>
  );
}

export default StudyGroupFinder;
