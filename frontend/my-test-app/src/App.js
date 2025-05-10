import React, { useState, useCallback } from 'react';

const SimpleTestApp = () => {
  const [getResponse, setGetResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [errorGet, setErrorGet] = useState(null);
  const [errorPost, setErrorPost] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    status: '',
  });

  const fetchProjects = useCallback(async () => {
    setLoadingGet(true);
    setErrorGet(null);
    setGetResponse(null);
    try {
      const response = await fetch('http://localhost:8081/projects');
      if (!response.ok) {
        // Improved error message: Include status code for debugging
        throw new Error(`Failed to fetch projects. Status: ${response.status} ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response was not JSON");
      }
      const data = await response.json();
      setGetResponse(data);
    } catch (error) {
      // Catch network errors and JSON parsing errors
      setErrorGet(error.message);
      setGetResponse(null);
    } finally {
      setLoadingGet(false);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createProject = useCallback(async () => {
    setLoadingPost(true);
    setErrorPost(null);
    setPostResponse(null);
    try {
      const response = await fetch('http://localhost:8081/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        // Improved error message
        throw new Error(`Failed to create project. Status: ${response.status} ${response.statusText}`);
      }
       const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response was not JSON");
        }
      const data = await response.json();
      setPostResponse(data);
      // Clear the form after successful submission
      setNewProject({ title: '', description: '', link: '', status: '' });
    } catch (error) {
      // Catch network errors and JSON parsing errors.
      setErrorPost(error.message);
      setPostResponse(null);
    } finally {
      setLoadingPost(false);
    }
  }, [newProject]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', padding: '2rem', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Simple React Test App</h1>

      {/* GET Request Section */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: 'white', width: '80%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fetch Projects (GET /projects)</h2>
        <button
          onClick={fetchProjects}
          disabled={loadingGet}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: loadingGet ? '#808080' : '#2196F3', // Blue or Gray
            color: 'white',
            border: 'none',
            cursor: loadingGet ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
            marginBottom: '1rem',
          }}
        >
          {loadingGet ? 'Loading...' : 'Fetch Projects'}
        </button>

        {getResponse && (
          <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', border: '1px solid #bbdefb', borderRadius: '0.5rem', marginTop: '1rem' }}>
            <p>Response from GET /projects:</p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(getResponse, null, 2)}</pre>
          </div>
        )}

        {errorGet && (
          <div style={{ padding: '1rem', backgroundColor: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '0.5rem', marginTop: '1rem' }}>
            <p style={{ color: 'red' }}>Error fetching projects: {errorGet}</p>
          </div>
        )}
      </div>

      {/* POST Request Section */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: 'white', width: '80%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Create New Project (POST /projects)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ marginBottom: '0.5rem' }}>Title:</label>
          <input type="text" id="title" name="title" value={newProject.title} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '1rem' }} />

          <label htmlFor="description" style={{ marginBottom: '0.5rem' }}>Description:</label>
          <textarea id="description" name="description" value={newProject.description} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '1rem' }} />

          <label htmlFor="link" style={{ marginBottom: '0.5rem' }}>Link:</label>
          <input type="text" id="link" name="link" value={newProject.link} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '1rem' }} />

          <label htmlFor="status" style={{ marginBottom: '0.5rem' }}>Status:</label>
          <input type="text" id="status" name="status" value={newProject.status} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '1rem' }} />
        </div>
        <button
          onClick={createProject}
          disabled={loadingPost}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: loadingPost ? '#808080' : '#4CAF50', // Green or Gray
            color: 'white',
            border: 'none',
            cursor: loadingPost ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          {loadingPost ? 'Creating...' : 'Create Project'}
        </button>

        {postResponse && (
          <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '0.5rem', marginTop: '1rem' }}>
            <p>Response from POST /projects:</p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(postResponse, null, 2)}</pre>
          </div>
        )}

        {errorPost && (
          <div style={{ padding: '1rem', backgroundColor: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '0.5rem', marginTop: '1rem' }}>
            <p style={{ color: 'red' }}>Error creating project: {errorPost}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleTestApp;
